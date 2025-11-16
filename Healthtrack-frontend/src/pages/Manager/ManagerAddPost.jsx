import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { managerCreatePost, managerGetCategories, managerUploadImage } from "../../api/api.js";

const ManagerAddPost = () => {
  const { token } = useContext(AuthContext);
  const [form, setForm] = useState({ title: "", content: "", categoryId: "", imageUrl: "" });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFile = (e) => setFile(e.target.files?.[0] || null);
  useEffect(() => {
    const load = async () => {
      const data = await managerGetCategories(token);
      setCategories(data.categories || []);
    };
    if (token) load();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      let payload = { ...form };
      if (file) {
        const up = await managerUploadImage(file, token);
        payload.imageUrl = up.url;
      }
      await managerCreatePost(payload, token);
      setSuccess("Post created.");
      setForm({ title: "", content: "", categoryId: "", imageUrl: "" });
      setFile(null);
    } catch (e1) {
      setError(e1?.response?.data?.message || "Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="mb-3">Add Post</h3>
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input name="title" className="form-control" value={form.title} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Content</label>
                  <textarea name="content" className="form-control" rows="5" value={form.content} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select
                    name="categoryId"
                    className="form-select"
                    value={form.categoryId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Image URL (optional)</label>
                  <input name="imageUrl" className="form-control" value={form.imageUrl} onChange={handleChange} placeholder="https://..." />
                </div>
                <div className="mb-3">
                  <label className="form-label">Or Upload Image</label>
                  <input type="file" accept="image/*" className="form-control" onChange={handleFile} />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Creating..." : "Create Post"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerAddPost;


