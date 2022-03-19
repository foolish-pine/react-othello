import { BoardStatus } from "src/types/BoardStatus";
import { SquareNumber } from "src/types/SquareNumber";
import { StoneColor } from "src/types/StoneColor";

// 石が置かれたマスの下を調査し、挟んだ相手の石の位置を配列に格納して返す
export const filterReversibleBottomStones = (
  boardStatus: BoardStatus,
  newStoneColor: StoneColor,
  newStoneRow: SquareNumber,
  newStoneCol: SquareNumber
) => {
  if (boardStatus[newStoneRow][newStoneCol] !== "") return [];

  const bottomStones = [];
  for (let i = newStoneRow + 1; i < 8; i++) {
    bottomStones.push(boardStatus[i][newStoneCol]);
  }

  let reversibleBottomStones = [];
  for (let i = 0; i < bottomStones.length; i++) {
    if (bottomStones[i] !== "" && bottomStones[i] !== newStoneColor) {
      reversibleBottomStones.push([newStoneRow + i + 1, newStoneCol]);
    } else if (bottomStones[i] !== "" && bottomStones[i] === newStoneColor) {
      return reversibleBottomStones;
    } else {
      return [];
    }
  }

  return [];
};
