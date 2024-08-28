import { useState, useEffect } from "react";

const circleSvg = (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
      stroke="#ffffff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

const crossSvg = (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19 5L5 19M5.00001 5L19 19"
      stroke="#fff"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

type SquareProps = {
  id: number;
  gameState: (string | number)[][];
  currentElement: string | number;
  currentPlayer: "circle" | "cross";
  setCurrentPlayer: React.Dispatch<React.SetStateAction<"circle" | "cross">>;
  setGameState: React.Dispatch<React.SetStateAction<(string | number)[][]>>;
  gameOver: boolean;
};

const Square: React.FC<SquareProps> = ({
  id,
  gameState,
  currentPlayer,
  setCurrentPlayer,
  setGameState,
  gameOver,
}) => {
  const [icon, setIcon] = useState<JSX.Element | null>(null);

  const clickOnSquare = () => {
    if (!icon && !gameOver) {
      const row = Math.floor((id - 1) / 3);
      const col = (id - 1) % 3;

      if (gameState[row][col] === id) {
        setIcon(currentPlayer === "circle" ? circleSvg : crossSvg);

        const newGameState = gameState.map((arr, i) =>
          arr.map((el, j) => (i === row && j === col ? currentPlayer : el))
        );
        setGameState(newGameState);

        setCurrentPlayer(currentPlayer === "circle" ? "cross" : "circle");
      }
    }
  };

  useEffect(() => {
    if (gameOver) {
      setIcon(null); // Reset the icon when the game is reset
    }
  }, [gameOver]);

  return (
    <div
      className="w-[80px] h-[80px] square bg-slate-600 rounded-md flex justify-center items-center"
      onClick={clickOnSquare}
    >
      {icon}
    </div>
  );
};

export default Square;
