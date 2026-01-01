import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function AdminNavbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-blue-600 z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* LEFT: Branding aligned with Student Portal Style */}
                    <div className="flex items-center gap-3">
                        <Link to="/AdminHome" className="text-white font-bold text-xl tracking-tight">
                            Admin <span className="font-light">Portal</span>
                        </Link>
                    </div>

                    {/* RIGHT: Actions */}
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-4 text-sm font-bold">
                            <Link
                                to="/home"
                                className="bg-white/20 text-white px-4 py-2 rounded-xl backdrop-blur-md hover:bg-white hover:text-blue-600 transition-all duration-300 border border-white/30"
                            >
                                View Site
                            </Link>

                            <Link
                                to="/AdminHome"
                                className="bg-white text-blue-600 px-4 py-2 rounded-xl shadow-md hover:bg-blue-50 hover:scale-105 transition-all duration-300"
                            >
                                Dashboard
                            </Link>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="bg-white text-blue-600 px-5 py-1.5 rounded-full text-sm font-bold 
                                     hover:bg-blue-50 transition-all shadow-sm active:scale-95"
                        >
                            Logout
                        </button>

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden text-white"
                        >
                            {isMobileMenuOpen ? '✕' : '☰'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-blue-700 p-4 border-t border-blue-500/30">
                    <div className="flex flex-col gap-3 text-white font-medium">
                        <Link to="/admin-home" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
                        <Link to="/all-courses" onClick={() => setIsMobileMenuOpen(false)}>Manage Courses</Link>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default AdminNavbar