import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const host = 'http://localhost:3001';

const CharacterDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(`${host}/character/${id}`, {
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
        setCharacter(data);
      } catch (error) {
        console.error("Error fetching character:", error);
        setError("Failed to fetch character");
      }
    };

    fetchCharacter();
  }, [id]);

  if (error) {
    return <p className="text-red-600 text-center font-medium mt-5">Error: {error}</p>;
  }

  if (!character) {
    return <p className="text-white text-center mt-5">Loading...</p>;
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
        <h2 className="text-2xl font-bold mt-4">Attributes</h2>
        <p><strong>Strength:</strong> {character.strength}</p>
        <p><strong>Dexterity:</strong> {character.dexterity}</p>
        <p><strong>Constitution:</strong> {character.constitution}</p>
        <p><strong>Intelligence:</strong> {character.intelligence}</p>
        <p><strong>Wisdom:</strong> {character.wisdom}</p>
        <p><strong>Charisma:</strong> {character.charisma}</p>
        <h2 className="text-2xl font-bold mt-4">Weapon</h2>
        <p><strong>Name:</strong> {character.weaponName}</p>
        <div className="mt-4">
          <Link to={`/character/${character._id}/skills`} className="text-blue-500 underline">View Skills</Link>
        </div>
        <div className="mt-4">
          <Link to={`/character/${character._id}/spells`} className="text-blue-500 underline">View Spellbook</Link>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;