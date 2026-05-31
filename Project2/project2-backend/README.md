# Backend API Development

A simple, production-minded Node.js + Express REST API for managing tasks. This project uses an in-memory data store (no database) and is part of the Decode Labs internship.

## Features

- REST endpoints for creating, reading, updating, and deleting tasks
- Input validation for `title` and `priority` (required)
- JSON responses and proper HTTP status codes
- CORS enabled for cross-origin requests
- In-memory storage — data resets on server restart

## Tech Stack

- Node.js
- Express
- CORS

## Getting Started

1. Install dependencies

```bash
npm install
```

2. Start the server

```bash
npm start
```

The server runs on port 3000 by default. You can change the `PORT` environment variable to override it.

## API Endpoints

Base URL: `http://localhost:3000`

All requests and responses use JSON.

### GET /api/tasks

Returns all tasks.

Response

- `200 OK` — array of task objects

Example response

```json
[
  {
    "id": 1,
    "title": "Buy groceries",
    "priority": "medium",
    "done": false,
    "createdAt": "2026-05-31T12:00:00.000Z"
  }
]
```

### POST /api/tasks

Create a new task.

Request body

```json
{
  "title": "Write unit tests",
  "priority": "high"
}
```

Valid priorities: `low`, `medium`, `high` (case-insensitive)

Responses

- `201 Created` — returns the created task object
- `400 Bad Request` — when `title` is empty or `priority` is invalid

Example success response

```json
{
  "id": 2,
  "title": "Write unit tests",
  "priority": "high",
  "done": false,
  "createdAt": "2026-05-31T12:10:00.000Z"
}
```

Example curl

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Write unit tests","priority":"high"}'
```

### PUT /api/tasks/:id

Update a task. You may update the `title` and/or the `done` status.

Request body examples

```json
{ "title": "Finish project" }
```
or
```json
{ "done": true }
```

Responses

- `200 OK` — returns updated task
- `400 Bad Request` — invalid `title` or `done` type
- `404 Not Found` — task does not exist

Example curl

```bash
curl -X PUT http://localhost:3000/api/tasks/2 \
  -H "Content-Type: application/json" \
  -d '{"done":true}'
```

### DELETE /api/tasks/:id

Delete a task by ID.

Responses

- `200 OK` — returns deleted task object
- `404 Not Found` — task does not exist

Example curl

```bash
curl -X DELETE http://localhost:3000/api/tasks/2
```

## Input Validation

- `title`: required, non-empty string
- `priority`: required on creation; must be one of `low`, `medium`, or `high` (case-insensitive)

Validation failures return `400 Bad Request` with a JSON error message, for example:

```json
{ "error": "Title is required and cannot be empty." }
```

## Notes

- This service uses an in-memory array to store tasks; all data is lost when the server restarts.
- CORS is enabled to allow browser clients to call the API from different origins.
- This project is part of the Decode Labs internship.

## License

MIT

