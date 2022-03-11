/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { VFC } from "react";
import { StoneColor } from "src/types/StoneColor";

type Props = {
  circleColor: StoneColor;
};

export const Circle: VFC<Props> = ({ circleColor }) => {
  return <span css={circleStyle(circleColor)}></span>;
};

const circleStyle = (circleColor: StoneColor) => css`
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
    border: 2px solid ${circleColor};
    border-radius: 50%;
  }
`;
