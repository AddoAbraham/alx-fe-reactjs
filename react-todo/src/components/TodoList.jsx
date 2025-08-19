import React, { useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([
    "Learn React",
    "Build a Todo App",
    "Write Tests",
  ]);

  return (
    <div>
      {todos.length === 0 ? (
        <p>No todos available</p>
      ) : (
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>{todo}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
