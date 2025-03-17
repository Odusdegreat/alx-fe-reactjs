import { useState } from "react";

const AddRecipeForm = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [errors, setErrors] = useState({}); // Track multiple validation errors

  // Validation function
  const validate = () => {
    let validationErrors = {};

    if (!title.trim()) validationErrors.title = "Title is required.";
    if (!ingredients.trim())
      validationErrors.ingredients = "Ingredients are required.";
    if (!steps.trim()) validationErrors.steps = "Steps are required.";

    const ingredientList = ingredients
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
    if (ingredientList.length < 2) {
      validationErrors.ingredients = "Please provide at least two ingredients.";
    }

    const stepList = steps
      .split("\n")
      .map((step) => step.trim())
      .filter(Boolean);
    if (stepList.length < 1) {
      validationErrors.steps = "Please provide at least one step.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return; // Stop submission if validation fails

    const newRecipe = {
      id: Date.now(),
      title,
      ingredients: ingredients
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      steps: steps
        .split("\n")
        .map((step) => step.trim())
        .filter(Boolean),
    };

    console.log("New Recipe Submitted:", newRecipe);

    // Clear form fields and errors after successful submission
    setTitle("");
    setIngredients("");
    setSteps("");
    setErrors({});
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Add a New Recipe</h2>

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
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
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
          {errors.ingredients && (
            <p className="text-red-500 text-sm">{errors.ingredients}</p>
          )}
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
          {errors.steps && (
            <p className="text-red-500 text-sm">{errors.steps}</p>
          )}
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
