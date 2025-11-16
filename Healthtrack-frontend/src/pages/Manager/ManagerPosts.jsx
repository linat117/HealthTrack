import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { managerMyPosts, managerDeletePost, managerUpdatePost, reactToPost, commentOnPost } from "../../api/api.js";

const ManagerPosts = () => {
  const { token } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", content: "" });
  const [commentMap, setCommentMap] = useState({});

  const load = async () => {
    setLoading(true);
    const data = await managerMyPosts(token);
    setPosts(data.posts || []);
    setLoading(false);
  };

  useEffect(() => {
    if (token) load();
  }, [token]);

  const startEdit = (p) => {
    setEditingId(p._id);
    setEditForm({ title: p.title, content: p.content });
  };
  const saveEdit = async (id) => {
    await managerUpdatePost(id, editForm, token);
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
              <td style={{ maxWidth: 400 }}>
                {editingId === p._id ? (
                  <textarea className="form-control" rows="2" value={editForm.content} onChange={(e) => setEditForm({ ...editForm, content: e.target.value })} />
                ) : (
                  <span className="text-truncate d-inline-block" style={{ maxWidth: 380 }}>{p.content}</span>
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
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => startEdit(p)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => doDelete(p._id)}>Delete</button>
                    <div className="btn-group">
                      <button className="btn btn-sm btn-outline-primary" onClick={() => react(p._id, "like")}>Like</button>
                      <button className="btn btn-sm btn-outline-primary" onClick={() => react(p._id, "love")}>Love</button>
                      <button className="btn btn-sm btn-outline-primary" onClick={() => react(p._id, "haha")}>Haha</button>
                      <button className="btn btn-sm btn-outline-primary" onClick={() => react(p._id, "sad")}>Sad</button>
                    </div>
                    <div className="d-flex gap-2">
                      <input
                        className="form-control form-control-sm"
                        placeholder="Add comment"
                        value={commentMap[p._id] || ""}
                        onChange={(e) => setCommentMap({ ...commentMap, [p._id]: e.target.value })}
                      />
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => sendComment(p._id)}>Send</button>
                    </div>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerPosts;


