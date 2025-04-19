import LoginForm from "../components/LoginForm";
import "../styles/Form.css";

export default function Login({ isLoggedIn, setIsLoggedIn }) {
  console.log("login pg", isLoggedIn);
  return (
    <>
      <LoginForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </>
  );
}
