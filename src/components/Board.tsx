/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { VFC } from "react";
import { StoneSquare } from "src/components//StoneSquare";
import { CircleSquare } from "src/components/CircleSquare";
import { Square } from "src/components/Square";
import { BoardStatus } from "src/types/BoardStatus";
import { StoneColor } from "src/types/StoneColor";

type Props = {
  boardStatus: BoardStatus;
  currentPlayer: StoneColor;
  onClickSquare: (newStoneRow: number, newStoneCol: number) => void;
  squaresSelectableStatus: boolean[][];
};

export const Board: VFC<Props> = ({
  boardStatus,
  currentPlayer,
  onClickSquare,
  squaresSelectableStatus,
}) => {
  return (
    <div css={boardWrapperStyle}>
      <div css={boardStyle}>
        {boardStatus.map((row, i) => {
          return (
            <div css={boardRowStyle} key={i}>
              {row.map((squareStatus, j) => {
                const isSquareSelectable = squaresSelectableStatus[i][j];

                if (squareStatus !== "") {
                  return (
                    <StoneSquare stoneColor={squareStatus} key={`${i}-${j}`} />
                  );
                } else if (isSquareSelectable) {
                  return (
                    <CircleSquare
                      currentPlayer={currentPlayer}
                      onClickSquare={() => onClickSquare(i, j)}
                      key={`${i}-${j}`}
                    />
                  );
                } else {
                  return <Square key={`${i}-${j}`}></Square>;
                }
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const boardWrapperStyle = css`
  display: inline-block;
  padding: 10px;
  background-color: #37a037;
`;

const boardStyle = css`
  border: 1px solid #000000;
`;

const boardRowStyle = css`
  display: flex;
`;
