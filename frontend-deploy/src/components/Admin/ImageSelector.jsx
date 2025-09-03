// frontend/src/components/admin/ImageSelector.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../utils/api";
import PropTypes from "prop-types";
import PicturesList from "../Images-Carousels/PicturesList";
import Button from "../UI/Button";

export default function ImageSelector({ onSelect }) {
  const [images, setImages] = useState([]);
  const [open, setOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    if (open) {
      axios
        .get(`${API_BASE_URL}/upload/images`, { withCredentials: true })
        .then((res) => setImages(res.data))
        .catch(console.error);
    }
  }, [open]);

  const handleSelect = (url) => {
    onSelect(url);
    setOpen(false);
  };

  return (
    <div>
      <Button type="button" onClick={() => setOpen(!open)} variant="primary">
        Insert Image
      </Button>

      {open && (
        <div
          style={{
            marginTop: "1rem",
            border: "1px solid #ccc",
            padding: "1rem",
            borderRadius: "8px",
            background: "#f9f9f9",
            maxHeight: "300px",
            overflowY: "auto",
          }}
        >
          {images.length === 0 && <p>No images available</p>}

          {/* 👇 Toggle View Mode */}
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
            onSelect={handleSelect}
            viewMode={viewMode}
            showCopyButton
          />
        </div>
      )}
    </div>
  );
}

ImageSelector.propTypes = {
  onSelect: PropTypes.func.isRequired,
};