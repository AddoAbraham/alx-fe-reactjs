import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "./TodoList";

describe("TodoList Component", () => {
  test("renders no todos message when list is empty", () => {
    render(<TodoList todos={[]} />);
    expect(screen.getByText(/No todos available/i)).toBeInTheDocument();
  });

  test("renders todos correctly", () => {
    const todos = ["Learn React", "Build a Todo App", "Write Tests"];
    render(<TodoList todos={todos} />);

    todos.forEach((todo) => {
      expect(screen.getByText(todo)).toBeInTheDocument();
    });
  });
});
