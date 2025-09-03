// src/components/Events/EventRecycleList.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import EventRecycleItem from "./EventRecycleItem";
import { API_BASE_URL } from "../../utils/api";
import PropTypes from "prop-types";

export default function EventRecycleList({ onRestore, refreshFlag }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/events/bin`, { withCredentials: true })
      .then((res) => setEvents(res.data))
      .catch(console.error);
  }, [refreshFlag]);

  const handleRestore = async (id) => {
    await axios.patch(
      `${API_BASE_URL}/events/restore/${id}`,
      {},
      { withCredentials: true }
    );
    setEvents(events.filter((e) => e._id !== id));

    if (onRestore) onRestore();
  };

  const handlePermanentDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to permanently delete this event? This cannot be undone."
    );
    if (!confirm) return;

    await axios.delete(`${API_BASE_URL}/events/hard/${id}`, {
      withCredentials: true,
    });
    setEvents(events.filter((e) => e._id !== id));

    if (onRestore) onRestore();
  };

  return (
    <div>
      <h3>Deleted Events</h3>
      {events.length === 0 && <p>No deleted events.</p>}
      {events.map((event) => (
        <EventRecycleItem
          key={event._id}
          event={event}
          onRestore={handleRestore}
          onDelete={handlePermanentDelete}
        />
      ))}
    </div>
  );
}


EventRecycleList.propTypes = {
  onRestore: PropTypes.func, // optional
  refreshFlag: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool,
  ]),
};