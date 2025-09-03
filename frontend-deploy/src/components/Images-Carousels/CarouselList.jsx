// frontend/src/components/Images-Carousels/CarouselList.jsx

import CarouselItem from "./CarouselItem";

export default function CarouselList({
  carousels,
  onDelete,
  onSelect,
  disableDelete = false,
  viewMode = "grid",
}) {
  return (
    <div className={`carousel-list ${viewMode}`}>
      {carousels.map((carousel) => (
        <div key={carousel._id} className="carousel-list-item">
          <div onClick={() => onSelect?.(carousel)}>
            <CarouselItem carousel={carousel} />
          </div>
          {!disableDelete && onDelete && (
            <>
              <button onClick={() => onDelete(carousel._id)}>Delete</button>
              <button onClick={() => onSelect?.(carousel)}>Edit</button>{" "}
              {/* Add Edit */}
            </>
          )}
        </div>
      ))}
    </div>
  );
}
