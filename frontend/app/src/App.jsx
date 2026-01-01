import { Navigate, Route, Routes } from "react-router"
import { ToastContainer } from 'react-toastify'

import Login from "./pages/Login"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import AboutUs from "./pages/AboutUs"
import CourseDetails from "./pages/CourseDetails"
import MyregisterCourse from "./pages/MyregisterCourse"
import CourseContent from "./pages/course-content"
import ResetPassword from "./pages/ResetPassword"
import AddNewVideo from "./AdminPages/AddNewVideo.jsx"
import { createContext, useState } from "react"

import AdminHome from "./AdminPages/AdminHome"
import Dashboard from './component/Dashboard.jsx';
import AllStudents from "./AdminPages/AllStudents";
import AllVideos from "./AdminPages/AllVideos.jsx";
import AllCourses from './AdminPages/AllCourses';
import AddNewCourse from "./AdminPages/AddNewCourse.jsx";
import UpdateCourse from './AdminPages/UpdateCourse';
import EditVideo from "./AdminPages/UpdateVideo.jsx"

export const LoginContext = createContext()

function App() {

  const [loginStatus, setLoginStatus] = useState(!!localStorage.getItem('token'))

  return (
    <>
      <LoginContext.Provider value={{ loginStatus, setLoginStatus }}>
        <Routes>
         
          <Route path="/" element={<Home />} />
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/AboutUS" element={<AboutUs />} />
          <Route path="/Register/:id" element={<Register />} />
          <Route path="/course-content/:courseId" element={<CourseContent />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/MyregisterCourse" element={<MyregisterCourse />} />
          {/* <Route path="Dashboard" element={<Dashboard />} /> */}
          
          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/AllStudents" element={<AllStudents />} />
          <Route path="/AllVideos" element={<AllVideos />} />
          <Route path="/AllCourses" element={<AllCourses />} />
          <Route path="/AddNewCourse" element={<AddNewCourse />} />
          <Route path="/AddNewVideo" element={<AddNewVideo />} />
          <Route path="/UpdateCourse/:id" element={<UpdateCourse />} />
          <Route path="/UpdateVideo/:id" element={<EditVideo />} />        
        </Routes>
      </LoginContext.Provider>
      <ToastContainer />
    </>
  )
}

export default App
