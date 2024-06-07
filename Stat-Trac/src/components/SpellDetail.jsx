import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const host = 'http://localhost:3001';

const SpellDetail = () => {
  const { id } = useParams();
  const [spell, setSpell] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSpell = async () => {
      try {
        const response = await fetch(`${host}/spells/${id}`, {
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
        setSpell(data);
      } catch (error) {
        console.error("Error fetching spell:", error);
        setError("Failed to fetch spell");
      }
    };

    fetchSpell();
  }, [id]);

  if (error) {
    return <p className="text-red-600 text-center font-medium mt-5">Error: {error}</p>;
  }

  if (!spell) {
    return <p className="text-white text-center mt-5">Loading...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-6">
      <h1 className="text-3xl font-bold text-center text-white my-6">
        {spell.name}
      </h1>
      <div className="bg-slate-800 shadow-lg rounded-lg p-6 text-white">
        <p><strong>Level:</strong> {spell.level}</p>
        <p><strong>School:</strong> {spell.school}</p>
        <p><strong>Description:</strong> {spell.description}</p>
      </div>
    </div>
  );
};

export default SpellDetail;