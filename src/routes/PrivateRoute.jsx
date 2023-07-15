import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = () => {
  const { storedToken } = useAuth();

  return storedToken !== "" ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
