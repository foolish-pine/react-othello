/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { VFC } from "react";
import { Square } from "src/components/Square";
import { BoardStatus } from "src/types/BoardStatus";

type Props = {
  boardStatus: BoardStatus;
  onClickSquare: (newStoneRow: number, newStoneCol: number) => void;
};

export const Board: VFC<Props> = ({ boardStatus, onClickSquare }) => {
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
                return (
                  <Square
                    squareStatus={squareStatus}
                    onClickSquare={() => onClickSquare(i, j)}
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
