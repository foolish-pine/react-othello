import { BoardStatus } from "src/types/BoardStatus";
import { SquareNumber } from "src/types/SquareNumber";
import { StoneColor } from "src/types/StoneColor";

// 石が置かれたマスの左横を調査し、挟んだ相手の石の位置を配列に格納して返す
export const filterReversibleLeftStones = (
  boardStatus: BoardStatus,
  newStoneColor: StoneColor,
  newStoneRow: SquareNumber,
  newStoneCol: SquareNumber
) => {
  if (boardStatus[newStoneRow][newStoneCol] !== "") return [];

  const leftStones = [];
  for (let i = 0; i < newStoneCol; i++) {
    leftStones.push(boardStatus[newStoneRow][i]);
  }

  let reversibleLeftStones = [];
  for (let i = leftStones.length - 1; i >= 0; i--) {
    if (leftStones[i] !== "" && leftStones[i] !== newStoneColor) {
      reversibleLeftStones.push([newStoneRow, i]);
    } else if (leftStones[i] !== "" && leftStones[i] === newStoneColor) {
      return reversibleLeftStones;
    } else {
      return [];
    }
  }
  return [];
};
