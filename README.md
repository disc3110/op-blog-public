# 🌍 OP Blog – Public Frontend

Public-facing React application for reading, commenting, and liking blog posts.

This app connects to the **OP Blog API** and allows users to:

- Browse published posts
- View full post details
- Like / unlike posts
- Register and log in
- Comment on posts
- Like / unlike comments

---

## 🚀 Live Demo

Public App: 
Author Dashboard: https://op-blog-author-production.up.railway.app
Public Dashboard: https://op-blog-public-production.up.railway.app

Backend API: https://github.com/disc3110/op-blog-api


You can log in using the following **mock author account**:

```json
{
  "name": "Author User",
  "email": "author@example.com",
  "password": "author-password"
}
```

This demo account has author permissions and can be used to explore all features of the dashboard.

---

## 🧱 Tech Stack

- **React (Vite)**
- **React Router**
- **TailwindCSS**
- **JWT Authentication**
- **REST API (Express + Prisma + PostgreSQL)**

---

## 🧠 Architecture Overview

This project is part of a 3‑application system:

1. **OP Blog API** – Express backend handling authentication, posts, comments, and likes.
2. **OP Blog Public (this repo)** – Public UI for readers.
3. **OP Blog Author Dashboard** – Admin/author interface for managing posts and comments.

Authentication is handled via JWT. When a user logs in, the token is stored in localStorage and attached to API requests using the `Authorization: Bearer <token>` header.

Public GET routes support optional authentication to allow:

- Displaying `likedByCurrentUser`
- Showing user-specific UI states

---

## 📦 Features

### 📰 Posts
- Paginated list of published posts
- Search support
- Author filtering
- Post detail view
- Like / Unlike functionality

### 💬 Comments
- Paginated comments
- Create comment (authenticated users)
- Like / Unlike comments
- `likedByCurrentUser` state preserved after refresh

### 🔐 Authentication
- Register
- Login
- Persistent session via JWT

---

## 🛠 Installation

```bash
# Clone repository
npm install

# Start development server
npm run dev
```

Make sure the backend API is running and the VITE_API_URL environment variable is configured correctly.

Example `.env`:

```
VITE_API_URL=http://localhost:3000/api
```

---

## 📂 Project Structure

```
src/
 ├── components/
 │     ├── CommentItem.jsx
 │     ├── PostCard.jsx
 │     └── PublicNavbar.jsx
 ├── pages/
 │     ├── HomePage.jsx
 │     └── PostDetailPage.jsx
 ├── services/
 │     ├── apiClient.js
 │     ├── postService.js
 │     └── commentService.js
 ├── hooks/
 │     └── useAuth.js
 └── context/
       └── AuthContext.jsx
```

---

## 🔗 Related Repositories

- Backend API: https://github.com/disc3110/op-blog-api
- Author Dashboard: https://github.com/disc3110/op-blog-author

---

## 🎯 Future Improvements

- Optimistic UI updates for comment likes
- Infinite scroll for comments
- Sorting comments by newest / most liked
- UI animations and micro‑interactions
- Full SSO between public and author apps

---

## 📄 License

Personal portfolio project.

---

Built as a full‑stack learning project to demonstrate production‑style architecture with separated frontends and a centralized API.