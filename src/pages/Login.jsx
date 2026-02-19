import LoginForm from "../components/LoginForm";
import BackToHomePage from "../components/BackToHomePage";
import "../styles/Form.css";

export default function Login() {
  return (
    <>
      {" "}
      <BackToHomePage />
      <LoginForm />
    </>
  );
}
