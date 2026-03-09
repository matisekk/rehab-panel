import { Route, Routes, Navigate } from "react-router-dom";
import SessionRoute from "./routes/SessionRoute";
import PrivateRoute from "./routes/PrivateRoute";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Layout from "../components/layouts/Layout";
import DashboardRoute from "./routes/DashboardRoute";

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/app/dashboard"
        element={
          <PrivateRoute>
            <Layout>
              <DashboardRoute />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/app"
        element={<Navigate to="/app/dashboard" replace />}
      />

      <Route
        path="/sessions/:sessionId"
        element={
          <PrivateRoute>
            <Layout>
              <SessionRoute />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/app" replace />} />
    </Routes>
  );
};

export default Router;
