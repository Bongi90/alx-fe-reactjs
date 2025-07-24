import { create } from 'zustand';

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  favorites: [], 
  recommendations: [], 

  addRecipe: (newRecipe) => {
    set(state => ({
      recipes: [...state.recipes, { ...newRecipe, id: Date.now() }],
    }));
    get().filterRecipes(); 
    get().generateRecommendations(); 
  },

  deleteRecipe: (id) => {
    set(state => ({
      recipes: state.recipes.filter(recipe => recipe.id !== id),
      favorites: state.favorites.filter(favId => favId !== id), 
    }));
    get().filterRecipes(); 
    get().generateRecommendations(); 
  },

  updateRecipe: (updatedRecipe) => {
    set(state => ({
      recipes: state.recipes.map(recipe =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      )
    }));
    get().filterRecipes(); 
    get().generateRecommendations(); 
  },

  setRecipes: (recipes) => {
    set({ recipes });
    get().filterRecipes(); 
    get().generateRecommendations(); 
  },

  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().filterRecipes(); 
  },

  filterRecipes: () => {
    const { recipes, searchTerm } = get();
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    const filtered = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(lowerCaseSearchTerm) ||
      recipe.description.toLowerCase().includes(lowerCaseSearchTerm)
    );
    set({ filteredRecipes: filtered });
  },

  addFavorite: (recipeId) => {
    set(state => {
      if (!state.favorites.includes(recipeId)) {
        return { favorites: [...state.favorites, recipeId] };
      }
      return state;
    });
    get().generateRecommendations(); 
  },

  removeFavorite: (recipeId) => {
    set(state => ({
      favorites: state.favorites.filter(id => id !== recipeId)
    }));
    get().generateRecommendations(); 
  },

  generateRecommendations: () => {
    set(state => {
      const { recipes, favorites } = get(); // Get current state
      const favoritedRecipes = recipes.filter(recipe => favorites.includes(recipe.id));

      let recommended = [];
      if (favoritedRecipes.length > 0) {
        const nonFavoriteRecipes = recipes.filter(recipe => !favorites.includes(recipe.id));
        const count = Math.min(3, nonFavoriteRecipes.length); 
        for (let i = 0; i < count; i++) {
          const randomIndex = Math.floor(Math.random() * nonFavoriteRecipes.length);
          recommended.push(nonFavoriteRecipes[randomIndex]);
          nonFavoriteRecipes.splice(randomIndex, 1);
        }
      } else {
        const allRecipes = [...recipes]; 
        const count = Math.min(3, allRecipes.length);
        for (let i = 0; i < count; i++) {
          const randomIndex = Math.floor(Math.random() * allRecipes.length);
          recommended.push(allRecipes[randomIndex]);
          allRecipes.splice(randomIndex, 1);
        }
      }

      recommended = recommended.filter(rec => rec != null);

      return { recommendations: recommended };
    });
  },
}));

export default useRecipeStore;