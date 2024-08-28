import { useState, useEffect } from "react";
import Square from "./components/Square/Square";
import Swal from "sweetalert2";

const renderFrom = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const App = () => {
  const [gameState, setGameState] = useState<(string | number)[][]>(renderFrom);
  const [currentPlayer, setCurrentPlayer] = useState<"circle" | "cross">("circle");
  const [gameOver, setGameOver] = useState(false);

  const checkWin = (gameState: (string | number)[][]) => {
    const flattenedState = gameState.flat();
    for (let condition of winningConditions) {
      const [a, b, c] = condition;
      if (
        flattenedState[a] === flattenedState[b] &&
        flattenedState[a] === flattenedState[c]
      ) {
        return true;
      }
    }
    return false;
  };

  const checkDraw = (gameState: (string | number)[][]) => {
    return gameState.flat().every((cell) => typeof cell === "string");
  };

  useEffect(() => {
    if (checkWin(gameState)) {
      setGameOver(true);
      Swal.fire({
        title: "Game Over",
        text: `${currentPlayer === "circle" ? "Cross" : "Circle"} Wins!`,
        icon: "success",
        confirmButtonText: "Play Again",
      }).then(() => {
        resetGame();
      });
    } else if (checkDraw(gameState)) {
      setGameOver(true);
      Swal.fire({
        title: "Game Over",
        text: "It's a Draw!",
        icon: "info",
        confirmButtonText: "Play Again",
      }).then(() => {
        resetGame();
      });
    }
  }, [gameState]);

  const resetGame = () => {
    setGameState(renderFrom);  // Resetting the game state
    setCurrentPlayer("circle");  // Resetting to the initial player
    setGameOver(false);
  };

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
            gameOver={gameOver}  // Pass gameOver to Square component
          />
        ))}
      </div>
    </div>
  );
};

export default App;
