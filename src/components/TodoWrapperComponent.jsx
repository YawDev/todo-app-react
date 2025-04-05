import HeaderComponent from "./HeaderComponent";
import TodoItemSection from "./TodoItemSection";

export default function TodoWrapperComponent({ todoList, setTodoList }) {
  return (
    <div className="todo-container">
      <h1 className="wrapperTitle"> Todo List</h1>
      <HeaderComponent todoList={todoList} setTodoList={setTodoList} />
      <TodoItemSection todoList={todoList} />
    </div>
  );
}
