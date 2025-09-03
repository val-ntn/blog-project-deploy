

// frontend/src/components/Shared/TeaserCard/TeaserCard.jsx
import { useEffect, useRef, useState } from "react";
import { formatDate } from "../../../utils/format";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./TeaserCard.css"; // only TeaserCard-specific overrides

export default function TeaserCard({ data, size: propSize, type }) {
  const [size, setSize] = useState(propSize || "small");
  const cardRef = useRef(null);

  // Observe card width dynamically if no prop was passed
  useEffect(() => {
    if (propSize) return; // skip auto-resize if parent forces size

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        setSize(width > 600 ? "large" : "small");
      }
    });

    if (cardRef.current) observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, [propSize]);

  if (!data) return null;

  const { thumbnail, title, teaser, createdAt, _id } = data;
  const isSmall = size === "small";

  return (
    <div ref={cardRef} className={`teaser-card ${isSmall ? "small" : "large"}`}>
      {thumbnail && (
        <div
          className="teaser-card__media"
          style={{ backgroundImage: `url(${thumbnail})` }}
        />
      )}
      <div className="teaser-card__body">
        <h3 className="card__title card__title--xl card__title--center">
          {title}
        </h3>
        {!isSmall && <div className="card__divider" />}
        {createdAt && (
          <small className="card__date">{formatDate(createdAt)}</small>
        )}
        {teaser && <p className="card__text">{teaser}</p>}
        {type && _id && (
          <div className="teaser-card__read-more">
          <Link to={`/${type}s/${_id}`} className="card__read-more">
    Read More
  </Link></div>
        )}
      </div>
    </div>
  );
}

TeaserCard.propTypes = {
  data: PropTypes.shape({
    thumbnail: PropTypes.string,
    title: PropTypes.string.isRequired,
    teaser: PropTypes.string,
    createdAt: PropTypes.string,
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  }).isRequired,
  size: PropTypes.oneOf(["small", "large"]), // optional
  type: PropTypes.string,
};

