# 📋 Task Management System (Frontend)

> A simple and scalable task management application built with **React + Vite**  
> Designed to practice **project structure, teamwork workflow, and real-world UI logic**

---

## 📌 Overview

**Task Management System** is a frontend application that helps users manage projects and tasks within a team.  
The application focuses on clarity, responsibility, and progress tracking.

This project is mainly built for:
- Practicing professional frontend project structure
- Applying Git branching strategies (`dev`, `uat`, `main`)
- Preparing a solid foundation for a fullstack application

---

## 🎯 Project Goals

- Build a clean and maintainable React project
- Separate pages, components, services, and utilities clearly
- Follow a real-world development workflow
- Make the project easy to extend and integrate with backend APIs

---

## 👥 Target Users

- Students working on group projects
- Small working teams
- Individuals managing personal tasks by project

---

## ✨ Key Features

### 🔐 Authentication
- Login screen
- Store authentication state
- Protect private routes

### 📁 Project Management
- View list of projects
- Access project details
- Navigate to tasks inside a project

### ✅ Task Management
- View tasks by project
- Task status:
  - Todo
  - In Progress
  - Done
  - Overdue
- Update task status
- View task details

### 📊 Dashboard
- Overview of total tasks
- Task statistics by status
- Highlight overdue or upcoming tasks

---

## 🧱 Tech Stack

- **React**
- **Vite**
- **JavaScript (ES6+)**
- **TypeScript**

---

## 📂 Project Structure

```text
├── .husky/                     # Git hooks (commitlint, pre-commit)
├── .vscode/                    # VSCode workspace settings
├── node_modules/
├── public/                     # Static public assets
│
├── src/
│   │
│   ├── assets/                 # Static assets
│   │   ├── images/             # Image files
│   │   └── index.ts            # Export assets
│   │
│   ├── core/                   # Core application logic
│   │   ├── components/         # Reusable UI components
│   │   ├── config/             # App & environment configs
│   │   ├── hooks/              # Custom React hooks
│   │   ├── layouts/            # Layout components (Header, Sidebar)
│   │   ├── libs/               # Shared libraries / helpers
│   │   ├── routes/             # Route definitions
│   │   ├── services/           # API service layers
│   │   └── types/              # Global TypeScript types
│   │
│   ├── pages/                  # Application pages (screens)
│   │   ├── Authenticate/       # Login / Register pages
│   │   ├── Dashboard/          # Dashboard page
│   │   ├── Exception/          # 404 / Error pages
│   │   ├── Home/               # Home page
│   │   ├── Post/               # Post-related pages
│   │   ├── UserProfile/        # User profile page
│   │   └── index.ts            # Export pages
│   │
│   ├── index.css               # Global styles
│   ├── main.tsx                # React DOM entry point
│   └── router.tsx              # App router configuration
│
├── .env                         # Environment variables
├── .gitignore
├── .prettierignore
├── .prettierrc
├── commitlint.config.cjs       # Commit message rules
├── eslint.config.js             # ESLint configuration
├── index.html                   # HTML entry
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
