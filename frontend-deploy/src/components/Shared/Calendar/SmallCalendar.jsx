


// frontend/src/components/Shared/Calendar/SmallCalendar.jsx

import React, { useState, useEffect } from "react";
import { useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { API_BASE_URL } from "../../../utils/api";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import "./SmallCalendar.css";
import EventItem from "../../Events/EventItem";

export default function SmallCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventMap, setEventMap] = useState({});
  const [viewDate, setViewDate] = useState(new Date()); // controls month/year
  const monthYearRef = useRef(null);  

  // Fetch events and map all dates for multi-day events
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/events`)
      .then((res) => {
        const events = res.data;
        const mapped = {};

        events.forEach((event) => {
          const start = new Date(event.startDate);
          const end = event.endDate ? new Date(event.endDate) : start;

          for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            const dateKey = d.toISOString().split("T")[0];
            if (!mapped[dateKey]) mapped[dateKey] = [];
            mapped[dateKey].push(event);
          }
        });

        setEventMap(mapped);
      })
      .catch((err) => console.error("Failed to fetch events:", err));
  }, []);

  const formatted = selectedDate.toISOString().split("T")[0];
  const todayEvents = eventMap[formatted] || [];

  const currentMonth = viewDate.toLocaleDateString("en-US", { month: "long" });
  const currentYear = viewDate.getFullYear();

  // Navigation handlers
  const incrementMonth = (amount) => {
    const newDate = new Date(viewDate);
    newDate.setMonth(newDate.getMonth() + amount);
    setViewDate(newDate);
  };

  const incrementYear = (amount) => {
    const newDate = new Date(viewDate);
    newDate.setFullYear(newDate.getFullYear() + amount);
    setViewDate(newDate);
  };

  return (
    <div className="calendar-container">
      {/* Header */}

      <div className="calendar-header">
  <div className="weekday">
    {selectedDate.toLocaleDateString("en-US", { weekday: "long" })}
  </div>

  <div className="month-year">
    <span className="day">{selectedDate.getDate()}</span>
    <span className="month"> {selectedDate.toLocaleDateString("en-US", { month: "long" })}</span>
    <span className="year"> {selectedDate.getFullYear()}</span>
  </div>

  <div className="nav-controls">
    <div className="month-nav">
      <button type="button" onClick={() => incrementMonth(-1)}><FaChevronLeft /></button>
      <span>{currentMonth}</span>
      <button type="button" onClick={() => incrementMonth(1)}><FaChevronRight /></button>
    </div>

    <div className="year-nav">
      <button type="button" onClick={() => incrementYear(-1)}><FaChevronLeft /></button>
      <span>{currentYear}</span>
      <button type="button" onClick={() => incrementYear(1)}><FaChevronRight /></button>
    </div>
  </div>
</div>



      {/* Calendar */}
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        activeStartDate={viewDate}
        onActiveStartDateChange={({ activeStartDate }) =>
          setViewDate(activeStartDate)
        }
        showNavigation={false}
        // Highlight tiles with events
        tileClassName={({ date }) => {
          const key = date.toISOString().split("T")[0];
          return eventMap[key] ? "event-tile" : "";
        }}
      />

      {/* Event details below calendar */}
      {todayEvents.length > 0 && (
        <div className="event-details">
          <h4>Events on {formatted}:</h4>
          {todayEvents.map((event) => (
            <EventItem
              key={event._id || event.id}
              event={event}
               size="small"
              linkToDetail
            />
          ))}
        </div>
      )}
    </div>
  );
}

