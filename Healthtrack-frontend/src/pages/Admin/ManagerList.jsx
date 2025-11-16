import React, { useEffect, useState, useContext } from "react";
import { getManagers, deleteManager } from "../../api/api.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";

const ManagersList = () => {
  const [managers, setManagers] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;
    getManagers(token).then(setManagers).catch(console.error);
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this manager? This cannot be undone.")) return;
    await deleteManager(id, token);
    const refreshed = await getManagers(token);
    setManagers(refreshed);
  };

  return (
    <div className="container mt-4">
      <h3>Managers</h3>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {managers.map((m) => (
            <tr key={m._id}>
              <td>{m.name}</td>
              <td>{m.email}</td>
              <td>{m.phone}</td>
              <td>{new Date(m.createdAt).toLocaleDateString()}</td>
              <td className="d-flex gap-2">
                {m.user && (
                  <Link className="btn btn-sm btn-outline-primary" to={`/admin/managers/${m.user}/posts`}>
                    Posts
                  </Link>
                )}
                <Link className="btn btn-sm btn-outline-secondary" to={`/admin/managers/${m._id}/view`}>
                  View
                </Link>
                <Link className="btn btn-sm btn-primary" to={`/admin/managers/${m._id}/edit`}>
                  Edit
                </Link>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(m._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagersList;
