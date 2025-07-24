import { Routes, Route } from 'react-router-dom';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import SearchBar from './components/SearchBar'; // Import SearchBar
import './App.css';

function App() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Recipe Sharing Application</h1>
      <Routes>
        <Route path="/" element={
          <>
            <AddRecipeForm />
            <SearchBar /> {/* Place SearchBar prominently */}
            <RecipeList />
          </>
        } />
        <Route path="/recipes/:recipeId" element={<RecipeDetails />} />
        <Route path="*" element={
            <div style={{ padding: '20px' }}>
                <h2>404 - Page Not Found</h2>
                <p>The recipe you are looking for does not exist.</p>
                <button onClick={() => window.location.href = '/'} style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}>
                    Go to Home
                </button>
            </div>
        } />
      </Routes>
    </div>
  );
}

export default App;

