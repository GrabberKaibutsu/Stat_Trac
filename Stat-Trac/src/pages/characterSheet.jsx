import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const host = 'http://localhost:3001';

const CharacterDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(`${host}/characters/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
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

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this character?")) {
      return;
    }

    try {
      const response = await fetch(`${host}/characters/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (!response.ok) {
        throw new Error("Failed to delete character");
      }

      navigate("/characters");
    } catch (error) {
      console.error("Error deleting character:", error);
      setError("Failed to delete character");
    }
  };

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
          <Link to={`/characters/${character._id}/skills`} className="text-blue-500 underline">View Skills</Link>
        </div>
        <div className="mt-4">
          <Link to={`/characters/${character._id}/spells`} className="text-blue-500 underline">View Spellbook</Link>
        </div>
        <div className="mt-4">
          <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Delete Character
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;