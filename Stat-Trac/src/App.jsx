import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage';
import Characters from './components/Chara';
import CharacterSheet from './pages/characterSheet';
import SpellBook from './pages/SpellBook';
import SpellDetail from './components/SpellDetail';
import Skills from './pages/skillPage';
import SkillDetail from './components/SkillDetail';
import NavBar from './components/NavBar';
import Logout from './pages/logout';
import Signup from './pages/signup';
import Login from './pages/Login';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/characters" element={<Characters />} />
          <Route path="/character/:id" element={<CharacterSheet />} />
          <Route path="/character/:id/spells" element={<SpellBook />} />
          <Route path="/character/:id/spell/:spellId" element={<SpellDetail />} />
          <Route path="/character/:id/skills" element={<Skills />} />
          <Route path="/character/:id/skill/:skillId" element={<SkillDetail />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <NavBar />
    </div>
  );
};

export default App;