import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Navbar from '../component/Navbar';
import { getMyCourseWithVideos } from '../Services/studentServices';

function CourseContent() {
    const { courseId } = useParams(); // Gets the ID from the URL
    const location = useLocation();
    const [videos, setVideos] = useState([]);
    const courseName = location.state?.name || "Course";

    useEffect(() => {
        const loadContent = async () => {
            const token = localStorage.getItem('token');
            console.log("Fetching videos for course ID:", courseId);
            const result = await getMyCourseWithVideos(courseId, token);
            if (result.status === 'success') {
                // Filter videos for THIS specific course ID
                const filtered = result.data.filter(v => v.course_id == courseId);
                setVideos(filtered);
            }
        };
        loadContent();
    }, [courseId]);

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT: VIDEO PLAYER (Main Attraction) */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-black rounded-3xl overflow-hidden shadow-2xl aspect-video flex items-center justify-center text-white">
                        {/* Display first video by default or selected video */}
                        {videos.length > 0 ? (
                            <iframe
                                width="100%"
                                height="100%"
                                src={videos[0].youtube_url.replace("watch?v=", "embed/")}
                                title="Course Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <p>Select a lecture to start learning</p>
                        )}
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                        <h2 className="text-2xl font-black text-slate-800">IIT-{courseName.toUpperCase()}-2025</h2>
                        <p className="text-slate-500 mt-2">Welcome to your digital classroom. Access all course materials and video lectures below.</p>
                    </div>
                </div>

                {/* RIGHT: PLAYLIST (Course Content) */}
                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 h-fit">
                    <div className="bg-sky-500 p-6 text-white font-bold text-xl rounded-t-3xl">
                        Lecture Series
                    </div>
                    <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
                        {videos.map((video) => (
                            <div key={video.video_id} className="p-4 border rounded-xl hover:bg-blue-50 transition-all shadow-sm mb-4">
                                {/* Force external link handling */}
                                <a
                                    href={video.youtube_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-blue-600 font-bold text-lg group"
                                >
                                    <span className="bg-red-100 p-2 rounded-lg group-hover:bg-red-500 group-hover:text-white transition-colors">
                                        ▶
                                    </span>
                                    {video.title}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CourseContent;