import "./styles/Todo.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TopNavBarComponent from "./components/TopNavBarComponent";
import { useState, useEffect } from "react";
import FooterComponent from "./components/FooterComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthStatusAPI } from "./utils/GoServiceAuth";
import Account from "./pages/Account";
import HomePage from "./pages/HomePage";
import Todo from "./pages/Todo";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import AppContext from "./utils/Context";

function App() {
  const [todoList, setTodoList] = useState(null);
  const [listId, setListId] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userContext, setUserContext] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const data = await AuthStatusAPI();
        if (data.result) {
          const { status: httpStatus, authenticatedUser: user } = data.result;
          if (httpStatus === 200) {
            setIsLoggedIn(data.Authenticated);
            setUserContext(user);
          } else {
            setIsLoggedIn(false);
            setUserContext(null);
          }
        } else {
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

    const interval = setInterval(checkLogin, 15 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AppContext.Provider
        value={{
          todoList,
          setTodoList,
          isLoggedIn,
          setIsLoggedIn,
          userContext,
          setUserContext,
          listId,
          setListId,
        }}
      >
        <Router>
          <TopNavBarComponent />

          <Routes>
            <Route
              path="/"
              element={
                <HomePage isLoggedIn={isLoggedIn} userContext={userContext} />
              }
            />
            <Route
              path="/account"
              element={
                <Account isLoggedIn={isLoggedIn} userContext={userContext} />
              }
            />

            <Route path="/todos" element={<Todo />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/register"
              element={<Register isLoggedIn={isLoggedIn} />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
          <FooterComponent />
        </Router>
      </AppContext.Provider>
    </>
  );
}

export default App;
