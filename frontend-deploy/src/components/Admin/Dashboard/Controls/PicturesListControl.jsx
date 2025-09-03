// src/components/Admin/Dashboard/Controls/PicturesListControl.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import PicturesList from "../../../Images-Carousels/PicturesList";
import { API_BASE_URL } from "../../../../utils/api";

export default function PicturesListControl() {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // NEW

  const fetchImages = () => {
    axios
      .get(`${API_BASE_URL}/upload/images`, { withCredentials: true })
      .then((res) => setImages(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      await axios.post(`${API_BASE_URL}/upload/images`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      fetchImages();
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (imageName) => {
    try {
      await axios.delete(`${API_BASE_URL}/upload/images/${imageName}`, {
        withCredentials: true,
      });
      fetchImages();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div>
      <h3>Manage Pictures</h3>

      {/* 👇 Toggle Button */}
      <div style={{ marginBottom: "1rem" }}>
        <button
          type="button"
          onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
        >
          Switch to {viewMode === "grid" ? "List View" : "Thumbnail View"}
        </button>
      </div>

      <PicturesList
        images={images}
        uploading={uploading}
        onUpload={handleUpload}
        onDelete={handleDelete}
        viewMode={viewMode} // 👈 Pass it in
      />
    </div>
  );
}
