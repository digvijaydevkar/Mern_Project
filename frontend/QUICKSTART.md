# Quick Start Guide

## Setup Commands

Run these commands in order to get the project up and running:

```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

## Backend Requirements

Make sure your Express backend is running on `http://localhost:4000` before using the frontend.

## Default Login

Use your admin credentials configured in the backend to log in.

## Project Structure Summary

- **Pages**: Login, Dashboard, Courses, Students, StudentVideos
- **Components**: Table, Modal, ConfirmDialog, Toast, Loader, Layout, ProtectedRoute
- **API**: Axios instance with interceptors, service functions for all endpoints
- **Auth**: JWT-based authentication with protected routes
- **Styling**: Tailwind CSS (via CDN)

## Environment Variables

Create a `.env` file in the `frontend` directory (optional):

```env
VITE_API_BASE_URL=/api
```

The default proxy configuration in `vite.config.js` handles API routing automatically.

