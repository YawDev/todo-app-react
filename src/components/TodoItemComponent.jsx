import ButtonComponent from "./ButtonComponent";
import ButtonSection from "./ButtonSection";

export default function TodoItemComponent({ children }) {
  return (
    <div className="todo-item">
      <input type="hidden" name="todoItemId" value="1" />
      <input type="checkbox" name="" id="" />
      {children}
      <ButtonSection />
    </div>
  );
}
