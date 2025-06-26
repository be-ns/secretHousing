const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { getAiModifiedJson } = require('./aiEditorService');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/api/content/:pageName', async (req, res) => {
  const pageName = req.params.pageName;
  const filePath = path.join(__dirname, 'content', `${pageName}.json`);

  try {
    const data = await fs.readFile(filePath, 'utf8');
    res.type('application/json').status(200).send(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      res.status(404).json({ error: 'Content not found' });
    } else {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

app.post('/api/edit/:pageName', async (req, res) => {
  const pageName = req.params.pageName;
  const prompt = req.body && req.body.prompt;
  if (typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is required' });
  }
  const filePath = path.join(__dirname, 'content', `${pageName}.json`);

  try {
    const data = await fs.readFile(filePath, 'utf8');
    const currentJson = JSON.parse(data);

    let updatedJson;
    try {
      updatedJson = await getAiModifiedJson(currentJson, prompt);
    } catch (err) {
      console.error('AI service error:', err);
      return res.status(502).json({ error: 'AI service error' });
    }

    await fs.writeFile(filePath, JSON.stringify(updatedJson, null, 2));
    res.status(200).json(updatedJson);
  } catch (err) {
    if (err.code === 'ENOENT') {
      res.status(404).json({ error: 'Content not found' });
    } else {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
