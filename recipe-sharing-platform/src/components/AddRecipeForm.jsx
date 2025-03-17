import { useState } from "react";

const AddRecipeForm = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState(""); // Updated field for steps
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!title || !ingredients || !steps) {
      setError("All fields are required.");
      return;
    }

    const ingredientList = ingredients.split("\n").map((item) => item.trim());
    if (ingredientList.length < 2) {
      setError("Please provide at least two ingredients.");
      return;
    }

    const stepList = steps.split("\n").map((step) => step.trim());
    if (stepList.length < 1) {
      setError("Please provide at least one step.");
      return;
    }

    const newRecipe = {
      id: Date.now(),
      title,
      ingredients: ingredientList,
      steps: stepList, // Updated field for steps
    };

    console.log("New Recipe Submitted:", newRecipe);
    setError(""); // Clear errors

    // Clear form fields
    setTitle("");
    setIngredients("");
    setSteps("");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Add a New Recipe</h2>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Recipe Title */}
        <div>
          <label className="block text-gray-700 font-medium">
            Recipe Title:
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter recipe title"
          />
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-gray-700 font-medium">
            Ingredients:
          </label>
          <textarea
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Enter each ingredient on a new line"
          ></textarea>
        </div>

        {/* Steps */}
        <div>
          <label className="block text-gray-700 font-medium">
            Preparation Steps:
          </label>
          <textarea
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            placeholder="Enter each step on a new line"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
