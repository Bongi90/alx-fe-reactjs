import React from 'react';
import useRecipeStore from '../recipeStore';

const FavoriteButton = ({ recipeId }) => {
  const favorites = useRecipeStore(state => state.favorites);
  const addFavorite = useRecipeStore(state => state.addFavorite);
  const removeFavorite = useRecipeStore(state => state.removeFavorite);

  const isFavorite = favorites.includes(recipeId);

  const handleToggleFavorite = (e) => {
    e.stopPropagation(); 
    if (isFavorite) {
      removeFavorite(recipeId);
    } else {
      addFavorite(recipeId);
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      style={{
        padding: '5px 10px',
        backgroundColor: isFavorite ? '#ffc107' : '#007bff', 
        color: isFavorite ? 'black' : 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginLeft: '10px',
        fontSize: '0.8rem',
      }}
      title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
    >
      {isFavorite ? '★ Favorited' : '☆ Favorite'}
    </button>
  );
};

export default FavoriteButton;