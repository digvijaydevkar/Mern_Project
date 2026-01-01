import React, { useState, useEffect } from "react";
import AdminNavbar from "../component/AdminNavbar";
import Dashboard from "../component/Dashboard"; // Updated to match your previous naming
import { getAllCourses, addVideo } from "../Services/adminServices";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function AddVideo() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [video, setVideo] = useState({
    title: "",
    description: "",
    youtube_url: ""
  });

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const token = localStorage.getItem("token");
    const result = await getAllCourses(token);
    if (result.status === "success") {
      setCourses(result.data);
    }
  };

  const insertVideo = async (e) => {
    e.preventDefault();
    if (!selectedCourse || !video.title || !video.youtube_url) {
      toast.warn("Please fill in all required fields");
      return;
    }

    const token = localStorage.getItem('token');
    const result = await addVideo(token, Number(selectedCourse), video.title, video.youtube_url, video.description);
    
    if (result.status === 'success') {
      toast.success('Video published successfully!');
      navigate('/AllVideos'); // Navigate to the video library
    } else {
      toast.error("Failed to add video content");
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
              Add <span className="text-blue-600">New Lecture</span>
            </h2>
          </div>
          <p className="text-slate-500 font-medium ml-4">
            Deploy new video content to your student learning modules.
          </p>
        </div>

        {/* Form Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-slate-100 overflow-hidden">
            
            <div className="bg-blue-600 px-10 py-6 flex justify-between items-center">
              <div>
                <h3 className="text-white font-bold text-lg">Lecture Details</h3>
                <p className="text-blue-100 text-[10px] uppercase tracking-[0.2em] font-black mt-1">Resource Management</p>
              </div>
              <span className="text-3xl">🎬</span>
            </div>

            <form className="p-10 space-y-8">
              
              {/* Course Selection */}
              <div className="group">
                <label className="block text-[12px] font-black uppercase tracking-widest text-slate-700 mb-3 px-1 group-focus-within:text-blue-600 transition-colors">
                  Assign to Course
                </label>
                <div className="relative">
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-700 appearance-none cursor-pointer"
                  >
                    <option value="">-- Select Target Course --</option>
                    {courses.map(course => (
                      <option key={course.course_id} value={course.course_id}>
                        {course.course_name} (ID: {course.course_id})
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 font-bold">▼</div>
                </div>
              </div>

              {/* Video Title */}
              <div className="group">
                <label className="block text-[12px] font-black uppercase tracking-widest text-slate-700 mb-3 px-1 group-focus-within:text-blue-600 transition-colors">
                  Lecture Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Introduction to React Hooks"
                  onChange={(e) => setVideo({ ...video, title: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-700 placeholder:text-slate-300"
                />
              </div>

              {/* YouTube URL */}
              <div className="group">
                <label className="block text-[12px] font-black uppercase tracking-widest text-slate-700 mb-3 px-1 group-focus-within:text-blue-600 transition-colors">
                  YouTube Video Link
                </label>
                <div className="relative">
                   <div className="absolute left-6 top-1/2 -translate-y-1/2 text-red-500 font-bold">🔗</div>
                   <input
                    type="text"
                    placeholder="https://www.youtube.com/watch?v=..."
                    onChange={(e) => setVideo({ ...video, youtube_url: e.target.value })}
                    className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-700 placeholder:text-slate-300"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="group">
                <label className="block text-[12px] font-black uppercase tracking-widest text-slate-700 mb-3 px-1 group-focus-within:text-blue-600 transition-colors">
                  Lecture Notes / Description
                </label>
                <textarea
                  rows="4"
                  placeholder="Summarize the key takeaways from this lecture..."
                  onChange={(e) => setVideo({ ...video, description: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-700 placeholder:text-slate-300 resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-6 flex flex-col md:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/AllVideos')}
                  className="flex-1 py-4 rounded-2xl font-black text-slate-500 hover:bg-slate-100 transition-all border border-slate-200 uppercase tracking-widest text-xs"
                >
                  Discard
                </button>
                <button
                  onClick={insertVideo}
                  className="flex-[2] bg-blue-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-100 hover:bg-slate-900 transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
                >
                  Upload Content <span className="text-xl">📤</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AddVideo;