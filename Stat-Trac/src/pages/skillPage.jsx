import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const host = 'http://localhost:3001';

const SkillPage = () => {
  const { user } = useContext(AuthContext);
  const { id: characterId } = useParams();
  const navigate = useNavigate();
  const [skills, setSkills] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(`${host}/skills?characterId=${characterId}`, {
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
        console.log("Fetched skills data:", data); // Log the fetched data
        setSkills(data);
      } catch (error) {
        console.error("Error fetching skills:", error);
        setError("Failed to fetch skills");
      }
    };

    fetchSkills();
  }, [characterId]);

  const handleEdit = () => {
    navigate(`/characters/${characterId}/skills/edit`);
  };

  if (error) {
    return (
      <p className="text-red-600 text-center font-medium mt-5">Error: {error}</p>
    );
  }

  if (!skills) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p>Loading...</p>
      </div>
    );
  }

  if (skills.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">No Skills Found</h1>
        </div>
        <Link
          to={`/characters/${characterId}/skills/new`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Skill
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-6 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold text-center text-white my-6">
        Skills
      </h1>
      <div className="bg-slate-800 shadow-lg rounded-lg p-6 text-white">
        {skills.map(skill => (
          <div key={skill._id}>
            {Object.entries(skill).map(([key, value]) => (
              key !== "_id" && key !== "characterId" && key !== "__v" && (
                <div key={key} className="flex justify-between">
                  <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                  <span>{value}</span>
                </div>
              )
            ))}
          </div>
        ))}
        <div className="text-center mt-4">
          <button
            onClick={handleEdit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Edit Skills
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillPage;