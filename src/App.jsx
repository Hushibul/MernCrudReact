import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./components/layouts/RootLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./routes/PrivateRoute";
import Profile from "./pages/Profile";
import AdminRoute from "./routes/AdminRoute";
import DashBoard from "./pages/admin/DashBoard";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/auth/*" element={<PrivateRoute />}>
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="/admin/*" element={<AdminRoute />}>
          <Route path="dashboard" element={<DashBoard />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
