import ButtonComponent from "./ButtonComponent";
import ButtonSection from "./ButtonSection";

export default function TodoItemComponent({
  todoItemId,
  children,
  handleDeleteRequest,
}) {
  return (
    <div className="todo-item">
      <input type="hidden" name="todoItemId" value={todoItemId} />
      <input type="checkbox" name="" id="" />
      {children.title}
      <ButtonSection
        deleteAction={() =>
          handleDeleteRequest({ id: todoItemId, title: children.title })
        }
        editAction={() => {
          alert("edited!");
        }}
      />
    </div>
  );
}
