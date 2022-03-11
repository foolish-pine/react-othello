/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { VFC } from "react";
import { BoardStatus } from "src/types/BoardStatus";
import { StoneColor } from "src/types/StoneColor";

type Props = {
  boardStatus: BoardStatus;
};

export const Score: VFC<Props> = ({ boardStatus }) => {
  const countStones = (player: StoneColor) => {
    let count = 0;
    boardStatus.forEach((row) => {
      row.forEach((square) => {
        if (square === player) count++;
      });
    });
    return count;
  };

  const blackStonesCount = countStones("black");
  const whiteStonesCount = countStones("white");

  return (
    <>
      <p
        css={css`
          margin-top: 8px;
          font-size: 16px;
          font-weight: bold;
        `}
      >
        Black: {blackStonesCount}
        <br />
        White: {whiteStonesCount}
      </p>
    </>
  );
};
