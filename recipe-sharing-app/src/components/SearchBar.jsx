import React from 'react';
import useRecipeStore from '../recipeStore';

const SearchBar = () => {
  const setSearchTerm = useRecipeStore(state => state.setSearchTerm);
  const searchTerm = useRecipeStore(state => state.searchTerm); 
  React.useEffect(() => {
    setSearchTerm(searchTerm); 
  }, []); 

  return (
    <input
      type="text"
      placeholder="Search by title or description..."
      value={searchTerm} 
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{
        padding: '10px',
        width: '100%',
        maxWidth: '500px',
        margin: '20px 0',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '1rem',
      }}
    />
  );
};

export default SearchBar;