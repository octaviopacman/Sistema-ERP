import {Navigate, Outlet} from "react-router-dom";
import {CircularProgress} from "@nextui-org/react";
import {useAuth} from "../src/context/AuthContext";

function OwnerProtectRoutes() {
  const {user, loading} = useAuth();
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <CircularProgress aria-label="Loading..." />
      </div>
    );
  }
  if (user) {
    if (!loading && user.role != "Owner") {
      return <Navigate to="/" replace />;
    }
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace />;
  }
}

export default OwnerProtectRoutes;
