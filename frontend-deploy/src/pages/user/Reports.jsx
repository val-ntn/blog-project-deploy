// src/pages/user/Reports.jsx
import ReportList from "../../components/Reports/ReportList";
import PageHeader from "../../components/Shared/PageHeader/PageHeader";
import "../../styles/layout.css"; // layout and container styles
import "../../styles/pages.css"; // page-specific styles

export default function Reports() {
  return (
    <div className="page-content page-content--reports">
      <PageHeader title="Reports" />
      <ReportList />
    </div>
  );
}
