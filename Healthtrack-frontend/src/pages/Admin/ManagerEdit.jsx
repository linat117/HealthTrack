import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getManagerById, updateManager } from "../../api/api.js";
import { AuthContext } from "../../context/AuthContext.jsx";

const ManagerEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const run = async () => {
      try {
        const data = await getManagerById(id, token);
        setForm({ name: data.name || "", email: data.email || "", phone: data.phone || "" });
      } catch {
        setError("Failed to load manager.");
      } finally {
        setLoading(false);
      }
    };
    if (token) run();
  }, [id, token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await updateManager(id, form, token);
      navigate(`/admin/managers`);
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to update manager.");
    }
  };

  if (loading) return <div className="container my-4">Loading...</div>;

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="mb-3">Edit Manager</h3>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input name="name" className="form-control" value={form.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input name="phone" className="form-control" value={form.phone} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary w-100">Save Changes</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerEdit;


