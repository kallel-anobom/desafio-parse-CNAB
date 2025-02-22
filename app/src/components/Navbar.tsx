import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const { logout } = useAuth();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/upload">Upload</Link>
        </li>
        <li>
          <Link to="/transactions">Transações</Link>
        </li>
        <li>
          <button onClick={logout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
