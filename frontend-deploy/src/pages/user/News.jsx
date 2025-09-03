// src/pages/user/News.jsx
import PostList from "../../components/Posts/PostList";
import PageHeader from "../../components/Shared/PageHeader/PageHeader";
import "../../styles/layout.css"; // layout and container styles
import "../../styles/pages.css"; // page-specific styles

export default function News() {
  return (
    <div className="page-content page-content--news">
      <PageHeader title="News" />
      <PostList />
      </div>
    
  );
}
