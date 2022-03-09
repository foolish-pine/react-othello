/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { VFC } from "react";
import { SquareStatus } from "src/types/SquareStatus";

type Props = {
  squareStatus: SquareStatus;
  onClickSquare: () => void;
};

export const Square: VFC<Props> = ({ squareStatus = "", onClickSquare }) => {
  return (
    <td
      css={css`
        width: 33px;
        height: 33px;
        padding-top: 2px;
        font-size: 30px;
        text-align: center;
        ${squareStatus !== "" ? `color: ${squareStatus}` : ""};
        cursor: pointer;
        user-select: none;
        background-color: lightgreen;
        border: 1px solid #000000;
      `}
      onClick={() => onClickSquare()}
    >
      {squareStatus !== "" && "●"}
    </td>
  );
};
