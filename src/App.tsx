import { useState } from "react";
import { Board } from "src/components/Board";
import { BoardStatus } from "./types/BoardStatus";

export const App = () => {
  const initialBoardStatus: BoardStatus = [
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "white", "black", "", "", ""],
    ["", "", "", "black", "white", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
  ];
  const [boardStatus, setBoardStatus] = useState(initialBoardStatus);

  return <Board boardStatus={boardStatus} />;
};
