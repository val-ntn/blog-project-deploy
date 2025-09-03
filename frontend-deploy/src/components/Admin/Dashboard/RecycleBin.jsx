// src/components/Admin/Dashboard/RecycleBin.jsx

import { useState } from "react";
import CarouselRecycleList from "../../Images-Carousels/CarouselRecycleList";
import PostRecycleList from "../../Posts/PostRecycleList";
import EventRecycleList from "../../Events/EventRecycleList";
import ReportRecycleList from "../../Reports/ReportRecycleList";
import PictureRecycleList from "../../Images-Carousels/PictureRecycleList";

export default function RecycleBin({
  onPostRestore,
  onEventRestore,
  onCarouselRestore,
  onReportRestore,
  onImageRestore,
  postRecycleRefreshFlag,
  eventRecycleRefreshFlag,
  carouselRecycleRefreshFlag,
  reportRecycleRefreshFlag,
  imageRecycleRefreshFlag,
}) {
  const [filter, setFilter] = useState("all");

  return (
    <div>
      <h2>Recycle Bin</h2>
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("post")}>Posts</button>
        <button onClick={() => setFilter("event")}>Events</button>
        <button onClick={() => setFilter("report")}>Reports</button>
        <button onClick={() => setFilter("carousel")}>Carousels</button>
        <button onClick={() => setFilter("image")}>Images</button>
      </div>

      {filter === "post" && (
        <PostRecycleList
          onRestore={onPostRestore}
          refreshFlag={postRecycleRefreshFlag}
        />
      )}
      {filter === "event" && (
        <EventRecycleList
          onRestore={onEventRestore}
          refreshFlag={eventRecycleRefreshFlag}
        />
      )}
      {filter === "report" && (
        <ReportRecycleList
          onRestore={onReportRestore}
          refreshFlag={reportRecycleRefreshFlag}
        />
      )}
      {filter === "carousel" && (
        <CarouselRecycleList
          onRestore={onCarouselRestore}
          refreshFlag={carouselRecycleRefreshFlag}
        />
      )}
      {filter === "image" && (
        <PictureRecycleList
          onRestore={onImageRestore}
          refreshFlag={imageRecycleRefreshFlag}
        />
      )}
      {filter === "all" && (
        <>
          <PostRecycleList
            onRestore={onPostRestore}
            refreshFlag={postRecycleRefreshFlag}
          />
          <EventRecycleList
            onRestore={onEventRestore}
            refreshFlag={eventRecycleRefreshFlag}
          />
          <ReportRecycleList
            onRestore={onReportRestore}
            refreshFlag={reportRecycleRefreshFlag}
          />
          <CarouselRecycleList
            onRestore={onCarouselRestore}
            refreshFlag={carouselRecycleRefreshFlag}
          />
          <PictureRecycleList
            onRestore={onImageRestore}
            refreshFlag={imageRecycleRefreshFlag}
          />
        </>
      )}
    </div>
  );
}
