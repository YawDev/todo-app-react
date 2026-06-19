import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const BackToHomePage = () => {
  return (
    <div className="backToHomePage">
      <Link to="/" className="back-link">
        <FiArrowLeft />
        <span>Back to Homepage</span>
      </Link>
    </div>
  );
};

export default BackToHomePage;
