// src/components/HealthForm.jsx
import React, { useState } from "react";

const HealthForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    weight: "",
    bloodPressure: "",
    steps: "",
    notes: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.weight) {
      setError("Weight is required");
      return;
    }

    // Convert numbers properly
    const dataToSend = {
      weight: parseFloat(formData.weight),
      bloodPressure: formData.bloodPressure || "",
      steps: formData.steps ? parseInt(formData.steps) : undefined,
      notes: formData.notes || "",
    };

    onAdd(dataToSend);

    // Clear form
    setFormData({
      weight: "",
      bloodPressure: "",
      steps: "",
      notes: "",
    });
    setError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <label className="form-label">Weight (kg)</label>
        <input
          type="number"
          name="weight"
          className="form-control"
          value={formData.weight}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Blood Pressure</label>
        <input
          type="text"
          name="bloodPressure"
          className="form-control"
          value={formData.bloodPressure}
          onChange={handleChange}
          placeholder="e.g., 120/80"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Steps</label>
        <input
          type="number"
          name="steps"
          className="form-control"
          value={formData.steps}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Notes</label>
        <textarea
          name="notes"
          className="form-control"
          value={formData.notes}
          onChange={handleChange}
        ></textarea>
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Add Entry
      </button>
    </form>
  );
};

export default HealthForm;
