# Posta-To (Blog App)

A simple full-stack blog application with a React + Vite frontend and an Express + MongoDB backend.

🔗 **Live Demo:** [https://your-production-url.com](https://postato-blog.vercel.app/)

---

## Features

- User authentication (register + login) using JWT
- Create / edit / delete blog posts (protected routes)
- Public feed of posts
- Post details page
- Owner-only edit/delete actions

## Project Structure

- `frontend/` — React (Vite) application
- `backend/` — Express API + MongoDB (Mongoose)

## Tech Stack

- **Frontend:** React, Vite, React Router, TailwindCSS/DaisyUI
- **Backend:** Express, Mongoose, JWT, bcrypt, CORS

## Setup & Run

### 1) Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Run the server (dev):

```bash
npm run dev
```

Server routes:

- `GET /api/posts` — list posts (public)
- `GET /api/posts/:id` — post details (public)
- `POST /api/posts` — create post (auth)
- `PATCH /api/posts/:id` — update post (auth)
- `DELETE /api/posts/:id` — delete post (auth)

Auth routes:

- `POST /api/auth/register`
- `POST /api/auth/login`

JWT is expected in the frontend as:
`Authorization: Bearer <token>`

### 2) Frontend

```bash
cd frontend
npm install
```

Optional: set backend URL via `VITE_API_URL` in `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000
```

Run the app (dev):

```bash
npm run dev
```

## Usage

1. Register a new account.
2. Log in.
3. Create a post from `/create-post`.
4. View posts on `/`.
5. Open a post details page at `/posts/:id`.
6. If you're the post owner, you can edit or delete it.

## Notes

- Posts store `imageUrl` as a URL string (no file upload in this version).
- The app uses `localStorage` to persist `token` and `user` on the client.
