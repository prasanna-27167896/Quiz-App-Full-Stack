import React from "react";
import { routes } from "../App";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-base-200">
      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <div className="flex flex-col items-center justify-center py-20">
        <div className="card w-[28rem] bg-base-100 shadow-xl p-8 text-center">
          {/* Title */}
          <h2 className="text-2xl font-bold mb-2">Are you ready?</h2>
          <p className="text-sm text-base-content mb-6">
            Let’s see how many questions you can answer:
          </p>

          {/* Instructions */}
          <ul className="text-left space-y-2 mb-6">
            <li className="flex items-center gap-2 text-success">
              <span>✔</span> There are <b>30 questions</b>
            </li>
            <li className="flex items-center gap-2 text-success">
              <span>✔</span> You need to pick <b>1 answer</b>
            </li>
          </ul>

          {/* Button */}
          <Link to={routes.protectedRoutes.questions}>
            <button className="btn btn-primary w-full">
              I’m Ready – Start the Quiz
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
