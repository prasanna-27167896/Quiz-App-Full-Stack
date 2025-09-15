import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../App";

const Navbar = ({ handleReset }) => {
  return (
    <nav className="flex flex-wrap justify-between items-center p-4 bg-slate-900/80 shadow-md border-b border-slate-700">
      {/* Logo */}
      <h1 className="text-xl sm:text-2xl font-bold text-blue-400">Quiz App</h1>

      {/* Actions */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mt-2 sm:mt-0">
        {handleReset && (
          <button
            className="bg-blue-600 hover:bg-blue-500 px-3 sm:px-4 py-2 rounded-lg shadow transition cursor-pointer text-sm sm:text-base"
            onClick={handleReset}
          >
            Restart
          </button>
        )}
        <Link to={routes.protectedRoutes.logout} replace={true}>
          <button className="bg-red-600 hover:bg-red-500 px-3 sm:px-4 py-2 rounded-lg shadow transition cursor-pointer text-sm sm:text-base">
            Logout
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
