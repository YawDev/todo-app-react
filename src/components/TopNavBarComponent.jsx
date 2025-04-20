import { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/NavBar.css";
import Logout from "./Logout";

const SideNavBarComponent = ({ isLoggedIn, setIsLoggedIn }) => {
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      <div className="topNavBar" id="topNavBar">
        <ul>
          {!isLoggedIn ? (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Sign In</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <Logout setIsLoggedIn={setIsLoggedIn} />
              <li>
                <Link to="/todos">Manage Todos</Link>
              </li>
              <li>
                <Link to="/account">Account Settings</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default SideNavBarComponent;
