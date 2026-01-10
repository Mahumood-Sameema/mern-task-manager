
# Smart Task Planner (MERN Stack)

A high-end task management application built using the MERN stack that supports both manual task planning and automatic logical planning.
The application focuses on daily productivity while maintaining long-term planning through deadlines and scheduled dates.

---

## Overview

Smart Task Planner is designed to go beyond basic to-do lists.
It clearly separates **human decision-making** and **system-driven planning logic**, ensuring flexibility, clarity, and scalability.

Every task in the system always has a scheduled date, whether it is manually chosen by the user or automatically assigned by the planner logic.

---

## Features

### Task Management

* Create, update, delete tasks
* Mark tasks as completed or incomplete
* Assign priority levels (Low, Medium, High)
* Set estimated time and deadlines

### Manual Tasks

* Scheduled date is chosen by the user
* Full human control over planning
* Suitable for fixed commitments

### Planner Tasks

* User provides deadline and estimated time
* Backend logic automatically assigns a scheduled date
* Designed to prevent overloading a single day
* Architecture ready for AI-based planning

### Today View

* Displays all tasks scheduled for the current day
* Includes both manual and planner tasks
* Minimal task cards with expandable details
* Supports update, delete, and completion toggle

### Calendar-Ready Design

* Every task always contains a scheduledDate
* Supports future calendar, weekly, and monthly views
* Clean separation between task data and UI views

### Authentication

* JWT-based authentication
* Tasks are scoped per user using userId

---

## Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios
* React Router
* React Toastify

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

### Deployment

* Frontend: Netlify
* Backend: Render
* Database: MongoDB Atlas

---

## Project Structure

```
root
├── client
│   ├── components
│   ├── pages
│   ├── api
│   └── App.jsx
│
├── server
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── utils
│   └── middleware
```

---

## Task Planning Logic

### Manual Task Flow

User selects scheduledDate
Task is saved directly with that date

### Planner Task Flow

User provides deadline and estimated time
Backend logic assigns scheduledDate automatically

### Today Page Logic

Fetch tasks where scheduledDate is within today (00:00 to 23:59)

---

## API Endpoints

Create manual task
POST /tasks

Create planner task
POST /tasks/plan

Get tasks for a specific date
GET /tasks/by-date?date=YYYY-MM-DD

Toggle task completion
PATCH /tasks/:id/toggle

Update task
PUT /tasks/:id

Delete task
DELETE /tasks/:id

---

## Environment Variables

### Frontend (.env)

```
VITE_API_URL=https://your-backend-url
```

### Backend (.env)

```
MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your_jwt_secret
NODE_ENV=production
```

---

## Local Development Setup

Clone the repository

```
git clone https://github.com/your-username/smart-task-planner.git
```

Backend setup

```
cd server
npm install
npm run dev
```

Frontend setup

```
cd client
npm install
npm run dev
```

---

## Design Philosophy

* Not a beginner CRUD application
* Clear separation between manual and automated planning
* Backend-driven logic for scalability
* UI focused on daily clarity and productivity
* Ready for advanced AI planning features

---

## Future Enhancements

* Full calendar view
* Weekly and monthly planning
* AI-based scheduling
* Productivity analytics
* Notifications and reminders

---

## Author

Developed by Sameema
Focused on clean architecture, real-world usability, and scalable planning systems

---
