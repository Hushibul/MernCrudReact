import decode from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AdminRoute = () => {
  const { storedToken } = useAuth();
  const decodedToken = decode(storedToken);

  return storedToken !== "" && decodedToken?.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default AdminRoute;
