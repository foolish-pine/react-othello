/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { VFC } from "react";
import { StoneColor } from "src/types/StoneColor";

type Props = {
  currentPlayer: StoneColor;
  onClickSquare: () => void;
};

export const CircleSquare: VFC<Props> = ({ currentPlayer, onClickSquare }) => {
  return (
    <div css={squareStyle} onClick={onClickSquare}>
      <span css={circleStyle(currentPlayer)}></span>;
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

const circleStyle = (currentPlayer: StoneColor) => css`
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
