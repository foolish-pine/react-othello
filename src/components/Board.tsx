/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { VFC } from "react";
import { Square } from "src/components/Square";
import { BoardStatus } from "src/types/BoardStatus";
import { Player } from "src/types/Player";

type Props = {
  boardStatus: BoardStatus;
  currentPlayer: Player;
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
    <div
      css={css`
        display: inline-block;
        padding: 10px;
        background-color: #37a037;
      `}
    >
      <div
        css={css`
          border-collapse: collapse;
          border: 1px solid #000000;
        `}
      >
        {boardStatus.map((row, i) => {
          return (
            <div
              css={css`
                display: flex;
              `}
              key={i}
            >
              {row.map((squareStatus, j) => {
                return squaresSelectableStatus[i][j] ? (
                  <Square
                    squareStatus={squareStatus}
                    onClickSquare={() => onClickSquare(i, j)}
                    selectable={true}
                    currentPlayer={currentPlayer}
                    key={`${i}-${j}`}
                  />
                ) : (
                  <Square
                    squareStatus={squareStatus}
                    onClickSquare={() => onClickSquare(i, j)}
                    selectable={false}
                    key={`${i}-${j}`}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
