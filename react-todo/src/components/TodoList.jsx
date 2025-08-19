import React from "react";

const TodoList = ({ todos }) => {
  if (!todos || todos.length === 0) {
    return <p>No todos available</p>;
  }

  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>{todo}</li>
      ))}
    </ul>
  );
};

export default TodoList;
