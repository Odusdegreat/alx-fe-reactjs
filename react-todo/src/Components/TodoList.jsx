import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../Components/TodoList"; // ✅ Correct import path

// Test if the component renders correctly
test("renders the todo list component", () => {
  render(<TodoList />);
  expect(screen.getByText("Todo List")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Enter new todo")).toBeInTheDocument();
});

// Test adding a new todo
test("adds a new todo", () => {
  render(<TodoList />);

  const input = screen.getByPlaceholderText("Enter new todo");
  const addButton = screen.getByRole("button", { name: /add/i }); // ✅ More reliable selector

  fireEvent.change(input, { target: { value: "New Todo" } });
  fireEvent.click(addButton);

  expect(screen.getByText("New Todo")).toBeInTheDocument();
});

// Test toggling a todo
test("toggles a todo as completed", () => {
  render(<TodoList />);

  // ✅ Add a todo first
  const input = screen.getByPlaceholderText("Enter new todo");
  const addButton = screen.getByRole("button", { name: /add/i });
  fireEvent.change(input, { target: { value: "Test Todo" } });
  fireEvent.click(addButton);

  const todoItem = screen.getByText("Test Todo");

  fireEvent.click(todoItem);
  expect(todoItem).toHaveStyle("text-decoration: line-through");

  fireEvent.click(todoItem);
  expect(todoItem).not.toHaveStyle("text-decoration: line-through");
});

// Test deleting a todo
test("deletes a todo", () => {
  render(<TodoList />);

  // ✅ Add a todo first
  const input = screen.getByPlaceholderText("Enter new todo");
  const addButton = screen.getByRole("button", { name: /add/i });
  fireEvent.change(input, { target: { value: "Test Todo" } });
  fireEvent.click(addButton);

  const deleteButton = screen.getByRole("button", { name: /delete/i }); // ✅ More reliable selector
  fireEvent.click(deleteButton);

  expect(screen.queryByText("Test Todo")).not.toBeInTheDocument();
});
