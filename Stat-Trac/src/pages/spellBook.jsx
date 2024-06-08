import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const host = 'http://localhost:3001';

const SpellBook = () => {
  const { id } = useParams();
  const [spells, setSpells] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSpells = async () => {
      try {
        const response = await fetch(`${host}/spells?characterId=${id}`, {
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
        setSpells(data);
      } catch (error) {
        console.error("Error fetching spells:", error);
        setError("Failed to fetch spells");
      }
    };

    fetchSpells();
  }, [id]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-6">
      {error ? (
        <p className="text-red-600 text-center font-medium mt-5">
          Error: {error}
        </p>
      ) : (
        <div>
          <h1 className="text-3xl font-bold text-center text-white my-6">
            Spell Book
          </h1>
          <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {spells.map((spell) => (
              <li
                key={spell._id}
                className="bg-slate-800 shadow-lg rounded-lg p-2 sm:p-4 flex flex-col items-center text-center space-y-3"
              >
                <Link
                  to={`/character/${id}/spell/${spell._id}`}
                  className="flex flex-col items-center space-y-3"
                >
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      {spell.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {spell.level} - {spell.school}
                    </p>
                  </div>
                  <div className="text-sm text-gray-400">
                    <p>{spell.description}</p>
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

export default SpellBook;