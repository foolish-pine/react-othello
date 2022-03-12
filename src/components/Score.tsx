/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { VFC } from "react";
import { countStones } from "src/functions/countStones";
import { BoardStatus } from "src/types/BoardStatus";

type Props = {
  boardStatus: BoardStatus;
};

export const Score: VFC<Props> = ({ boardStatus }) => {
  const blackStonesCount = countStones(boardStatus, "black");
  const whiteStonesCount = countStones(boardStatus, "white");

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
      </p>
      <p
        css={css`
          margin-top: 8px;
          font-size: 16px;
          font-weight: bold;
        `}
      >
        White: {whiteStonesCount}
      </p>
    </>
  );
};
