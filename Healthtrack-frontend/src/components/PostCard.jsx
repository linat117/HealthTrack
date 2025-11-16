import React from "react";

const PostCard = ({ post }) => {
  return (
    <div className="card mb-3 shadow-sm border-0">
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.content}</p>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <small className="text-muted">
            {post.author ? `By ${post.author}` : "Advisory"} ·{" "}
            {post.date ? new Date(post.date).toLocaleDateString() : ""}
          </small>
          <div className="d-flex gap-2">
            <button className="btn btn-sm btn-outline-primary">Like</button>
            <button className="btn btn-sm btn-outline-secondary">Comment</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
