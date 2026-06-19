import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiUserPlus,
  FiLogIn,
  FiLogOut,
  FiCheckSquare,
  FiUser,
  FiChevronLeft,
  FiChevronRight,
  FiMenu,
} from "react-icons/fi";
import AppContext from "../utils/Context";
import { LogoutAPI } from "../utils/GoServiceAuth";
import "../styles/NavBar.css";
import DarkModeToggle from "./DarkModeToggle";

const SideNavBarComponent = ({
  collapsed,
  onToggle,
  mobileOpen,
  onMobileToggle,
  onMobileClose,
}) => {
  const context = useContext(AppContext);
  const { isLoggedIn, setIsLoggedIn, setUserContext, setTodoList, setListId } =
    context;
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async (e) => {
    e.preventDefault();
    onMobileClose?.();
    try {
      await LogoutAPI();
      setIsLoggedIn(false);
      setUserContext(null);
      setTodoList(null);
      setListId(0);
      navigate("/login");
    } catch (error) {
      console.log("Logout failed", error);
    }
  };

  const NavItem = ({ to, icon, label }) => (
    <li>
      <Link
        to={to}
        onClick={onMobileClose}
        title={collapsed ? label : undefined}
        className={`sidebar-link ${location.pathname === to ? "active" : ""}`}
      >
        <span className="sidebar-icon">{icon}</span>
        <span className="sidebar-label">{label}</span>
      </Link>
    </li>
  );

  return (
    <>
      <button
        className="sidebar-mobile-toggle"
        onClick={onMobileToggle}
        aria-label="Open menu"
      >
        <FiMenu />
      </button>

      <div
        className={`sidebar-overlay ${mobileOpen ? "show" : ""}`}
        onClick={onMobileClose}
      />

      <aside
        className={`sidebar ${collapsed ? "collapsed" : ""} ${
          mobileOpen ? "mobile-open" : ""
        }`}
      >
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <span className="sidebar-logo">
              <FiCheckSquare />
            </span>
            <span className="sidebar-brand-text">Todo App</span>
          </div>
          <button
            className="sidebar-toggle"
            onClick={onToggle}
            aria-label={collapsed ? "Expand menu" : "Collapse menu"}
          >
            {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <NavItem to="/" icon={<FiHome />} label="Home" />
            {!isLoggedIn ? (
              <>
                <NavItem
                  to="/register"
                  icon={<FiUserPlus />}
                  label="Register"
                />
                <NavItem to="/login" icon={<FiLogIn />} label="Sign In" />
              </>
            ) : (
              <>
                <NavItem
                  to="/todos"
                  icon={<FiCheckSquare />}
                  label="Manage Todos"
                />
                {/* <NavItem to="/account" icon={<FiUser />} label="Account" /> */}
              </>
            )}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <ul>
            <li>
              <DarkModeToggle collapsed={collapsed} />
            </li>
            {isLoggedIn && (
              <li>
                <a
                  href="/login"
                  onClick={handleLogout}
                  title={collapsed ? "Logout" : undefined}
                  className="sidebar-link logout"
                >
                  <span className="sidebar-icon">
                    <FiLogOut />
                  </span>
                  <span className="sidebar-label">Logout</span>
                </a>
              </li>
            )}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideNavBarComponent;
