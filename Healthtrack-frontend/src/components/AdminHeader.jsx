import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const AdminHeader = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark admin-navbar shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/admin">
          HealthLink Admin
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbar"
          aria-controls="adminNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="adminNavbar">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Public Site
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/managers">
                Managers
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/create-manager">
                Create Manager
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/change-password">
                Change Password
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/create-admin">
                Create Admin
              </Link>
            </li>
            {user && (
              <li className="nav-item">
                <button
                  className="btn btn-outline-light ms-lg-2 mt-2 mt-lg-0"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminHeader;


