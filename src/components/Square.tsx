/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { VFC } from "react";
import { SquareStatus } from "src/types/SquareStatus";

type Props = {
  squareStatus: SquareStatus;
};

export const Square: VFC<Props> = ({ squareStatus }) => {
  return (
    <td
      css={css`
        width: 33px;
        height: 33px;
        padding-top: 2px;
        font-size: 30px;
        ${squareStatus !== "" ? `color: ${squareStatus}` : ""};
        text-align: center;
        cursor: pointer;
        border: 1px solid #000000;
      `}
    >
      {squareStatus !== "" && "●"}
    </td>
  );
};
