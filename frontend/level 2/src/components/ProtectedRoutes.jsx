import { replace, useNavigate } from "react-router-dom";
import useAuthState from "../hooks/useAuthState";
import { useEffect } from "react";
import { routes } from "../App";

export default function ProtectedRoutes({ element }) {
  const { isAuthenticated, loading } = useAuthState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate(routes.login, { replace: true });
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return null;

  return <>{element}</>;
}
