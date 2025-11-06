import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Advisories from "../components/Advisories";
export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome! You are logged in.</p>
      <button onClick={handleLogout}>Logout</button>
      <Advisories />
    </div>
  );
}
