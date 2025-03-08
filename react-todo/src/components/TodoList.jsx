import React, { useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([
    // { id: 1, text: "Buy milk", completed: false },
    // { id: 2, text: "Walk the dog", completed: false },
    // { id: 3, text: "Do laundry", completed: false },
  ]);

  const addTodo = (text) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: prevTodos.length + 1, text, completed: false },
    ]);
  };

  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <form>
        <input type="text" placeholder="Add new todo" />
        <button onClick={(e) => addTodo(e.target.value)}>Add</button>
      </form>
    </div>
  );
};

export default TodoList;
