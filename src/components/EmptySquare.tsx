/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { VFC } from "react";

export const EmptySquare: VFC = () => {
  return <div css={squareStyle}></div>;
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
