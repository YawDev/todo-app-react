import { Button, Form, Alert } from "react-bootstrap";
import { LoginAPI } from "../utils/GoServiceAuth";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { useState, useEffect, useContext } from "react";
import AppContext from "../utils/Context";

export default function LoginForm() {
  const navigate = useNavigate();

  const context = useContext(AppContext);
  if (context === null) throw Error("Context not initialized");

  const [showAlert, setShowAlert] = useState(false);

  const [formState, setFormState] = useState({
    username: { value: "", error: "" },
    password: { value: "", error: "" },
    apiError: "",
    isValid: false,
  });

  const { setIsLoggedIn, setUserContext, isLoggedIn } = context;
  const { username, password, apiError, isValid } = formState;

  useEffect(() => {
    setShowAlert(false);
    setFormState((prev) => ({
      ...prev,
      username: {
        ...prev.username,
        value: "",
        error: "",
      },
      password: {
        ...prev.password,
        value: "",
        error: "",
      },
      isValid: false,
      apiError: "",
    }));
  }, []);

  useEffect(() => {
    if (apiError) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
        setFormState((prev) => ({
          ...prev,
          apiError: "",
        }));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [apiError]);

  const usernameOnChange = (e) => {
    const input = e.target.value;
    setFormState((prev) => ({
      ...prev,
      username: {
        ...prev.username,
        value: input,
      },
    }));
    if (!input.trim()) {
      setFormState((prev) => ({
        ...prev,
        username: {
          ...prev.username,
          error: "Username is required",
        },
        isValid: false,
      }));
    } else {
      setFormState((prev) => ({
        ...prev,
        username: {
          ...prev.username,
          error: "",
        },
        isValid: Validate(input, password.value),
      }));
    }
  };

  const passwordOnChange = (e) => {
    const input = e.target.value;
    setFormState((prev) => ({
      ...prev,
      password: {
        ...prev.password,
        value: input,
      },
    }));
    if (!input.trim()) {
      setFormState((prev) => ({
        ...prev,
        password: {
          ...prev.password,
          error: "Password is required",
        },
        isValid: false,
      }));
    } else {
      setFormState((prev) => ({
        ...prev,
        password: {
          ...prev.password,
          error: "",
        },
        isValid: Validate(username.value, input),
      }));
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
      } else if (httpStatus === 404 || httpStatus === 400) {
        setFormState((prev) => ({
          ...prev,
          apiError: message,
        }));
      }
    } catch (error) {
      console.log("Login failed", error);
      setFormState((prev) => ({
        ...prev,
        apiError: "We apologize, Internal Server Error.",
      }));
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

          <h4>Login</h4>
          <div className="login-form-group">
            <Form.Label>Username</Form.Label>

            <Form.Control
              type="text"
              placeholder="Enter username"
              id="username"
              onChange={usernameOnChange}
            />
            {username.error && (
              <div style={{ color: "red", fontSize: "15px" }}>
                {username.error}
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
            {password.error && (
              <div style={{ color: "red", fontSize: "15px" }}>
                {password.error}
              </div>
            )}
          </div>

          <div className="login-form-group checkbox-group">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me" className="checkbox-label">
              Keep me logged in
            </label>
          </div>

          <Button disabled={!isValid} variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </>
  );
}

const Validate = (username, password) => {
  if (!username || !username.trim() || !password || !password.trim()) {
    return false;
  }
  return true;
};
