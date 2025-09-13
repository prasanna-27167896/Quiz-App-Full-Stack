import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { routes } from "../App";

const Navbar = ({ handleReset }) => {
  return (
    <>
      <nav className="flex justify-between items-center p-4 bg-slate-900/80 shadow-md border-b border-slate-700">
        <h1 className="text-2xl font-bold text-blue-400">Quiz App</h1>
        <div className="flex gap-3">
          {handleReset && (
            <button
              className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg shadow transition cursor-pointer"
              onClick={handleReset}
            >
              Restart
            </button>
          )}
          <Link to={routes.protectedRoutes.logout} replace={true}>
            <button className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg shadow transition cursor-pointer">
              Logout
            </button>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
