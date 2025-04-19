import LoginForm from "../components/LoginForm";
import "../styles/Form.css";

export default function Login({ isLoggedIn, setIsLoggedIn, setUserContext }) {
  return (
    <>
      <LoginForm
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setUserContext={setUserContext}
      />
    </>
  );
}
