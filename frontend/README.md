# Admin Dashboard - Vite + React

A complete admin dashboard built with Vite, React, and React Router v6 that connects to an Express backend API.

## Features

- 🔐 JWT-based authentication with protected routes
- 📊 Dashboard with key metrics (courses, students)
- 📚 Course management (CRUD operations with search and pagination)
- 👥 Student management with course filtering
- 🎥 Video management per student with YouTube preview
- 🎨 Modern UI with Tailwind CSS (via CDN)
- 🔔 Toast notifications for user feedback
- ⚡ Loading states and error handling

## Project Structure

```
frontend/
├── src/
│   ├── api/
│   │   ├── axios.js          # Axios instance with interceptors
│   │   └── services.js       # API service functions
│   ├── components/
│   │   ├── ConfirmDialog.jsx # Confirmation dialog component
│   │   ├── Layout.jsx        # Main layout with navigation
│   │   ├── Loader.jsx        # Loading spinner component
│   │   ├── Modal.jsx         # Reusable modal component
│   │   ├── ProtectedRoute.jsx # Route protection wrapper
│   │   ├── Table.jsx         # Reusable table component
│   │   └── Toast.jsx         # Toast notification component
│   ├── context/
│   │   └── ToastContext.jsx  # Toast notification context
│   ├── hooks/
│   │   ├── useAuth.js        # Authentication hook and context
│   │   └── useFetch.js       # Data fetching hook
│   ├── pages/
│   │   ├── Courses.jsx       # Courses management page
│   │   ├── Dashboard.jsx     # Dashboard page
│   │   ├── Login.jsx          # Login page
│   │   ├── Students.jsx      # Students list page
│   │   └── StudentVideos.jsx # Student videos page
│   ├── App.jsx               # Main app component with routing
│   └── main.jsx              # App entry point
├── index.html                # HTML template
├── package.json              # Dependencies
├── vite.config.js            # Vite configuration
└── README.md                 # This file
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running on `http://localhost:4000`

### Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file (optional):**
   Create a `.env` file in the `frontend` directory:
   ```env
   VITE_API_BASE_URL=/api
   ```
   
   **Note:** The project is configured to use a Vite proxy by default. The proxy redirects `/api/*` requests to `http://localhost:4000/*`. If you want to use a different backend URL, update `VITE_API_BASE_URL` in `.env` and modify `vite.config.js` accordingly.

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Backend API Integration

### Base Routes

The frontend expects the backend to have routers mounted at these base paths:
- `/courses` - Course management
- `/videos` - Video management
- `/admin` - Admin operations (student data)
- `/student` - Student operations
- `/auth/login` - Authentication (mounted at root `/`)

### API Endpoints Used

#### Authentication
- `POST /auth/login`
  - Request: `{ email: string, password: string }`
  - Response: `{ status: "success", data: { token: string } }` or `{ status: "error", data: string }`

#### Courses
- `GET /courses/all-courses`
  - Response: `{ status: "success", data: Course[] }`
- `POST /courses/add`
  - Request: `{ Course_id, course_name, description, fees, start_date, end_date, video_expire_days }`
- `PUT /courses/:courseId`
  - Request: `{ course_name, description, fees, start_date, end_date, video_expire_days }`
- `DELETE /courses/:courseId`

#### Students
- `GET /admin/enrolled-students?course_id={optional}`
  - Response: `{ status: "success", data: Student[] }`

#### Videos
- `GET /videos/all-videos`
  - Response: `{ status: "success", data: Video[] }`
- `POST /videos/add`
  - Request: `{ course_id, title, description, youtube_url }`
- `PUT /videos/:videosId`
  - Request: `{ course_id, title, description, youtube_url }`
- `DELETE /videos/:videosId`

### Response Format

All backend responses should follow this format:
```javascript
{
  status: "success" | "error",
  data: any // The actual data or error message
}
```

The axios interceptor in `src/api/axios.js` automatically handles this format and extracts the `data` field for successful responses.

### Authentication

The frontend stores the JWT token in `localStorage` and automatically attaches it to all API requests via the `Authorization: Bearer <token>` header. The axios interceptor handles:
- Adding the token to requests
- Redirecting to login on 401 errors
- Extracting data from the backend response format

## Key Components

### Table Component
Reusable table component that accepts:
- `columns`: Array of column definitions with `header`, `accessor`, and optional `render` function
- `data`: Array of data objects
- `onRowClick`: Optional click handler for rows

### Modal Component
Reusable modal with:
- `isOpen`: Boolean to control visibility
- `onClose`: Close handler
- `title`: Modal title
- `size`: 'sm' | 'md' | 'lg' | 'xl'

### Toast Notifications
Use the `useToast` hook to show notifications:
```javascript
const { success, error, warning, info } = useToast();
success('Operation completed!');
error('Something went wrong!');
```

## Customization Notes

### Adapting to Backend Changes

If your backend API structure differs, update these files:

1. **API Services** (`src/api/services.js`):
   - Update endpoint paths
   - Adjust request/response data shapes

2. **Axios Interceptor** (`src/api/axios.js`):
   - Modify response interceptor if response format differs
   - Adjust error handling logic

3. **Page Components**:
   - Update form fields to match backend expectations
   - Adjust data mapping in table columns

### Adding Tailwind CSS

The project uses Tailwind CSS via CDN (included in `index.html`). To use a local installation:

1. Install Tailwind:
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

2. Update `tailwind.config.js`:
   ```javascript
   content: ["./index.html", "./src/**/*.{js,jsx}"]
   ```

3. Create `src/index.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

4. Import in `main.jsx`:
   ```javascript
   import './index.css'
   ```

5. Remove the CDN script from `index.html`

## Troubleshooting

### CORS Issues
If you encounter CORS errors, ensure your backend has CORS middleware configured to allow requests from `http://localhost:3000`.

### Authentication Not Working
- Check that the token is being stored in localStorage
- Verify the backend returns the token in the expected format
- Check browser console for API errors

### API Calls Failing
- Verify backend is running on `http://localhost:4000`
- Check network tab in browser dev tools
- Ensure backend routes match the expected paths

## Development Notes

- The app uses React Router v6 for navigation
- All protected routes require authentication
- The `useAuth` hook provides authentication state and methods
- The `useFetch` hook can be used for data fetching with loading states
- Toast notifications are managed via context

## License

This project is part of a full-stack application.

