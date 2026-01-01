import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Dashboard from "../component/Dashboard"; // Ensuring consistency with your DashboardNavbar naming
import AdminNavbar from "../component/AdminNavbar";
import { useNavigate, useParams } from "react-router";
import { getVideoInfo, getAllCourses, updateVideoById } from "../Services/adminServices";

function EditVideo() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [video, setVideo] = useState({
    title: "",
    description: "",
    youtube_url: ""
  });

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await Promise.all([loadVideo(), loadCourses()]);
      setLoading(false);
    };
    init();
  }, []);

  const loadVideo = async () => {
    const token = localStorage.getItem("token");
    const result = await getVideoInfo(token, id);
    if (result.status === "success") {
      const videoData = result.data[0];
      setVideo({
        title: videoData.title,
        description: videoData.description,
        youtube_url: videoData.youtube_url
      });
      setSelectedCourse(videoData.course_id);
    }
  };

  const loadCourses = async () => {
    const token = localStorage.getItem("token");
    const result = await getAllCourses(token);
    if (result.status === "success") {
      setCourses(result.data);
    }
  };

  const videoUpdated = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const result = await updateVideoById(
      token,
      id,
      Number(selectedCourse),
      video.title,
      video.description,
      video.youtube_url
    );

    if (result.status === "success") {
      toast.success("Video information updated!");
      navigate(-1);
    } else {
      toast.error("Failed to update video");
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
              Edit <span className="text-blue-600">Lecture Video</span>
            </h2>
          </div>
          <p className="text-slate-500 font-medium ml-4">
            Modifying content for <span className="text-blue-600 font-bold">Video ID: #{id}</span>
          </p>
        </div>

        {/* Form Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-slate-100 overflow-hidden">
            
            <div className="bg-blue-600 px-10 py-6 flex justify-between items-center">
              <div>
                <h3 className="text-white font-bold text-lg">Update Content</h3>
                <p className="text-blue-100 text-[10px] uppercase tracking-[0.2em] font-black mt-1">Video Resource Management</p>
              </div>
              <span className="text-3xl">📽️</span>
            </div>

            <form onSubmit={videoUpdated} className="p-10 space-y-8">
              
              {/* Course Selection */}
              <div className="group">
                <label className="block text-[12px] font-black uppercase tracking-widest text-slate-700 mb-3 px-1 group-focus-within:text-blue-600 transition-colors">
                  Linked Course
                </label>
                <div className="relative">
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-700 appearance-none cursor-pointer"
                  >
                    {courses.map(course => (
                      <option key={course.Course_id} value={course.Course_id}>
                        {course.course_name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 font-bold">▼</div>
                </div>
              </div>

              {/* Video Title */}
              <div className="group">
                <label className="block text-[12px] font-black uppercase tracking-widest text-slate-700 mb-3 px-1 group-focus-within:text-blue-600 transition-colors">
                  Video Title
                </label>
                <input
                  type="text"
                  value={video.title}
                  onChange={(e) => setVideo({ ...video, title: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-700"
                />
              </div>

              {/* YouTube URL */}
              <div className="group">
                <label className="block text-[12px] font-black uppercase tracking-widest text-slate-700 mb-3 px-1 group-focus-within:text-blue-600 transition-colors">
                  YouTube Source Link
                </label>
                <div className="relative">
                   <div className="absolute left-6 top-1/2 -translate-y-1/2 text-red-500 font-bold">🔗</div>
                   <input
                    type="text"
                    value={video.youtube_url}
                    onChange={(e) => setVideo({ ...video, youtube_url: e.target.value })}
                    className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-700"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="group">
                <label className="block text-[12px] font-black uppercase tracking-widest text-slate-700 mb-3 px-1 group-focus-within:text-blue-600 transition-colors">
                  Detailed Description
                </label>
                <textarea
                  rows="4"
                  value={video.description}
                  onChange={(e) => setVideo({ ...video, description: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-700 resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-6 flex flex-col md:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="flex-1 py-4 rounded-2xl font-black text-slate-500 hover:bg-slate-100 transition-all border border-slate-200 uppercase tracking-widest text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-[2] bg-blue-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-100 hover:bg-slate-900 transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
                >
                  Save Changes <span className="text-lg">💾</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default EditVideo;