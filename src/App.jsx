import "./styles/Todo.css";
import TodoWrapperComponent from "./components/TodoWrapperComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import SideNavBarComponent from "./components/SideNavBarComponent";
import { useState, useEffect } from "react";
import FooterComponent from "./components/FooterComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthStatusAPI } from "./utils/GoServiceAuth";
import Account from "./pages/Account";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const result = await AuthStatusAPI();
        setIsLoggedIn(result.Authenticated);
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsLoggedIn(false);
      }
    };

    checkLogin();

    const interval = setInterval(checkLogin, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <SideNavBarComponent
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      <Routes>
        <Route
          path="/account"
          element={
            <Account isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route
          path="/todos"
          element={
            <TodoWrapperComponent
              todoList={todoList}
              setTodoList={setTodoList}
              isLoggedIn={isLoggedIn}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route
          path="/register"
          element={<Register isLoggedIn={isLoggedIn} />}
        />
      </Routes>
      <FooterComponent />
    </Router>
  );
}

export default App;
