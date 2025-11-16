import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getManagerById } from "../../api/api.js";
import { AuthContext } from "../../context/AuthContext.jsx";

const ManagerView = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [manager, setManager] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const run = async () => {
      setError("");
      try {
        const data = await getManagerById(id, token);
        setManager(data);
      } catch (e) {
        setError("Failed to load manager.");
      } finally {
        setLoading(false);
      }
    };
    if (token) run();
  }, [id, token]);

  if (loading) return <div className="container my-4">Loading...</div>;
  if (error) return <div className="container my-4 alert alert-danger">{error}</div>;
  if (!manager) return null;

  return (
    <div className="container my-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="mb-3">{manager.name}</h3>
          <div className="mb-2"><strong>Email:</strong> {manager.email}</div>
          <div className="mb-2"><strong>Phone:</strong> {manager.phone || "-"}</div>
          <div className="text-muted">Created: {new Date(manager.createdAt).toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};

export default ManagerView;


