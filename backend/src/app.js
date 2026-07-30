const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/task.routes');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/api/health', (req, res) => {
    res.status(200).json({ success: true, message: 'API funcionando' });
  });

  app.use('/api/tasks', taskRoutes);

  app.use(notFoundHandler);  // 404  rutas no definidas
  app.use(errorHandler);     // manejo  errores 

  return app;
}

module.exports = createApp;