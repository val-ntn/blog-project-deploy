// src/components/Events/EventList.jsx
import React, { useEffect, useState } from "react";
import EventItem from "./EventItem";
import { API_BASE_URL } from "../../utils/api";
import PropTypes from "prop-types";

export default function EventList({
  limit,
  onlyUpcoming,
  size = "medium",
  renderActions,
  refreshFlag,
  linkToDetail = false,
}) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const start = performance.now(); // Start timing
    fetch(`${API_BASE_URL}/events`)
      .then((res) => res.json())
      .then((data) => {
        const end = performance.now(); // End timing
        console.log(`EventList fetch took ${end - start} ms`); // console log timer
        let filtered = data;

        if (onlyUpcoming) {
          const now = new Date();
          filtered = data.filter((event) => new Date(event.startDate) >= now);
        }

        const sorted = filtered.sort(
          (a, b) => new Date(a.startDate) - new Date(b.startDate)
        );

        setEvents(limit ? sorted.slice(0, limit) : sorted);
      })
      .catch((err) => console.error("Failed to fetch events:", err));
  }, [limit, onlyUpcoming, refreshFlag]);

  return (
    <div className="event-list--wrapper">
      {events.length === 0 && <p>No events found</p>}
      {events.map((event, index) => (
  <React.Fragment key={event._id}>
    <EventItem event={event} size={size} linkToDetail={linkToDetail} />
    {renderActions && renderActions(event)}
    {/*{index < events.length - 1 && <div className="card__divider" />}*/}
  </React.Fragment>
))}
    </div>
  );
}

EventList.propTypes = {
  limit: PropTypes.number,
  onlyUpcoming: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"]), 
  renderActions: PropTypes.func, // (event) => ReactNode
  refreshFlag: PropTypes.any,    // used only as dependency
  linkToDetail: PropTypes.bool,
};
