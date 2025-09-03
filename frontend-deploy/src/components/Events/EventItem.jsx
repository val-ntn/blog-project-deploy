

// src/components/Events/EventItem.jsx
import React from "react";
import { formatDateRange, getExcerpt } from "../../utils/format";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * EventItem renders an event in one of three sizes:
 * - "small": excerpt only
 * - "medium": description
 * - "large": description + extra meta
 */
export default function EventItem({ event, size = "medium", linkToDetail = false, noShadow = false }) {
  let contentToRender;
  let shouldLink = linkToDetail;
  let showExtraMeta = false;
  //let sizeClass = "";

  switch (size) {
    case "small":
      contentToRender = event.excerpt || getExcerpt(event.description, 60);
      //sizeClass = "event-item--small";
      break;
    case "medium":
      contentToRender = event.description;
      //sizeClass = "event-item--medium";
      break;
    case "large":
      contentToRender = event.description;
      showExtraMeta = true;
      //sizeClass = "event-item--large";
      shouldLink = false; // large events do not link
      break;
    default:
      contentToRender = event.description;
      //sizeClass = "event-item--medium";
  }

  function getId(id) {
    if (!id) return "";
    if (typeof id === "object" && "$oid" in id) return id.$oid;
    return id;
  }

  const body = (
    <div className={`event-item event-item--${size} event-item--${size}--wrapper ${noShadow ? "no-shadow" : ""}`}>
    {/*<div className={`event-item ${sizeClass} ${sizeClass}--wrapper`}>*/}
          {/* Title (always full width, on top) */}
    <h4 className={`event-item__title event-item__title--${size}`}>
      {event.title}
    </h4>
    {/* Content wrapper (row) */}
    <div className="event-item__body">
      {/* Main column */}
      <div className="event-item__col event-item__col--main">
      
        {contentToRender && <p className="event-item__text">{contentToRender}</p>}
        <small className="card__date">
          {formatDateRange(event.startDate, event.endDate)}
        </small>
      </div>

      {/* Extra meta column (only for large events) */}
      {showExtraMeta && (
        <div className="event-item__col event-item__col--meta">
          {event.location && <p><strong>📍 Location:</strong> {event.location}</p>}
          {event.schedule && <p><strong>🕒 Schedule:</strong> {event.schedule}</p>}
          {event.costs && <p><strong>💲 Costs:</strong> {event.costs}</p>}
          {event.contact && <p><strong>☎ Contact:</strong> {event.contact}</p>}
          {event.source && (
            <p>
              <a href={event.source} target="_blank" rel="noopener noreferrer">
                Visit website
              </a>
            </p>
          )}
        </div>
      )}
      </div>
    </div>
  );

  return shouldLink ? (
    <Link to={`/events/${getId(event._id)}`} className="event-item__link">
      {body}
    </Link>
  ) : (
    body
  );
}

EventItem.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({ $oid: PropTypes.string }),
    ]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    excerpt: PropTypes.string,
    startDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    endDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    location: PropTypes.string,
    schedule: PropTypes.string,
    costs: PropTypes.string,
    contact: PropTypes.string,
    source: PropTypes.string,
  }).isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  linkToDetail: PropTypes.bool,
};
