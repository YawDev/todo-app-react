import "./styles/Todo.css";
import TodoWrapperComponent from "./components/TodoWrapperComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import SideNavBarComponent from "./components/SideNavBarComponent";
import { useState } from "react";
import FooterComponent from "./components/FooterComponent";

function App() {
  const [todoList, setTodoList] = useState([]);
  return (
    <>
      <SideNavBarComponent />
      <TodoWrapperComponent todoList={todoList} setTodoList={setTodoList} />
      <FooterComponent />
    </>
  );
}

export default App;
