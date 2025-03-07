import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // Ensure this is included
import TodoList from "../components/TodoList"; // Ensure correct import path

test("renders the todo list component", () => {
  render(<TodoList />);
  expect(screen.getByText("Todo List")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Enter new todo")).toBeInTheDocument();
});

test("adds a new todo", () => {
  render(<TodoList />);

  const input = screen.getByPlaceholderText("Enter new todo");
  const addButton = screen.getByRole("button", { name: /add/i });

  fireEvent.change(input, { target: { value: "New Todo" } });
  fireEvent.click(addButton);

  expect(screen.getByText("New Todo")).toBeInTheDocument();
});

test("toggles a todo as completed", () => {
  render(<TodoList />);

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

test("deletes a todo", () => {
  render(<TodoList />);

  const input = screen.getByPlaceholderText("Enter new todo");
  const addButton = screen.getByRole("button", { name: /add/i });

  fireEvent.change(input, { target: { value: "Test Todo" } });
  fireEvent.click(addButton);

  const deleteButton = screen.getByRole("button", { name: /delete/i });
  fireEvent.click(deleteButton);

  expect(screen.queryByText("Test Todo")).not.toBeInTheDocument();
});
