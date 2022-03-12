import { BoardStatus } from "src/types/BoardStatus";
import { StoneColor } from "src/types/StoneColor";

export const countStones = (
  boardStatus: BoardStatus,
  stoneColor: StoneColor
) => {
  let count = 0;
  boardStatus.forEach((row) => {
    row.forEach((square) => {
      if (square === stoneColor) count++;
    });
  });
  return count;
};
