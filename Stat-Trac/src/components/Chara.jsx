import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const host = 'http://localhost:3001';

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(`${host}/character`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", 
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setCharacters(data);
      } catch (error) {
        console.error("Error fetching characters:", error);
        setError("Failed to fetch characters");
      }
    };

    fetchCharacters();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-6">
      {error ? (
        <p className="text-red-600 text-center font-medium mt-5">
          Error: {error}
        </p>
      ) : (
        <div>
          <h1 className="text-3xl font-bold text-center text-white my-6">
            Characters
          </h1>
          <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {characters.map((character) => (
              <li
                key={character._id}
                className="bg-slate-800 shadow-lg rounded-lg p-2 sm:p-4 flex flex-col items-center text-center space-y-3"
              >
                <Link
                  to={`/character/${character._id}`}
                  className="flex flex-col items-center space-y-3"
                >
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      {character.characterName}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {character.class} - Level {character.level}
                    </p>
                  </div>
                  <div className="text-sm text-gray-400">
                    <p>Player: {character.playerName}</p>
                    <p>Race: {character.race}</p>
                    <p>Alignment: {character.alignment}</p>
                    <p>XP: {character.experiencePoints}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Characters;