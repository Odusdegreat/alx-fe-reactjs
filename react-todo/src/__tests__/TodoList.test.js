// __tests__/TodoList.test.js
import React from "react";
import { render } from "@testing-library/react";
import { test, expect } from "@jest/globals";
import TodoList from "../TodoList"; // Adjust the import path as needed

test("renders TodoList component with initial todos", () => {
  const { getByText } = render(<TodoList />);

  // Check if the todos are rendered
  expect(getByText("Learn React")).toBeInTheDocument();
  expect(getByText("Build a Todo App")).toBeInTheDocument();
});
