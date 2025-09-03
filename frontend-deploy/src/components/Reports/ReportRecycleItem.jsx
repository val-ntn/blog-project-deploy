// src/components/Reports/ReportRecycleItem.jsx

export default function ReportRecycleItem({ report, onRestore, onDelete }) {
  return (
    <div className="report-recycle-item">
      <h4>{report.title}</h4>
      <div>
        <button onClick={() => onRestore(report._id)}>Restore</button>
        <button onClick={() => onDelete(report._id)}>🗑 Delete</button>
      </div>
    </div>
  );
}
