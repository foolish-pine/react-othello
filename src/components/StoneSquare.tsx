/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { VFC } from "react";
import { StoneColor } from "src/types/StoneColor";
import { Square } from "src/components/Square";

type Props = {
  stoneColor: StoneColor;
};

export const StoneSquare: VFC<Props> = ({ stoneColor }) => {
  return (
    <Square>
      <span css={stoneStyle(stoneColor)}></span>
    </Square>
  );
};

const stoneStyle = (stoneColor: StoneColor) => css`
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
    background-color: ${stoneColor};
    border-radius: 50%;
  }
`;
