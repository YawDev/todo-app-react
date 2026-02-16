import { LogoutAPI } from "../utils/GoServiceAuth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../utils/Context";

export default function Logout() {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const { setIsLoggedIn, setUserContext, setTodoList, setListId } = context;

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
        <Link to="/login" onClick={handleLogout}>
          Logout
        </Link>
      </li>
    </>
  );
}
