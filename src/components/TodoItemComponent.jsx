import ButtonSection from "./ButtonSection";

export default function TodoItemComponent({
  todoItemId,
  children,
  handleDeleteRequest,
  handleEditRequest,
  handleTaskStatusRequest,
}) {
  return (
    <div className="todo-item">
      <input type="hidden" name="todoItemId" value={todoItemId} />
      <input
        type="checkbox"
        name="itemChecked"
        checked={children.isCompleted}
        onChange={(e) =>
          handleTaskStatusRequest(e, {
            id: todoItemId,
          })
        }
      />
      {children.isCompleted ? <del>{children.title}</del> : children.title}
      <ButtonSection
        deleteAction={() =>
          handleDeleteRequest({
            id: todoItemId,
            title: children.title,
            description: children.description,
          })
        }
        editAction={() => {
          handleEditRequest({
            id: todoItemId,
            title: children.title,
            description: children.description,
          });
        }}
      />
    </div>
  );
}
