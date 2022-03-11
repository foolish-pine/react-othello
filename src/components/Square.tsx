/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { VFC } from "react";
import { SquareStatus } from "src/types/SquareStatus";
import { StoneColor } from "src/types/StoneColor";
import { Stone } from "src/components/Stone";
import { Circle } from "src/components/Circle";

type Props = {
  squareStatus: SquareStatus;
  currentPlayer?: StoneColor;
  onClickSquare: () => void;
  selectable: boolean;
};

export const Square: VFC<Props> = ({
  squareStatus = "",
  currentPlayer,
  onClickSquare,
}) => {
  const doesStoneExist = squareStatus !== "" ? squareStatus : null;
  const stoneColor = squareStatus !== "" ? squareStatus : null;

  return (
    <div css={squareStyle} onClick={() => onClickSquare()}>
      {stoneColor && <Stone stoneColor={stoneColor} />}
      {!doesStoneExist && currentPlayer === "black" && (
        <Circle circleColor="black" />
      )}
      {!doesStoneExist && currentPlayer === "white" && (
        <Circle circleColor="white" />
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
