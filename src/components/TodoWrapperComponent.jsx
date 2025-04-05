import HeaderComponent from "./HeaderComponent";
import TodoItemSection from "./TodoItemSection";

export default function TodoWrapperComponent() {
  return (
    <div className="todo-container">
      <h1 className="wrapperTitle"> Todo List</h1>
      <HeaderComponent />
      <TodoItemSection />
    </div>
  );
}
