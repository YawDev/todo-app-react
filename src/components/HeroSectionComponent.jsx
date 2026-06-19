import "../styles/HeroSection.css";
import { useContext } from "react";
import { FiZap, FiCheckCircle, FiLock } from "react-icons/fi";
import AppContext from "../utils/Context";

const FEATURES = [
  {
    icon: <FiZap />,
    title: "Quick to Add",
    desc: "Create tasks in seconds. No friction, no clutter — just you and your list.",
  },
  {
    icon: <FiCheckCircle />,
    title: "Easy to Track",
    desc: "See what's done and what's left at a glance. Stay on top without the stress.",
  },
  {
    icon: <FiLock />,
    title: "Stays Private",
    desc: "Your tasks are yours. Secured with HttpOnly JWT cookies and a Go-powered API.",
  },
];

const HeroSectionComponent = () => {
  const context = useContext(AppContext);
  if (context === null) throw Error("Context not initialized");

  const { isLoggedIn } = context;

  return (
    <div className="hero-section">
      <div className="hero-inner">
        <div className="hero-content">
          {!isLoggedIn && (
            <span className="hero-eyebrow">✦ Your personal task companion</span>
          )}
          <h1>Organize Your Day, Your Way</h1>
          <p>Plan smarter. Stay focused. Crush your goals.</p>
          <div className="hero-buttons">
            {isLoggedIn ? (
              <a href="/todos" className="btn hero-btn">
                Go to My Todos
              </a>
            ) : (
              <>
                <a href="/register" className="btn hero-btn">
                  Get Started
                </a>
                <a href="/login" className="btn hero-btn secondary">
                  Login
                </a>
              </>
            )}
          </div>
        </div>

        <div className="hero-cards">
          {FEATURES.map(({ icon, title, desc }) => (
            <div className="hero-card" key={title}>
              <span className="hero-card-icon">{icon}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSectionComponent;
