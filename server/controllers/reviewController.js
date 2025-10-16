const pool = require('../config/db');
const { analyzeCode } = require('../llm/llmservice');
const fs = require('fs').promises;

const getLanguageFromFile = (filename) => {
  const ext = filename.split('.').pop().toLowerCase();
  const languageMap = {
    js: 'javascript',
    jsx: 'javascript',
    ts: 'typescript',
    tsx: 'typescript',
    py: 'python',
    java: 'java',
    cpp: 'c++',
    c: 'c',
    go: 'go',
    rs: 'rust',
  };
  return languageMap[ext] || 'unknown';
};

const uploadCode = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { originalname, path, size } = req.file;
    const userId = req.userId;
    const language = getLanguageFromFile(originalname);

    const code = await fs.readFile(path, 'utf8');

    await fs.unlink(path);

    let analysisResult;
    try {
      analysisResult = await analyzeCode(code, originalname, language);
    } catch (error) {
      console.error('Analysis error:', error);
      return res.status(500).json({ error: 'Code analysis failed' });
    }

    const result = await pool.query(
      `INSERT INTO reviews 
       (user_id, filename, language, code_content, overall_score, readability_score, modularity_score, bugs_count, analysis_result) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
       RETURNING *`,
      [
        userId,
        originalname,
        language,
        code,
        analysisResult.overallScore || 0,
        analysisResult.readability?.score || 0,
        analysisResult.modularity?.score || 0,
        analysisResult.potentialBugs?.length || 0,
        JSON.stringify(analysisResult),
      ]
    );

    res.status(201).json({
      message: 'Code analyzed successfully',
      review: result.rows[0],
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to process code upload' });
  }
};

const getReviewHistory = async (req, res) => {
  try {
    const userId = req.userId;

    const result = await pool.query(
      `SELECT id, filename, language, overall_score, readability_score, modularity_score, bugs_count, created_at 
       FROM reviews 
       WHERE user_id = $1 
       ORDER BY created_at DESC`,
      [userId]
    );

    res.json({
      reviews: result.rows,
    });
  } catch (error) {
    console.error('History error:', error);
    res.status(500).json({ error: 'Failed to fetch review history' });
  }
};

const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const result = await pool.query(
      'SELECT * FROM reviews WHERE id = $1 AND user_id = $2',
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.json({
      review: result.rows[0],
    });
  } catch (error) {
    console.error('Get review error:', error);
    res.status(500).json({ error: 'Failed to fetch review' });
  }
};

module.exports = {
  uploadCode,
  getReviewHistory,
  getReviewById,
};
