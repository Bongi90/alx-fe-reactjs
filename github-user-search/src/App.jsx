import React from 'react';
import Search from './components/Search';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-white shadow p-4 text-center text-2xl font-bold">
        GitHub User Search
      </header>
      <main className="p-4">
        <Search />
      </main>
    </div>
  );
};

export default App;
