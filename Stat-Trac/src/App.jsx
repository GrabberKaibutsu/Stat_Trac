import React from 'react';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to the DND App!</h1>
      <p>Explore the world of Dungeons and Dragons with our comprehensive app.</p>
      <div className="features">
        <div className="feature">
          <h2>Characters</h2>
          <p>Manage your characters, their abilities, equipment, and more.</p>
        </div>
        <div className="feature">
          <h2>Spells</h2>
          <p>Discover and organize spells for your characters.</p>
        </div>
        <div className="feature">
          <h2>Equipment</h2>
          <p>Explore a vast array of equipment options for your adventurers.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;