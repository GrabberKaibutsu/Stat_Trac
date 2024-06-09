import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const host = 'http://localhost:3001';

const SpellBook = () => {
  const { user } = useContext(AuthContext);
  const { id: characterId } = useParams();
  const [spells, setSpells] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSpells = async () => {
      try {
        const response = await fetch(`${host}/spells?characterId=${characterId}`, {
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
        setSpells(data);
      } catch (error) {
        console.error("Error fetching spells:", error);
        setError("Failed to fetch spells");
      } finally {
        setLoading(false);
      }
    };

    fetchSpells();
  }, [characterId, user]);

  const handleDelete = async (spellId) => {
    if (!window.confirm("Are you sure you want to delete this spell?")) {
      return;
    }

    try {
      const response = await fetch(`${host}/spells/${spellId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (!response.ok) {
        throw new Error("Failed to delete spell");
      }

      setSpells(spells.filter(spell => spell._id !== spellId));
    } catch (error) {
      console.error("Error deleting spell:", error);
      setError("Failed to delete spell");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p>Loading...</p>
      </div>
    );
  }

  if (spells.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">No Spells Found</h1>
        </div>
        <Link
          to={`/characters/${characterId}/spells/new`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Spell
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 bg-gray-900 text-white">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">Spell Book</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {spells.map((spell) => (
          <div
            key={spell._id}
            className="bg-gray-800 shadow-lg rounded-lg p-4 flex flex-col items-center text-center space-y-3 transform transition-transform hover:scale-105"
          >
            <div>
              <h2 className="text-lg font-bold">{spell.name}</h2>
              <p className="text-sm text-gray-500">Level: {spell.level}</p>
              <p className="text-sm text-gray-500">School: {spell.school}</p>
              <p className="text-sm text-gray-500">{spell.description}</p>
              <div className="mt-4 flex justify-around w-full">
                <Link
                  to={`/characters/${characterId}/spells/${spell._id}/edit`}
                  className="text-blue-500 underline"
                >
                  Edit Spell
                </Link>
                <button
                  onClick={() => handleDelete(spell._id)}
                  className="text-red-500 underline"
                >
                  Delete Spell
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="flex flex-col items-center justify-center text-center transform transition-transform hover:scale-105">
          <Link
            to={`/characters/${characterId}/spells/new`}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add New Spell
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SpellBook;