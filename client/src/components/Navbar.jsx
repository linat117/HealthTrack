import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => (
  <AppBar position="static" sx={{ backgroundColor: "orange" }}>
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        HealthLink
      </Typography>
      <Button color="inherit" component={Link} to="/">
        Home
      </Button>
      <Button color="inherit" component={Link} to="/login">
        Login
      </Button>
      <Button color="inherit" component={Link} to="/register">
        Register
      </Button>
      <Button color="inherit" component={Link} to="/dashboard">
        Dashboard
      </Button>
    </Toolbar>
  </AppBar>
);

export default Navbar;
