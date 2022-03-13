/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ReactNode, VFC } from "react";

type Props = {
  children?: ReactNode;
  onClickSquare?: () => void;
};

export const Square: VFC<Props> = ({ children, onClickSquare }) => {
  return (
    <button css={squareStyle} onClick={onClickSquare}>
      {children}
    </button>
  );
};

const squareStyle = css`
  width: 42px;
  height: 42px;
  padding: 0;
  font-size: 30px;
  text-align: center;
  cursor: pointer;
  user-select: none;
  background-color: #37a037;
  border: 1px solid #000000;
`;
