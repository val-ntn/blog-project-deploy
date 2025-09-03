// frontend/src/components/Images-Carousels/PictureRecycleList.jsx

// frontend/src/components/Images-Carousels/PictureRecycleList.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import PictureRecycleItem from "./PictureRecycleItem";
import { API_BASE_URL } from "../../utils/api";

export default function PictureRecycleList({ onRestore, refreshFlag }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/upload/images/bin`, { withCredentials: true })
      .then((res) => setImages(res.data))
      .catch(console.error);
  }, [refreshFlag]);

  const handleRestore = async (id) => {
    try {
      await axios.patch(
        `${API_BASE_URL}/upload/images/restore/${id}`,
        {},
        { withCredentials: true }
      );
      setImages(images.filter((img) => img._id !== id)); // ✅ use _id

      if (onRestore) onRestore();
    } catch (err) {
      console.error("Restore failed:", err);
    }
  };

  const handlePermanentDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete this image? This cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_BASE_URL}/upload/images/hard/${id}`, {
        withCredentials: true,
      });
      setImages(images.filter((img) => img._id !== id)); // ✅ consistent

      if (onRestore) onRestore();
    } catch (err) {
      console.error("Permanent delete failed:", err);
    }
  };

  return (
    <div>
      <h3>Deleted Images</h3>
      {images.length === 0 && <p>No deleted images.</p>}
      {images.map((image) => (
        <PictureRecycleItem
          key={image._id}
          image={image}
          onRestore={() => handleRestore(image._id)}
          onDelete={() => handlePermanentDelete(image._id)}
        />
      ))}
    </div>
  );
}
