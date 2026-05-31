const express = require('express');
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getStats
} = require('../db');

const router = express.Router();

const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;

const buildTaskPayload = (body, existing = {}) => {
  const title = isNonEmptyString(body.title) ? body.title.trim() : existing.title;
  const priority = isNonEmptyString(body.priority) ? body.priority.trim() : existing.priority;
  const done = typeof body.done === 'boolean' ? body.done : existing.done;

  return { title, priority, done };
};

const validateTaskPayload = ({ title, priority }) => {
  if (!isNonEmptyString(title)) {
    const err = new Error('Title is required');
    err.status = 400;
    throw err;
  }
  if (!isNonEmptyString(priority)) {
    const err = new Error('Priority is required');
    err.status = 400;
    throw err;
  }
};

router.get('/', (req, res) => {
  res.json(getAllTasks());
});

router.get('/stats', (req, res) => {
  res.json(getStats());
});

router.get('/:id', (req, res, next) => {
  const id = Number(req.params.id);
  const task = getTaskById(id);
  if (!task) {
    const err = new Error('Task not found');
    err.status = 404;
    return next(err);
  }
  res.json(task);
});

router.post('/', (req, res, next) => {
  try {
    const payload = buildTaskPayload(req.body, { title: '', priority: '', done: false });
    validateTaskPayload(payload);
    const task = createTask(payload);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const existing = getTaskById(id);
    if (!existing) {
      const err = new Error('Task not found');
      err.status = 404;
      throw err;
    }

    const payload = buildTaskPayload(req.body, existing);
    validateTaskPayload(payload);
    const task = updateTask({ id, ...payload });
    res.json(task);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', (req, res, next) => {
  const id = Number(req.params.id);
  if (!deleteTask(id)) {
    const err = new Error('Task not found');
    err.status = 404;
    return next(err);
  }
  res.status(204).end();
});

module.exports = router;
