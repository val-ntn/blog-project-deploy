// src/pages/user/Home.jsx

import LatestPost from "../../components/Posts/LatestPost";
import UpcomingEvents from "../../components/Events/UpcomingEvents";
import LatestReport from "../../components/Reports/LatestReport";
import GetTeaserCard from "../../components/Shared/TeaserCard/GetTeaserCard";


import "../../styles/layout.css"; // layout and container styles
import "../../styles/pages.css"; // page-specific styles

export default function Home() {
  return (
    <div className="page-content page-content--home">
    <div className="grid-layout">
      <div className="hero">Hero Content</div>
      <div className="sidebar">
        <p>Sidebar</p>
      </div>
      <div className="blog-news">
        Latest News
        <LatestPost />
      </div>
   
      <div className="teaser">
        Teaser
        <GetTeaserCard type="post"/>
      </div>
       <div className="events">
        <UpcomingEvents limit={3} />
      </div>
      <div className="latest-report">
        Latest Report
        <LatestReport />
      </div>
      <div className="mapsearch">
        Mapsearch
      </div>
        <div className="widgets">
        <p>Widgets</p>
      </div>
    </div>
    </div>
  );
}
