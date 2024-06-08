import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const host = 'http://localhost:3001';

const NewSkill = () => {
  const { id: characterId } = useParams();
  const [formData, setFormData] = useState({
    characterId: characterId,
    acrobatics: "",
    animalHandling: "",
    arcana: "",
    athletics: "",
    deception: "",
    history: "",
    insight: "",
    intimidation: "",
    investigation: "",
    medicine: "",
    nature: "",
    perception: "",
    performance: "",
    persuasion: "",
    religion: "",
    sleightOfHand: "",
    stealth: "",
    survival: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${host}/skills`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Skill creation failed:", data);
        alert("Skill creation failed: " + (data.message || "Unknown error"));
        return;
      }

      navigate(`/character/${characterId}/skills`);
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error: " + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = parseInt(value, 10);

    if (value === "" || (!isNaN(parsedValue) && parsedValue >= -4 && parsedValue <= 4)) {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <section className="p-8 bg-white dark:bg-gray-700 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Create New Skill</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map((key) => (
            key !== "characterId" && (
              <div key={key} className="flex flex-col">
                <label htmlFor={key} className="text-white mb-1">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                <input
                  type="number"
                  name={key}
                  id={key}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={formData[key]}
                  onChange={handleChange}
                  min="-4"
                  max="4"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-600 dark:text-white"
                />
              </div>
            )
          ))}
          <input type="hidden" name="characterId" value={characterId} />
          <input
            type="submit"
            value="Create Skill"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 dark:hover:bg-blue-700"
          />
        </form>
      </section>
    </div>
  );
};

export default NewSkill;
