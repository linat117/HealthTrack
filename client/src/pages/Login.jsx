import { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import API from "../api/api.js";
const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", form);
      localStorage.setItem("token", data.token);
      setMessage(`Welcome back, ${data.user.name}!`);
    } catch (err) {
      setMessage(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", mb: 2, color: "orange" }}
        >
          Login to HealthLink
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="email"
            type="email"
            label="Email"
            fullWidth
            value={form.email}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            fullWidth
            value={form.password}
            onChange={handleChange}
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, backgroundColor: "orange" }}
          >
            Login
          </Button>
        </form>
      </Paper>
      <p>{message}</p>
    </Box>
  );
};

export default Login;
