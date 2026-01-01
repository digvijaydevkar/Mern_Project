import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getAllStudent } from '../Services/adminServices'

function Dashboard() {
    const [openMenu, setOpenMenu] = useState(null)
    const location = useLocation()
    const toggleMenu = (menu) => setOpenMenu(openMenu === menu ? null : menu)
    const isActive = (path) => location.pathname === path

    useEffect(() => {
        getStudents()
    }, [])

    const getStudents = async () => {
        const result = await getAllStudent()
        if (result.status === "success") {
            setCourses(result.data)
        }
    }



    return (
        <aside className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] 
                          bg-slate-900 border-r border-white/10 shadow-2xl z-40 overflow-y-auto">

            <div className="p-6 space-y-8">
                <div>
                    <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6 px-2">
                        Admin Controls
                    </h2>

                    <div className="space-y-4">
                        {/* Students Group */}
                        <div className="space-y-2">
                            <button
                                onClick={() => toggleMenu('students')}
                                className={`w-full flex justify-between items-center px-4 py-3 rounded-xl transition-all duration-300 shadow-sm
                                           ${openMenu === 'students'
                                        ? 'bg-white text-blue-600'
                                        : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'}`}
                            >
                                <div className="flex items-center gap-3 font-bold">
                                    <span className={`text-lg transition-colors ${openMenu === 'students' ? 'text-blue-600' : 'text-blue-400'}`}>
                                        👥
                                    </span>
                                    <span>Students</span>
                                </div>
                                <span className={`text-[10px] transition-transform duration-300 ${openMenu === 'students' ? 'rotate-180' : ''}`}>
                                    ▼
                                </span>
                            </button>

                            {openMenu === 'students' && (
                                <div className="ml-4 pl-4 border-l border-white/10 space-y-1 animate-in slide-in-from-top-2 duration-300">
                                    <Link to="/AllStudents"
                                        className={`block p-2 text-sm rounded-lg transition-all
                                          ${isActive('/AllStudents')
                                                ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-900/50'
                                                : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                                        View All Records
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Courses Group */}
                        <div className="space-y-2">
                            <button
                                onClick={() => toggleMenu('courses')}
                                className={`w-full flex justify-between items-center px-4 py-3 rounded-xl transition-all duration-300 shadow-sm
                                           ${openMenu === 'courses'
                                        ? 'bg-white text-blue-600'
                                        : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'}`}
                            >
                                <div className="flex items-center gap-3 font-bold">
                                    <span className={`text-lg transition-colors ${openMenu === 'courses' ? 'text-blue-600' : 'text-blue-400'}`}>
                                        📘
                                    </span>
                                    <span>Courses</span>
                                </div>
                                <span className={`text-[10px] transition-transform duration-300 ${openMenu === 'courses' ? 'rotate-180' : ''}`}>
                                    ▼
                                </span>
                            </button>

                            {openMenu === 'courses' && (
                                <div className="ml-4 pl-4 border-l border-white/10 space-y-1 animate-in slide-in-from-top-2 duration-300">
                                    <Link to="/AllCourses"
                                        className={`block p-2 text-sm rounded-lg transition-all
                                          ${isActive('/AllCourses')
                                                ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-900/50'
                                                : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                                        Active Catalog
                                    </Link>
                                    <Link to="/AddNewCourse"
                                        className={`block p-2 text-sm rounded-lg transition-all
                                          ${isActive('/AddNewCourse')
                                                ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-900/50'
                                                : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                                        + Create New
                                    </Link>
                                </div>
                            )}
                        </div>
                        {/* --- Videos Group --- */}
                        <div className="space-y-2">
                            <button
                                onClick={() => toggleMenu('videos')}
                                className={`w-full flex justify-between items-center px-4 py-3 rounded-xl transition-all duration-300 shadow-sm
                   ${openMenu === 'videos'
                                        ? 'bg-white text-blue-600 font-bold'
                                        : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white font-bold'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className={`text-lg transition-colors ${openMenu === 'videos' ? 'text-blue-600' : 'text-blue-400'}`}>
                                        🎬
                                    </span>
                                    <span>Lectures</span>
                                </div>
                                <span className={`text-[10px] transition-transform duration-300 ${openMenu === 'videos' ? 'rotate-180' : ''}`}>
                                    ▼
                                </span>
                            </button>

                            {openMenu === 'videos' && (
                                <div className="ml-4 pl-4 border-l border-white/10 space-y-1 animate-in slide-in-from-top-2 duration-300">
                                    <Link
                                        to="/AllVideos"
                                        className={`block p-2 text-sm rounded-lg transition-all
                ${isActive('/AllVideos')
                                                ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-900/50'
                                                : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                                    >
                                        View Video Library
                                    </Link>
                                    <Link
                                        to="/AddNewVideo"
                                        className={`block p-2 text-sm rounded-lg transition-all
                ${isActive('/add-video')
                                                ? 'bg-blue-600 text-white font-bold'
                                                : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                                    >
                                        + Add New Video
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* Platform Engagement Gauge */}
                <div className="bg-white/5 rounded-[2rem] p-5 border border-white/10 relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all duration-700"></div>

                    <div className="relative z-10 flex flex-col items-center text-center">
                        <div className="relative mb-3">
                            {/* Circular Progress Bar */}
                            <svg className="w-16 h-16 transform -rotate-90">
                                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/5" />
                                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent"
                                    strokeDasharray={175.9} strokeDashoffset={175.9 * (1 - 0.7)}
                                    className="text-blue-500 transition-all duration-1000 ease-out" />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white">70%</span>
                        </div>

                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">Platform Load</h3>
                        <p className="text-[9px] text-slate-400 font-medium leading-tight">System performing at <span className="text-blue-400">Optimal Levels</span></p>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default Dashboard