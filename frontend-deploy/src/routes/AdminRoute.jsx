// src/routes/AdminRoute
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/admin/login" />;
  if (user.role !== "admin") return <Navigate to="/unauthorized" />;

  return children;
};

export default AdminRoute;
