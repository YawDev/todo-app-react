import accountImg from "../assets/avatar-user.svg";
import "../styles/Account.css";

export default function UserCardComponent({ userContext, isLoggedIn }) {
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
