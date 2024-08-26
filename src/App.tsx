import { useState } from "react";
import Square from "./components/Square/Square";

const renderFrom = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const App = () => {
  const [gameState, setGameState] = useState<(string | number)[][]>(renderFrom);
  const [currentPlayer, setCurrentPlayer] = useState<"circle" | "cross">(
    "circle"
  );

  return (
    <div className="w-full h-screen bg-slate-800 text-white flex flex-col justify-center items-center gap-4">
      <h2 className="bg-slate-600 text-3xl font-semibold py-2 px-4 rounded-lg">
        TIC TAC TOE
      </h2>
      <div className="usernames py-4 w-[350px] flex justify-around items-center">
        <h2 className="left-user px-4 py-1 rounded-md bg-green-800 text-white font-semibold">
          User 1
        </h2>
        <h2 className="right-user px-4 py-1 rounded-md bg-red-800 text-white font-semibold">
          User 2
        </h2>
      </div>

      <div className="square-wrapper grid grid-cols-3 gap-3">
        {gameState.flat().map((e, index) => (
          <Square
            key={index}
            id={e as number}
            gameState={gameState}
            currentElement={e}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
            setGameState={setGameState}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
