import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const host = 'http://localhost:3001';

const Characters = () => {
  const { user } = useContext(AuthContext);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(`${host}/characters`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }

        const data = await response.json();
        setCharacters(data);
      } catch (error) {
        console.error("Error fetching characters:", error);
        setError("Failed to fetch characters");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p>Loading...</p>
      </div>
    );
  }

  if (characters.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">No Characters Found</h1>
        </div>
        <Link
          to="/characters/new"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Character
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 bg-gray-900 text-white">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">Characters</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {characters.map((character) => (
          <div
            key={character._id}
            className="bg-gray-800 shadow-lg rounded-lg p-4 flex flex-col items-center text-center space-y-3 transform transition-transform hover:scale-105"
          >
            <Link
              to={`/characters/${character._id}`}
              className="flex flex-col items-center space-y-3"
            >
              <div>
                <h2 className="text-lg font-bold">{character.characterName}</h2>
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
          </div>
        ))}
        <div
          className="bg-gray-800 shadow-lg rounded-lg p-4 flex flex-col items-center justify-center text-center transform transition-transform hover:scale-105"
        >
          <Link
            to="/characters/new"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add New Character
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Characters;