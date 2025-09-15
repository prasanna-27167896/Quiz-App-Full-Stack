import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loginAPI } from "../../store/thunks/authThunk";
import useAuthState from "../../hooks/useAuthState";
import { routes } from "../../App";

export default function LoginPage() {
  const { isAuthenticated, loading, error, email } = useAuthState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redirect after login
  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Login Successful");
      navigate(routes.protectedRoutes.welcome, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const validationSchema = Yup.object({
    email: Yup.string()
      .trim()
      .email("Invalid Email")
      .required("Email is required"),
    password: Yup.string().trim().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: { email: email || "", password: "" },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => dispatch(loginAPI(values)),
  });

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-6">
          Login
        </h2>
        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-full mt-2">
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to={routes.signup} className="text-secondary font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
