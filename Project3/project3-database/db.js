const path = require('path');
const Database = require('better-sqlite3');

const dbFile = path.join(__dirname, 'tasks.db');
const db = new Database(dbFile);

const createTable = `
CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  priority TEXT NOT NULL,
  done INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);`;
db.exec(createTable);

const statements = {
  allTasks: db.prepare('SELECT * FROM tasks ORDER BY id'),
  taskById: db.prepare('SELECT * FROM tasks WHERE id = ?'),
  insertTask: db.prepare('INSERT INTO tasks (title, priority, done) VALUES (?, ?, ?)'),
  updateTask: db.prepare('UPDATE tasks SET title = ?, priority = ?, done = ? WHERE id = ?'),
  deleteTask: db.prepare('DELETE FROM tasks WHERE id = ?'),
  countAll: db.prepare('SELECT COUNT(*) as count FROM tasks'),
  countDone: db.prepare('SELECT COUNT(*) as count FROM tasks WHERE done = 1'),
  countNotDone: db.prepare('SELECT COUNT(*) as count FROM tasks WHERE done = 0')
};

const toTask = (row) => ({
  id: row.id,
  title: row.title,
  priority: row.priority,
  done: Boolean(row.done),
  created_at: row.created_at
});

const getAllTasks = () => statements.allTasks.all().map(toTask);

const getTaskById = (id) => {
  const row = statements.taskById.get(id);
  return row ? toTask(row) : null;
};

const createTask = ({ title, priority, done }) => {
  const result = statements.insertTask.run(title, priority, done ? 1 : 0);
  return getTaskById(result.lastInsertRowid);
};

const updateTask = ({ id, title, priority, done }) => {
  statements.updateTask.run(title, priority, done ? 1 : 0, id);
  return getTaskById(id);
};

const deleteTask = (id) => {
  const result = statements.deleteTask.run(id);
  return result.changes > 0;
};

const getStats = () => ({
  total: statements.countAll.get().count,
  done: statements.countDone.get().count,
  notDone: statements.countNotDone.get().count
});

const close = () => {
  if (db.open) {
    db.close();
  }
};

module.exports = {
  db,
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getStats,
  close
};
