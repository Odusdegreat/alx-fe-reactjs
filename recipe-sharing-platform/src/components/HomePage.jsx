import { useState, useEffect } from "react";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error("Error loading recipes:", error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Recipe Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-40 object-cover rounded-xl"
            />
            <h2 className="text-xl font-semibold mt-4">{recipe.title}</h2>
            <p className="text-gray-600 mt-2">{recipe.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
