import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const host = 'http://localhost:3001';

const Skills = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(`${host}/characters/${id}/skills`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        if (data.length === 0) {
          navigate(`/characters/${id}/skills/new`);
        } else {
          setSkills(data);
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
        navigate(`/characters/${id}/skills/new`);
      }
    };

    fetchSkills();
  }, [id, navigate]);

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
          <Link to={`/character/${id}/skills/new`} className="text-blue-500 hover:text-blue-700">
            Create New Skill
          </Link>
          <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {skills.map((skill) => (
              <li
                key={skill._id}
                className="bg-slate-800 shadow-lg rounded-lg p-2 sm:p-4 flex flex-col items-center text-center space-y-3"
              >
                <Link
                  to={`/characters/${id}/skill/${skill._id}`}
                  className="flex flex-col items-center space-y-3"
                >
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      {skill.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {skill.level} - {skill.school}
                    </p>
                  </div>
                  <div className="text-sm text-gray-400">
                    <p>{skill.description}</p>
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