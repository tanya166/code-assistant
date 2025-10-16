const axios = require('axios');

const analyzeCode = async (code, filename, language) => {
    const prompt = `You are a code review assistant. Analyze the following ${language} code and provide a detailed review.

Filename: ${filename}

Code:
\`\`\`${language}
${code}
\`\`\`

Return ONLY a valid JSON object (no markdown, no explanations) with this exact structure:
{
  "overallScore": <number 1-10>,
  "readability": {
    "score": <number 1-10>,
    "issues": ["issue1", "issue2"],
    "suggestions": ["suggestion1", "suggestion2"]
  },
  "modularity": {
    "score": <number 1-10>,
    "issues": ["issue1", "issue2"],
    "suggestions": ["suggestion1", "suggestion2"]
  },
  "potentialBugs": [
    {
      "line": <number>,
      "severity": "high|medium|low",
      "description": "description",
      "suggestion": "how to fix"
    }
  ],
  "bestPractices": ["practice1", "practice2"],
  "summary": "overall summary of the code quality"
}`;

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 8192,
                    responseMimeType: "application/json"
                }
            }
        );
        
        if (!response.data.candidates || !response.data.candidates[0]) {
            throw new Error('No response from API');
        }
        
        const text = response.data.candidates[0].content.parts[0].text;
        console.log('Full API Response:', text);
        
        try {
            return JSON.parse(text);
        } catch (e) {
            const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/```\s*([\s\S]*?)\s*```/) || text.match(/\{[\s\S]*\}/);
            
            if (jsonMatch) {
                const jsonStr = jsonMatch[1] || jsonMatch[0];
                return JSON.parse(jsonStr);
            } else {
                console.error('No JSON found in response:', text);
                throw new Error('Failed to parse response');
            }
        }
    } catch (error) {
        console.error('LLM Error:', error.response?.data || error.message);
        
        return {
            overallScore: 5,
            readability: {
                score: 5,
                issues: ['Unable to analyze code at this time'],
                suggestions: ['Please try again later']
            },
            modularity: {
                score: 5,
                issues: ['Unable to analyze code at this time'],
                suggestions: ['Please try again later']
            },
            potentialBugs: [],
            bestPractices: ['Analysis temporarily unavailable'],
            summary: 'Code analysis failed. Please check your API key and try again.'
        };
    }
};

module.exports = { analyzeCode };
