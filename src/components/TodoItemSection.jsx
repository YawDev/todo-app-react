import TodoItemComponent from "./TodoItemComponent";

export default function TodoItemSection({
  todoList,
  handleDeleteRequest,
  handleEditRequest,
  searchTerm,
}) {
  const isSearchActive = searchTerm.trim() !== "";

  return (
    <div className="itemListWrapper">
      {todoList.length === 0 ? (
        <p>{isSearchActive ? "No results found" : "Empty List"}</p>
      ) : (
        <>
          {todoList.map((task) => (
            <TodoItemComponent
              key={task.id}
              todoItemId={task.id}
              handleDeleteRequest={handleDeleteRequest}
              handleEditRequest={handleEditRequest}
            >
              {task}
            </TodoItemComponent>
          ))}
        </>
      )}
    </div>
  );
}
