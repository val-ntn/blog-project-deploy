//frontend/src/pages/user/EventDetail.jsx

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../utils/api";
import EventItem from "../../components/Events/EventItem";
import "../../styles/layout.css"; // layout and container styles
import "../../styles/pages.css"; // page-specific styles

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/events/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch event");
        return res.json();
      })
      .then((data) => {
        console.log("Fetched event:", data);
        setEvent(data);
      })
      .catch(console.error);
  }, [id]);

  if (!event) return <p>Loading...</p>;

  return (
    <div className="page-content page-content--event-detail">
  <EventItem event={event} size="large" noShadow/>
  </div>
);
}
