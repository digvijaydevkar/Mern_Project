import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App";

function Navbar() {
  const navigate = useNavigate();
  const { loginStatus, setLoginStatus } = useContext(LoginContext);

  const logout = () => {
    localStorage.removeItem("token");
    setLoginStatus(false);
    navigate("/home");
  };

  return (
    <nav className="bg-gradient-to-r from-sky-400 to-blue-600 px-4 py-3 flex justify-between items-center">
      <h4
        className="text-white font-bold m-0 cursor-pointer"
        onClick={() => navigate("/home")}
      >
        Student Portal
      </h4>

      <div className="flex items-center gap-4 text-white">

        <span
          className="cursor-pointer hover:underline"
          onClick={() => navigate("/home")}
        >
          Home
        </span>

        <span
          className="cursor-pointer hover:underline"
          onClick={() => navigate("/AboutUs")}
        >
          About
        </span>

        {/* 🔥 CONDITIONAL PART */}
        {!loginStatus ? (
          /* BEFORE LOGIN */
          <button
            className="bg-white text-blue-600 px-4 py-1 rounded-full font-semibold hover:bg-gray-100"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        ) : (
          /* AFTER LOGIN */
          <>
            <span
              className="cursor-pointer hover:underline"
              onClick={() => navigate("/MyregisterCourse")}
            >
              My Courses
            </span>

            <button
              className="bg-white text-blue-600 px-4 py-1 rounded-full font-semibold hover:bg-gray-100"
              onClick={logout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
