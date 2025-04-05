import { useState } from "react";

const SideNavBarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sideBarNav ${isOpen ? "open" : ""}`} id="sideBarNav">
      <button className="toggle-btn" id="toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>
      <ul>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Register</a>
        </li>
        <li>
          <a href="#">Sign In</a>
        </li>
      </ul>
    </div>
  );
};

export default SideNavBarComponent;
