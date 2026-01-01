import React, { useEffect, useState } from 'react'
import AdminNavbar from '../component/AdminNavbar'
import Dashboard from '../component/Dashboard'
import { getAllCourses, getAllStudent } from '../Services/adminServices'

function AllStudent() {
    const [selectedCourse, setSelectedCourse] = useState('All')
    const [students, setStudents] = useState([])
    const [courses, setCourses] = useState([])

    useEffect(() => {
        loadStudents()
        loadCourses()
    }, [])

    const loadStudents = async () => {
        const token = localStorage.getItem('token')
        const result = await getAllStudent(token)
        if (result.status === 'success') {
            setStudents(result.data)
        }
    }

    const loadCourses = async () => {
        const token = localStorage.getItem('token')
        const result = await getAllCourses(token)
        if (result.status === 'success') {
            setCourses(result.data)
        }
    }

    const filteredStudents =
        selectedCourse === 'All' || selectedCourse === ''
            ? students
            : students.filter(s => String(s.course_id) === String(selectedCourse))

    return (
        <div className="flex bg-[#f8fafc] min-h-screen font-sans text-slate-900">
            <AdminNavbar />
            <Dashboard />

            <main className="flex-1 ml-64 p-8 lg:p-12 mt-16">
                {/* --- HEADER & FILTER SECTION --- */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-8">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="h-8 w-1.5 bg-blue-600 rounded-full"></span>
                            <h2 className="text-4xl font-black text-slate-800 tracking-tight">
                                Student <span className="text-blue-600">Directory</span>
                            </h2>
                        </div>
                        <p className="text-slate-500 font-medium ml-3">
                            Efficiently manage and monitor {students.length} total enrollments.
                        </p>
                    </div>

                    {/* Enhanced Glassmorphism Filter Box */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-sky-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                        <div className="relative bg-white p-5 rounded-2xl shadow-xl border border-slate-100 min-w-[320px]">
                            <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-blue-600 mb-3 px-1">
                                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                                Filter by Program
                            </label>
                            <select
                                value={selectedCourse}
                                onChange={(e) => setSelectedCourse(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border-0 bg-slate-50 text-slate-700 font-bold text-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all appearance-none cursor-pointer"
                            >
                                <option value="All">All Courses</option>
                                {courses.map(course => (
                                    <option key={course.course_id} value={course.course_id}>
                                        {course.course_name}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute right-9 bottom-9 pointer-events-none text-slate-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- ANALYTICS CARDS --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="relative overflow-hidden bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-2xl transition-all duration-500">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[5rem] -mr-8 -mt-8 transition-all group-hover:bg-blue-600 group-hover:w-full group-hover:h-full group-hover:rounded-none group-hover:m-0 duration-700 opacity-20 group-hover:opacity-5"></div>
                        <div className="relative z-10">
                            <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Total Database</p>
                            <h4 className="text-5xl font-black text-slate-800">{students.length}</h4>
                            <p className="text-blue-600 text-[10px] font-bold mt-2 uppercase">Verified Enrolments</p>
                        </div>
                        <div className="relative z-10 bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-inner group-hover:bg-white transition-colors duration-500">👥</div>
                    </div>

                    <div className="relative overflow-hidden bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-2xl transition-all duration-500">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-bl-[5rem] -mr-8 -mt-8 transition-all group-hover:bg-sky-500 group-hover:w-full group-hover:h-full group-hover:rounded-none group-hover:m-0 duration-700 opacity-20 group-hover:opacity-5"></div>
                        <div className="relative z-10">
                            <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Current Filter</p>
                            <h4 className="text-5xl font-black text-sky-500">{filteredStudents.length}</h4>
                            <p className="text-sky-500 text-[10px] font-bold mt-2 uppercase">Active Matches</p>
                        </div>
                        <div className="relative z-10 bg-sky-50 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-inner group-hover:bg-white transition-colors duration-500">🔍</div>
                    </div>
                </div>

                {/* --- MODERN DATA TABLE --- */}
                <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-10 py-7 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Reg No</th>
                                    <th className="px-10 py-7 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Student Identity</th>
                                    <th className="px-10 py-7 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Communication</th>
                                    <th className="px-10 py-7 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">Program Status</th>
                                    <th className="px-10 py-7 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredStudents.map((student) => (
                                    <tr 
                                        key={student.reg_no} 
                                        className="hover:bg-blue-50/30 transition-all duration-200 group cursor-default"
                                    >
                                        <td className="px-10 py-6 font-mono text-sm text-blue-600 font-black">
                                            <span className="bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">#{student.reg_no}</span>
                                        </td>
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-500 font-bold text-sm shadow-inner group-hover:from-blue-100 group-hover:to-blue-200 group-hover:text-blue-600 transition-all duration-500">
                                                    {student.name.charAt(0)}
                                                </div>
                                                <span className="font-bold text-slate-800 text-lg group-hover:text-blue-600 transition-colors">
                                                    {student.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-slate-600">{student.email || student.emial}</span>
                                                <span className="text-xs font-medium text-slate-400">{student.mobile_no}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6 text-center">
                                            <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-blue-100 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                                                ID: {student.course_id}
                                            </span>
                                        </td>
                                        <td className="px-10 py-6 text-right">
                                            <button className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* --- EMPTY STATE --- */}
                    {filteredStudents.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-32 bg-slate-50/50">
                            <div className="relative">
                                <div className="absolute inset-0 bg-blue-200 blur-3xl opacity-30 animate-pulse"></div>
                                <div className="relative text-7xl mb-6">📂</div>
                            </div>
                            <h3 className="text-2xl font-black text-slate-800 mb-2">No Records Found</h3>
                            <p className="text-slate-500 font-medium max-w-xs text-center">
                                We couldn't find any students enrolled in the <span className="text-blue-600 font-bold">"{selectedCourse}"</span> program.
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}

export default AllStudent