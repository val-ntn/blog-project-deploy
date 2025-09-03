// src/components/Admin/Dashboard/Controls/PostListControl.jsx

import PostList from "../../../Posts/PostList";
import { API_BASE_URL } from "../../../../utils/api";
import axios from "axios";

export default function PostListControl({
  refreshFlag,
  onRefresh,
  onRecycleRefresh,
  onEdit,
}) {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/posts/${id}`, {
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
      <h3>All Posts</h3>
      <PostList
        refreshFlag={refreshFlag}
        renderActions={(post) => (
          <>
            <button onClick={() => onEdit?.(post)}>✏ Edit</button>
            <button onClick={() => handleDelete(post._id)}>🗑 Delete</button>
          </>
        )}
      />
    </div>
  );
}
