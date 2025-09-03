// src/pages/Calendar.jsx
import EventList from "../../components/Events/EventList";
import PageHeader from "../../components/Shared/PageHeader/PageHeader";
import "../../styles/layout.css"; // layout and container styles
import "../../styles/pages.css"; // page-specific styles

export default function Calendar() {
  return (

    <div className="page-content page-content--calendar">
      <PageHeader title="Calendar" />
      <EventList size="large" linkToDetail/>
      </div>

  );
}
