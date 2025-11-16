import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { managerCreateCategory } from "../../api/api.js";

const ManagerAddCategory = () => {
  const { token } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await managerCreateCategory({ name }, token);
      setSuccess("Category created.");
      setName("");
    } catch (e1) {
      setError(e1?.response?.data?.message || "Failed to create category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="mb-3">Add Category</h3>
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              <form onSubmit={submit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Creating..." : "Create"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerAddCategory;


