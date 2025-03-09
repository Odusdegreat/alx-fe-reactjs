import React from "react";
import {
  render,
  fireEvent,
  it,
  describe,
  expect,
} from "@testing-library/react";
import { TodoList } from "./TodoList";

describe("TodoList", () => {
  it("renders initial state", () => {
    const { getByText } = render(<TodoList />);
    expect(getByText("Buy milk")).toBeInTheDocument();
    expect(getByText("Walk the dog")).toBeInTheDocument();
    expect(getByText("Do laundry")).toBeInTheDocument();
  });

  it("adds new todo", () => {
    const { getByPlaceholderText, getByText } = render(<TodoList />);
    const input = getByPlaceholderText("Add new todo");
    const button = getByText("Add");
    fireEvent.change(input, { target: { value: "New todo" } });
    fireEvent.click(button);
    expect(getByText("New todo")).toBeInTheDocument();
  });

  it("toggles todo completion", () => {
    const { getByText } = render(<TodoList />);
    const todo = getByText("Buy milk");
    fireEvent.click(todo);
    expect(todo).toHaveAttribute("checked");
    fireEvent.click(todo);
    expect(todo).not.toHaveAttribute("checked");
  });

  it("deletes todo", () => {
    const { getByText } = render(<TodoList />);
    const todo = getByText("Walk the dog");
    fireEvent.click(todo.querySelector("button"));
    expect(getByText("Walk the dog")).not.toBeInTheDocument();
  });
});
