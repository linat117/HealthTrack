import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import logo from "../assets/download.png";

const ExpertHeader = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark admin-navbar shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/expert/posts">
          <img src={logo} alt="TenaLink" style={{ height: 32, filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.2))" }} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#expertNavbar"
          aria-controls="expertNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="expertNavbar">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Public Site
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/expert/posts/add">
                Add Post
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/expert/posts">
                Manage Posts
              </Link>
            </li>
            {user && (
              <li className="nav-item">
                <button className="btn btn-outline-light ms-lg-2 mt-2 mt-lg-0" onClick={handleLogout}>
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

export default ExpertHeader;


