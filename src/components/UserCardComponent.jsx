import accountImg from "../assets/avatar-user.svg";
import "../styles/Account.css";
import AppContext from "../utils/Context";
import { useContext } from "react";

export default function UserCardComponent() {
  const context = useContext(AppContext);
  if (context === null) throw Error("Context not initialized");

  const { userContext, isLoggedIn } = context;

  return isLoggedIn ? (
    <>
      <div className="userProfileContainer">
        <h1>Account Details</h1>
        <h3>{userContext.username}</h3>
        <img src={accountImg} alt="account-avatar" className="account-avatar" />
        <p>Todo User</p>
      </div>
    </>
  ) : (
    <h1> Please Sign In</h1>
  );
}
