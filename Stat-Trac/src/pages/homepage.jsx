import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center pb-20">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">Welcome to the DND App!</h1>
        <p className="text-xl">Explore the world of Dungeons and Dragons with our comprehensive app.</p>
      </div>
      <div className="w-full max-w-4xl flex flex-col items-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center w-full">
          <h2 className="text-3xl font-bold mb-4">Characters</h2>
          <p className="text-lg mb-6">Manage your characters, their abilities, equipment, and more.</p>
          <Link to="/characters">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              View Characters
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;