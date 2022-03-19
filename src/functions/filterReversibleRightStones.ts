import { BoardStatus } from "src/types/BoardStatus";
import { SquareNumber } from "src/types/SquareNumber";
import { StoneColor } from "src/types/StoneColor";

// 石が置かれたマスの右横を調査し、挟んだ相手の石の位置を配列に格納して返す
export const filterReversibleRightStones = (
  boardStatus: BoardStatus,
  newStoneColor: StoneColor,
  newStoneRow: SquareNumber,
  newStoneCol: SquareNumber
) => {
  if (boardStatus[newStoneRow][newStoneCol] !== "") return [];

  const rightStones = [];
  for (let i = newStoneCol + 1; i < 8; i++) {
    rightStones.push(boardStatus[newStoneRow][i]);
  }

  let reversibleRightStones = [];
  for (let i = 0; i < rightStones.length; i++) {
    if (rightStones[i] !== "" && rightStones[i] !== newStoneColor) {
      reversibleRightStones.push([newStoneRow, newStoneCol + i + 1]);
    } else if (rightStones[i] !== "" && rightStones[i] === newStoneColor) {
      return reversibleRightStones;
    } else {
      return [];
    }
  }
  return [];
};
