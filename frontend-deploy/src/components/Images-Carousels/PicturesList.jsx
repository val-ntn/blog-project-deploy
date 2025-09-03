// frontend/src/components/Images-Carousels/PictureList.jsx

import { API_BASE_URL } from "../../utils/api";
import Picture from "./Picture";

export default function PicturesList({
  images,
  uploading,
  onUpload,
  onDelete,
  onSelect,
  viewMode,
  showCopyButton,
}) {
  return (
    <>
      {onUpload && (
        <input
          type="file"
          accept="image/*"
          onChange={onUpload}
          disabled={uploading}
        />
      )}
      {uploading && <p>Uploading...</p>}

      {viewMode === "list" ? (
        <table>
          <tbody>
            {images.map((image) => (
              <Picture
                //key={image.name}
                key={image.filename}
                image={image}
                onSelect={onSelect}
                onDelete={onDelete}
                mode="list"
              />
            ))}
          </tbody>
        </table>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {images.map((image) => (
            <Picture
              //key={image.name}
              key={image.filename}
              image={image}
              onSelect={onSelect}
              onDelete={onDelete}
              mode="grid"
              showCopyButton={showCopyButton}
            />
          ))}
        </div>
      )}
    </>
  );
}
