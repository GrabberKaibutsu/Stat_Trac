import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import Characters from './components/Chara';
import CharacterSheet from './pages/characterSheet';
import SpellBook from './pages/pellBook';
import SpellDetail from './components/SpellDetail';
import Skills from './pages/skillPage';
import SkillDetail from './components/SkillDetail';

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/characters" element={<Characters />} />
        <Route path="/character/:id" element={<CharacterSheet />} />
        <Route path="/spells" element={<SpellBook />} />
        <Route path="/spell/:id" element={<SpellDetail />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/skill/:id" element={<SkillDetail />} />
      </Routes>
    </div>
  );
};

export default App;