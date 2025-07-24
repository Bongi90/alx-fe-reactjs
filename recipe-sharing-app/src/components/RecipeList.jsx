import useRecipeStore from '../recipeStore';
import { Link } from 'react-router-dom';
import React from 'react';
import FavoriteButton from './FavoriteButton'; 

const RecipeList = () => {
  const filteredRecipes = useRecipeStore(state => state.filteredRecipes);
  const filterRecipes = useRecipeStore(state => state.filterRecipes);
  const recipes = useRecipeStore(state => state.recipes);

  React.useEffect(() => {
    filterRecipes();
  }, [recipes, filterRecipes]);

  return (
    <div>
      <h2>Recipe List</h2>
      {filteredRecipes.length === 0 ? (
        <p>No recipes found matching your search. Try adding one!</p>
      ) : (
        filteredRecipes.map(recipe => (
          <div key={recipe.id} style={{
            border: '1px solid #ccc',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '5px',
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}>
            <Link to={`/recipes/${recipe.id}`} style={{ textDecoration: 'none', color: '#007bff', flexGrow: 1 }}>
              <h3>{recipe.title}</h3>
              <p>{recipe.description.substring(0, 100)}{recipe.description.length > 100 ? '...' : ''}</p>
            </Link>
            <FavoriteButton recipeId={recipe.id} /> {/* New: Add FavoriteButton */}
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;