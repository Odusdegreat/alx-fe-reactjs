import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        const selectedRecipe = data.find((item) => item.id === parseInt(id));
        setRecipe(selectedRecipe);
      })
      .catch((error) => console.error("Error fetching recipe:", error));
  }, [id]);

  if (!recipe) {
    return <p className="text-center mt-10 text-xl">Loading recipe...</p>;
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Link to="/" className="text-blue-500 hover:underline">
        ← Back to Home
      </Link>
      <h1 className="text-3xl font-bold text-center mt-4">{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded-xl mt-4 shadow-md"
      />

      <h2 className="text-2xl font-semibold mt-6">Ingredients</h2>
      <ul className="list-disc list-inside text-gray-700 mt-2">
        {recipe.ingredients?.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mt-6">Instructions</h2>
      <ol className="list-decimal list-inside text-gray-700 mt-2 space-y-2">
        {recipe.instructions?.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeDetail;
