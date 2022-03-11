/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { VFC } from "react";
import { StoneColor } from "src/types/StoneColor";

type Props = {
  stoneColor: StoneColor;
};

export const StoneSquare: VFC<Props> = ({ stoneColor }) => {
  return (
    <div css={squareStyle}>
      <span css={stoneStyle(stoneColor)}></span>;
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
