import React from "react";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="App" style={{ textAlign: "center", padding: "20px" }}>
      <h1>My Todo App</h1>
      <TodoList />
    </div>
  );
}
export default App;
