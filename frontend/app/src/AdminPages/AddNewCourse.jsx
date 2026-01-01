import React, { useState } from "react";
import Dashboard from "../component/Dashboard"; // Updated to match your previous naming
import AdminNavbar from '../component/AdminNavbar';
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { addCourse } from "../Services/adminServices";

function AddCourse() {
    const navigate = useNavigate();
    const [course, setCourse] = useState({
        course_name: "",
        description: "",
        fees: "",
        start_date: "",
        end_date: "",
        video_expire_days: ""
    });

    const insertCourse = async (e) => {
        e.preventDefault();
        
        // Basic Validation
        if(!course.course_name || !course.fees) {
            return toast.warn("Please fill in the required fields.");
        }

        const token = localStorage.getItem('token');
        const result = await addCourse(
            token, 
            course.course_name, 
            course.description, 
            course.fees, 
            course.start_date, 
            course.end_date, 
            course.video_expire_days
        );

        if (result.status === 'success') {
            toast.success('Course published successfully!');
            navigate('/AllCourses'); // Redirect to catalog to see the result
        } else {
            toast.error("Failed to create course. Please try again.");
        }
    };

    return (
        <div className="flex bg-[#f8fafc] min-h-screen font-sans text-slate-900">
            <AdminNavbar />
            <Dashboard />

            {/* MAIN CONTENT */}
            <main className="flex-1 ml-64 p-8 lg:p-12 mt-16">
                
                {/* Header Area */}
                <div className="max-w-4xl mx-auto mb-10">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="h-8 w-1.5 bg-blue-600 rounded-full"></span>
                        <h2 className="text-4xl font-black text-slate-800 tracking-tight">
                            Create <span className="text-blue-600">New Program</span>
                        </h2>
                    </div>
                    <p className="text-slate-500 font-medium ml-4">
                        Fill in the details below to launch a new educational course.
                    </p>
                </div>

                {/* Form Card */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-slate-100 overflow-hidden">
                        
                        <div className="bg-blue-600 px-10 py-6">
                            <h3 className="text-white font-bold text-lg">Course Information</h3>
                            <p className="text-blue-100 text-xs uppercase tracking-widest font-semibold mt-1">General & Scheduling Details</p>
                        </div>

                        <form className="p-10 space-y-8">
                            
                            {/* Course Name */}
                            <div className="group">
                                <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2 px-1 group-focus-within:text-blue-600 transition-colors">
                                    Course Title
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Advanced MERN Stack Development"
                                    onChange={(e) => setCourse({ ...course, course_name: e.target.value })}
                                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-semibold text-slate-700 placeholder:text-slate-300"
                                />
                            </div>

                            {/* Description */}
                            <div className="group">
                                <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2 px-1 group-focus-within:text-blue-600 transition-colors">
                                    Program Description
                                </label>
                                <textarea
                                    rows="3"
                                    placeholder="Briefly describe what students will learn..."
                                    onChange={(e) => setCourse({ ...course, description: e.target.value })}
                                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-semibold text-slate-700 placeholder:text-slate-300 resize-none"
                                />
                            </div>

                            {/* Two Column Grid: Dates */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="group">
                                    <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2 px-1 group-focus-within:text-blue-600 transition-colors">
                                        Batch Start Date
                                    </label>
                                    <input
                                        type="date"
                                        onChange={(e) => setCourse({ ...course, start_date: e.target.value })}
                                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-600"
                                    />
                                </div>

                                <div className="group">
                                    <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2 px-1 group-focus-within:text-blue-600 transition-colors">
                                        Batch End Date
                                    </label>
                                    <input
                                        type="date"
                                        onChange={(e) => setCourse({ ...course, end_date: e.target.value })}
                                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-600"
                                    />
                                </div>
                            </div>

                            {/* Two Column Grid: Price & Access */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="group">
                                    <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2 px-1 group-focus-within:text-blue-600 transition-colors">
                                        Course Fee (INR)
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                                        <input
                                            type="number"
                                            placeholder="4999"
                                            onChange={(e) => setCourse({ ...course, fees: e.target.value })}
                                            className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-black text-slate-700"
                                        />
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2 px-1 group-focus-within:text-blue-600 transition-colors">
                                        Video Validity (Days)
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="180"
                                        onChange={(e) => setCourse({ ...course, video_expire_days: e.target.value })}
                                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-black text-slate-700"
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="pt-6 flex flex-col md:flex-row gap-4">
                                <button
                                    type="button"
                                    onClick={() => navigate('/all-courses')}
                                    className="flex-1 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-100 transition-all border border-slate-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={insertCourse}
                                    className="flex-[2] bg-blue-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-100 hover:bg-slate-900 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                                >
                                    Publish Course <span className="text-xl">🚀</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AddCourse;