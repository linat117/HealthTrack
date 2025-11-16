import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { managerGetCategories, managerDeleteCategory } from "../../api/api.js";

const ManagerCategories = () => {
  const { token } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await managerGetCategories(token);
    setCategories(data.categories || []);
    setLoading(false);
  };

  useEffect(() => {
    if (token) load();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    await managerDeleteCategory(id, token);
    load();
  };

  if (loading) return <div className="container my-4">Loading...</div>;

  return (
    <div className="container my-4">
      <h3 className="mb-3">My Categories</h3>
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
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(c._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerCategories;


