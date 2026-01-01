import React, { useEffect, useState } from "react";
import Dashboard from "../component/Dashboard";
import AdminNavbar from "../component/AdminNavbar";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { getCourseInfo2, UpdateCourseById } from "../Services/adminServices";

function UpdateCourse() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [course, setCourse] = useState({
        course_name: "",
        description: "",
        start_date: "",
        end_date: "",
        fees: "",
        video_expire_days: ""
    });

    useEffect(() => {
        console.log("Update course component loaded");
        loadCourse();
    }, []);

    const loadCourse = async () => {
        const result = await getCourseInfo2(id);
        if (result.status === "success") {
            setCourse(result.data[0]);
        }
    };

    const courseUpdated = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        const result = await UpdateCourseById(token, id, course.course_name, course.description, course.start_date?.slice(0, 10), course.end_date?.slice(0, 10), course.fees, course.video_expire_days);
        console.log(result);
        if (result.status === "success") {
            toast.success("Course updated successfully!");
            navigate(-1);
        }
    };

    return (
        <>
            <AdminNavbar />
            <Dashboard />

            <div className="min-h-screen w-full bg-gradient-to-br from-emerald-100 via-white to-blue-100 flex items-center justify-center px-4">
                <div className="w-full max-w-2xl">
                    <div className="bg-white rounded-3xl shadow-2xl p-8">

                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                            Update Course
                        </h2>

                        <form onSubmit={courseUpdated} className="space-y-6">

                            {/* Course Name */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    Course Name
                                </label>
                                <input
                                    type="text"
                                    value={course.course_name}
                                    onChange={(e) =>
                                        setCourse({ ...course, course_name: e.target.value })
                                    }
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-400 outline-none"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    Course Description
                                </label>
                                <input
                                    type="text"
                                    value={course.description}
                                    onChange={(e) =>
                                        setCourse({ ...course, description: e.target.value })
                                    }
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-400 outline-none"
                                />
                            </div>

                            {/* Dates */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Start Date
                                    </label>
                                    <input
                                        type="date"
                                        value={
                                            course.start_date
                                                ? new Date(course.start_date).toISOString().slice(0, 10)
                                                : ""
                                        }
                                        onChange={(e) =>
                                            setCourse({ ...course, start_date: e.target.value })
                                        }
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-400 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        End Date
                                    </label>
                                    <input
                                        type="date"
                                        value={
                                            course.end_date
                                                ? new Date(course.end_date).toISOString().slice(0, 10)
                                                : ""
                                        }
                                        onChange={(e) =>
                                            setCourse({ ...course, end_date: e.target.value })
                                        }
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-400 outline-none"
                                    />
                                </div>
                            </div>

                            {/* Fees */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    Course Fees (₹)
                                </label>
                                <input
                                    type="number"
                                    value={course.fees}
                                    onChange={(e) =>
                                        setCourse({ ...course, fees: e.target.value })
                                    }
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-400 outline-none"
                                />
                            </div>

                            {/* Video Expiry */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    Video Access Duration (Days)
                                </label>
                                <input
                                    type="number"
                                    value={course.video_expire_days}
                                    onChange={(e) =>
                                        setCourse({
                                            ...course,
                                            video_expire_days: e.target.value
                                        })
                                    }
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-400 outline-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition"
                            >
                                Update Course
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UpdateCourse;
