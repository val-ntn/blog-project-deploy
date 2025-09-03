// src/components/Admin/Dashboard.jsx

import { useState } from "react";
import RecycleBin from "./RecycleBin";
import PostListControl from "./Controls/PostListControl";
import EventListControl from "./Controls/EventListControl";
import CarouselListControl from "./Controls/CarouselListControl";
import Sidebar from "./Sidebar";
import PostForm from "../Forms/PostForm/PostForm";
import EventForm from "../Forms/EventForm/EventForm";
import CarouselForm from "../Forms/CarouselForm/CarouselForm";
import PicturesListControl from "./Controls/PicturesListControl";
import ReportListControl from "./Controls/ReportListControl";
import ReportForm from "../Forms/ReportForm/ReportForm";

export default function Dashboard() {
  // === SECTION CONTROL ===
  const [selectedSection, setSelectedSection] = useState("posts");

  // === POSTS ===
  const [postRefreshFlag, setPostRefreshFlag] = useState(false);
  const [postRecycleRefreshFlag, setPostRecycleRefreshFlag] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [showPostForm, setShowPostForm] = useState(false);

  // === EVENTS ===
  const [eventRefreshFlag, setEventRefreshFlag] = useState(false);
  const [eventRecycleRefreshFlag, setEventRecycleRefreshFlag] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false);

  // === REPORTS ===
  const [reportRefreshFlag, setReportRefreshFlag] = useState(false);
  const [reportRecycleRefreshFlag, setReportRecycleRefreshFlag] =
    useState(false);
  const [editingReport, setEditingReport] = useState(null);
  const [showReportForm, setShowReportForm] = useState(false);

  // === CAROUSELS ===
  const [carouselRefreshFlag, setCarouselRefreshFlag] = useState(0);
  const [carouselRecycleRefreshFlag, setCarouselRecycleRefreshFlag] =
    useState(false);
  const [showCarouselForm, setShowCarouselForm] = useState(false);
  const [editingCarousel, setEditingCarousel] = useState(null);

  // === IMAGES ===
  const [imageRecycleRefreshFlag, setImageRecycleRefreshFlag] = useState(false);

  // === REFRESH TRIGGERS ===
  const triggerPostRefresh = () => setPostRefreshFlag((prev) => !prev);
  const triggerPostRecycleRefresh = () =>
    setPostRecycleRefreshFlag((prev) => !prev);

  const triggerEventRefresh = () => setEventRefreshFlag((prev) => !prev);
  const triggerEventRecycleRefresh = () =>
    setEventRecycleRefreshFlag((prev) => !prev);

  const triggerReportRefresh = () => setReportRefreshFlag((prev) => !prev);
  const triggerReportRecycleRefresh = () =>
    setReportRecycleRefreshFlag((prev) => !prev);

  const triggerCarouselRecycleRefresh = () =>
    setCarouselRecycleRefreshFlag((prev) => !prev);

  const triggerImageRecycleRefresh = () =>
    setImageRecycleRefreshFlag((prev) => !prev);

  return (
    <div className="dashboard-container" style={{ display: "flex" }}>
      <Sidebar selected={selectedSection} onSelect={setSelectedSection} />

      <div
        className="dashboard-content"
        style={{ flexGrow: 1, padding: "1rem" }}
      >
        <h2>Dashboard</h2>

        {/* === Posts Section === */}
        {selectedSection === "posts" && (
          <>
            {!showPostForm ? (
              <>
                <button
                  onClick={() => {
                    setEditingPost(null);
                    setShowPostForm(true);
                  }}
                >
                  Create New Post
                </button>

                <PostListControl
                  refreshFlag={postRefreshFlag}
                  onRefresh={triggerPostRefresh}
                  onRecycleRefresh={triggerPostRecycleRefresh}
                  onEdit={(post) => {
                    setEditingPost(post);
                    setShowPostForm(true);
                  }}
                />
              </>
            ) : (
              <>
                <PostForm
                  initialData={editingPost}
                  onCreateSuccess={() => {
                    setShowPostForm(false);
                    setEditingPost(null);
                    triggerPostRefresh();
                  }}
                />
                <button
                  onClick={() => {
                    setShowPostForm(false);
                    setEditingPost(null);
                  }}
                >
                  Cancel
                </button>
              </>
            )}
          </>
        )}

        {/* === Events Section === */}
        {selectedSection === "events" && (
          <>
            {!showEventForm ? (
              <>
                <button
                  onClick={() => {
                    setEditingEvent(null);
                    setShowEventForm(true);
                  }}
                >
                  Create New Event
                </button>

                <EventListControl
                  refreshFlag={eventRefreshFlag}
                  onRefresh={triggerEventRefresh}
                  onRecycleRefresh={triggerEventRecycleRefresh}
                  onEdit={(event) => {
                    setEditingEvent(event);
                    setShowEventForm(true);
                  }}
                />
              </>
            ) : (
              <>
                <EventForm
                  initialData={editingEvent}
                  onCreateSuccess={() => {
                    setShowEventForm(false);
                    setEditingEvent(null);
                    triggerEventRefresh();
                  }}
                />
                <button
                  onClick={() => {
                    setShowEventForm(false);
                    setEditingEvent(null);
                  }}
                >
                  Cancel
                </button>
              </>
            )}
          </>
        )}

        {/* === Reports Section === */}
        {selectedSection === "reports" && (
          <>
            {!showReportForm ? (
              <>
                <button
                  onClick={() => {
                    setEditingReport(null);
                    setShowReportForm(true);
                  }}
                >
                  Create New Report
                </button>

                <ReportListControl
                  refreshFlag={reportRefreshFlag}
                  onRefresh={triggerReportRefresh}
                  onRecycleRefresh={triggerReportRecycleRefresh}
                  onEdit={(report) => {
                    setEditingReport(report);
                    setShowReportForm(true);
                  }}
                />
              </>
            ) : (
              <>
                <ReportForm
                  initialData={editingReport}
                  onCreateSuccess={() => {
                    setShowReportForm(false);
                    setEditingReport(null);
                    triggerReportRefresh();
                  }}
                />
                <button
                  onClick={() => {
                    setShowReportForm(false);
                    setEditingReport(null);
                  }}
                >
                  Cancel
                </button>
              </>
            )}
          </>
        )}

        {/* === Pictures & Carousels Section === */}
        {selectedSection === "pictures" && (
          <>
            <PicturesListControl />

            <hr style={{ margin: "2rem 0" }} />

            <CarouselListControl
              refreshFlag={carouselRefreshFlag}
              onRecycleRefresh={triggerCarouselRecycleRefresh}
              onEdit={(carousel) => {
                setEditingCarousel(carousel);
                setShowCarouselForm(true);
              }}
            />

            <button
              onClick={() => {
                setEditingCarousel(null);
                setShowCarouselForm(!showCarouselForm);
              }}
            >
              {showCarouselForm ? "Close Carousel Form" : "Add New Carousel"}
            </button>

            {showCarouselForm && (
              <CarouselForm
                initialData={editingCarousel}
                onClose={() => {
                  setShowCarouselForm(false);
                  setEditingCarousel(null);
                }}
                onCreateSuccess={() => {
                  setShowCarouselForm(false);
                  setEditingCarousel(null);
                  setCarouselRefreshFlag((prev) => prev + 1);
                }}
              />
            )}
          </>
        )}

        {/* === Recycle Bin Section === */}
        {selectedSection === "bin" && (
          <RecycleBin
            onPostRestore={triggerPostRefresh}
            onEventRestore={triggerEventRefresh}
            onCarouselRestore={triggerCarouselRecycleRefresh}
            onReportRestore={triggerReportRefresh}
            onImageRestore={triggerImageRecycleRefresh}
            postRecycleRefreshFlag={postRecycleRefreshFlag}
            eventRecycleRefreshFlag={eventRecycleRefreshFlag}
            carouselRecycleRefreshFlag={carouselRecycleRefreshFlag}
            reportRecycleRefreshFlag={reportRecycleRefreshFlag}
            imageRecycleRefreshFlag={imageRecycleRefreshFlag}
          />
        )}

        {/* === Users Section Placeholder === */}
        {selectedSection === "users" && (
          <div>User management coming soon...</div>
        )}
      </div>
    </div>
  );
}
