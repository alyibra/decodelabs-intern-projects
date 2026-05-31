# Database Integration

A small, production-ready Task API built for the Decode Labs internship.

- Built with Node.js, Express, and better-sqlite3 (SQLite)
- SQLite database file: `tasks.db` (auto-created on startup)
- Full CRUD for tasks with simple input validation

## Project Summary

This project provides a lightweight REST API to manage tasks. It stores tasks in a local SQLite database using `better-sqlite3`. The API implements create, read, update, and delete operations and exposes a small stats endpoint.

## Database Schema

Table: `tasks`

- `id` (INTEGER PRIMARY KEY AUTOINCREMENT)
- `title` (TEXT NOT NULL)
- `priority` (TEXT NOT NULL)
- `done` (INTEGER NOT NULL DEFAULT 0) — stored as 0/1, returned as boolean
- `created_at` (TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)

The database file `tasks.db` is created automatically in the project root when the server starts.

## API Endpoints

Base path: `/api/tasks`

1. GET /api/tasks
- Description: Retrieve all tasks
- Response (200):

```json
[
  {
    "id": 1,
    "title": "Buy groceries",
    "priority": "high",
    "done": false,
    "created_at": "2026-05-31T12:00:00.000Z"
  }
]
```

2. GET /api/tasks/stats
- Description: Return counts for tasks
- Response (200):

```json
{
  "total": 10,
  "done": 4,
  "notDone": 6
}
```

3. GET /api/tasks/:id
- Description: Retrieve a single task by id
- Response (200):

```json
{
  "id": 1,
  "title": "Buy groceries",
  "priority": "high",
  "done": false,
  "created_at": "2026-05-31T12:00:00.000Z"
}
```
- Response (404):

```json
{ "error": "Task not found" }
```

4. POST /api/tasks
- Description: Create a new task
- Request body (application/json):

```json
{
  "title": "Buy groceries",
  "priority": "high",
  "done": false
}
```
- Response (201): returns the created task object

5. PUT /api/tasks/:id
- Description: Update an existing task (partial updates allowed for fields)
- Request body (application/json):

```json
{
  "title": "Buy groceries and snacks",
  "priority": "medium",
  "done": true
}
```
- Response (200): returns the updated task object
- Response (404): `{ "error": "Task not found" }`

6. DELETE /api/tasks/:id
- Description: Delete a task by id
- Response (204): no content on success
- Response (404): `{ "error": "Task not found" }`


## Input Validation

- `title` and `priority` are required for `POST` and `PUT` operations. The server responds with `400 Bad Request` and a JSON error message when these are missing or empty.

## Root Route

- GET `/` — returns `{ "status": "ok", "message": "Task API running" }`

## Tech Stack

- Node.js (v26 tested)
- Express
- better-sqlite3 (SQLite)

## Folder Structure

```
project3-database/
├── index.js           # App setup, middleware, route registration, graceful shutdown
├── db.js              # Database connection, prepared statements and helpers
├── routes/
│   └── tasks.js       # Route handlers and input validation
├── package.json
├── .gitignore
└── tasks.db           # SQLite file (auto-created)
```

## How to run

Install dependencies and start the server (defaults to port 3000):

```bash
npm install
npm start
```

Example: run locally and test the health endpoint

```bash
curl http://localhost:3000/
# { "status": "ok", "message": "Task API running" }
```

## Notes

- The code is structured for clarity and small-scale production use: database interactions are centralized in `db.js`, routes live in `routes/tasks.js`, and `index.js` handles app setup and graceful shutdown.
- This project is part of the Decode Labs internship.

If you want, I can also add a small Postman collection, example seed script, or Dockerfile for easier evaluation.
