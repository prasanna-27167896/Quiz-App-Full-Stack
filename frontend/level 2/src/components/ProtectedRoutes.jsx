import { useNavigate } from "react-router-dom";
import useAuthState from "../hooks/useAuthState";
import { useEffect } from "react";

export default function ProtectedRoutes({ element }) {
  const { isAuthenticated, loading } = useAuthState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return null;

  return <>{element}</>;
}
