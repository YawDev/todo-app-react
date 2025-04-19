import LoginForm from "../components/LoginForm";
import BackToHomePage from "../components/BackToHomePage";
import "../styles/Form.css";

export default function Login({ isLoggedIn, setIsLoggedIn, setUserContext }) {
  return (
    <>
      {" "}
      <BackToHomePage />
      <LoginForm
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setUserContext={setUserContext}
      />
    </>
  );
}
