import BackToHomePage from "../components/BackToHomePage";
import UserCardComponent from "../components/UserCardComponent";

export default function Account({ isLoggedIn, userContext }) {
  console.log(userContext);
  return (
    <UserCardComponent userContext={userContext} isLoggedIn={isLoggedIn} />
  );
}
