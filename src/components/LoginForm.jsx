import { Button, Form } from "react-bootstrap";
import { LoginAPI } from "../utils/GoServiceAuth";

export default function LoginForm() {
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = {
        Username: e.target.username.value,
        Password: e.target.password.value,
      };
      const data = await LoginAPI(user);
      console.log(data);
      alert("Login Success: " + data.status);
    } catch (error) {
      console.log("Login failed");
    }
  };
  return (
    <div className="form-container">
      <Form onSubmit={handleLogin}>
        <h4 className="mb-4 text-center">Login</h4>

        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" />
        </Form.Group>

        <Form.Group className="mb-4" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" />
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
