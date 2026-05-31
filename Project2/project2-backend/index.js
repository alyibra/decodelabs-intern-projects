const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];
let nextId = 1;

const validPriorities = ['low', 'medium', 'high'];

function validateTaskInput(req, res, next) {
  const { title, priority } = req.body;

  if (typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({ error: 'Title is required and cannot be empty.' });
  }

  if (typeof priority !== 'string' || !validPriorities.includes(priority.toLowerCase())) {
    return res.status(400).json({
      error: `Priority must be one of: ${validPriorities.join(', ')}.`
    });
  }

  req.body.title = title.trim();
  req.body.priority = priority.toLowerCase();
  next();
}

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', validateTaskInput, (req, res) => {
  const { title, priority } = req.body;
  const task = {
    id: nextId++,
    title,
    priority,
    done: false,
    createdAt: new Date().toISOString()
  };

  tasks.push(task);
  res.status(201).json(task);
});

app.put('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return res.status(404).json({ error: 'Task not found.' });
  }

  const { title, done } = req.body;

  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim().length === 0) {
      return res.status(400).json({ error: 'Title must be a non-empty string.' });
    }
    task.title = title.trim();
  }

  if (done !== undefined) {
    if (typeof done !== 'boolean') {
      return res.status(400).json({ error: 'Done must be a boolean value.' });
    }
    task.done = done;
  }

  res.json(task);
});

app.delete('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Task not found.' });
  }

  const deleted = tasks.splice(index, 1)[0];
  res.json(deleted);
});

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Task manager API listening on port ${PORT}`);
});
