import { BoardStatus } from "src/types/BoardStatus";
import { SquareNumber } from "src/types/SquareNumber";
import { StoneColor } from "src/types/StoneColor";

// 石が置かれたマスの上を調査し、挟んだ相手の石の位置を配列に格納して返す
export const filterReversibleTopStones = (
  boardStatus: BoardStatus,
  newStoneColor: StoneColor,
  newStoneRow: SquareNumber,
  newStoneCol: SquareNumber
) => {
  if (boardStatus[newStoneRow][newStoneCol] !== "") return [];

  const topStones = [];
  for (let i = 0; i < newStoneRow; i++) {
    topStones.push(boardStatus[i][newStoneCol]);
  }

  let reversibleTopStones = [];
  for (let i = topStones.length - 1; i >= 0; i--) {
    if (topStones[i] !== "" && topStones[i] !== newStoneColor) {
      reversibleTopStones.push([i, newStoneCol]);
    } else if (topStones[i] !== "" && topStones[i] === newStoneColor) {
      return reversibleTopStones;
    } else {
      return [];
    }
  }

  return [];
};
