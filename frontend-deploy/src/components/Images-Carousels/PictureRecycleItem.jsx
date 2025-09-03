// frontend/src/components/Images-Carousels/PictureRecycleItem.jsx

import { API_BASE_URL } from "../../utils/api";

export default function PictureRecycleItem({ image, onRestore, onDelete }) {
  const imageUrl = `${API_BASE_URL}/uploads/${image.filename}`;

  return (
    <div className="picture-recycle-item">
      <h4>{image.originalName || image.filename}</h4>
      <img
        src={imageUrl}
        alt={image.originalName || "Deleted image"}
        width={100}
      />
      <div>
        <button onClick={() => onRestore(image.filename)}>Restore</button>
        <button onClick={() => onDelete(image.filename)}>🗑 Delete</button>
      </div>
    </div>
  );
}
