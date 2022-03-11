/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { VFC } from "react";
import { StoneSquare } from "src/components//StoneSquare";
import { CircleSquare } from "src/components/CircleSquare";
import { EmptySquare } from "src/components/EmptySquare";
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
                  return <EmptySquare key={`${i}-${j}`} />;
                }
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
