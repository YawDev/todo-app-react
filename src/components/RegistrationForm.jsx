import { Button, Form, Alert } from "react-bootstrap";
import { RegisterAPI } from "../utils/GoServiceAuth";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { useState, useEffect } from "react";
import "../styles/SignUp.css";

function RegistrationForm({ isLoggedIn }) {
  const navigate = useNavigate();
  const [IsValid, setIsValid] = useState(false);

  const [formState, setFormState] = useState({
    newUsername: { value: "", error: "", isValid: false },
    newPassword: { value: "", error: "", isValid: false },
    confirmPassword: { value: "", error: "", isValid: false },
    apiMessage: "",
  });

  const [showAlert, setShowAlert] = useState(false);
  const { newUsername, newPassword, confirmPassword, apiMessage } = formState;
  useEffect(() => {
    setIsValid(false);
    setShowAlert(false);
    setFormState((prev) => ({
      ...prev,
      newUsername: {
        ...prev.newUsername,
        value: "",
        error: "",
        isValid: false,
      },
      newPassword: {
        ...prev.newPassword,
        value: "",
        error: "",
        isValid: false,
      },
      confirmPassword: {
        ...prev.confirmPassword,
        value: "",
        error: "",
        isValid: false,
      },
      apiMessage: "",
    }));
  }, []);

  useEffect(() => {
    if (formState.apiMessage) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
        setFormState((prev) => ({
          ...prev,
          apiMessage: "",
        }));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [apiMessage]);

  useEffect(() => {
    const isValidForm =
      newUsername.value.trim() &&
      newPassword.value.trim() &&
      confirmPassword.value.trim() &&
      newPassword.value === confirmPassword.value.trim();

    setIsValid(isValidForm);
  }, [newUsername.value, newPassword.value, confirmPassword.value]);

  const usernameOnChange = (e) => {
    const input = e.target.value;
    setFormState((prev) => ({
      ...prev,
      newUsername: {
        ...prev.newUsername,
        value: input,
      },
    }));
    if (!input.trim()) {
      setFormState((prev) => ({
        ...prev,
        newUsername: {
          ...prev.newUsername,
          error: "Username is required",
        },
      }));
    } else {
      setFormState((prev) => ({
        ...prev,
        newUsername: {
          ...prev.newUsername,
          error: "",
        },
      }));
    }
  };

  const passwordOnChange = (e) => {
    const input = e.target.value;
    setFormState((prev) => ({
      ...prev,
      newPassword: {
        ...prev.newPassword,
        value: input,
      },
    }));
    if (!input.trim()) {
      setFormState((prev) => ({
        ...prev,
        newPassword: {
          ...prev.newPassword,
          error: "Password is required",
        },
        confirmPassword: {
          ...prev.confirmPassword,
          error: "",
        },
      }));
      setIsValid(false);
    } else if (confirmPassword.value && input !== confirmPassword.value) {
      setFormState((prev) => ({
        ...prev,
        newPassword: {
          ...prev.newPassword,
          error: "Passwords need to match",
        },
        confirmPassword: {
          ...prev.confirmPassword,
          error: "Passwords need to match",
        },
      }));
      setIsValid(false);
    } else {
      setFormState((prev) => ({
        ...prev,
        newPassword: {
          ...prev.newPassword,
          error: "",
        },
      }));
      if (confirmPassword.value) {
        setFormState((prev) => ({
          ...prev,
          confirmPassword: {
            ...prev.confirmPassword,
            error: "",
          },
        }));
      }
    }
  };

  const passwordConfirmOnChange = (e) => {
    const input = e.target.value;
    setFormState((prev) => ({
      ...prev,
      confirmPassword: {
        ...prev.confirmPassword,
        value: input,
      },
    }));
    if (!input.trim()) {
      setIsValid(false);
      setFormState((prev) => ({
        ...prev,
        confirmPassword: {
          ...prev.confirmPassword,
          error: "Confirm password required",
        },
      }));
    } else if (newPassword.value && input !== newPassword.value) {
      setIsValid(false);
      setFormState((prev) => ({
        ...prev,
        confirmPassword: {
          ...prev.confirmPassword,
          error: "Passwords need to match",
        },
      }));
    } else {
      setFormState((prev) => ({
        ...prev,
        confirmPassword: {
          ...prev.confirmPassword,
          error: "",
        },
      }));
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const data = await RegisterAPI({
        Username: newUsername.value,
        Password: newPassword.value,
      });
      const { status: httpStatus, message } = data;
      if (httpStatus === 200) {
        alert("Account successfully created");
        navigate("/login");
      } else if (httpStatus === 400) {
        setFormState((prev) => ({
          ...prev,
          apiMessage: message,
        }));
      }
    } catch (error) {
      console.log("Login failed", error);
      setFormState((prev) => ({
        ...prev,
        apiMessage: "We apologize, Internal Server Error.",
      }));
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
          <h4>Register New Account</h4>
          <div className="signup-form-group">
            <Form.Label>New Username</Form.Label>

            <Form.Control
              type="text"
              placeholder="Enter new username"
              id="username"
              onChange={usernameOnChange}
            />
            {newUsername.error && (
              <div style={{ color: "red", fontSize: "15px" }}>
                {newUsername.error}
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

            {newPassword.error && (
              <div style={{ color: "red", fontSize: "15px" }}>
                {newPassword.error}
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

            {confirmPassword.error && (
              <div style={{ color: "red", fontSize: "15px" }}>
                {confirmPassword.error}
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
