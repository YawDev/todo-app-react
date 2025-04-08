import "../styles/Footer.css";
import footerImg from "../assets/react.svg";
export default function FooterComponent() {
  return (
    <div className="footerSection">
      <p>
        Todo App - Powered by React <img src={footerImg} />
      </p>
    </div>
  );
}
