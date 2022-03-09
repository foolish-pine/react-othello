/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { VFC } from "react";
import { Square } from "src/components/Square";
import { BoardStatus } from "src/types/BoardStatus";

type Props = {
  boardStatus: BoardStatus;
};

export const Board: VFC<Props> = ({ boardStatus }) => {
  return (
    <table
      css={css`
        border-collapse: collapse;
        background-color: lightgreen;
      `}
    >
      <tbody>
        {boardStatus.map((row, i) => {
          return (
            <tr key={i + 1}>
              {row.map((squareStatus, j) => {
                return (
                  <Square
                    squareStatus={squareStatus}
                    key={`${i + 1}-${j + 1}`}
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
