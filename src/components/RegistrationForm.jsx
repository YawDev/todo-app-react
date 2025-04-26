import { Button, Form, Alert } from "react-bootstrap";
import { RegisterAPI } from "../utils/GoServiceAuth";
import { useNavigate } from "react-router-dom";
import logoImg from "../assets/react.svg";
import "../styles/Login.css";
import { useState, useEffect } from "react";
import "../styles/SignUp.css";

function RegistrationForm({ isLoggedIn }) {
  const navigate = useNavigate();
  const [newUsername, setNewUserName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [IsValid, setIsValid] = useState(false);

  const [usernameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");

  const [apiMessage, setApiMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    setNewUserName("");
    setNewPassword("");
    setIsValid(false);
    setUserNameError("");
    setPasswordError("");
    setApiMessage("");
    setShowAlert(false);
  }, []);

  useEffect(() => {
    if (apiMessage) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
        setApiMessage("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [apiMessage]);

  useEffect(() => {
    const isValidForm =
      newUsername.trim() &&
      newPassword.trim() &&
      passwordConfirm.trim() &&
      newPassword === passwordConfirm;

    setIsValid(isValidForm);
  }, [newUsername, newPassword, passwordConfirm]);

  const usernameOnChange = (e) => {
    const input = e.target.value;
    setNewUserName(input);
    if (!input.trim()) {
      setUserNameError("Username is required");
      setIsValid(false);
    } else {
      setUserNameError("");
    }
  };

  const passwordOnChange = (e) => {
    const input = e.target.value;
    setNewPassword(input);
    if (!input.trim()) {
      setPasswordError("Password is required");
      setPasswordConfirmError("");
      setIsValid(false);
    } else if (passwordConfirm && input !== passwordConfirm) {
      setPasswordError("Passwords need to match");
      setPasswordConfirmError("Passwords need to match");
      setIsValid(false);
    } else {
      setPasswordError("");
      if (passwordConfirm) {
        setPasswordConfirmError("");
      }
    }
  };

  const passwordConfirmOnChange = (e) => {
    const input = e.target.value;
    setPasswordConfirm(input);
    if (!input.trim()) {
      setPasswordConfirmError("Confirm password required");
      setIsValid(false);
    } else if (newPassword && input !== newPassword) {
      setPasswordConfirmError("Passwords need to match");
      setIsValid(false);
    } else {
      setPasswordConfirmError("");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const data = await RegisterAPI({
        Username: newUsername,
        Password: newPassword,
      });
      const { status: httpStatus, message } = data;
      if (httpStatus === 200) {
        alert("Account successfully created");
        navigate("/login");
      } else if (httpStatus === 400) {
        setApiMessage(message);
      }
    } catch (error) {
      console.log("Login failed", error);
      setApiMessage("We apologize, Internal Server Error.");
    }
  };

  return isLoggedIn ? (
    <div>You are logged in.</div>
  ) : (
    <>
      <div className="signup-form-section">
        <Form onSubmit={handleSignUp} className="signup-form">
          {apiMessage && (
            <Alert
              variant="danger"
              className={`fade-alert ${
                !showAlert ? "hide" : ""
              } w-100 text-center`}
            >
              {" "}
              {apiMessage}
            </Alert>
          )}
          <h4>
            Register New Account <img src={logoImg} alt="logo" />
          </h4>
          <div className="signup-form-group">
            <Form.Label>New Username</Form.Label>

            <Form.Control
              type="text"
              placeholder="Enter new username"
              id="username"
              onChange={usernameOnChange}
            />
            {usernameError && (
              <div style={{ color: "red", fontSize: "15px" }}>
                {usernameError}
              </div>
            )}
          </div>
          <div className="signup-form-group">
            <Form.Label>New Password</Form.Label>

            <Form.Control
              type="password"
              placeholder="Enter new password"
              id="password"
              onChange={passwordOnChange}
            />
            <div className="signup-hint">Secure password required.</div>

            {passwordError && (
              <div style={{ color: "red", fontSize: "15px" }}>
                {passwordError}
              </div>
            )}
          </div>
          <div className="signup-form-group">
            <Form.Label>Confirm Password</Form.Label>

            <Form.Control
              type="password"
              placeholder="Re-enter new password"
              id="passwordConfirmation"
              onChange={passwordConfirmOnChange}
            />

            {passwordConfirmError && (
              <div style={{ color: "red", fontSize: "15px" }}>
                {passwordConfirmError}
              </div>
            )}
          </div>

          <Button disabled={!IsValid} variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </div>
    </>
  );
}

export default RegistrationForm;
