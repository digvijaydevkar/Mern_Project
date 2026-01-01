import React, { useEffect, useState } from 'react'
import AdminNavbar from '../component/AdminNavbar';
import Dashboard from '../component/Dashboard';
import { getAllActiveCourses } from '../Services/userServices'
import { useNavigate } from 'react-router'

function AdminHome() {
    const navigate = useNavigate()
    const [courses, setCourses] = useState([])

    // 1. Added the same image mapping from your student home
    const courseImages = {
        "MERN": "https://upload.wikimedia.org/wikipedia/commons/9/94/MERN-logo.png",
        "Artificial Intellegence": "https://cdn-icons-png.flaticon.com/512/2103/2103633.png",
        "Android Development": "https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg",
        "Python Programming": "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
        "Java Programming": "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg",
        "Web Development": "https://cdn-icons-png.flaticon.com/512/2210/2210153.png"
    };

    useEffect(() => {
        getCourses()
    }, [])

    const getCourses = async () => {
        const result = await getAllActiveCourses()
        if (result.status === "success") {
            setCourses(result.data)
        }
    }

    return (
        <div className="flex bg-slate-50 min-h-screen font-sans text-slate-900">
            <AdminNavbar />
            <Dashboard />

            {/* MAIN CONTENT - Adjusted with Blue/White Theme */}
            <main className="flex-1 ml-64 p-8 lg:p-12">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                    <div>
                        <h2 className="text-4xl font-extrabold text-slate-800 tracking-tight">
                            Admin <span className="text-blue-600">Dashboard</span>
                        </h2>
                        <p className="text-slate-500 mt-2 font-medium">
                            Manage your curriculum and monitor active courses.
                        </p>
                    </div>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center gap-2 w-fit"
                        onClick={() => navigate(`/AddNewCourse`)}> 
                    
                    
                        <span>+</span> Create New Course
                    </button>
                </div>

                {/* ================= Stats Grid ================= */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[
                        { label: "Active Courses", val: courses.length, color: "bg-blue-500", icon: "📚" },
                        { label: "Total Students", val: "1 K +", color: "bg-sky-500", icon: "👥" },
                        { label: "Revenue", val: "₹10,00,000L +", color: "bg-indigo-500", icon: "📈" }
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
                                <h4 className="text-3xl font-black mt-1 text-slate-800">{stat.val}</h4>
                            </div>
                            <div className={`${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center text-xl text-white shadow-lg shadow-blue-50`}>
                                {stat.icon}
                            </div>
                        </div>
                    ))}
                </div>

                {/* ================= Managed Courses Grid ================= */}
                <div className="max-w-7xl">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-black text-slate-800">Active Course Catalog</h2>
                        <span className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-xs font-bold uppercase">Live Overview</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map(course => (
                            <div
                                key={course.course_id}
                                className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 flex flex-col"
                            >
                                {/* 2. Updated Image Container using the courseImages mapping */}
                                <div className="relative h-48 bg-slate-50 overflow-hidden flex items-center justify-center p-6">
                                    <img
                                        src={courseImages[course.course_name] || "https://cdn-icons-png.flaticon.com/512/2436/2436636.png"}
                                        alt={course.course_name}
                                        className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm text-blue-600 text-[10px] font-black px-3 py-1 rounded-full shadow-sm uppercase tracking-tighter">
                                        ID: #{course.course_id}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                                        {course.course_name}
                                    </h3>

                                    <div className="flex items-center text-xs text-slate-400 font-bold mb-6 gap-2">
                                        <span className="bg-slate-100 px-2 py-1 rounded">START DATE</span>
                                        <span>
                                            {new Date(course.start_date).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric"
                                            })}
                                        </span>
                                    </div>

                                    {/* Action Button */}
                                    <button
                                        className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-slate-900 transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-lg shadow-blue-100"
                                        onClick={() => navigate(`/UpdateCourse/${course.course_id || course.course_id}`)}
                                    >
                                        Edit Details
                                        <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default AdminHome