import { Button, Form } from "react-bootstrap";
import { LoginAPI } from "../utils/GoServiceAuth";
import { useNavigate } from "react-router-dom";
import logoImg from "../assets/react.svg";
import "../styles/Login.css";

export default function LoginForm({
  isLoggedIn,
  setIsLoggedIn,
  setUserContext,
}) {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = {
        Username: e.target.username.value,
        Password: e.target.password.value,
      };
      const data = await LoginAPI(user);
      console.log(data.authenticatedUser);
      setIsLoggedIn(true);
      setUserContext(data.authenticatedUser);
      navigate("/todos");
    } catch (error) {
      console.log("Login failed", error);
    }
  };
  console.log(isLoggedIn, "khj");

  return isLoggedIn ? (
    <div>You are logged in.</div>
  ) : (
    <div className="login-form-section">
      <Form onSubmit={handleLogin} className="login-form">
        <h4>
          Login <img src={logoImg} alt="logo" />
        </h4>

        <div className="login-form-group">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            id="username"
          />
        </div>

        <div className="login-form-group">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            id="password"
          />
        </div>

        <div className="login-form-group checkbox-group">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me" className="checkbox-label">
            Keep me logged in
          </label>
        </div>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}
