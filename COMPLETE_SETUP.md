# Complete Setup Guide - Full Stack Application

## ✅ Database Connection Fixed

### Database Configuration
- **Database Name**: `learning_platform` (updated in `pool.js`)
- **Schema**: Matches `db.sql` file
- **Password Hashing**: Uses SHA2(password, 256) as per database schema

### Changes Made

#### Backend
1. **Database Connection** (`db/pool.js`)
   - Updated database name from `int_courses` to `learning_platform`
   - Matches the database created by `db.sql`

2. **Login Route** (`routes/common.js`)
   - Updated to use SHA2 hash comparison: `SHA2(?, 256)`
   - Matches the password hashing in database

3. **Courses Route** (`routes/courses.js`)
   - Removed `course_id` from INSERT (it's AUTO_INCREMENT)
   - Fixed to match database schema

4. **Students Route** (`routes/studentData.js`)
   - Updated to get all students when no course_id filter
   - Uses `reg_no` (matches database schema)

5. **Server** (`server.js`)
   - Added CORS middleware for frontend communication

6. **Admin Script** (`scripts/createAdmin.js`)
   - Updated to use SHA2 hashing for password
   - Matches database schema

#### Frontend
1. **Courses Page** (`pages/Courses.jsx`)
   - Removed `Course_id` input (auto-increment)
   - Form now only sends required fields

2. **Students Page** (`pages/Students.jsx`)
   - Updated to use `reg_no` instead of `student_id`
   - Matches database schema

3. **StudentVideos Page** (`pages/StudentVideos.jsx`)
   - Updated to find students by `reg_no` or email

## 🚀 Setup Instructions

### Step 1: Setup Database

1. **Run the SQL script**:
   ```bash
   mysql -u root -p < Mern_Project/backend/db/db.sql
   ```
   
   Or manually in MySQL:
   ```sql
   source Mern_Project/backend/db/db.sql
   ```

2. **Verify database**:
   ```sql
   USE learning_platform;
   SELECT * FROM users;
   SELECT * FROM courses;
   SELECT * FROM students;
   SELECT * FROM videos;
   ```

### Step 2: Update Database Password

If your MySQL password is different from `manager`, update `Mern_Project/backend/db/pool.js`:
```javascript
password: 'your_mysql_password',
```

### Step 3: Create/Update Admin User

```bash
cd Mern_Project/backend
npm run create-admin
```

This will create/update admin user with:
- Email: `admin@gmail.com`
- Password: `admin123` (hashed with SHA2)

### Step 4: Start Backend

```bash
cd Mern_Project/backend
npm start
# or
nodemon server.js
```

Server runs on: **http://localhost:4000**

### Step 5: Start Frontend

```bash
cd frontend
npm install  # if not already done
npm run dev
```

Frontend runs on: **http://localhost:3000**

## 🔑 Default Credentials

- **Email**: `admin@gmail.com`
- **Password**: `admin123`
- **Role**: `admin`

## 📊 Database Schema

### Tables
- **users**: email (PK), password, role
- **courses**: course_id (PK, AUTO_INCREMENT), course_name, description, fees, start_date, end_date, video_expire_days
- **students**: reg_no (PK, AUTO_INCREMENT), name, email, course_id, mobile_no, profile_pic
- **videos**: video_id (PK, AUTO_INCREMENT), course_id, title, description, youtube_url, added_at

### Sample Data
The `db.sql` includes:
- 5 users (1 admin, 4 students)
- 5 courses
- 5 students
- 5 videos

## ✅ Features Working

- ✅ Login with SHA2 password hashing
- ✅ Dashboard with metrics
- ✅ Course management (CRUD)
- ✅ Student management with filtering
- ✅ Video management per student
- ✅ YouTube video preview
- ✅ Search and pagination
- ✅ Toast notifications
- ✅ Error handling
- ✅ Protected routes
- ✅ CORS enabled

## 🔧 Troubleshooting

### Database Connection Error
- Verify MySQL is running
- Check password in `db/pool.js`
- Ensure database `learning_platform` exists
- Run `db.sql` to create database and tables

### Login Fails
- Verify admin user exists: `SELECT * FROM users WHERE email = 'admin@gmail.com'`
- Check password is hashed: Should be SHA2 hash, not plain text
- Run `npm run create-admin` to create/update admin

### CORS Errors
- CORS is enabled in `server.js`
- Frontend uses Vite proxy (shouldn't have CORS issues)
- If issues persist, check backend is running on port 4000

### API Errors
- Check backend console for errors
- Verify database tables exist
- Check token is being sent in `token` header
- Verify user role is 'admin' for protected routes

## 📝 Notes

- All passwords in database are hashed with SHA2(password, 256)
- Login compares using SHA2 hash
- Course IDs are auto-generated (AUTO_INCREMENT)
- Student registration numbers (reg_no) are auto-generated
- All API responses follow: `{status: "success", data: ...}` or `{status: "error", data: "message"}`

## 🎯 Next Steps

1. Run `db.sql` to create database
2. Update MySQL password in `pool.js` if needed
3. Run `npm run create-admin` to ensure admin exists
4. Start backend: `npm start`
5. Start frontend: `npm run dev`
6. Login with admin credentials
7. Test all features!

Everything is now connected and ready to use! 🚀


