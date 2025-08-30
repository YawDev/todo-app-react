import { Button } from "react-bootstrap";
import { LogoutAPI } from "../utils/GoServiceAuth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Logout({
  setIsLoggedIn,
  setTodoList,
  setUserContext,
  setListId,
}) {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const data = await LogoutAPI();
      setIsLoggedIn(false);
      setUserContext(null);
      setTodoList(null);
      setListId(0);
      navigate("/login");
    } catch (error) {
      console.log("Logout failed", error);
    }
  };

  return (
    <>
      <li>
        <Link To="/login" onClick={handleLogout}>
          Logout
        </Link>
      </li>
    </>
  );
}
