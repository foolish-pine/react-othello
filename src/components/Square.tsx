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
}) => {
  return (
    <div css={squareStyle} onClick={() => onClickSquare()}>
      {squareStatus !== "" && <span css={stoneStyle(squareStatus)}></span>}
      {squareStatus === "" && currentPlayer === "black" && (
        <span css={circleStyle(currentPlayer)}></span>
      )}
      {squareStatus === "" && currentPlayer === "white" && (
        <span css={circleStyle(currentPlayer)}></span>
      )}
    </div>
  );
};

const squareStyle = css`
  width: 42px;
  height: 42px;
  font-size: 30px;
  text-align: center;
  cursor: pointer;
  user-select: none;
  background-color: #37a037;
  border: 1px solid #000000;
`;

const stoneStyle = (squareStatus: Player) => css`
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
`;

const circleStyle = (currentPlayer: Player) => css`
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
    border: 2px solid ${currentPlayer};
    border-radius: 50%;
  }
`;
