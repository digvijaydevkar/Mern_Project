import React, { useState } from 'react';
import Navbar from '../component/Navbar';

function AboutUs() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* HERO SECTION */}
      <div className="bg-slate-900 py-16 px-6 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold mb-4">About Sunbeam Institute</h1>
          <p className="text-slate-400 text-lg">
            A premium turnkey solution provider and multi-technology competency center.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* MAIN CONTENT */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
              
              {/* LOGO SECTION */}
              <div className="flex justify-center mb-8">
                <img 
                  src='/sunbeam1.png'
                  alt="Sunbeam Logo" 
                  className="h-40 w-auto object-contain rounded-xl"
                />
              </div>

              {/* TEXT CONTENT */}
              <div className="space-y-6 text-slate-600 leading-relaxed text-md">
                <p className="text-slate-900 font-semibold italic border-l-4 border-blue-600 pl-4">
                  "At Sunbeam we believe retaining a competitive edge is imperative for any individual in today's professional world."
                </p>
                <p>
                  Sunbeam's expertise in effectively delivering training, solutions & services has made it a favored institution to many students & professionals focused on an aggressive career growth strategy.
                </p>
                <p>
                  Since its humble beginnings in the late 90's, Sunbeam Group has evolved into a multi-technology, multi-location competency center capable of delivering high-end technological training in diverse modes.
                </p>
              </div>

              {/* INFRASTRUCTURE ACCORDION */}
              <div className="mt-10 pt-8 border-t border-slate-100">
                <div 
                  className="flex justify-between items-center cursor-pointer p-4 bg-slate-50 rounded-2xl"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <h3 className="font-bold text-slate-800">Campus Infrastructure</h3>
                  <span className="text-blue-600 font-bold">{isOpen ? '−' : '+'}</span>
                </div>

                {isOpen && (
                  <div className="mt-6 space-y-4 text-sm text-slate-600 animate-in fade-in">
                    <p>• <strong>Location:</strong> Hinjawadi Phase 2, Pune (Opposite Infosys Phase 2).</p>
                    <p>• <strong>Campus:</strong> 70,000 sq. ft. world-class academic and computing infrastructure.</p>
                    <p>• <strong>Facilities:</strong> Air-conditioned classrooms, state-of-the-art labs, library, and canteen.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-4">
            <div className="bg-gradient-to-b from-blue-600 to-blue-800 rounded-3xl p-8 text-white shadow-xl text-center">
              <h4 className="text-2xl font-bold mb-4">Registration</h4>
              <p className="text-blue-100 text-sm mb-8">
                Join our community and start your journey with the most preferred IT training institute.
              </p>
              <button className="w-full bg-white text-blue-700 font-bold py-3 rounded-xl hover:bg-slate-50 transition-all uppercase tracking-wider text-xs">
                Register Now
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AboutUs;