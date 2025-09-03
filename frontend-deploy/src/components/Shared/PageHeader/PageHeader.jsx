// src/components/Shared/PageHeader.jsx
import React from "react";
import PropTypes from "prop-types";
import "./PageHeader.css";

export default function PageHeader({ title }) {
  return (
    <div className="page-header">
      <div className="page-header__spacer"></div>
      <h1 className="page-header__title">{title}</h1>
    </div>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
};
