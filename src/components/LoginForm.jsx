import { Button, Form } from "react-bootstrap";
import { LoginAPI } from "../utils/GoServiceAuth";
import { useNavigate } from "react-router-dom";
import logoImg from "../assets/react.svg";

export default function LoginForm({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = {
        Username: e.target.username.value,
        Password: e.target.password.value,
      };
      const data = await LoginAPI(user);
      setIsLoggedIn(true);
      navigate("/todos");
    } catch (error) {
      console.log("Login failed", error);
    }
  };
  console.log(isLoggedIn, "khj");

  if (isLoggedIn) return;
  return isLoggedIn ? (
    <div>You are logged in </div>
  ) : (
    <div className="form-container">
      <Form onSubmit={handleLogin}>
        <h4 className="mb-4 text-center">
          Login <img src={logoImg} />{" "}
        </h4>

        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" />
        </Form.Group>

        <Form.Group className="mb-4" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" />
        </Form.Group>

        <Form.Group controlId="">
          <input type="checkbox" name="" id="" />{" "}
          <Form.Label> Keep me logged In</Form.Label>
        </Form.Group>

        <div className="d-grid">
          <Button variant="primary" type="submit">
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
}
