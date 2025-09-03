

// src/components/Events/UpcomingEvents.jsx

import React, { useEffect, useState } from "react";
import EventItem from "./EventItem";
import { API_BASE_URL } from "../../utils/api";
import PropTypes from "prop-types";
import { FaChevronDown } from "react-icons/fa";
import SmallCalendar from "../Shared/Calendar/SmallCalendar";
import "./Events.css";
import ResponsiveCalendar from "../Shared/Calendar/RespinsiveCalendar";

export default function UpcomingEvents({ limit = 3 }) {
  const [events, setEvents] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const start = performance.now();
    fetch(`${API_BASE_URL}/events/upcoming?limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        const end = performance.now();
        console.log(`UpcomingEvents fetch took ${end - start} ms`);
        setEvents(data);
      })
      .catch((err) => console.error("Error loading upcoming events:", err));
  }, [limit]);

  // Track screen size changes
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 899;
      setIsMobile(mobile);
      setCollapsed(mobile); // collapse by default if small
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // run on mount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (events.length === 0) return <p>No upcoming events.</p>;

  return (
    <div className="upcoming-events">
      <h2
        className={`upcoming-events__title ${isMobile ? "upcoming-events__title--toggleable" : ""}`}
        onClick={() => isMobile && setCollapsed((prev) => !prev)}
      >
        Upcoming Events
        {isMobile && (
          <FaChevronDown
            className={`upcoming-events__chevron ${collapsed ? "" : "upcoming-events__chevron--rotated"}`}
          />
        )}
      </h2>

      {/* Only show list if not collapsed */}
      {(!isMobile || !collapsed) && (
        <div className="upcoming-events__content-wrapper">
          <div className="upcoming-events__list">
            {events.map((event) => (
              <React.Fragment key={event._id}>
                <EventItem event={event} size="medium" linkToDetail/>
                <div className="card__divider" />
              </React.Fragment>
            ))}
          </div>
          <div className="upcoming-events__calendar-wrapper">
            <ResponsiveCalendar/>
          </div>
        </div>   
      )}
    </div>
  );
}

UpcomingEvents.propTypes = {
  limit: PropTypes.number,
};
