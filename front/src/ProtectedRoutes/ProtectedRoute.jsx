import {Navigate, Outlet} from "react-router-dom";
import {CircularProgress} from "@nextui-org/react";
import {useAuth} from "../context/AuthContext";

function ProtectedRoutes() {
  const {user, loading} = useAuth();
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <CircularProgress aria-label="Loading..." />
      </div>
    );
  }
  if (!loading && !user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

export default ProtectedRoutes;
