// src/components/Posts/PostRecycleList.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import PostRecycleItem from "./PostRecycleItem";
import { API_BASE_URL } from "../../utils/api";

export default function PostRecycleList({ onRestore, refreshFlag }) {
  // add refreshFlag here
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/posts/bin`, { withCredentials: true })
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, [refreshFlag]);

  const handleRestore = async (id) => {
    await axios.patch(
      `${API_BASE_URL}/posts/restore/${id}`,
      {},
      { withCredentials: true }
    );
    setPosts(posts.filter((p) => p._id !== id));

    if (onRestore) onRestore();
  };

  const handlePermanentDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to permanently delete this post? This cannot be undone."
    );
    if (!confirm) return;

    await axios.delete(`${API_BASE_URL}/posts/hard/${id}`, {
      withCredentials: true,
    });
    setPosts(posts.filter((p) => p._id !== id));

    if (onRestore) onRestore();
  };

  return (
    <div>
      <h3>Deleted Posts</h3>
      {posts.length === 0 && <p>No deleted posts.</p>}
      {posts.map((post) => (
        <PostRecycleItem
          key={post._id}
          post={post}
          onRestore={handleRestore}
          onDelete={handlePermanentDelete}
        />
      ))}
    </div>
  );
}
