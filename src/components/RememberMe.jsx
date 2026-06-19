export default function RememberMe() {
  return (
    <div className="login-form-group checkbox-group">
      <input type="checkbox" id="remember-me" />
      <label htmlFor="remember-me" className="checkbox-label">
        Keep me logged in
      </label>
    </div>
  );
}
