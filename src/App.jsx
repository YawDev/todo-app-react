import "./styles/Todo.css";
import TodoWrapperComponent from "./components/TodoWrapperComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import SideNavBarComponent from "./components/SideNavBarComponent";

export const todoList = [];

function App() {
  return (
    <>
      <SideNavBarComponent />
      <TodoWrapperComponent />
    </>
  );
}

export default App;
