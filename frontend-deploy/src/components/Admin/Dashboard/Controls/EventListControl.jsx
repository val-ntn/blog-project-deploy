//src/components/Admin/Dashboard/Controls/EventListControl.jsx

import EventList from "../../../Events/EventList";
import { API_BASE_URL } from "../../../../utils/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function EventListControl({
  refreshFlag,
  onRefresh,
  onRecycleRefresh,
  onEdit,
}) {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/events/${id}`, {
        withCredentials: true,
      });
      if (onRefresh) onRefresh();
      if (onRecycleRefresh) onRecycleRefresh();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div>
      <h3>All Events</h3>
      <EventList
        refreshFlag={refreshFlag}
        renderActions={(event) => (
          <div className="flex items-center gap-2">
            <button onClick={() => onEdit?.(event)}>✏ Edit</button>
            <button onClick={() => handleDelete(event._id)}>🗑 Delete</button>
            <button
              onClick={() => navigate(`/admin/events/${event._id}/reports`)}
            >
              📄 Reports
            </button>
          </div>
        )}
      />
    </div>
  );
}
