import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import Header from "./components/Header.jsx";
import AdminHeader from "./components/AdminHeader.jsx";
import ManagerHeader from "./components/ManagerHeader.jsx";
import Footer from "./components/Footer.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import ManagersList from "./pages/Admin/ManagerList.jsx";
import CreateManager from "./pages/Admin/CreateManager.jsx";
import CreateAdmin from "./pages/Admin/CreateAdmin.jsx";
import ManagerPosts from "./pages/Admin/ManagerPosts.jsx";
import ManagerView from "./pages/Admin/ManagerView.jsx";
import ManagerEdit from "./pages/Admin/ManagerEdit.jsx";
import ManagerAddPost from "./pages/Manager/ManagerAddPost.jsx";
import ManagerMyPosts from "./pages/Manager/ManagerPosts.jsx";
import ManagerAddExpert from "./pages/Manager/ManagerAddExpert.jsx";
import ManagerExperts from "./pages/Manager/ManagerExperts.jsx";
import ManagerAddCategory from "./pages/Manager/ManagerAddCategory.jsx";
import ManagerCategories from "./pages/Manager/ManagerCategories.jsx";
import { AuthContext } from "./context/AuthContext.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";

const AppShell = () => {
  const { user } = useContext(AuthContext);
  const isAdminSection = user?.role === "admin";
  const isManagerSection = user?.role === "manager";
  return (
    <>
      {isAdminSection ? <AdminHeader /> : isManagerSection ? <ManagerHeader /> : <Header />}
      <div className="container my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/managers"
            element={
              <PrivateRoute>
                <ManagersList />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/create-manager"
            element={
              <PrivateRoute>
                <CreateManager />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/create-admin"
            element={
              <PrivateRoute>
                <CreateAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/change-password"
            element={
              <PrivateRoute>
                <ChangePassword />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/managers/:managerUserId/posts"
            element={
              <PrivateRoute>
                <ManagerPosts />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/managers/:id/view"
            element={
              <PrivateRoute>
                <ManagerView />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/managers/:id/edit"
            element={
              <PrivateRoute>
                <ManagerEdit />
              </PrivateRoute>
            }
          />
          {/* Manager routes */}
          <Route
            path="/manager/posts/add"
            element={
              <PrivateRoute>
                <ManagerAddPost />
              </PrivateRoute>
            }
          />
          <Route
            path="/manager/posts"
            element={
              <PrivateRoute>
                <ManagerMyPosts />
              </PrivateRoute>
            }
          />
          <Route
            path="/manager/experts/add"
            element={
              <PrivateRoute>
                <ManagerAddExpert />
              </PrivateRoute>
            }
          />
          <Route
            path="/manager/experts"
            element={
              <PrivateRoute>
                <ManagerExperts />
              </PrivateRoute>
            }
          />
          <Route
            path="/manager/categories/add"
            element={
              <PrivateRoute>
                <ManagerAddCategory />
              </PrivateRoute>
            }
          />
          <Route
            path="/manager/categories"
            element={
              <PrivateRoute>
                <ManagerCategories />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}

export default App;
