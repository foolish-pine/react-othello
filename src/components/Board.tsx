/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { VFC } from "react";
import { Square } from "src/components/Square";
import { BoardStatus } from "src/types/BoardStatus";

type Props = {
  boardStatus: BoardStatus;
  onClickSquare: (newStoneRow: number, newStoneCol: number) => void;
  squaresSelectableStatus: boolean[][];
};

export const Board: VFC<Props> = ({
  boardStatus,
  onClickSquare,
  squaresSelectableStatus,
}) => {
  return (
    <table
      css={css`
        border-collapse: collapse;
      `}
    >
      <tbody>
        {boardStatus.map((row, i) => {
          return (
            <tr key={i}>
              {row.map((squareStatus, j) => {
                return squaresSelectableStatus[i][j] ? (
                  <Square
                    squareStatus={squareStatus}
                    onClickSquare={() => onClickSquare(i, j)}
                    selectable={true}
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
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
