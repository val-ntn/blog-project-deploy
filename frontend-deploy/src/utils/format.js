// src/utils/format.js

import htmlTruncate from "html-truncate";

export function getExcerpt(htmlString, length = 200) {
  if (!htmlString) return "";
  return htmlTruncate(htmlString, length);
}

export function formatDate(dateString, locale = "en-US", options = {}) {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options,
  });
}

export function formatDateRange(startDate, endDate, locale = "en-US") {
  if (!startDate) return "";
  const formattedStart = formatDate(startDate, locale);

  if (!endDate || startDate === endDate) {
    return formattedStart;
  }

  const formattedEnd = formatDate(endDate, locale);
  return `${formattedStart} - ${formattedEnd}`;
}
