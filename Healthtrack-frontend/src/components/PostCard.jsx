import React, { useContext, useMemo, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { reactToPost, commentOnPost, replyToComment } from "../api/api.js";

const PostCard = ({ post, onUpdated }) => {
  const { token } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const resolveImageUrl = (url) => {
    if (!url) return "";
    if (/^https?:\/\//i.test(url)) return url;
    const backend = "http://localhost:5000";
    return `${backend}${url.startsWith("/") ? url : `/${url}`}`;
  };
  const counts = useMemo(() => {
    const byType = { like: 0, love: 0, haha: 0, sad: 0 };
    (post.reactions || []).forEach((r) => {
      if (byType[r.type] !== undefined) byType[r.type] += 1;
    });
    return {
      total: (post.reactions || []).length,
      ...byType,
      comments: (post.comments || []).length,
    };
  }, [post]);

  const doReact = async (type) => {
    if (!token) return;
    await reactToPost(post._id, type, token);
    onUpdated && onUpdated();
  };

  const sendComment = async () => {
    if (!token || !comment.trim()) return;
    await commentOnPost(post._id, comment.trim(), token);
    setComment("");
    onUpdated && onUpdated();
  };

  return (
    <div className="card mb-3 shadow-sm border-0">
      {post.imageUrl && (
        <img
          src={resolveImageUrl(post.imageUrl)}
          alt=""
          className="card-img-top"
          style={{ maxHeight: 240, objectFit: "cover" }}
        />
      )}
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <h5 className="card-title mb-1">{post.title}</h5>
          {post.category?.name && (
            <span className="badge text-bg-light border">{post.category.name}</span>
          )}
        </div>
        <p className="card-text text-muted mb-2" style={{ whiteSpace: "pre-line" }}>
          {post.content?.length > 220 ? `${post.content.slice(0, 220)}...` : post.content}
        </p>
        <div className="d-flex flex-wrap gap-3 small text-muted">
          <span>
            Reactions: {counts.total} (👍 {counts.like} · ❤️ {counts.love} · 😄 {counts.haha} · 😢 {counts.sad})
          </span>
          <button
            type="button"
            className="btn btn-link p-0 align-baseline"
            data-bs-toggle="modal"
            data-bs-target={`#reactions-${post._id}`}
          >
            View reactions
          </button>
          <span>Comments: {counts.comments}</span>
          <button
            type="button"
            className="btn btn-link p-0 align-baseline"
            data-bs-toggle="modal"
            data-bs-target={`#comments-${post._id}`}
          >
            View comments
          </button>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <small className="text-muted">
            {post.author ? `By ${post.author}` : "Advisory"} ·{" "}
            {post.date ? new Date(post.date).toLocaleDateString() : ""}
          </small>
          <div className="d-flex flex-wrap gap-2">
            <div className="btn-group btn-group-sm" role="group">
              <button className="btn btn-outline-primary" onClick={() => doReact("like")}>👍 Like</button>
              <button className="btn btn-outline-primary" onClick={() => doReact("love")}>❤️ Love</button>
              <button className="btn btn-outline-primary" onClick={() => doReact("haha")}>😄 Haha</button>
              <button className="btn btn-outline-primary" onClick={() => doReact("sad")}>😢 Sad</button>
            </div>
          </div>
        </div>
        <div className="d-flex gap-2 mt-3">
          <input
            className="form-control form-control-sm"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="btn btn-sm btn-outline-secondary" onClick={sendComment}>
            Send
          </button>
        </div>
      </div>

      {/* Reactions Modal */}
      <div className="modal fade" id={`reactions-${post._id}`} tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Reactions</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between"><span>👍 Like</span><span className="badge text-bg-primary">{counts.like}</span></li>
                <li className="list-group-item d-flex justify-content-between"><span>❤️ Love</span><span className="badge text-bg-primary">{counts.love}</span></li>
                <li className="list-group-item d-flex justify-content-between"><span>😄 Haha</span><span className="badge text-bg-primary">{counts.haha}</span></li>
                <li className="list-group-item d-flex justify-content-between"><span>😢 Sad</span><span className="badge text-bg-primary">{counts.sad}</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Modal */}
      <div className="modal fade" id={`comments-${post._id}`} tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Comments</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {(post.comments || []).length === 0 ? (
                <div className="text-muted">No comments yet.</div>
              ) : (
                <ul className="list-group">
                  {(post.comments || []).map((c, idx) => (
                    <li key={idx} className="list-group-item">
                      <div className="fw-semibold">{c.user?.name || "User"}</div>
                      <div>{c.comment}</div>
                      <small className="text-muted">{c.createdAt ? new Date(c.createdAt).toLocaleString() : ""}</small>
                      {/* Replies */}
                      {(c.replies || []).length > 0 && (
                        <ul className="list-group list-group-flush mt-2">
                          {c.replies.map((r, ridx) => (
                            <li key={ridx} className="list-group-item">
                              <div className="fw-semibold">{r.user?.name || "User"}</div>
                              <div>{r.comment}</div>
                              <small className="text-muted">{r.createdAt ? new Date(r.createdAt).toLocaleString() : ""}</small>
                            </li>
                          ))}
                        </ul>
                      )}
                      {/* Reply box */}
                      {token && (
                        <div className="d-flex gap-2 mt-2">
                          <input
                            className="form-control form-control-sm"
                            placeholder="Reply..."
                            onKeyDown={async (e) => {
                              if (e.key === "Enter" && e.currentTarget.value.trim()) {
                                await replyToComment(post._id, c._id, e.currentTarget.value.trim(), token);
                                e.currentTarget.value = "";
                                onUpdated && onUpdated();
                              }
                            }}
                          />
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={async (e) => {
                              const input = e.currentTarget.previousSibling;
                              const val = input.value.trim();
                              if (!val) return;
                              await replyToComment(post._id, c._id, val, token);
                              input.value = "";
                              onUpdated && onUpdated();
                            }}
                          >
                            Reply
                          </button>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
