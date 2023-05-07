import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import decode from "jwt-decode";

const AdminRoute = () => {
  const { storedToken } = useAuth();
  const decodedToken = decode(storedToken);

  return storedToken !== "" && decodedToken?.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminRoute;
