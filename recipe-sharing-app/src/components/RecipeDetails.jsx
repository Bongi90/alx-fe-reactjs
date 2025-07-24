import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useRecipeStore from '../recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';
import FavoriteButton from './FavoriteButton'; 

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const recipe = useRecipeStore(state =>
    state.recipes.find(r => r.id === parseInt(recipeId))
  );

  const [isEditing, setIsEditing] = useState(false);

  if (!recipe) {
    return (
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <h2>Recipe Not Found</h2>
        <p>The recipe you are looking for does not exist or has been deleted.</p>
        <button onClick={() => navigate('/')} style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}>
          Back to Recipes
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      {isEditing ? (
        <EditRecipeForm recipe={recipe} onCancelEdit={() => setIsEditing(false)} />
      ) : (
        <>
          <h1>{recipe.title}</h1>
          <p>{recipe.description}</p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button
              onClick={() => setIsEditing(true)}
              style={{ padding: '8px 12px', backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Edit Recipe
            </button>
            <DeleteRecipeButton recipeId={recipe.id} />
            <FavoriteButton recipeId={recipe.id} /> {/* New: Add FavoriteButton */}
            <button
              onClick={() => navigate('/')}
              style={{ padding: '8px 12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Back to List
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeDetails;