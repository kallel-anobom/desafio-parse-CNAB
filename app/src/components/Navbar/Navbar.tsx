import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./index.css";
function Navbar() {
  const { logout } = useAuth();

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">Meu App</div>
        <div className="navbar-links">
          <Link to="/upload">Home</Link>
          <Link to="/transactions">Transações</Link>
        </div>
        <button onClick={logout}>Logout</button>
      </nav>
    </>
  );
}

export default Navbar;
