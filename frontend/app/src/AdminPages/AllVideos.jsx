import React, { useEffect, useState } from 'react'
import AdminNavbar from './../component/AdminNavbar'
import Dashboard from '../component/Dashboard'
import { useNavigate } from 'react-router'
import { getAllCourses, getAllVideos, deleteVideoById } from '../Services/adminServices'
import { toast } from 'react-toastify'

function AllVideos() {
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const [selectedCourse, setSelectedCourse] = useState('All')
    const [videos, setVideos] = useState([])
    const [courses, setCourses] = useState([])

    // Filter Logic
    const filteredVideos =
        selectedCourse === 'All'
            ? videos
            : videos.filter(v => String(v.course_id) === String(selectedCourse))

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        setLoading(true)
        const token = localStorage.getItem('token')
        try {
            const [videoRes, courseRes] = await Promise.all([
                getAllVideos(token),
                getAllCourses(token)
            ])
            if (videoRes.status === 'success') setVideos(videoRes.data)
            if (courseRes.status === 'success') setCourses(courseRes.data)
        } catch (error) {
            toast.error("Failed to sync with server")
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (video_id) => {
        if (!window.confirm("Are you sure you want to delete this lecture?")) return
        const token = localStorage.getItem('token')
        const result = await deleteVideoById(token, video_id)
        if (result.status === 'success') {
            toast.success("Video Deleted Successfully!")
            loadData() // Refresh list instantly
        } else {
            toast.error("Operation failed")
        }
    }

    return (
        <div className="flex bg-[#f8fafc] min-h-screen font-sans text-slate-900">
            <AdminNavbar />
            <Dashboard />

            <main className="flex-1 ml-64 p-8 lg:p-12 mt-16">

                {/* --- HEADER SECTION --- */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-8">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="h-8 w-1.5 bg-blue-600 rounded-full"></span>
                            <h2 className="text-4xl font-black text-slate-800 tracking-tight">
                                Lecture <span className="text-blue-600">Library</span>
                            </h2>
                        </div>
                        <p className="text-slate-500 font-medium ml-3">
                            Managing <span className="text-blue-600 font-bold">{videos.length}</span> verified resources.
                        </p>
                    </div>

                    {/* Filter Box */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-sky-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                        <div className="relative bg-white p-5 rounded-2xl shadow-xl border border-slate-100 min-w-[320px]">
                            <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-blue-600 mb-3 px-1">
                                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                                Program Filter
                            </label>
                            <select
                                value={selectedCourse}
                                onChange={(e) => setSelectedCourse(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border-0 bg-slate-50 text-slate-700 font-bold text-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer appearance-none"
                            >
                                <option value="All">All Categories</option>
                                {courses.map(course => (
                                    <option key={course.course_id} value={course.course_id}>
                                        {course.course_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* --- CONTENT AREA --- */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 gap-4">
                        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-blue-600 font-black tracking-widest uppercase text-xs">Syncing Library...</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {filteredVideos.map((video) => (
                                <div key={video.video_id} className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 flex flex-col">

                                    {/* Video Thumbnail Area */}
                                    <div className="relative h-52 bg-slate-900 flex items-center justify-center overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 to-slate-900/90 z-10"></div>

                                        <div className="relative z-20 w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-500">
                                            <span className="text-3xl ml-1 text-white font-bold">▶</span>
                                        </div>

                                        <div className="absolute top-5 right-5 z-20 bg-blue-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xl">
                                            REF: #{video.video_id}
                                        </div>
                                    </div>

                                    {/* Text Content */}
                                    <div className="p-8 flex flex-col flex-grow">
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="bg-blue-50 text-blue-600 text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest">
                                                Course ID: {video.course_id}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-black text-slate-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                                            {video.title}
                                        </h3>

                                        <p className="text-slate-500 text-sm mb-8 line-clamp-3 font-medium leading-relaxed">
                                            {video.description}
                                        </p>

                                        {/* Row Actions - FIXED BUTTONS */}
                                        <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                                            <a
                                                href={video.youtube_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-xs font-black text-blue-600 uppercase tracking-widest hover:text-slate-900 transition-colors flex items-center gap-2"
                                            >
                                                Preview ↗
                                            </a>

                                            <div className="flex gap-4">
                                                {/* ENHANCED UPDATE BUTTON */}
                                                <button
                                                    onClick={() => navigate(`/UpdateVideo/${video.video_id}`)}
                                                    className="w-14 h-14 flex items-center justify-center bg-blue-100 text-blue-700 rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg border-2 border-blue-200 active:scale-90"
                                                    title="Edit Video"
                                                >
                                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                </button>

                                                {/* ENHANCED DELETE BUTTON */}
                                                <button
                                                    onClick={() => handleDelete(video.video_id)}
                                                    className="w-14 h-14 flex items-center justify-center bg-red-100 text-red-700 rounded-2xl hover:bg-red-600 hover:text-white transition-all duration-300 shadow-lg border-2 border-red-200 active:scale-90"
                                                    title="Delete Video"
                                                >
                                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* --- EMPTY STATE --- */}
                        {filteredVideos.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-40 bg-white rounded-[3rem] border border-slate-100 shadow-sm text-center">
                                <span className="text-8xl mb-8">🎬</span>
                                <h3 className="text-2xl font-black text-slate-800 mb-2">No Content Available</h3>
                                <p className="text-slate-500 font-medium max-w-xs mx-auto">
                                    No lectures found for the selected category.
                                </p>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    )
}

export default AllVideos