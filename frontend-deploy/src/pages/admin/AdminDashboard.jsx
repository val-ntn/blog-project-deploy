// src/pages/admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../../components/Admin/Dashboard/Dashboard"; // import the child dashboard component
import LogoutButton from "../../components/Admin/Dashboard/LogoutButton";
import { API_BASE_URL } from "../../utils/api";
import "../../styles/layout.css";
import "../../styles/pages.css";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE_URL}/admin/dashboard`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 403) {
          throw new Error("Access denied: Admins only");
        }
        if (!res.ok) {
          throw new Error("Failed to authenticate");
        }
        return res.json();
      })
      .then(() => {
        setLoading(false);
        setError(null);
      })
      .catch(() => {
        setLoading(false);
        navigate("/admin/login"); // Redirect to login if not authorized
      });
  }, [navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="admin-content page-content--dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome, admin! You have access to this page.</p>
      <Dashboard /> {/* Render the dashboard UI component here */}
      {/* <LogoutButton /> */}
    </div>
  );
}
