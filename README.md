# Decode Labs Internship — Full Stack Task Manager

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat&logo=sqlite&logoColor=white)

A full stack task manager built across 4 projects as part of the **Decode Labs internship**. Each project builds on the previous one, going from a static responsive frontend to a fully integrated full stack application.

---

## Table of Contents

- [Projects Overview](#projects-overview)
- [Project 1 — Responsive Frontend](#project-1--responsive-frontend-interface)
- [Project 2 — Backend API](#project-2--backend-api-development)
- [Project 3 — Database Integration](#project-3--database-integration)
- [Project 4 — Full Stack Integration](#project-4--frontend--backend-integration)
- [Repo Structure](#repo-structure)
- [Tech Stack](#tech-stack)

---

## Projects Overview

| # | Project | Description | Tech | How to Run |
|---|---------|-------------|------|------------|
| 1 | Responsive Frontend | Task manager UI with dark theme, priority tags, and localStorage | HTML, CSS, JS | Open `index.html` in browser |
| 2 | Backend API | REST API with full CRUD and input validation | Node.js, Express | `npm install` then `npm start` |
| 3 | Database Integration | Persistent API with SQLite database | Node.js, Express, SQLite | `npm install` then `npm start` |
| 4 | Full Stack Integration | Frontend connected to the backend API via fetch() | HTML, CSS, JS | Start Project 3 first, then open `index.html` |

---

## Project 1 — Responsive Frontend Interface

A clean, mobile-first task manager UI built with pure HTML, CSS, and vanilla JavaScript.

**Features**
- Add, complete, and delete tasks
- Priority tags: High / Medium / Low
- Stats bar: total, completed, pending, progress %
- localStorage persistence across page reloads
- Dark theme, sticky navbar, hamburger menu for mobile

**How to run**

Open `project1-frontend/index.html` in any modern browser. No server needed.

---

## Project 2 — Backend API Development

A REST API built with Node.js and Express using an in-memory data store.

**Endpoints**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get all tasks |
| POST | /api/tasks | Create a task |
| PUT | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |

**How to run**
```bash
cd project2-backend
npm install
npm start
# Server runs at http://localhost:3000
```

---

## Project 3 — Database Integration

Extends Project 2 with a real SQLite database using `better-sqlite3`. The database file `tasks.db` is auto-created on startup.

**Database Schema**

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Auto increment primary key |
| title | TEXT | Task title (required) |
| priority | TEXT | High / Medium / Low (required) |
| done | INTEGER | 0 or 1 (boolean) |
| created_at | TEXT | Auto timestamp |

**Endpoints**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get all tasks |
| GET | /api/tasks/stats | Get task counts |
| GET | /api/tasks/:id | Get single task |
| POST | /api/tasks | Create a task |
| PUT | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |

**How to run**
```bash
cd project3-database
npm install
npm start
# Server runs at http://localhost:3000
```

---

## Project 4 — Frontend & Backend Integration

A vanilla JS frontend that connects to the Project 3 API using the browser `fetch()` API.

**Features**
- Loads all tasks from the API on page load
- Add tasks with title and priority dropdown
- Toggle tasks between done and pending
- Delete tasks
- Live stats bar
- Loading spinner and error handling

**How to run**

1. Start the Project 3 backend first:
```bash
cd project3-database
npm start
```
2. Open `project4-integration/index.html` in your browser

---

## Repo Structure

```
decodelabs_tasks/
├── project1-frontend/
│   ├── index.html
│   └── README.md
├── project2-backend/
│   ├── index.js
│   ├── package.json
│   └── README.md
├── project3-database/
│   ├── index.js
│   ├── db.js
│   ├── routes/
│   │   └── tasks.js
│   ├── package.json
│   └── README.md
├── project4-integration/
│   ├── index.html
│   └── README.md
└── README.md
```

---

## Tech Stack

- **Frontend** — HTML5, CSS3, Vanilla JavaScript
- **Backend** — Node.js, Express
- **Database** — SQLite via better-sqlite3
- **Tools** — Git, GitHub, VS Code, npm

---

> Built as part of the **Decode Labs Internship** — demonstrating full stack development from responsive UI to database-backed REST API.
```
