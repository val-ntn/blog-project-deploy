// frontend/src/components/Images-Carousels/PictureRecycleItem.jsx

export default function PictureRecycleItem({ image, onRestore, onDelete }) {
  const imageUrl = image.url; // Cloudinary URL

  return (
    <div className="picture-recycle-item">
      <h4>{image.originalName || image.filename}</h4>
      <img
        src={imageUrl}
        alt={image.originalName || "Deleted image"}
        width={100}
      />
      <div>
        <button onClick={() => onRestore(image._id)}>Restore</button>
        <button onClick={() => onDelete(image._id)}>🗑 Delete</button>
      </div>
    </div>
  );
}
