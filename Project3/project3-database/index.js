const express = require('express');
const tasksRouter = require('./routes/tasks');
const { close } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Task API running' });
});

app.use('/api/tasks', tasksRouter);

app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  });
});

const server = app.listen(PORT, () => {
  console.log(`Task API listening on port ${PORT}`);
});

const shutdown = (signal) => {
  console.log(`Received ${signal}. Shutting down gracefully...`);
  server.close(() => {
    close();
    console.log('Database connection closed. Exiting process.');
    process.exit(0);
  });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
