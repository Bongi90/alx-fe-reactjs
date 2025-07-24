import React from 'react'; 
import useRecipeStore from '../recipeStore';
import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton'; 

const RecommendationsList = () => {
  const recommendations = useRecipeStore(state => state.recommendations);
  const generateRecommendations = useRecipeStore(state => state.generateRecommendations);

  React.useEffect(() => {
    generateRecommendations();
  }, [generateRecommendations]);

  return (
    <div style={{ marginTop: '40px' }}>
      <h2>⭐ Recommended For You</h2>
      {recommendations.length === 0 ? (
        <p>No recommendations available. Try adding some recipes and marking favorites!</p>
      ) : (
        recommendations.map(recipe => (
          <div key={recipe.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', borderRadius: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to={`/recipes/${recipe.id}`} style={{ textDecoration: 'none', color: '#007bff', flexGrow: 1 }}>
              <h3>{recipe.title}</h3>
              <p>{recipe.description.substring(0, 70)}{recipe.description.length > 70 ? '...' : ''}</p>
            </Link>
            <FavoriteButton recipeId={recipe.id} />
          </div>
        ))
      )}
    </div>
  );
};

export default RecommendationsList;