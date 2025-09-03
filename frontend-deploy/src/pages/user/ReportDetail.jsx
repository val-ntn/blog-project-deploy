// src/pages/user/ReportDetail.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../utils/api";
import ReportItem from "../../components/Reports/ReportItem";
import "../../styles/layout.css"; // layout and container styles
import "../../styles/pages.css"; // page-specific styles

export default function ReportDetail() {
  const { id } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/event-reports/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch report");
        return res.json();
      })
      .then((data) => {
        console.log("Fetched report:", data);
        setReport(data);
      })
      .catch(console.error);
  }, [id]);

  if (!report) return <p>Loading...</p>;

  
   return (
      <div className="page-content page-content--report-detail">
        <ReportItem report={report} size="large" />
      </div>
    );
}
