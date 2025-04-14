import { Button, Form } from "react-bootstrap";

export default function LoginForm() {
  const handleSubmitModal = () => {
    alert("Logged In!");
  };
  return (
    <div className="form-container">
      <Form onSubmit={handleSubmitModal}>
        <h4 className="mb-4 text-center">Login</h4>

        <Form.Group className="mb-3" controlId="userName">
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
