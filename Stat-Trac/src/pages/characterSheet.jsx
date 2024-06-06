import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const host = 'http://localhost:3001';

const CharacterSheet = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${host}/character/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCharacter(data);
      })
      .catch((error) => {
        console.error("Error fetching character:", error);
        setError("Failed to fetch character");
      });
  }, [id]);

  if (error) {
    return (
      <div className="text-red-600 text-center font-medium mt-5">
        Error: {error}
      </div>
    );
  }

  if (!character) {
    return <div className="text-white text-center mt-5">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-6">
      <h1 className="text-3xl font-bold text-center text-white my-6">
        {character.characterName}
      </h1>
      <div className="bg-slate-800 shadow-lg rounded-lg p-6 text-white">
        <p><strong>Player Name:</strong> {character.playerName}</p>
        <p><strong>Class:</strong> {character.class}</p>
        <p><strong>Level:</strong> {character.level}</p>
        <p><strong>Race:</strong> {character.race}</p>
        <p><strong>Alignment:</strong> {character.alignment}</p>
        <p><strong>Experience Points:</strong> {character.experiencePoints}</p>
        <p><strong>Background:</strong> {character.background}</p>
        <p><strong>Description:</strong> {character.description}</p>
        <h2 className="text-2x1 font-bold mt-4">Attributes</h2>
        <p><strong>Strength:</strong> {character.strength}</p>
        <p><strong>Dexterity:</strong> {character.dexterity}</p>
        <p><strong>Constitution:</strong> {character.constitution}</p>
        <p><strong>Intelligence:</strong> {character.intelligence}</p>
        <p><strong>Wisdom:</strong> {character.wisdom}</p>
        <p><strong>Charisma:</strong> {character.charisma}</p>
        <h1 className="text-2xl font-bold mt-4">Equipment</h1>
        <p><strong>Weapon:</strong> {character.weaponName}</p>
      </div>
    </div>
  );
};

export default CharacterSheet;