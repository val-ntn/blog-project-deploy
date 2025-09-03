// src/components/Reports/LatestReport.jsx

import React, { useEffect, useState } from "react";
import ReportItem from "./ReportItem";
import { API_BASE_URL } from "../../utils/api";

function LatestReport() {
  const [report, setReport] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/event-reports/latest`)
      .then((res) => res.json())
      .then(setReport)
      .catch(console.error);
  }, []);

  if (!report) return <p>Loading...</p>;

  return <ReportItem report={report} size="small" />;
}

export default LatestReport;
