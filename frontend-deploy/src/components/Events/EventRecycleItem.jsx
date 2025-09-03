// src/components/Events/EventRecycleItem.jsx
import PropTypes from "prop-types";

export default function EventRecycleItem({ event, onRestore, onDelete }) {
  return (
    <div className="event-recycle-item">
      <h4>{event.title}</h4>
      <div>
        <button  type="button" onClick={() => onRestore(event._id)}>Restore</button>
        <button  type="button" onClick={() => onDelete(event._id)}>🗑 Delete</button>
      </div>
    </div>
  );
}

EventRecycleItem.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onRestore: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};