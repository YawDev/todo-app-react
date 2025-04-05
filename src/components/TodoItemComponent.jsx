import ButtonComponent from "./ButtonComponent";
import ButtonSection from "./ButtonSection";

export default function TodoItemComponent({ todoItemId, children }) {
  return (
    <div className="todo-item">
      <input type="hidden" name="todoItemId" value={todoItemId} />
      <input type="checkbox" name="" id="" />
      {children.title}
      <ButtonSection />
    </div>
  );
}
