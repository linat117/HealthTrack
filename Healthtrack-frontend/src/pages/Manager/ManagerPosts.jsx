import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { managerMyPosts, managerDeletePost, managerUpdatePost, reactToPost, commentOnPost, managerGetCategories, managerUploadImage } from "../../api/api.js";

const ManagerPosts = () => {
  const { token } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", content: "", categoryId: "", imageUrl: "" });
  const [commentMap, setCommentMap] = useState({});
  const [categories, setCategories] = useState([]);
  const [fileMap, setFileMap] = useState({});
  const [showReactModal, setShowReactModal] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [activePost, setActivePost] = useState(null);

  const load = async () => {
    setLoading(true);
    const data = await managerMyPosts(token);
    setPosts(data.posts || []);
    setLoading(false);
  };

  useEffect(() => {
    const preload = async () => {
      const cats = await managerGetCategories(token);
      setCategories(cats.categories || []);
      await load();
    };
    if (token) preload();
  }, [token]);

  const startEdit = (p) => {
    setEditingId(p._id);
    setEditForm({ title: p.title, content: p.content, categoryId: p.category?._id || "", imageUrl: p.imageUrl || "" });
  };
  const saveEdit = async (id) => {
    const payload = { ...editForm };
    const file = fileMap[id];
    if (file) {
      const up = await managerUploadImage(file, token);
      payload.imageUrl = up.url;
    }
    await managerUpdatePost(id, payload, token);
    setEditingId(null);
    load();
  };
  const doDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    await managerDeletePost(id, token);
    load();
  };
  const react = async (id, type) => {
    await reactToPost(id, type, token);
    load();
  };
  const sendComment = async (id) => {
    const comment = commentMap[id];
    if (!comment) return;
    await commentOnPost(id, comment, token);
    setCommentMap({ ...commentMap, [id]: "" });
    load();
  };

  if (loading) return <div className="container my-4">Loading...</div>;

  return (
    <div className="container my-4">
      <h3 className="mb-3">My Posts</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Category</th>
            <th>Reactions</th>
            <th>Comments</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((p) => (
            <tr key={p._id}>
              <td>
                {editingId === p._id ? (
                  <input className="form-control" value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} />
                ) : (
                  p.title
                )}
              </td>
              <td style={{ minWidth: 120 }}>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => {
                    setActivePost(p);
                    setShowReactModal(true);
                  }}
                >
                  {(p.reactions || []).length} reactions
                </button>
              </td>
              <td style={{ minWidth: 120 }}>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => {
                    setActivePost(p);
                    setShowCommentsModal(true);
                  }}
                >
                  {(p.comments || []).length} comments
                </button>
              </td>
              <td style={{ minWidth: 200 }}>
                {editingId === p._id ? (
                  <input
                    className="form-control form-control-sm"
                    placeholder="https://..."
                    value={editForm.imageUrl}
                    onChange={(e) => setEditForm({ ...editForm, imageUrl: e.target.value })}
                  />
                ) : p.imageUrl ? (
                  <img src={p.imageUrl} alt="" style={{ maxWidth: 180, maxHeight: 100, objectFit: "cover", borderRadius: 6 }} />
                ) : (
                  <span className="text-muted">-</span>
                )}
                {editingId === p._id && (
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control form-control-sm mt-2"
                    onChange={(e) => setFileMap({ ...fileMap, [p._id]: e.target.files?.[0] || null })}
                  />
                )}
              </td>
              <td style={{ maxWidth: 400 }}>
                {editingId === p._id ? (
                  <textarea className="form-control" rows="2" value={editForm.content} onChange={(e) => setEditForm({ ...editForm, content: e.target.value })} />
                ) : (
                  <span className="text-truncate d-inline-block" style={{ maxWidth: 380 }}>{p.content}</span>
                )}
              </td>
              <td style={{ minWidth: 160 }}>
                {editingId === p._id ? (
                  <select
                    className="form-select form-select-sm"
                    value={editForm.categoryId}
                    onChange={(e) => setEditForm({ ...editForm, categoryId: e.target.value })}
                  >
                    <option value="">Select</option>
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                ) : (
                  p.category?.name || "-"
                )}
              </td>
              <td className="d-flex flex-column flex-md-row gap-2">
                {editingId === p._id ? (
                  <>
                    <button className="btn btn-sm btn-primary" onClick={() => saveEdit(p._id)}>Save</button>
                    <button className="btn btn-sm btn-secondary" onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => { setActivePost(p); setShowCommentsModal(true); }}>
                      View
                    </button>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => startEdit(p)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => doDelete(p._id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Reactions breakdown modal */}
      {showReactModal && activePost && (
        <div className="modal d-block" tabIndex="-1" role="dialog" onClick={() => setShowReactModal(false)}>
          <div className="modal-dialog" role="document" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Reactions</h5>
                <button type="button" className="btn-close" onClick={() => setShowReactModal(false)}></button>
              </div>
              <div className="modal-body">
                {(() => {
                  const counts = { like: 0, love: 0, haha: 0, sad: 0 };
                  (activePost.reactions || []).forEach((r) => {
                    if (counts[r.type] !== undefined) counts[r.type] += 1;
                  });
                  return (
                    <ul className="list-group">
                      <li className="list-group-item d-flex justify-content-between"><span>👍 Like</span><span className="badge text-bg-primary">{counts.like}</span></li>
                      <li className="list-group-item d-flex justify-content-between"><span>❤️ Love</span><span className="badge text-bg-primary">{counts.love}</span></li>
                      <li className="list-group-item d-flex justify-content-between"><span>😄 Haha</span><span className="badge text-bg-primary">{counts.haha}</span></li>
                      <li className="list-group-item d-flex justify-content-between"><span>😢 Sad</span><span className="badge text-bg-primary">{counts.sad}</span></li>
                    </ul>
                  );
                })()}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowReactModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Comments list modal */}
      {showCommentsModal && activePost && (
        <div className="modal d-block" tabIndex="-1" role="dialog" onClick={() => setShowCommentsModal(false)}>
          <div className="modal-dialog modal-lg" role="document" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Comments</h5>
                <button type="button" className="btn-close" onClick={() => setShowCommentsModal(false)}></button>
              </div>
              <div className="modal-body">
                {(activePost.comments || []).length === 0 ? (
                  <div className="text-muted">No comments yet.</div>
                ) : (
                  <ul className="list-group">
                    {(activePost.comments || []).map((c, idx) => (
                      <li key={idx} className="list-group-item">
                        <div className="fw-semibold">{c.user?.name || "User"}</div>
                        <div>{c.comment}</div>
                        <small className="text-muted">{c.createdAt ? new Date(c.createdAt).toLocaleString() : ""}</small>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowCommentsModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerPosts;


