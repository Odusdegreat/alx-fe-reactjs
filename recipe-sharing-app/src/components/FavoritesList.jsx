import useRecipeStore from "../store/useRecipeStore";

const FavoritesList = () => {
  const { recipes, favorites, removeFavorite } = useRecipeStore();

  const favoriteRecipes = favorites.map((id) =>
    recipes.find((recipe) => recipe.id === id)
  );

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">My Favorites</h2>
      {favoriteRecipes.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        favoriteRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="p-2 bg-gray-100 rounded-lg shadow mb-2"
          >
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            <button
              className="text-red-500 mt-1"
              onClick={() => removeFavorite(recipe.id)}
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default FavoritesList;
