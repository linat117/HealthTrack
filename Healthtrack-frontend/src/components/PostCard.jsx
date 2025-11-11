import React from "react";

const PostCard = ({ post }) => {
  return (
    <div className="card mb-3" style={{ backgroundColor: "#FAF5F0" }}>
      <div className="card-body">
        <h5 className="card-title text-black">{post.title}</h5>
        <p className="card-text text-dark">{post.content}</p>
        <p className="card-text">
          <small className="text-muted">
            Posted by {post.author} on{" "}
            {new Date(post.date).toLocaleDateString()}
          </small>
        </p>
        <div>
          <button className="btn btn-sm btn-primary me-2">Like</button>
          <button className="btn btn-sm btn-secondary">Comment</button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
