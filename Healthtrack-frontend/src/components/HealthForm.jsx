import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const HealthForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    mood: "",
    steps: "",
    waterIntake: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ mood: "", steps: "", waterIntake: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Mood</label>
        <input
          type="text"
          name="mood"
          className="form-control"
          value={formData.mood}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label>Steps</label>
        <input
          type="number"
          name="steps"
          className="form-control"
          value={formData.steps}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label>Water Intake (L)</label>
        <input
          type="number"
          name="waterIntake"
          className="form-control"
          value={formData.waterIntake}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Add Entry
      </button>
    </form>
  );
};

export default HealthForm;
