export default function Account({ isLoggedIn, userContext }) {
  console.log(userContext);
  return !isLoggedIn ? (
    <>
      <h1>Not Authorized</h1>
    </>
  ) : (
    <div>
      <h1>Welcome, {userContext.username}</h1>
    </div>
  );
}
