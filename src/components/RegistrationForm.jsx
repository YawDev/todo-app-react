import { Button } from "react-bootstrap";
import "../styles/SignUp.css";

function RegistrationForm({ isLoggedIn }) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if (isLoggedIn) return <div>Logged In.</div>;
  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="signup-title">Sign Up</h2>

        <div className="signup-form-group">
          <label htmlFor="username" className="signup-label">
            Username
          </label>
          <input
            type="text"
            className="signup-input"
            id="username"
            placeholder="Enter a username"
          />
        </div>

        <div className="signup-form-group">
          <label htmlFor="password" className="signup-label">
            Password
          </label>
          <input
            type="password"
            className="signup-input"
            id="password"
            placeholder="Enter a password"
          />
          <div className="signup-hint">Secure password required.</div>
        </div>

        <Button type="submit" variant="primary">
          Register
        </Button>
      </form>
    </div>
  );
}

export default RegistrationForm;
