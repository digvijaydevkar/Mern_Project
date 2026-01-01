import React, { useEffect, useState } from 'react'
import AdminNavbar from './../component/AdminNavbar';
import Dashboard from '../component/Dashboard' 
import { getAllCourses, deleteCourseById } from '../Services/adminServices';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

function AllCourses() {
    const navigate = useNavigate()
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadCourses()
    }, [])

    const loadCourses = async () => {
        setLoading(true)
        const token = localStorage.getItem('token')
        const result = await getAllCourses(token)
        if (result.status === 'success') {
            setCourses(result.data)
        }
        setLoading(false)
    }

    // --- ONE-CLICK DELETE FEATURE ---
    const deleteCourse = async (id) => {
        // Confirmation ensures no accidental deletions
        if (!window.confirm("Are you sure you want to delete this course? This action cannot be undone.")) return;

        const token = localStorage.getItem('token')
        const result = await deleteCourseById(token, id)
        
        if (result.status === 'success') {
            toast.success("Course Removed Successfully")
            // Refreshes the list instantly on the page
            loadCourses() 
        }
        else {
            toast.error("Unable to delete course at this time")
        }
    }

    return (
        <div className="flex bg-[#f8fafc] min-h-screen font-sans text-slate-900">
            <AdminNavbar />
            <Dashboard />

            <main className="flex-1 ml-64 p-8 lg:p-12 mt-16">
                
                {/* --- PAGE HEADER --- */}
                <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="h-8 w-1.5 bg-blue-600 rounded-full"></span>
                            <h2 className="text-4xl font-black text-slate-800 tracking-tight">
                                Active <span className="text-blue-600">Catalog</span>
                            </h2>
                        </div>
                        <p className="text-slate-500 font-medium ml-3">
                            Overseeing <span className="text-blue-600 font-bold">{courses.length}</span> verified educational programs.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate(`/AddNewCourse`)}
                        className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold 
                                 shadow-xl shadow-blue-100 hover:bg-slate-900 transition-all 
                                 flex items-center gap-2 transform active:scale-95"
                    >
                        <span className="text-xl">+</span> Add New Course
                    </button>
                </div>

                {/* --- COURSE LIST GRID --- */}
                <div className="max-w-7xl mx-auto space-y-6">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-blue-600 font-bold animate-pulse">Syncing Catalog...</p>
                        </div>
                    ) : courses.length === 0 ? (
                        <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-200">
                            <div className="text-6xl mb-4">📚</div>
                            <h3 className="text-xl font-bold text-slate-400">No courses currently in catalog.</h3>
                        </div>
                    ) : (
                        courses.map(course => (
                            <div
                                key={course.course_id || course.course_id}
                                className="group bg-white rounded-[2.5rem] shadow-sm border border-slate-100 
                                         hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 
                                         flex overflow-hidden"
                            >
                                {/* Blue Accent Strip */}
                                <div className="w-2 bg-blue-600 group-hover:w-3 transition-all"></div>

                                {/* Content Container */}
                                <div className="flex-1 p-8 grid grid-cols-1 md:grid-cols-6 gap-8 items-center">

                                    {/* Name & ID Section */}
                                    <div className="md:col-span-2">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 bg-blue-50 px-3 py-1 rounded-lg mb-3 inline-block">
                                            REF ID: #{course.course_id || course.course_id}
                                        </span>
                                        <h3 className="text-2xl font-black text-slate-800 group-hover:text-blue-600 transition-colors">
                                            {course.course_name}
                                        </h3>
                                        <p className="text-sm text-slate-400 font-medium line-clamp-1 mt-1">
                                            {course.description}
                                        </p>
                                    </div>

                                    {/* Fees Display */}
                                    <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100 shadow-inner">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Standard Fee</p>
                                        <p className="font-black text-slate-800 text-xl">₹{course.fees}</p>
                                    </div>

                                    {/* Timeline Display */}
                                    <div className="md:col-span-2 flex items-center justify-around bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-inner">
                                        <div className="text-center">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Commences</p>
                                            <p className="text-sm font-black text-slate-700">
                                                {new Date(course.start_date).toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric'})}
                                            </p>
                                        </div>
                                        <div className="h-10 w-px bg-slate-200"></div>
                                        <div className="text-center">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Concludes</p>
                                            <p className="text-sm font-black text-slate-700">
                                                {new Date(course.end_date).toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric'})}
                                            </p>
                                        </div>
                                    </div>

                                    {/* --- ACTION BUTTONS --- */}
                                    <div className="flex gap-3 justify-end">
                                        {/* Edit Button */}
                                        <button
                                            onClick={() => navigate(`/UpdateCourse/${course.course_id || course.course_id}`)}
                                            className="w-12 h-12 flex items-center justify-center bg-blue-50 text-blue-600 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                                            title="Edit Program"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        </button>

                                        {/* Red Trash Icon for One-Click Delete */}
                                        <button
                                            onClick={() => deleteCourse(course.Course_id || course.course_id)}
                                            className="w-12 h-12 flex items-center justify-center bg-red-50 text-red-500 rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                            title="Remove Program"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>

                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    )
}

export default AllCourses