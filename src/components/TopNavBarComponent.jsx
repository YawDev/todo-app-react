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
        <div className="topNavBar-left">
          <ul>
            <li>
              <Link to="/">Home Page</Link>
            </li>
          </ul>
        </div>
        <div className="topNavBar-right">
          <ul>
            {!isLoggedIn ? (
              <>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/login">Sign In</Link>
                </li>
              </>
            ) : (
              <>
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
      </div>
    </nav>
  );
};

export default SideNavBarComponent;
