# Rehab Panel

Simple full-stack application created as a recruitment task.

The project consists of a **React frontend** and a **Node.js backend** communicating via **REST API and WebSockets**.

## Features

**Authentication**

* User login and registration
* Token-based authentication
* Protected routes
* Logout

**User Profile | Dashboard | Exercise**

* View personal information
* Update first name and last name
* Change password
* Data is always fetched from the backend (not stored on the frontend)
  
- After login user can see:

* Today's rehabilitation exercises
* Exercise progress
* Weekly progress summary
* Daily rehabilitation goal
* Tip of the day
  
- Each exercise contains:

* Device name (e.g. Upper limb rotor)
* Exercise parameters (e.g. Time: 15s, Resistance: medium)
* Status:
  To do
  In progress
  Done
* Start and finish timestamps for completed exercises
  
**Exercise Simulation**

- When starting an exercise:
  The frontend calls the API to mark the exercise as started
  A 15-second simulation begins
  Progress is visualized with a progress bar
  Real-time metrics (force, range, progress) are streamed via WebSocket
- After completion:
  the frontend calls the API to finish the session
  backend simulates device processing with a short delay
  exercise status becomes Done
If the user leaves the exercise screen early, the exercise remains In progress.

## Tech Stack

**Frontend**

* React
* TypeScript
* Vite
* Redux Toolkit
* React Router
* Chakra UI
* Formik + Yup

**Backend**

* Node.js
* Express
* TypeScript
* WebSocket

## Project Structure

```
frontend
 ├─ components
 ├─ pages
 ├─ routes
 ├─ hooks
 ├─ store
 ├─ api
 ├─ types
 └─ utils

backend
 ├─ auth
 ├─ me
 ├─ plan
 ├─ session
 ├─ data.ts
 ├─ models.ts
 └─ server.ts
```

## Installation

Clone the repository and install dependencies for both applications.

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd ../frontend
npm install
```

## Running the Project

Run backend and frontend in two separate terminals.

### Start backend

```bash
cd backend
npm run dev
```

Backend runs on:

```
http://localhost:8080
```

### Start frontend

```bash
cd frontend
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

### Test Users

You can use the following accounts to log into the system
For simplicity, all accounts use the same password

```
| Email | Password |
|------|------|
| jan@test.com | Test1234! |
| anna@test.com | Test1234! |
| piotr@test.com | Test1234! |
```

## Notes

* Backend data is stored in memory (mock database)
* Exercise sessions are simulated using WebSocket streaming

---

Project created as part of a recruitment task.
