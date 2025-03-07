import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../TodoList";

// Test 1: Initial render
test("renders the TodoList component with initial todos", () => {
  render(<TodoList />);
  expect(screen.getByText("Todo List")).toBeInTheDocument();
  expect(screen.getByText("Learn React")).toBeInTheDocument();
  expect(screen.getByText("Build a Todo App")).toBeInTheDocument();
});

// Test 2: Add a new todo
test("adds a new todo", () => {
  render(<TodoList />);
  const input = screen.getByPlaceholderText("Enter new todo");
  const addButton = screen.getByRole("button", { name: /add/i });

  fireEvent.change(input, { target: { value: "New Todo" } });
  fireEvent.click(addButton);

  expect(screen.getByText("New Todo")).toBeInTheDocument();
});

// Test 3: Toggle a todo
test("toggles a todo as completed", () => {
  render(<TodoList />);
  const todoItem = screen.getByText("Learn React");

  fireEvent.click(todoItem);
  expect(todoItem).toHaveStyle("text-decoration: line-through");

  fireEvent.click(todoItem);
  expect(todoItem).not.toHaveStyle("text-decoration: line-through");
});

// Test 4: Delete a todo
test("deletes a todo", () => {
  render(<TodoList />);
  const deleteButton = screen.getAllByRole("button", { name: /delete/i })[0];

  fireEvent.click(deleteButton);
  expect(screen.queryByText("Learn React")).not.toBeInTheDocument();
});
