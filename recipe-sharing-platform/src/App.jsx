import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./components/Homepage";
import RecipeDetail from "./components/RecipeDetail";
import AddRecipeForm from "./components/AddRecipeForm";

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <nav className="bg-blue-600 text-white p-4 shadow-md flex justify-between">
          <Link to="/" className="text-lg font-semibold">
            Home
          </Link>
          <Link
            to="/add-recipe"
            className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow-md hover:bg-gray-200"
          >
            Add Recipe
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/add-recipe" element={<AddRecipeForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
