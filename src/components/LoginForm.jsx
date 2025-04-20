import { Button, Form, Alert } from "react-bootstrap";
import { LoginAPI } from "../utils/GoServiceAuth";
import { useNavigate } from "react-router-dom";
import logoImg from "../assets/react.svg";
import "../styles/Login.css";
import { useState, useEffect } from "react";
import { validate } from "uuid";

export default function LoginForm({
  isLoggedIn,
  setIsLoggedIn,
  setUserContext,
}) {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [IsValid, setIsValid] = useState(false);
  const [usernameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [apiError, setApiError] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setUserName("");
    setPassword("");
    setIsValid(false);
    setUserNameError("");
    setPasswordError("");
    setApiError("");
    setShowAlert(false);
  }, []);

  useEffect(() => {
    if (apiError) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
        setApiError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [apiError]);

  const usernameOnChange = (e) => {
    const input = e.target.value;
    setUserName(input);
    if (!input.trim()) {
      setUserNameError("Username is required");
      setIsValid(false);
    } else {
      setUserNameError("");
      setIsValid(true);
    }
  };

  const passwordOnChange = (e) => {
    const input = e.target.value;
    setPassword(input);
    if (!input.trim()) {
      setPasswordError("Password is required");
      setIsValid(false);
    } else {
      setPasswordError("");
      setIsValid(true);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = {
        Username: e.target.username.value,
        Password: e.target.password.value,
      };
      const data = await LoginAPI(user);
      const { status: httpStatus, message } = data;
      if (httpStatus === 200) {
        setIsLoggedIn(true);
        setUserContext(data.authenticatedUser);
        navigate("/todos");
      } else if (httpStatus === 404) {
        setApiError(message);
      }
    } catch (error) {
      console.log("Login failed", error);
    }
  };

  return isLoggedIn ? (
    <div>You are logged in.</div>
  ) : (
    <>
      <div className="login-form-section">
        <Form onSubmit={handleLogin} className="login-form">
          {apiError && (
            <Alert
              variant="danger"
              className={`fade-alert ${
                !showAlert ? "hide" : ""
              } w-100 text-center`}
            >
              {" "}
              {apiError}
            </Alert>
          )}

          <h4>
            Login <img src={logoImg} alt="logo" />
          </h4>
          <div className="login-form-group">
            <Form.Label>Username</Form.Label>

            <Form.Control
              type="text"
              placeholder="Enter username"
              id="username"
              onChange={usernameOnChange}
            />
            {usernameError && (
              <div style={{ color: "red", fontSize: "15px" }}>
                {usernameError}
              </div>
            )}
          </div>

          <div className="login-form-group">
            <Form.Label>Password</Form.Label>

            <Form.Control
              type="password"
              placeholder="Enter password"
              id="password"
              onChange={passwordOnChange}
            />
            {passwordError && (
              <div style={{ color: "red", fontSize: "15px" }}>
                {passwordError}
              </div>
            )}
          </div>

          <div className="login-form-group checkbox-group">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me" className="checkbox-label">
              Keep me logged in
            </label>
          </div>

          <Button disabled={!IsValid} variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </>
  );
}
