const fetch = global.fetch || ((...args) => import('node-fetch').then(({default: f}) => f(...args)));
const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = process.env.GEMINI_MODEL || 'gemini-pro';

if (!API_KEY) {
  console.warn('Warning: GEMINI_API_KEY is not set. AI editing will fail.');
}

const SYSTEM_PROMPT = `You are a JSON editing assistant. Only output strict JSON with no explanations. Keep the existing keys unless the user's instruction requires changes.`;

function extractJson(text) {
  const match = text.match(/\{[\s\S]*\}/);
  return match ? match[0] : text;
}

async function callGemini(promptBody) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(promptBody)
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API error ${res.status}: ${errText}`);
  }
  return res.json();
}

async function getAiModifiedJson(currentJson, userPrompt, retries = 2) {
  const promptBody = {
    contents: [
      { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
      { role: 'user', parts: [{ text: `Current JSON:\n${JSON.stringify(currentJson, null, 2)}` }] },
      { role: 'user', parts: [{ text: `Edit command:\n${userPrompt}` }] }
    ]
  };

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const data = await callGemini(promptBody);
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!aiText) {
        throw new Error('No content from AI');
      }
      const json = JSON.parse(extractJson(aiText));
      return json;
    } catch (err) {
      if (attempt === retries) {
        throw err;
      }
    }
  }
}

module.exports = { getAiModifiedJson };
