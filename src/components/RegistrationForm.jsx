import { Button } from "react-bootstrap";

function RegistrationForm({ isLoggedIn }) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if (isLoggedIn) return <div>Logged In.</div>;
  return (
    <div className="form-container-signUp">
      <form className="mt-4" onSubmit={handleSubmit}>
        <h2 id="signUpTitle">Sign Up</h2>

        <div className="mb-3">
          <label htmlFor="firstname" className="form-label">
            Username
          </label>
          <input type="text" className="form-control" id="firstName" />
        </div>
        <div className="mb-3">
          <label htmlFor="lastname" className="form-label">
            Password
          </label>
          <input type="text" className="form-control" id="lastName" />
          <div id="emailHelp" className="form-text">
            Secure password required.
          </div>
        </div>

        <Button type="submit" variant="primary">
          Register
        </Button>
      </form>
    </div>
  );
}

export default RegistrationForm;
