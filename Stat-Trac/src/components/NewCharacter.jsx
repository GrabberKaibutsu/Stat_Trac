import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const host = 'http://localhost:3001';

const NewCharacter = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    playerName: "",
    characterName: "",
    race: "",
    class: "",
    level: "",
    background: "",
    alignment: "",
    experiencePoints: "",
    description: "",
    strength: "",
    dexterity: "",
    constitution: "",
    intelligence: "",
    wisdom: "",
    charisma: "",
    weaponName: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.id) {
      console.error("User not authenticated");
      return;
    }

    const characterData = { ...formData, userId: user.id };

    try {
      const response = await fetch(`${host}/characters/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(characterData),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Character creation failed:", data);
        alert("Character creation failed: " + (data.message || "Unknown error"));
        return;
      }

      navigate("/characters");
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error: " + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <section className="p-8 bg-white dark:bg-gray-700 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">Create New Character</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map((key) => (
            <div key={key}>
              <label htmlFor={key} className="block text-white mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
              <input
                type="text"
                name={key}
                id={key}
                placeholder={key.replace(/([A-Z])/g, ' $1').trim()}
                value={formData[key]}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-600 dark:text-white"
              />
            </div>
          ))}
          <input
            type="submit"
            value="Create Character"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 dark:hover:bg-blue-700"
          />
        </form>
      </section>
    </div>
  );
};

export default NewCharacter;