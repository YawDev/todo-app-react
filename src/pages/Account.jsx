import BackToHomePage from "../components/BackToHomePage";

export default function Account({ isLoggedIn, userContext }) {
  console.log(userContext);
  return !isLoggedIn ? (
    <>
      <BackToHomePage />
      <h1>Not Authorized</h1>
    </>
  ) : (
    <div>
      <BackToHomePage />

      <h1>Welcome, {userContext.username}</h1>
    </div>
  );
}
