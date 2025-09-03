// frontend/src/components/Admin/Forms/CarouselForm/CarouselForm.jsx

import { useState, useEffect } from "react";
import ImageSelector from "../../ImageSelector";
import axios from "axios";
import { API_BASE_URL } from "../../../../utils/api";
import CarouselLivePreview from "../../../Images-Carousels/CarouselLivePreview";
import Button from "../../../UI/Button";

export default function CarouselForm({
  initialData = null,
  onCreateSuccess,
  onClose,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [images, setImages] = useState([]);
  const [type, setType] = useState("basic");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setImages(initialData.images || []);
      setType(initialData.type || "basic");
      setDescription(initialData.description || "");
      setExternalLink(initialData.externalLink || "");
      setIsActive(initialData.isActive ?? true);
    } else {
      setTitle("");
      setImages([]);
      setType("basic");
      setDescription("");
      setExternalLink("");
      setIsActive(true);
    }
  }, [initialData]);

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setExternalLink("");
    setIsActive(true);
    setImages([]);
    setType("basic");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!images.length) {
      alert("Please select at least one image.");
      return;
    }

    const newCarouselItem = {
      title,
      description,
      images,
      externalLink,
      isActive,
      type,
    };

    try {
      if (initialData?._id) {
        await axios.put(
          `${API_BASE_URL}/carousels/${initialData._id}`,
          newCarouselItem,
          {
            withCredentials: true,
          }
        );
        alert("Carousel updated!");
      } else {
        await axios.post(`${API_BASE_URL}/carousels`, newCarouselItem, {
          withCredentials: true,
        });
        alert("Carousel created!");
      }

      clearForm();
      onCreateSuccess?.();
      onClose?.();
    } catch (err) {
      console.error(err);
      alert("Error saving carousel item.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{initialData ? "Edit Carousel Item" : "Create Carousel Item"}</h3>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label>
        Carousel Type:
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{ marginLeft: "0.5rem" }}
          required
        >
          <option value="basic">Basic</option>
          <option value="thumbs">Thumbnails</option>
          <option value="multi-row">Multi-Row</option>
        </select>
      </label>

      <h4>Live Preview</h4>
      <div
        style={{
          border: "1px solid #ddd",
          padding: "1rem",
          marginBottom: "1rem",
        }}
      >
        <CarouselLivePreview type={type} images={images} />
      </div>

      <div style={{ margin: "1rem 0" }}>
        <ImageSelector
          onSelect={(url) => setImages((prev) => [...prev, url])}
        />

        {images.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              marginTop: "1rem",
            }}
          >
            {images.map((url, index) => (
              <div key={index} style={{ position: "relative" }}>
                <img
                  src={url}
                  alt={`Selected ${index + 1}`}
                  style={{ width: "100px", borderRadius: "6px" }}
                />
                <Button
                  type="button"
                  variant="delete-image"
                  onClick={() =>
                    setImages((prev) => prev.filter((_, i) => i !== index))
                  }
                >
                  ✖
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <input
        type="text"
        placeholder="External Link (optional)"
        value={externalLink}
        onChange={(e) => setExternalLink(e.target.value)}
      />

      <label>
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
        />
        Active
      </label>

      <Button type="submit" variant="primary">
        Save
      </Button>
    </form>
  );
}
