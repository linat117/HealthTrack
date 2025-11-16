import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { managerAddExpert } from "../../api/api.js";

const ManagerAddExpert = () => {
  const { token } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", email: "", tempPassword: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await managerAddExpert(form, token);
      setSuccess("Expert created.");
      setForm({ name: "", email: "", tempPassword: "" });
    } catch (e1) {
      setError(e1?.response?.data?.message || "Failed to create expert.");
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
              <h3 className="mb-3">Add Expert</h3>
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
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
                  <label className="form-label">Temporary Password</label>
                  <input type="password" name="tempPassword" className="form-control" value={form.tempPassword} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Creating..." : "Create Expert"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerAddExpert;


