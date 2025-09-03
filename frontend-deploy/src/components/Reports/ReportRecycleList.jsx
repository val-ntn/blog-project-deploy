// src/components/Reports/ReportRecycleList.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import ReportRecycleItem from "./ReportRecycleItem";
import { API_BASE_URL } from "../../utils/api";

export default function ReportRecycleList({ onRestore, refreshFlag }) {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/event-reports/bin`, { withCredentials: true })
      .then((res) => setReports(res.data))
      .catch((err) => console.error(err));
  }, [refreshFlag]);

  const handleRestore = async (id) => {
    await axios.patch(
      `${API_BASE_URL}/event-reports/restore/${id}`,
      {},
      { withCredentials: true }
    ); //route changed from /reports/ 30.7
    setReports(reports.filter((r) => r._id !== id));

    if (onRestore) onRestore();
  };

  const handlePermanentDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to permanently delete this report? This cannot be undone."
    );
    if (!confirm) return;

    await axios.delete(`${API_BASE_URL}/event-reports/hard/${id}`, {
      withCredentials: true,
    }); //route changed from /reports/ 30.7
    setReports(reports.filter((r) => r._id !== id));

    if (onRestore) onRestore();
  };

  return (
    <div>
      <h3>Deleted Reports</h3>
      {reports.length === 0 && <p>No deleted reports.</p>}
      {reports.map((report) => (
        <ReportRecycleItem
          key={report._id}
          report={report}
          onRestore={handleRestore}
          onDelete={handlePermanentDelete}
        />
      ))}
    </div>
  );
}
