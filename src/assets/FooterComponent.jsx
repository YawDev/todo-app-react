import "../styles/Footer.css";
import footerImg from "../assets/vite.svg";
export default function FooterComponent() {
  return (
    <div className="footerSection">
      <p>
        Todo App - <p className="footerText"> React + Vite</p>
        <img src={footerImg} className="footer-img " />
      </p>
      <div className="footer-links">
        <a href="/about">About</a>
        <a href="/privacy">Privacy</a>
        <a href="/contact">Contact</a>
      </div>
      <div className="footer-support">
        <a href="/support" className="support-link">
          Customer Support
        </a>
        {/* You can add an icon for chat */}
        <a href="/chat" className="chat-icon" aria-label="Live Chat">
          💬
        </a>
      </div>
    </div>
  );
}
