// src/components/Admin/Dashboard/Controls/ReportListControl.jsx

import ReportList from "../../../Reports/ReportList";
import { API_BASE_URL } from "../../../../utils/api";
import axios from "axios";

export default function ReportListControl({
  refreshFlag,
  onRefresh,
  onRecycleRefresh,
  onEdit,
}) {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/event-reports/${id}`, {
        withCredentials: true,
      });
      if (onRefresh) onRefresh();
      if (onRecycleRefresh) onRecycleRefresh();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div>
      <h3>All Reports</h3>
      <ReportList
        refreshFlag={refreshFlag}
        renderActions={(report) => (
          <>
            <button onClick={() => onEdit?.(report)}>✏ Edit</button>
            <button onClick={() => handleDelete(report._id)}>🗑 Delete</button>
          </>
        )}
      />
    </div>
  );
}
