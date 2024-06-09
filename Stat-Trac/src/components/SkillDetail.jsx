import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const host = 'http://localhost:3001';

const SkillDetail = () => {
  const { id } = useParams();
  const [skill, setSkill] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const response = await fetch(`${host}/skills/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setSkill(data);
      } catch (error) {
        console.error("Error fetching skill:", error);
        setError("Failed to fetch skill");
      }
    };

    fetchSkill();
  }, [id]);

  if (error) {
    return <p className="text-red-600 text-center font-medium mt-5">Error: {error}</p>;
  }

  if (!skill) {
    return <p className="text-white text-center mt-5">Loading...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-6">
      <h1 className="text-3xl font-bold text-center text-white my-6">
        Skill Details
      </h1>
      <div className="bg-slate-800 shadow-lg rounded-lg p-6 text-white">
        <p><strong>Character ID:</strong> {skill.characterId}</p>
        <p><strong>Acrobatics:</strong> {skill.acrobatics}</p>
        <p><strong>Animal Handling:</strong> {skill.animalHandling}</p>
        <p><strong>Arcana:</strong> {skill.arcana}</p>
        <p><strong>Athletics:</strong> {skill.athletics}</p>
        <p><strong>Deception:</strong> {skill.deception}</p>
        <p><strong>History:</strong> {skill.history}</p>
        <p><strong>Insight:</strong> {skill.insight}</p>
        <p><strong>Intimidation:</strong> {skill.intimidation}</p>
        <p><strong>Investigation:</strong> {skill.investigation}</p>
        <p><strong>Medicine:</strong> {skill.medicine}</p>
        <p><strong>Nature:</strong> {skill.nature}</p>
        <p><strong>Perception:</strong> {skill.perception}</p>
        <p><strong>Performance:</strong> {skill.performance}</p>
        <p><strong>Persuasion:</strong> {skill.persuasion}</p>
        <p><strong>Religion:</strong> {skill.religion}</p>
        <p><strong>Sleight of Hand:</strong> {skill.sleightOfHand}</p>
        <p><strong>Stealth:</strong> {skill.stealth}</p>
        <p><strong>Survival:</strong> {skill.survival}</p>
        <div className="mt-4">
          <Link
            to={`/characters/${skill.characterId}/skills/edit`}
            className="text-blue-500 underline"
          >
            Edit Skills
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SkillDetail;