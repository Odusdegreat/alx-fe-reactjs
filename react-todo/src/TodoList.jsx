import { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Importing uuid for unique ID generation

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: uuidv4(), text: "Learn React", completed: false },
    { id: uuidv4(), text: "Write Tests", completed: false },
  ]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim() === "") {
      alert("Please enter a valid todo."); // User feedback for invalid input
      return;
    }
    setTodos([...todos, { id: uuidv4(), text: input, completed: false }]);
    setInput("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter new todo"
        aria-label="New todo input" // Accessibility improvement
      />
      <button onClick={addTodo} aria-label="Add todo">
        Add
      </button>{" "}
      {/* Accessibility improvement */}
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {todo.text}{" "}
            <button
              onClick={() => deleteTodo(todo.id)}
              aria-label="Delete todo"
            >
              Delete
            </button>{" "}
            {/* Accessibility improvement */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
