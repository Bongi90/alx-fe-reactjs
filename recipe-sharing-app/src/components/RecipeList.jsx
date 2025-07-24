import React from 'react';
import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes);

  return (
    <div>
      <h2>Recipe List</h2>
      {recipes.length === 0 ? (
        <p>No recipes added yet. Add some delicious recipes!</p>
      ) : (
        recipes.map(recipe => (
          <div
            key={recipe.id}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              margin: '10px 0',
              borderRadius: '5px'
            }}
          >
            <h3>
              <Link to={`/recipe/${recipe.id}`} style={{ textDecoration: 'none', color: '#007BFF' }}>
                {recipe.title}
              </Link>
            </h3>
            <p>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
