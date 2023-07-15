import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./components/layouts/RootLayout";
import DashBoard from "./pages/admin/DashBoard";
import Products from "./pages/admin/Products";
import Users from "./pages/admin/Users";
import Profile from "./pages/auth//Profile";
import Home from "./pages/Home";
import Register from "./pages/Register";
import AdminRoute from "./routes/AdminRoute";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />

          <Route path="/auth/*" element={<PrivateRoute />}>
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route path="/admin/*" element={<AdminRoute />}>
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="users" element={<Users />} />
            <Route path="products" element={<Products />} />
          </Route>
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
