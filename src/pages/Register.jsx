import RegistrationForm from "../components/RegistrationForm";

export default function Register({ isLoggedIn }) {
  return (
    <>
      <RegistrationForm isLoggedIn={isLoggedIn} />
    </>
  );
}
