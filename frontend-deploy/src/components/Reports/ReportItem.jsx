// src/components/Reports/ReportItem.jsx

import { Link } from "react-router-dom";
import SafeHTMLRenderer from "../Common/SafeHTMLRenderer";
import CarouselItem from "../../components/Images-Carousels/CarouselItem";
import "./Reports.css";

/**
 * ReportItem displays a report in "small", "medium", or "large" size.
 * - "small" shows excerpt + "read more"
 * - "medium" shows full content
 * - "large" shows content + optional carousel
 */
export default function ReportItem({ report, size = "medium" }) {
  let contentToRender;
  let showReadMore = false;
  let showCarousel = false;
  //let sizeClass = "";

  switch (size) {
    case "small":
      contentToRender = report.excerpt;
      showReadMore = true;
      //sizeClass = "report-item--small";
      break;
    case "large":
      contentToRender = report.content;
      showCarousel = true;
      //sizeClass = "report-item--large";
      break;
    case "medium":
    default:
      contentToRender = report.content;
      //sizeClass = "report-item--medium";
  }

  function getId(id) {
    if (!id) return "";
    if (typeof id === "object" && "$oid" in id) return id.$oid;
    return id;
  }

  return (
    <div className={`card-item--${size}--wrapper`}>
  <div className={`report-item report-item--${size}`}>
  <h3 className={`card__title card__title--${size}`}>{report.title}</h3>
    {/*<div className={`report-item ${sizeClass}`}>
      <h3 className="card__title">{report.title}</h3>*/}

      {/* Safe HTML body */}
      <SafeHTMLRenderer content={contentToRender} />

      {/* "Read more" link for small variant */}
      {showReadMore && (
        <div className="report-item__read-more">
          <Link
            to={`/event-reports/${getId(report._id)}`}
            className="card__read-more"
          >
            Read More
          </Link>
        </div>
      )}

      {/* Carousel for large variant */}
      {showCarousel && report.carousel && (
        <div className="report-item__carousel">
          <CarouselItem carousel={report.carousel} />
        </div>
      )}

      {/* Meta info */}
      {report.author?.name && (
        <small className="card__meta">By: {report.author.name}</small>
      )}

      {report.event && (
        <small className="card__meta">
          | Related Event:{" "}
          <Link to={`/events/${getId(report.event._id)}`} className="detail-link">
            {report.event.title || report.event.name}
          </Link>
        </small>
      )}
    </div>
    </div>
  );
}
