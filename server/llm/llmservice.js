const axios = require('axios');

const analyzeCode = async (code, filename, language) => {
    const prompt = `Review this ${language} code for readability, modularity, and potential bugs, then provide improvement suggestions.

Filename: ${filename}

Code:
${code}

Provide a detailed review in the following JSON format:
{
  "overallScore": <number 1-10>,
  "readability": {
    "score": <number 1-10>,
    "issues": [<array of issues>],
    "suggestions": [<array of suggestions>]
  },
  "modularity": {
    "score": <number 1-10>,
    "issues": [<array of issues>],
    "suggestions": [<array of suggestions>]
  },
  "potentialBugs": [
    {
      "line": <line number>,
      "severity": "high|medium|low",
      "description": "<description>",
      "suggestion": "<how to fix>"
    }
  ],
  "bestPractices": [<array of best practice violations>],
  "summary": "<overall summary>"
}`;

    try {
        // Using Google Gemini (Free)
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [{ parts: [{ text: prompt }] }]
            }
        );
        
        const text = response.data.candidates[0].content.parts[0].text;
        // Extract JSON from response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        return jsonMatch ? JSON.parse(jsonMatch[0]) : { error: 'Failed to parse response' };
    } catch (error) {
        console.error('LLM Error:', error);
        throw new Error('Code analysis failed');
    }
};

module.exports = { analyzeCode };