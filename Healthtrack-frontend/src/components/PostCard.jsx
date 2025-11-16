import React, { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { reactToPost, commentOnPost, replyToComment } from "../api/api.js";

const PostCard = ({ post, onUpdated }) => {
  const { token } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);
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

  // Prevent background page from scrolling while modal is open
  useEffect(() => {
    if (showComments) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous || "";
      };
    }
  }, [showComments]);

  return (
    <div className="card mb-3 shadow-sm border-0 post-card">
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
        <div className="d-flex flex-wrap align-items-center gap-3 small text-muted p-2 border rounded-3">
          <span>👍 {counts.like}</span>
          <span>❤️ {counts.love}</span>
          <span>😄 {counts.haha}</span>
          <span>😢 {counts.sad}</span>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary rounded-pill px-3"
            onClick={() => setShowComments(true)}
          >
            View comments ({counts.comments})
          </button>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <small className="text-muted">
            {post.author ? `By ${post.author} · ` : ""}
            {post.date ? new Date(post.date).toLocaleDateString() : ""}
          </small>
          <div className="d-flex flex-wrap gap-2">
            <div className="btn-group btn-group-sm" role="group">
              <button className="btn btn-outline-primary" onClick={() => doReact("like")}>👍</button>
              <button className="btn btn-outline-primary" onClick={() => doReact("love")}>❤️</button>
              <button className="btn btn-outline-primary" onClick={() => doReact("haha")}>😄</button>
              <button className="btn btn-outline-primary" onClick={() => doReact("sad")}>😢</button>
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

      {/* Reactions Modal (Bootstrap) */}
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

      {/* Comments Modal (Custom lightweight, centered) */}
      {showComments && (
        <>
          <div
            className="position-fixed top-0 start-0 w-100 h-100"
            style={{
              background: "rgba(0,0,0,0.25)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              zIndex: 1050,
            }}
            onClick={() => setShowComments(false)}
          />
          <div
            className="position-fixed top-0 start-50 translate-middle-x"
            style={{ zIndex: 1060, width: "min(96vw, 800px)", marginTop: "1rem" }}
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="card shadow">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Comments</h5>
                <button className="btn btn-sm btn-outline-secondary" onClick={() => setShowComments(false)}>Close</button>
              </div>
              <div className="card-body" style={{ maxHeight: "70vh", overflowY: "auto" }}>
                {(post.comments || []).length === 0 ? (
                  <div className="text-muted">No comments yet.</div>
                ) : (
                  <ul className="list-group list-group-flush">
                    {(post.comments || []).map((c, idx) => {
                      const isAuthor =
                        (typeof post.createdBy === "string" && c.user?._id === post.createdBy) ||
                        (post.createdBy && typeof post.createdBy === "object" && c.user?._id === post.createdBy._id);
                      const displayName = isAuthor ? "Author" : (c.user?.name || "User");
                      return (
                        <li key={idx} className="list-group-item">
                          <div className="d-flex justify-content-between">
                            <div className="fw-semibold">{displayName}</div>
                            <small className="text-muted">{c.createdAt ? new Date(c.createdAt).toLocaleString() : ""}</small>
                          </div>
                          <div className="mt-1">{c.comment}</div>
                          {(c.replies || []).length > 0 && (
                            <ul className="list-group list-group-flush mt-2">
                              {c.replies.map((r, ridx) => {
                                const replyIsAuthor =
                                  (typeof post.createdBy === "string" && r.user?._id === post.createdBy) ||
                                  (post.createdBy && typeof post.createdBy === "object" && r.user?._id === post.createdBy._id);
                                const replyName = replyIsAuthor ? "Author" : (r.user?.name || "User");
                                return (
                                  <li key={ridx} className="list-group-item ps-4">
                                    <div className="d-flex justify-content-between">
                                      <div className="fw-semibold">{replyName}</div>
                                      <small className="text-muted">{r.createdAt ? new Date(r.createdAt).toLocaleString() : ""}</small>
                                    </div>
                                    <div className="mt-1">{r.comment}</div>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
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
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PostCard;
