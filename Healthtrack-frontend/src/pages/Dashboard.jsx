import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import HealthForm from "../components/HealthForm";
import ActivityFeed from "../components/ActivityFeed";
import HealthChart from "../components/HealthChart";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const { user, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    if (!user) navigate("/login");
    fetchHealthData();
  }, []);

  const fetchHealthData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/health/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEntries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addHealthEntry = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/health/add",
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEntries([...entries, res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">Your Health Dashboard</h2>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="row">
        <div className="col-md-5 mb-4">
          <div className="card shadow-sm p-3">
            <h5 className="mb-3 text-secondary">Add New Entry</h5>
            <HealthForm onAdd={addHealthEntry} />
          </div>
        </div>

        <div className="col-md-7 mb-4">
          <div className="card shadow-sm p-3">
            <h5 className="mb-3 text-secondary">Health Chart</h5>
            <HealthChart entries={entries} />
          </div>
        </div>
      </div>

      <div className="card shadow-sm p-3">
        <h5 className="mb-3 text-secondary">Recent Activity</h5>
        <ActivityFeed entries={entries} />
      </div>
    </div>
  );
};

export default Dashboard;
