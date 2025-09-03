// frontend/src/components/Shared/Calendar/CalendarPopup.jsx

import { useState } from "react";
import SmallCalendar from "./SmallCalendar";

export default function CalendarPopup() {
  const [show, setShow] = useState(false);
  const [initialDate, setInitialDate] = useState(new Date());

  const openForDate = (date) => {
    setInitialDate(date);
    setShow(true);
  };

  return (
    <div>
      <button onClick={() => openForDate(new Date())}>📅 Open Calendar</button>

      {show && (
        <div className="calendar-popup">
          <button onClick={() => setShow(false)}>✖ Close</button>
          <SmallCalendar initialDate={initialDate} />
        </div>
      )}
    </div>
  );
}
