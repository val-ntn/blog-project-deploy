//src/components/Posts/PostRecycleItem.jsx

export default function PostRecycleItem({ post, onRestore, onDelete }) {
  return (
    <div className="post-recycle-item">
      <h4>{post.title}</h4>
      <div>
        <button onClick={() => onRestore(post._id)}>Restore</button>
        <button onClick={() => onDelete(post._id)}>🗑 Delete</button>
      </div>
    </div>
  );
}
