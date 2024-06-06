import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import Characters from './components/Chara';
import CharacterSheet from './pages/characterSheet';

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/characters" element={<Characters />} />
        <Route path="/character/:id" element={<CharacterSheet />} />
        {/* Add other routes as needed */}
      </Routes>
    </div>
  );
};

export default App;