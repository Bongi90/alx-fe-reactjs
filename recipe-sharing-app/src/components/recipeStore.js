import { create } from 'zustand';

const useRecipeStore = create((set, get) => ({ 
  recipes: [],
  searchTerm: '',
  filteredRecipes: [], 

  addRecipe: (newRecipe) => {
    set(state => ({
      recipes: [...state.recipes, { ...newRecipe, id: Date.now() }],
    }));
    get().filterRecipes(); 
  },

  deleteRecipe: (id) => {
    set(state => ({
      recipes: state.recipes.filter(recipe => recipe.id !== id)
    }));
    get().filterRecipes(); 
  },

  updateRecipe: (updatedRecipe) => {
    set(state => ({
      recipes: state.recipes.map(recipe =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      )
    }));
    get().filterRecipes(); 
  },


  setRecipes: (recipes) => {
    set({ recipes });
    get().filterRecipes(); 
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
}));

export default useRecipeStore;
