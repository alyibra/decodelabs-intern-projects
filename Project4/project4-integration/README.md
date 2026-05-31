**Frontend & Backend Integration**

Description
- **Project title:** Frontend & Backend Integration
- A simple task manager frontend built with pure HTML, CSS, and vanilla JavaScript that integrates with an Express + SQLite API (Project 3) running at `http://localhost:3000`.
- Part of the Decode Labs internship.

**Features**
- Fetches all tasks on load using `fetch()`
- Add a task with `title` and a `priority` dropdown (High, Medium, Low)
- Toggle task state (done / pending)
- Delete tasks
- Live stats (total, completed, pending)
- Loading spinner and accessible error handling

**Tech stack**
- HTML, CSS, vanilla JavaScript (no frameworks)
- Uses the browser `fetch()` API for all HTTP requests
- Integrates with an Express + SQLite backend (Project 3)

**How to run**

- Backend (Project 3):

  1. Open the Project 3 backend folder.
  2. Install dependencies (if not already):

     ```bash
     npm install
     ```

  3. Start the backend server:

     ```bash
     npm start
     ```

  The API should be available at `http://localhost:3000` and the tasks endpoint at `http://localhost:3000/api/tasks`.

- Frontend (this project):

  1. Ensure the backend is running first.
  2. Open `index.html` from the `project4-integration` folder in your browser (double-click or use the browser's Open File).

  No build step is required — the frontend is static and communicates with the backend via `fetch()`.

**Notes**
- The backend expects `title` and `priority` fields when creating tasks. This frontend sends `{ title, priority }` in the POST body.
- This project is part of the Decode Labs internship and demonstrates integration between a vanilla-JS frontend and an Express + SQLite backend.

---

File: `project4-integration/index.html`
