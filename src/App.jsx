import "./styles/Todo.css";
import TodoWrapperComponent from "./components/TodoWrapperComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import SideNavBarComponent from "./components/SideNavBarComponent";
import { useState } from "react";

function App() {
  const [todoList, setTodoList] = useState([]);
  return (
    <>
      <SideNavBarComponent />
      <TodoWrapperComponent todoList={todoList} setTodoList={setTodoList} />
    </>
  );
}

export default App;
