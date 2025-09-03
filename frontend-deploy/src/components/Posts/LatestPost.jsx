//frontend/src/components/Posts/LatestPost.jsx

import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import { API_BASE_URL } from "../../utils/api";

function LatestPost() {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const start = performance.now();
    fetch(`${API_BASE_URL}/posts/latest`)
      .then((res) => res.json())
      .then((data) => {
        const end = performance.now();
        console.log(`LatestPost fetch took ${end - start} ms`);
        setPost(data);
      })
      .catch((err) => console.error("Error loading latest post:", err));
  }, []);

  if (!post) return <p>Loading...</p>;

  return <PostItem post={post} size="small" />;
}

export default LatestPost;
