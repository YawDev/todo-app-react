import { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/NavBar.css";

const SideNavBarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      <div className={`sideBarNav ${isOpen ? "open" : ""}`} id="sideBarNav">
        <button className="toggle-btn" id="toggle-btn" onClick={toggleSidebar}>
          ☰
        </button>
        <ul>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Sign In</Link>
          </li>
          <li>
            <Link to="/todos">Manage Todos</Link>
          </li>
          <li>
            <Link to="/account">Account Settings</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SideNavBarComponent;
