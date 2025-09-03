// frontend/src/components/Images-Carousels/CarouselRecycleItem.jsx

export default function CarouselRecycleItem({ carousel, onRestore, onDelete }) {
  return (
    <div className="carousel-recycle-item">
      <h4>{carousel.title}</h4>
      <div>
        <button onClick={() => onRestore(carousel._id)}>Restore</button>
        <button onClick={() => onDelete(carousel._id)}>🗑 Delete</button>
      </div>
    </div>
  );
}
