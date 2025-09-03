// frontend/src/components/Images-Carousels/Picture.jsx

export default function Picture({
  image,
  onSelect,
  onDelete,
  mode,
  showCopyButton,
}) {
  //const imageUrl = `${API_BASE_URL}/uploads/${image.filename}`;
  const imageUrl = image.url;

  if (mode === "list") {
    return (
      <tr>
        <td>
          <img src={imageUrl} style={{ width: 32 }} />
        </td>
        <td>{image.originalName || image.filename}</td>
        <td>{imageUrl}</td>
        <td>
          {onSelect && <button onClick={() => onSelect(imageUrl)}>👁</button>}
          {onDelete && <button onClick={() => onDelete(image._id)}>❌</button>}
        </td>
      </tr>
    );
  }

  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      <img
        src={imageUrl}
        style={{ width: 100 }}
        onClick={() => onSelect?.(imageUrl)}
      />
      {onDelete && (
        <button
          onClick={() => onDelete(image._id)}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            background: "red",
            color: "white",
          }}
        >
          X
        </button>
      )}
      {showCopyButton && (
        <button
          type="button"
          onClick={() => navigator.clipboard.writeText(imageUrl)}
          style={{ marginTop: "0.5rem", fontSize: "0.8rem" }}
        >
          Copy URL
        </button>
      )}
    </div>
  );
}
