import "../styles/HeroSection.css";

const HeroSectionComponent = (userContext, isLoggedIn) => {
  console.log(isLoggedIn, "hero");
  return isLoggedIn ? (
    <>
      {" "}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Organize Your Day, Your Way</h1>
          <p>Plan smarter. Stay focused. Crush your goals.</p>
          <div className="hero-buttons">
            <a href="/account" className="btn hero-btn">
              View Account
            </a>
            <a href="/todos" className="btn hero-btn secondary">
              Start keeping track of your tasks
            </a>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="hero-section">
      <div className="hero-content">
        <h1>Organize Your Day, Your Way</h1>
        <p>Plan smarter. Stay focused. Crush your goals.</p>
        <div className="hero-buttons">
          <a href="/register" className="btn hero-btn">
            Get Started
          </a>
          <a href="/login" className="btn hero-btn secondary">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionComponent;
