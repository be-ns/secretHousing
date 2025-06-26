const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
