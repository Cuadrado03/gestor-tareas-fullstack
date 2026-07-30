const express = require('express');
const cors = require('cors');

function createApp() {
  const app = express();

  app.use(cors());         
  app.use(express.json()); 

  app.get('/api/health', (req, res) => {
    res.status(200).json({ success: true, message: 'API funcionando' });
  });

  return app;
}

module.exports = createApp;