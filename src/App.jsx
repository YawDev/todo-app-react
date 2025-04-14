import "./styles/Todo.css";
import TodoWrapperComponent from "./components/TodoWrapperComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import SideNavBarComponent from "./components/SideNavBarComponent";
import { useState } from "react";
import FooterComponent from "./components/FooterComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  const [todoList, setTodoList] = useState([]);
  return (
    <Router>
      <SideNavBarComponent />

      <Routes>
        <Route
          path="/todos"
          element={
            <TodoWrapperComponent
              todoList={todoList}
              setTodoList={setTodoList}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <FooterComponent />
    </Router>
  );
}

export default App;
