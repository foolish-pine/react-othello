/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { VFC } from "react";
import { SquareStatus } from "src/types/SquareStatus";
import { Player } from "src/types/Player";

type Props = {
  squareStatus: SquareStatus;
  currentPlayer?: Player;
  onClickSquare: () => void;
  selectable: boolean;
};

export const Square: VFC<Props> = ({
  squareStatus = "",
  currentPlayer,
  onClickSquare,
  selectable,
}) => {
  return (
    <div
      css={css`
        width: 42px;
        height: 42px;
        font-size: 30px;
        text-align: center;
        cursor: pointer;
        user-select: none;
        background-color: #37a037;
        border: 1px solid #000000;
      `}
      onClick={() => onClickSquare()}
    >
      {squareStatus !== "" && (
        <span
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;

            &::before {
              display: block;
              width: 90%;
              height: 90%;
              content: "";
              background-color: ${squareStatus};
              border-radius: 50%;
            }
          `}
        ></span>
      )}
      {squareStatus === "" && currentPlayer === "black" && (
        <span
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;

            &::before {
              display: block;
              width: 90%;
              height: 90%;
              content: "";
              border: 2px solid #000000;
              border-radius: 50%;
            }
          `}
        ></span>
      )}
      {squareStatus === "" && currentPlayer === "white" && (
        <span
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;

            &::before {
              display: block;
              width: 90%;
              height: 90%;
              content: "";
              border: 2px solid #ffffff;
              border-radius: 50%;
            }
          `}
        ></span>
      )}
    </div>
  );
};
