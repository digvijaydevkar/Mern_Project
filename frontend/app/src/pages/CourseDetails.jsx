import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from '../component/Navbar'
import { getCourseInfo } from "../Services/studentServices";

function CourseDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    getCourse();
  }, [id]);

  const getCourse = async () => {
    try {
      const result = await getCourseInfo(id);
      if (result.status === "success" && result.data.length > 0) {
        setCourse(result.data[0]);
        console.log("COURSE DATA:", result.data[0]);
      }
    } catch (error) {
      console.error("API ERROR:", error);
    }
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center pt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          <h3 className="text-center mt-5 text-gray-600 font-medium">Loading course details...</h3>
        </div>
      </div>
    );
  }

  const courseImages = {
    "MERN": "https://upload.wikimedia.org/wikipedia/commons/9/94/MERN-logo.png",
    "Artificial Intellegence": "https://cdn-icons-png.flaticon.com/512/2103/2103633.png",
    "Android Development": "https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg",
    "Python Programming": "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
    "Java Programming": "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg",
    "Web Development": "https://cdn-icons-png.flaticon.com/512/2210/2210153.png"
  };
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* HEADER HERO SECTION */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 py-16 px-6 text-white">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sky-400 hover:text-sky-300 mb-6 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="15 19l-7-7 7-7" />
            </svg>
            Back to Courses
          </button>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{course.course_name}</h1>
          <p className="text-slate-300 text-lg max-w-3xl leading-relaxed">
            {course.description || "Master industry-leading skills with our comprehensive curriculum designed for career success."}
          </p>
        </div>
      </div>

      {/* MAIN CONTENT CARD */}
      <div className="max-w-6xl mx-auto px-6 -mt-12 pb-20">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-12">

            {/* LEFT SIDE: PREVIEW */}
            <div className="lg:col-span-5 bg-slate-50 p-10 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-100">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <img
                  // Use .trim() to ensure "Android Development " becomes "Android Development"
                  src={courseImages[course.course_name.trim()] || "https://cdn-icons-png.flaticon.com/512/2436/2436636.png"}
                  alt={course.course_name}
                  className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="mt-8 text-center">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  Official Certification
                </span>
              </div>
            </div>

            {/* RIGHT SIDE: DETAILS */}
            <div className="lg:col-span-7 p-8 md:p-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-8">Course Highlights</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {/* START DATE */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase">Start Date</p>
                    <p className="text-slate-800 font-semibold">{new Date(course.start_date).toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                  </div>
                </div>

                {/* END DATE */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="bg-purple-100 p-3 rounded-xl text-purple-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase">Duration End</p>
                    <p className="text-slate-800 font-semibold">{new Date(course.end_date).toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                  </div>
                </div>

                {/* ACCESS */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="bg-orange-100 p-3 rounded-xl text-orange-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase">Video Access</p>
                    <p className="text-slate-800 font-semibold">{course.video_expire_days} Days</p>
                  </div>
                </div>

                {/* PRICE */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <p className="text-xs text-emerald-600 font-bold uppercase">Total Fees</p>
                    <p className="text-emerald-800 text-xl font-bold">₹{course.fees}</p>
                  </div>
                </div>
              </div>

              {/* FINAL ACTION */}
              <button
                onClick={() => navigate(`/Register/${course.course_id}`)}
                className="w-full py-4 px-6 rounded-2xl bg-blue-600 text-white text-lg font-bold
                                hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-200 
                                flex items-center justify-center gap-3"
              >
                Enroll in this Course
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;