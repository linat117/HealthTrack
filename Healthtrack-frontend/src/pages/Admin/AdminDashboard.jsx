import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="container my-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
        <h2 className="mb-0">Admin Dashboard</h2>
        <div className="text-muted">Manage roles and content</div>
      </div>

      <div className="row g-3 mt-3">
        <div className="col-12 col-md-6 col-lg-4">
          <Link to="/admin/managers" className="text-decoration-none">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-2">Managers</h5>
                <p className="card-text text-muted mb-0">
                  View and manage all managers in the system.
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <Link to="/admin/create-manager" className="text-decoration-none">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-2">Create Manager</h5>
                <p className="card-text text-muted mb-0">
                  Add a new manager with name, email, and phone.
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <Link to="/admin/create-admin" className="text-decoration-none">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-2">Create Admin</h5>
                <p className="card-text text-muted mb-0">
                  Register another admin account with email and password.
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <Link to="/admin/categories" className="text-decoration-none">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-2">Categories</h5>
                <p className="card-text text-muted mb-0">
                  Create and manage global categories for posts.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
