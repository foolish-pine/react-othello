/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { VFC } from "react";
import { StoneColor } from "src/types/StoneColor";
import { Square } from "src/components/Square";

type Props = {
  currentPlayer: StoneColor;
  onClickSquare: () => void;
};

export const CircleSquare: VFC<Props> = ({ currentPlayer, onClickSquare }) => {
  return (
    <Square onClickSquare={onClickSquare}>
      <span css={circleStyle(currentPlayer)}></span>;
    </Square>
  );
};

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
