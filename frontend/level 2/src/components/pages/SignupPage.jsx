import React, { useEffect } from "react";
import useAuthState from "../../hooks/useAuthState";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { signupAPI } from "../../store/thunks/authThunk";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../App";

export default function SignupPage() {
  const { loading, email, isAuthenticated } = useAuthState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (email && !isAuthenticated) {
      navigate(routes.login);
    } else if (isAuthenticated) {
      navigate(routes.protectedRoutes.welcome);
    }
  }, [isAuthenticated, navigate]);

  const validationSchema = Yup.object({
    username: Yup.string().trim().required("Username is required"),
    email: Yup.string()
      .trim()
      .email("Invalid Email")
      .required("Email is required"),
    password: Yup.string().trim().required("Password is required"),
    confirmPassword: Yup.string()
      .trim()
      .oneOf([Yup.ref("password"), null], "Password must match"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(signupAPI(values)).unwrap();
        toast.success("Signup Successful");
        navigate(routes.login);
      } catch (error) {
        toast.error(error || "Signup failed");
      }
    },
  });

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-6">
          Sign Up
        </h2>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          {/* Username */}
          <div>
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="input input-bordered w-full"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-red-500 text-sm">{formik.errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="input input-bordered w-full"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>

          {/* Button */}
          <button type="submit" className="btn btn-primary w-full mt-2">
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* Extra links */}
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to={routes.login} className="text-secondary font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
