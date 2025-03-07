import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // Ensure this is included
import TodoList from "../TodoList"; // Ensure correct import path

// Helper function to render the component and add a todo
const renderAndAddTodo = (todoText) => {
  render(<TodoList />);
  const input = screen.getByPlaceholderText("Enter new todo");
  const addButton = screen.getByRole("button", { name: /add/i });
  fireEvent.change(input, { target: { value: todoText } });
  fireEvent.click(addButton);
};

test("renders the todo list component", () => {
  render(<TodoList />);
  expect(screen.getByText("Todo List")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Enter new todo")).toBeInTheDocument();
});

test("adds a new todo", async () => {
  renderAndAddTodo("New Todo");
  expect(await screen.findByText("New Todo")).toBeInTheDocument();
});

test("toggles a todo as completed", async () => {
  renderAndAddTodo("Test Todo");

  const todoItem = await screen.findByText("Test Todo");
  fireEvent.click(todoItem);

  // Check if the todo is marked as completed
  expect(todoItem).toHaveStyle("text-decoration: line-through");

  // Toggle again to mark as incomplete
  fireEvent.click(todoItem);
  expect(todoItem).not.toHaveStyle("text-decoration: line-through");
});

test("deletes a todo", async () => {
  renderAndAddTodo("Test Todo");

  const deleteButton = await screen.findByRole("button", { name: /delete/i });
  fireEvent.click(deleteButton);

  // Ensure the todo is removed from the DOM
  expect(screen.queryByText("Test Todo")).not.toBeInTheDocument();
});
