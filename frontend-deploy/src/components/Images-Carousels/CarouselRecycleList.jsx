// frontend/src/components/Images-Carousels/CarouselRecycleList.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import CarouselRecycleItem from "./CarouselRecycleItem";
import { API_BASE_URL } from "../../utils/api";

export default function CarouselRecycleList({ onRestore, refreshFlag }) {
  const [carousels, setCarousels] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/carousels/bin`, { withCredentials: true })
      .then((res) => setCarousels(res.data))
      .catch(console.error);
  }, [refreshFlag]);

  const handleRestore = async (id) => {
    await axios.patch(
      `${API_BASE_URL}/carousels/restore/${id}`,
      {},
      { withCredentials: true }
    );
    setCarousels((prev) => prev.filter((c) => c._id !== id));
    if (onRestore) onRestore();
  };

  const handlePermanentDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete this carousel? This action cannot be undone."
    );
    if (!confirmDelete) return;

    await axios.delete(`${API_BASE_URL}/carousels/hard/${id}`, {
      withCredentials: true,
    });
    setCarousels((prev) => prev.filter((c) => c._id !== id));
    if (onRestore) onRestore();
  };

  return (
    <div>
      <h3>Deleted Carousels</h3>
      {carousels.length === 0 && <p>No deleted carousels.</p>}
      {carousels.map((carousel) => (
        <CarouselRecycleItem
          key={carousel._id}
          carousel={carousel}
          onRestore={handleRestore}
          onDelete={handlePermanentDelete}
        />
      ))}
    </div>
  );
}
