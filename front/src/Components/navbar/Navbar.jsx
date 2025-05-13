import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Connections from "../../common/Connections"; 
import "./navbar.css";

const Navbar = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    Connections.getData("https://localhost:3000/auth/validateToken",)
      .then((res) => {
        setRole(res.user?.role)})
      .catch(() => setRole(null)); 
  }, []);

  return (
    <nav className="navBar">
      <div className="navLogo">
        <span className="logoText">Your security alternative</span>
      </div>
      <div className="navLinks">
        {role === "admin" && (
          <Link to="/admin" className="navLink">
            Admin
          </Link>
        )}
        <Link to="/" className="navLink">Dashboard</Link>
        <Link to="/login" className="navLink">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
