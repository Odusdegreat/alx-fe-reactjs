import useRecipeStore from "../store/useRecipeStore";

const RecommendationsList = () => {
  const { recommendations, generateRecommendations } = useRecipeStore();

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Recommended for You</h2>
      <button
        className="bg-blue-500 text-white p-2 rounded-lg mb-3"
        onClick={generateRecommendations}
      >
        Get Recommendations
      </button>
      {recommendations.length === 0 ? (
        <p>No recommendations yet.</p>
      ) : (
        recommendations.map((recipe) => (
          <div
            key={recipe.id}
            className="p-2 bg-green-100 rounded-lg shadow mb-2"
          >
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default RecommendationsList;
