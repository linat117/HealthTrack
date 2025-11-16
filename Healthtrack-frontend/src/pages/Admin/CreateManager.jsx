import React, { useState, useContext } from "react";
import { createManager } from "../../api/api.js";
import { AuthContext } from "../../context/AuthContext.jsx";

const CreateManager = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const { token } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createManager(form, token);
    alert("Manager Created!");
  };

  return (
    <div className="container mt-4">
      <h3>Create Manager</h3>

      <form className="mt-3" onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Name"
          className="form-control mb-2"
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="form-control mb-2"
          onChange={handleChange}
        />

        <input
          name="phone"
          type="text"
          placeholder="Phone"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Temporary Password"
          className="form-control mb-3"
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn btn-primary w-100">
          Create Manager
        </button>
      </form>
    </div>
  );
};

export default CreateManager;
