import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetPassword } from '../Services/studentServices';

function ResetPassword() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const onReset = async () => {
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        const result = await resetPassword(email, newPassword, confirmPassword);
        if (result.status === 'success') {
            toast.success("Password updated successfully");
            navigate('/login');
        } else {
            toast.error(result.data || "Failed to reset password");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md border-t-8 border-blue-500">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-black text-slate-800 mb-2">Reset Password</h2>
                    <p className="text-slate-500 font-medium">Update your account credentials</p>
                </div>

                <div className="space-y-6">
                    {/* Email Input */}
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Email Address</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">@</span>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                className="w-full bg-slate-800 text-white p-4 pl-12 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="name@email.com"
                            />
                        </div>
                    </div>

                    {/* New Password Input */}
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">New Password</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔒</span>
                            <input
                                onChange={(e) => setNewPassword(e.target.value)}
                                type="password"
                                className="w-full bg-slate-800 text-white p-4 pl-12 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="••••••"
                            />
                        </div>
                    </div>

                    {/* Confirm Password Input */}
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Confirm Password</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔒</span>
                            <input
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type="password"
                                className="w-full bg-slate-800 text-white p-4 pl-12 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="••••••"
                            />
                        </div>
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={onReset}
                        className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-blue-100"
                    >
                        Update Password 🔄
                    </button>

                    <div className="text-center mt-6">
                        <button onClick={() => navigate('/login')} className="text-sm font-bold text-slate-500 hover:text-blue-500">
                            Back to Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;