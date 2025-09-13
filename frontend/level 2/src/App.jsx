import React from "react";

import { Toaster } from "react-hot-toast";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import SignupPage from "./components/pages/SignupPage";
import LoginPage from "./components/pages/LoginPage";

import WelcomePage from "./components/WelcomePage";
import QuestionPage from "./components/QuestionPage";
import ResultPage from "./components/ResultsPage";
import ProtectedRoutes from "./components/ProtectedRoutes";

import LogoutPage from "./components/pages/LogoutPage";

export const routes = {
  signup: "/signup",
  login: "/login",
  protectedRoutes: {
    welcome: "/welcome",
    questions: "/questions",
    result: "/result",
    logout: "/logout",
  },
};

const router = createBrowserRouter([
  { path: "/", element: <Navigate to={routes.login} replace /> },
  {
    path: routes.signup,
    element: <SignupPage />,
  },
  {
    path: routes.login,
    element: <LoginPage />,
  },
  {
    path: routes.protectedRoutes.logout,
    element: <ProtectedRoutes element={<LogoutPage />} />,
  },
  {
    path: routes.protectedRoutes.welcome,
    element: <ProtectedRoutes element={<WelcomePage />} />,
  },
  {
    path: routes.protectedRoutes.questions,
    element: <ProtectedRoutes element={<QuestionPage />} />,
  },
  {
    path: routes.protectedRoutes.result,
    element: <ProtectedRoutes element={<ResultPage />} />,
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
};

export default App;
