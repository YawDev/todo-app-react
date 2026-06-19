import { useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/Account.css";
import AppContext from "../utils/Context";

export default function UserCardComponent() {
  const context = useContext(AppContext);
  if (context === null) throw Error("Context not initialized");

  const { userContext, isLoggedIn } = context;

  if (!isLoggedIn) {
    return (
      <div className="account-page">
        <div className="account-signin">
          <h1>Please sign in</h1>
          <p>You need to be signed in to view your account.</p>
          <Link to="/login" className="account-btn account-btn--primary">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const username = userContext?.username ?? "User";
  const initials =
    username
      .replace(/[^a-zA-Z0-9]/g, "")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <div className="account-page">
      <section className="account-card">
        <div className="account-cover" />

        <div className="account-avatar" aria-hidden="true">
          {initials}
        </div>

        <h1 className="account-name">{username}</h1>
        <span className="account-role">Todo User</span>

        <div className="account-actions">
          <Link to="/todos" className="account-btn account-btn--primary">
            Manage Todos
          </Link>
          <Link to="/" className="account-btn account-btn--ghost">
            Home
          </Link>
        </div>
      </section>
    </div>
  );
}
