import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "./TodoList.test";

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
  const addButton = screen.getByText("Add");

  fireEvent.change(input, { target: { value: "New Todo" } });
  fireEvent.click(addButton);

  expect(screen.getByText("New Todo")).toBeInTheDocument();
});

// Test toggling a todo
test("toggles a todo as completed", () => {
  render(<TodoList />);
  const todoItem = screen.getByText("Learn React");

  fireEvent.click(todoItem);
  expect(todoItem).toHaveStyle("text-decoration: line-through");

  fireEvent.click(todoItem);
  expect(todoItem).not.toHaveStyle("text-decoration: line-through");
});

// Test deleting a todo
test("deletes a todo", () => {
  render(<TodoList />);

  const deleteButton = screen.getAllByText("Delete")[0]; // Get first delete button
  fireEvent.click(deleteButton);

  expect(screen.queryByText("Learn React")).not.toBeInTheDocument();
});
