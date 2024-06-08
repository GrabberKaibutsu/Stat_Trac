import React, { useState } from "react";

const DiceRollerPage = () => {
  const [result, setResult] = useState(null);

  const rollDice = (sides) => {
    const roll = Math.floor(Math.random() * sides) + 1;
    setResult(roll);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h2 className="text-3xl font-bold mb-8 text-center">Roll Dice</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        <button onClick={() => rollDice(4)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Roll d4
        </button>
        <button onClick={() => rollDice(6)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Roll d6
        </button>
        <button onClick={() => rollDice(8)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Roll d8
        </button>
        <button onClick={() => rollDice(10)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Roll d10
        </button>
        <button onClick={() => rollDice(12)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Roll d12
        </button>
        <button onClick={() => rollDice(20)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Roll d20
        </button>
        <button onClick={() => rollDice(100)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Roll d100
        </button>
      </div>
      {result !== null && (
        <div className="mt-8 text-center">
          <p className="text-2xl font-bold">Result: {result}</p>
        </div>
      )}
    </div>
  );
};

export default DiceRollerPage;