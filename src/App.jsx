import "./styles/Todo.css";
import TodoWrapperComponent from "./components/TodoWrapperComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import TopNavBarComponent from "./components/TopNavBarComponent";
import { useState, useEffect } from "react";
import FooterComponent from "./components/FooterComponent";
import { BrowserRouter as Router, Routes, Route, href } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthStatusAPI } from "./utils/GoServiceAuth";
import Account from "./pages/Account";
import HomePage from "./pages/HomePage";
import BackToHomePage from "./components/BackToHomePage";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userContext, setUserContext] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const data = await AuthStatusAPI();
        console.log(data.result, "debugging OUTSIDE IF");
        if (data.result) {
          console.log(data, "debugging INSIDE IF");

          const { status: httpStatus, authenticatedUser: user } = data.result;
          console.log(httpStatus);
          if (httpStatus === 200) {
            setIsLoggedIn(data.Authenticated);
            setUserContext(user);
          } else {
            setIsLoggedIn(false);
            setUserContext(null);
          }
        } else {
          console.log("reached else --checkLogin");
          setIsLoggedIn(false);
          setUserContext(null);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsLoggedIn(false);
        setUserContext(null);
      }
    };

    checkLogin();

    //const interval = setInterval(checkLogin, 15 * 60 * 1000);
    const interval = setInterval(checkLogin, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Router>
        <TopNavBarComponent
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/account"
            element={
              <Account isLoggedIn={isLoggedIn} userContext={userContext} />
            }
          />

          <Route
            path="/todos"
            element={
              <TodoWrapperComponent
                todoList={todoList}
                setTodoList={setTodoList}
                isLoggedIn={isLoggedIn}
                userContext={userContext}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setUserContext={setUserContext}
              />
            }
          />
          <Route
            path="/register"
            element={<Register isLoggedIn={isLoggedIn} />}
          />
        </Routes>
        <FooterComponent />
      </Router>
    </>
  );
}

export default App;
