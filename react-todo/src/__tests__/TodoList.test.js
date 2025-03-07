import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../TodoList";

test("adds a new todo", () => {
  render(<TodoList />);
  screen.debug(); // Print the DOM
  const input = screen.getByPlaceholderText("Enter new todo");
  const addButton = screen.getByRole("button", { name: /add/i });

  fireEvent.change(input, { target: { value: "New Todo" } });
  fireEvent.click(addButton);

  screen.debug(); // Print the DOM after adding a todo
  expect(screen.getByText("New Todo")).toBeInTheDocument();
});
