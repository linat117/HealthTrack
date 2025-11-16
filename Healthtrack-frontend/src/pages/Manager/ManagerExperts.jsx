import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { managerGetExperts, managerDeleteExpert } from "../../api/api.js";

const ManagerExperts = () => {
  const { token } = useContext(AuthContext);
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await managerGetExperts(token);
    setExperts(data.experts || []);
    setLoading(false);
  };

  useEffect(() => {
    if (token) load();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expert?")) return;
    await managerDeleteExpert(id, token);
    load();
  };

  if (loading) return <div className="container my-4">Loading...</div>;

  return (
    <div className="container my-4">
      <h3 className="mb-3">Experts</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {experts.map((e) => (
            <tr key={e._id}>
              <td>{e.name}</td>
              <td>{e.email}</td>
              <td className="d-flex gap-2">
                {/* Placeholder view/edit as future extension */}
                <button className="btn btn-sm btn-outline-secondary" disabled>View</button>
                <button className="btn btn-sm btn-outline-secondary" disabled>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(e._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerExperts;


