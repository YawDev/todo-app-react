import "../styles/Footer.css";
import footerImg from "../assets/todo-icon.svg";
import { useLocation } from "react-router-dom";
export default function FooterComponent() {
  const location = useLocation();

  const { pathname } = location;

  const showFooter = !["/", "/todos"].includes(pathname);

  return (
    <>
      {showFooter && (
        <div className="footerSection">
          <p>
            <img src={footerImg} className="footer-img" alt="Todo App logo" />
            Todo App
          </p>
          <div className="footer-links">
            <a href="/about">About</a>
            <a href="/privacy">Privacy</a>
            <a href="/contact">Contact</a>
          </div>
        </div>
      )}
    </>
  );
}
