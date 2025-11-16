import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { adminGetCategories, adminCreateCategory, adminDeleteCategory } from "../../api/api.js";

const AdminCategories = () => {
  const { token } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await adminGetCategories(token);
      setCategories(data.categories || []);
    } catch (e) {
      setError("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) load();
  }, [token]);

  const create = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await adminCreateCategory({ name }, token);
      setSuccess("Category created.");
      setName("");
      load();
    } catch (e1) {
      setError(e1?.response?.data?.message || "Failed to create category.");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    await adminDeleteCategory(id, token);
    load();
  };

  return (
    <div className="container my-4">
      <h3 className="mb-3">Categories</h3>
      <div className="card shadow-sm mb-3">
        <div className="card-body">
          <form className="row g-2 align-items-end" onSubmit={create}>
            <div className="col-12 col-md-6">
              <label className="form-label">Name</label>
              <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="col-12 col-md-auto">
              <button type="submit" className="btn btn-primary">Add Category</button>
            </div>
          </form>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
          {success && <div className="alert alert-success mt-3">{success}</div>}
        </div>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                <td>
                  <button className="btn btn-sm btn-danger" onClick={() => remove(c._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminCategories;


