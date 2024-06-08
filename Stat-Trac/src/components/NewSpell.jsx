import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const host = 'http://localhost:3001';

const NewSpell = () => {
  const { id: characterId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    level: "",
    school: "",
    description: "",
    characterId: characterId,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${host}/spells`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Spell creation failed:", data);
        alert("Spell creation failed: " + (data.message || "Unknown error"));
        return;
      }

      navigate(`/character/${characterId}/spells`);
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error: " + error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <section className="p-8 bg-white dark:bg-gray-700 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Create New Spell</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map((key) => (
            key !== "characterId" && (
              <input
                key={key}
                type="text"
                name={key}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                value={formData[key]}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-600 dark:text-white"
              />
            )
          ))}
          <input type="hidden" name="characterId" value={characterId} />
          <input
            type="submit"
            value="Create Spell"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 dark:hover:bg-blue-700"
          />
        </form>
      </section>
    </div>
  );
};

export default NewSpell;