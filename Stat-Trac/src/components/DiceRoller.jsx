import React, { useState } from "react";

const DiceRollerPage = () => {
  const [result, setResult] = useState(null);

  const rollDice = (sides) => {
    const roll = Math.floor(Math.random() * sides) + 1;
    setResult(roll);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4 text-center">Roll Dice</h2>
      <div className="grid grid-cols-3 gap-4">
        <button onClick={() => rollDice(4)} className="btn">Roll d4</button>
        <button onClick={() => rollDice(6)} className="btn">Roll d6</button>
        <button onClick={() => rollDice(8)} className="btn">Roll d8</button>
        <button onClick={() => rollDice(10)} className="btn">Roll d10</button>
        <button onClick={() => rollDice(12)} className="btn">Roll d12</button>
        <button onClick={() => rollDice(20)} className="btn">Roll d20</button>
        <button onClick={() => rollDice(100)} className="btn">Roll d100</button>
      </div>
      {result !== null && (
        <div className="mt-4 text-center">
          <p className="text-xl font-bold">Result: {result}</p>
        </div>
      )}
    </div>
  );
};

export default DiceRollerPage;