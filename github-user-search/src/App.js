import React from 'react';
import { Github } from 'lucide-react';
import Search from './components/Search';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-8 flex items-center justify-center">
      <div className="w-full max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 flex items-center justify-center gap-2">
          <Github size={48} className="text-white" />
          GitHub User Search
        </h1>
        <Search />
      </div>
    </div>
  );
}

export default App;