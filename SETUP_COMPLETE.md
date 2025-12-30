# Complete Setup Guide - Admin Dashboard

## ✅ Changes Made

### Frontend Changes

1. **Login Page** (`frontend/src/pages/Login.jsx`)
   - Default email: `admin@gmail.com`
   - Default password: `admin123`

2. **API Client** (`frontend/src/api/axios.js`)
   - Fixed token header to use `token` instead of `Authorization: Bearer` (matches backend)
   - Improved error handling to prevent `[object Object]` errors

3. **Error Handling**
   - Fixed Toast component to handle all error types
   - Fixed useAuth hook to return proper error messages
   - All error messages now display as readable text

### Backend Changes

1. **Authentication Middleware** (`Mern_Project/backend/utils/auth.js`)
   - Now accepts token from both `token` header and `Authorization: Bearer` header
   - Fixed missing return statements
   - Better error handling

2. **Admin User Creation Script** (`Mern_Project/backend/scripts/createAdmin.js`)
   - Creates/updates admin user with email `admin@gmail.com` and password `admin123`
   - Can be run with: `npm run create-admin`

## 🚀 Setup Instructions

### Step 1: Create Admin User in Database

**Option A: Using Node Script (Recommended)**
```bash
cd Mern_Project/backend
npm run create-admin
```

**Option B: Using SQL**
```sql
USE int_courses;
INSERT INTO users (email, password, role)
VALUES ('admin@gmail.com', 'admin123', 'admin')
ON DUPLICATE KEY UPDATE 
    password = 'admin123',
    role = 'admin';
```

### Step 2: Start Backend Server

```bash
cd Mern_Project/backend
npm start
# or
nodemon server.js
```

Server will run on: **http://localhost:4000**

### Step 3: Start Frontend

```bash
cd frontend
npm install  # if not already done
npm run dev
```

Frontend will run on: **http://localhost:3000**

### Step 4: Login

1. Open http://localhost:3000
2. Email field is pre-filled with: `admin@gmail.com`
3. Password field is pre-filled with: `admin123`
4. Click "Login"

## 🔑 Default Credentials

- **Email**: `admin@gmail.com`
- **Password**: `admin123`
- **Role**: `admin`

## 📋 API Endpoints

All endpoints require authentication (except login):

### Authentication
- `POST /auth/login` - Login with email and password

### Courses
- `GET /courses/all-courses` - Get all courses
- `POST /courses/add` - Add new course
- `PUT /courses/:courseId` - Update course
- `DELETE /courses/:courseId` - Delete course

### Videos
- `GET /videos/all-videos` - Get all videos
- `POST /videos/add` - Add new video
- `PUT /videos/:videosId` - Update video
- `DELETE /videos/:videosId` - Delete video

### Students
- `GET /admin/enrolled-students?course_id={optional}` - Get students
- `POST /student/register-to-course` - Register student to course

## 🔧 Troubleshooting

### "Token is missing" Error
- Make sure you're logged in
- Check that token is stored in localStorage
- Verify backend is running

### "Invalid email or password"
- Run the admin creation script: `npm run create-admin`
- Verify admin user exists in database
- Check database connection in `db/pool.js`

### CORS Errors
- Frontend uses Vite proxy, so CORS shouldn't be an issue
- If needed, install cors: `npm install cors` and add to `server.js`:
  ```javascript
  const cors = require('cors');
  app.use(cors());
  ```

### Database Connection Error
- Verify MySQL is running
- Check credentials in `Mern_Project/backend/db/pool.js`
- Ensure database `int_courses` exists

## 📝 Notes

- All API responses follow format: `{status: "success", data: ...}` or `{status: "error", data: "error message"}`
- Token is sent in `token` header (not `Authorization: Bearer`)
- Frontend automatically handles token storage and attachment
- Protected routes redirect to login if token is missing/invalid

## ✨ Features Working

✅ Login with default credentials  
✅ Dashboard with metrics  
✅ Course management (CRUD)  
✅ Student management with filtering  
✅ Video management per student  
✅ YouTube video preview  
✅ Search and pagination  
✅ Toast notifications  
✅ Error handling  
✅ Protected routes  

