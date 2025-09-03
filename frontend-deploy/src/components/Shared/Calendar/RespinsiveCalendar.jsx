
// frontend/src/components/Shared/Calendar/ResponsiveCalendar.jsx
import { useEffect, useRef } from "react";
import SmallCalendar from "./SmallCalendar";

export default function ResponsiveCalendar(props) {
  const calendarRef = useRef(null);

  useEffect(() => {
    function updateCalendar() {
      if (!calendarRef.current) return;

      const containerWidth = calendarRef.current.offsetWidth;

      // --- Resize day tiles ---
      const tileSize = containerWidth / 7;
      calendarRef.current.querySelectorAll(".react-calendar__tile").forEach((tile) => {
        tile.style.height = `${tileSize}px`;
        tile.style.lineHeight = `${tileSize}px`;

        if (containerWidth > 360) tile.style.fontSize = 'var(--font-size-md)'; // 16px
        else if (containerWidth > 300) tile.style.fontSize = 'var(--font-size-xs)'; // 12px
        else tile.style.fontSize = '0.625rem'; // 10px
      });

      // --- Adjust weekday font size ---
      const weekdayDiv = calendarRef.current.querySelector(".weekday");
      if (weekdayDiv) {
        if (containerWidth > 360) weekdayDiv.style.fontSize = "1.25rem";
        else if (containerWidth > 300) weekdayDiv.style.fontSize = "1.1rem";
        else weekdayDiv.style.fontSize = "1rem";
      }

      // --- Adjust month-year font size ---
      const monthYearDiv = calendarRef.current.querySelector(".month-year");
      if (monthYearDiv) {
        if (containerWidth > 360) monthYearDiv.style.fontSize = "1rem";
        else if (containerWidth > 300) monthYearDiv.style.fontSize = "0.875rem";
        else monthYearDiv.style.fontSize = "0.75rem";
      }

      // --- Adjust navigation font size ---
      const navElements = calendarRef.current.querySelectorAll(".nav-controls, .nav-controls span, .nav-controls button");
      navElements.forEach(el => {
        if (containerWidth > 360) el.style.fontSize = "0.75rem";
        else if (containerWidth > 300) el.style.fontSize = "0.625rem";
        else el.style.fontSize = "0.5rem";
      });

      // --- Hide year navigation below 300px ---
      const yearNav = calendarRef.current.querySelector(".year-nav");
      if (yearNav) {
        yearNav.style.display = containerWidth <= 300 ? "none" : "flex";
      }
    }

    // Initial update
    updateCalendar();

    // Update on window resize
    window.addEventListener("resize", updateCalendar);
    return () => window.removeEventListener("resize", updateCalendar);
  }, [props.selectedDate]);

  return (
    <div ref={calendarRef} style={{ width: "100%" }}>
      <SmallCalendar {...props} />
    </div>
  );
}
