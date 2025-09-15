import React, { useEffect } from "react";
import { logoutUser } from "../../store/thunks/authThunk";
import { useDispatch } from "react-redux";
import useAuthState from "../../hooks/useAuthState";
import { useNavigate } from "react-router-dom";
import { routes } from "../../App";

const LogoutPage = () => {
  const { isAuthenticated } = useAuthState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(logoutUser(false));
      // toast.success("Logout Successfully");
    }

    const timeoutId = setTimeout(() => {
      navigate(routes.login, { replace: true });
    }, 5000);

    return () => clearTimeout(timeoutId); // cleanup on unmount
  }, [navigate, isAuthenticated, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-lg p-6 sm:p-8 text-center">
        <h1 className="text-xl sm:text-2xl font-bold text-primary mb-4">
          You’ve been logged out
        </h1>
        <p className="text-sm sm:text-base text-base-content">
          This page will redirect in <b>5 seconds</b> <br />
          Redirecting to <span className="text-secondary">Login</span>...
        </p>
      </div>
    </div>
  );
};

export default LogoutPage;
