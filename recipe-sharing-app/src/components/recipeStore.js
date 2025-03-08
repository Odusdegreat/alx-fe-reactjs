import { create } from "zustand";

const useRecipeStore = create((set) => ({
  recipes: [],
  favorites: [], // ✅ Favorites array added
  recommendations: [], // ✅ Recommendations array added
  searchTerm: "",
  filteredRecipes: [],

  // Add a new recipe
  addRecipe: (newRecipe) =>
    set((state) => ({
      recipes: [...state.recipes, newRecipe],
    })),

  // Set recipes in bulk
  setRecipes: (recipes) => set({ recipes, filteredRecipes: recipes }),

  // Search and filter recipes
  setSearchTerm: (term) =>
    set((state) => {
      const filtered = state.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(term.toLowerCase())
      );
      return { searchTerm: term, filteredRecipes: filtered };
    }),

  // Delete a recipe and remove it from favorites
  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
      favorites: state.favorites.filter((fav) => fav.id !== id),
    })),

  // Update a recipe by ID
  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      ),
    })),

  // Toggle favorite status
  toggleFavorite: (id) =>
    set((state) => {
      const recipe = state.recipes.find((recipe) => recipe.id === id);
      if (!recipe) return state;

      const isFavorite = state.favorites.some((fav) => fav.id === id);
      return {
        favorites: isFavorite
          ? state.favorites.filter((fav) => fav.id !== id)
          : [...state.favorites, recipe],
      };
    }),

  // Set recommendations dynamically based on criteria
  setRecommendations: () =>
    set((state) => {
      const recommendedRecipes = state.recipes.filter(
        (recipe) => recipe.rating >= 4 // Example: Recommending recipes with rating >= 4
      );
      return { recommendations: recommendedRecipes };
    }),
}));

export default useRecipeStore;
