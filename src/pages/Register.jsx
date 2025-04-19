import RegistrationForm from "../components/RegistrationForm";
import BackToHomePage from "../components/BackToHomePage";

export default function Register({ isLoggedIn }) {
  return (
    <>
      <BackToHomePage />
      <RegistrationForm isLoggedIn={isLoggedIn} />
    </>
  );
}
