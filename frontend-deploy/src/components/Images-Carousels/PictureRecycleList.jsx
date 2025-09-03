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

  const handleRestore = async (filename) => {
    await axios.patch(
      `${API_BASE_URL}/upload/images/restore/${filename}`,
      {},
      { withCredentials: true }
    );
    setImages(images.filter((img) => img.filename !== filename));

    if (onRestore) onRestore();
  };

  const handlePermanentDelete = async (filename) => {
    const confirm = window.confirm(
      "Are you sure you want to permanently delete this image? This cannot be undone."
    );
    if (!confirm) return;

    await axios.delete(`${API_BASE_URL}/upload/images/hard/${filename}`, {
      withCredentials: true,
    });
    setImages(images.filter((img) => img.filename !== filename));

    if (onRestore) onRestore();
  };

  return (
    <div>
      <h3>Deleted Images</h3>
      {images.length === 0 && <p>No deleted images.</p>}
      {images.map((image) => (
        <PictureRecycleItem
          key={image._id}
          image={image}
          onRestore={handleRestore}
          onDelete={handlePermanentDelete}
        />
      ))}
    </div>
  );
}
