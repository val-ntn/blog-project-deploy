// src/components/Shared/GetTeaserCard.jsx

/*import React, { useEffect, useState } from "react";
import TeaserCard from "./TeaserCard";
import PropTypes from "prop-types";
import { API_BASE_URL } from "../../../utils/api";

export default function GetTeaserCard({ type = "post", title, size: propSize }) {
  const [item, setItem] = useState(null);
  const [size, setSize] = useState(propSize || "small"); // initial size: prop or small

  // Fetch data
  useEffect(() => {
    let url = `${API_BASE_URL}/${type}s/latest`;
    if (title) url += `?title=${encodeURIComponent(title)}`;

    fetch(url)
      .then((res) => res.json())
      .then(setItem)
      .catch((err) => console.error("Error fetching TeaserCard:", err));
  }, [type, title]);

  // Update size dynamically if no prop was passed
  useEffect(() => {
    if (propSize) return; // skip resizing if size is controlled via prop

    const handleResize = () => {
      setSize(window.innerWidth > 600 ? "large" : "small");
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // set initial size
    return () => window.removeEventListener("resize", handleResize);
  }, [propSize]);

  if (!item) return <p>Loading...</p>;

  return <TeaserCard data={item} size={size} type={type} />;
}

GetTeaserCard.propTypes = {
  type: PropTypes.string,           // optional, default "post"
  title: PropTypes.string,          // optional
  size: PropTypes.string,           // optional, default handled internally
};*/

// src/components/Shared/GetTeaserCard.jsx
import React, { useEffect, useState } from "react";
import TeaserCard from "./TeaserCard";
import PropTypes from "prop-types";
import { API_BASE_URL } from "../../../utils/api";

export default function GetTeaserCard({ type = "post", title, size }) {
  const [item, setItem] = useState(null);

  // Fetch data
  useEffect(() => {
    let url = `${API_BASE_URL}/${type}s/latest`;
    if (title) url += `?title=${encodeURIComponent(title)}`;

    fetch(url)
      .then((res) => res.json())
      .then(setItem)
      .catch((err) => console.error("Error fetching TeaserCard:", err));
  }, [type, title]);

  if (!item) return <p>Loading...</p>;

  return <TeaserCard data={item} size={size} type={type} />;
}

GetTeaserCard.propTypes = {
  type: PropTypes.string,          // optional, default "post"
  title: PropTypes.string,         // optional
  size: PropTypes.string,          // optional: if passed, forces size
};
