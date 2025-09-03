// src/components/Admin/Dashboard/Controls/CarouselListControl.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import CarouselList from "../../../Images-Carousels/CarouselList";
import { API_BASE_URL } from "../../../../utils/api";

export default function CarouselListControl({
  refreshFlag,
  onRecycleRefresh,
  onEdit,
}) {
  const [carousels, setCarousels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // ✅ Add this

  useEffect(() => {
    fetchCarousels();
  }, [refreshFlag]);

  const fetchCarousels = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/carousels`, {
        withCredentials: true,
      });
      setCarousels(res.data);
    } catch (err) {
      console.error("Failed to fetch carousels", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this carousel?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_BASE_URL}/carousels/${id}`, {
        withCredentials: true,
      });
      setCarousels((prev) => prev.filter((c) => c._id !== id));
      if (onRecycleRefresh) onRecycleRefresh();
    } catch (err) {
      console.error("Soft delete failed", err);
      alert("Failed to delete carousel.");
    }
  };

  return (
    <div>
      <h3>All Carousels</h3>

      {/* ✅ View Toggle Button */}
      <div style={{ marginBottom: "1rem" }}>
        <button
          onClick={() =>
            setViewMode((prev) => (prev === "grid" ? "list" : "grid"))
          }
        >
          Switch to {viewMode === "grid" ? "List View" : "Thumbnail View"}
        </button>
      </div>

      {/* ✅ Final Output */}
      {loading ? (
        <p>Loading carousels...</p>
      ) : carousels.length === 0 ? (
        <p>No carousels found.</p>
      ) : (
        <CarouselList
          carousels={carousels}
          onDelete={handleDelete}
          onSelect={onEdit}
          viewMode={viewMode}
        />
      )}
    </div>
  );
}
