import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const host = 'http://localhost:3001';

const NewSpell = () => {
  const { id: characterId } = useParams();
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    characterId: characterId,
    name: "",
    level: "",
    school: "",
    description: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${host}/spells/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const data = await response.json();
      navigate(`/characters/${characterId}/spells`);
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
      <section className="p-8 bg-white dark:bg-gray-700 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Create New Spell</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-600 dark:text-white"
          />
          <input
            type="number"
            name="level"
            placeholder="Level"
            value={formData.level}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-600 dark:text-white"
          />
          <input
            type="text"
            name="school"
            placeholder="School"
            value={formData.school}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-600 dark:text-white"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-600 dark:text-white"
          />
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