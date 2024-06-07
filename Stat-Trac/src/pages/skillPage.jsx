import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const host = 'http://localhost:3001';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(`${host}/skills`, {
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
        setSkills(data);
      } catch (error) {
        console.error("Error fetching skills:", error);
        setError("Failed to fetch skills");
      }
    };

    fetchSkills();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-6">
      {error ? (
        <p className="text-red-600 text-center font-medium mt-5">
          Error: {error}
        </p>
      ) : (
        <div>
          <h1 className="text-3xl font-bold text-center text-white my-6">
            Skills
          </h1>
          <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {skills.map((skill) => (
              <li
                key={skill._id}
                className="bg-slate-800 shadow-lg rounded-lg p-2 sm:p-4 flex flex-col items-center text-center space-y-3"
              >
                <Link
                  to={`/skill/${skill._id}`}
                  className="flex flex-col items-center space-y-3"
                >
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      Skill: {skill.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Character: {skill.characterId}
                    </p>
                  </div>
                  <div className="text-sm text-gray-400">
                    <p>Acrobatics: {skill.acrobatics}</p>
                    <p>Animal Handling: {skill.animalHandling}</p>
                    <p>Arcana: {skill.arcana}</p>
                    <p>Athletics: {skill.athletics}</p>
                    <p>Deception: {skill.deception}</p>
                    <p>History: {skill.history}</p>
                    <p>Insight: {skill.insight}</p>
                    <p>Intimidation: {skill.intimidation}</p>
                    <p>Investigation: {skill.investigation}</p>
                    <p>Medicine: {skill.medicine}</p>
                    <p>Nature: {skill.nature}</p>
                    <p>Perception: {skill.perception}</p>
                    <p>Performance: {skill.performance}</p>
                    <p>Persuasion: {skill.persuasion}</p>
                    <p>Religion: {skill.religion}</p>
                    <p>Sleight of Hand: {skill.sleightOfHand}</p>
                    <p>Stealth: {skill.stealth}</p>
                    <p>Survival: {skill.survival}</p>
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

export default Skills;