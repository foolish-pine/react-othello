/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { VFC } from "react";
import { SquareStatus } from "src/types/SquareStatus";

type Props = {
  squareStatus: SquareStatus;
  onClickSquare: () => void;
  selectable: boolean;
};

export const Square: VFC<Props> = ({
  squareStatus = "",
  onClickSquare,
  selectable,
}) => {
  return (
    <div
      css={css`
        width: 42px;
        height: 42px;
        font-size: 30px;
        text-align: center;
        cursor: pointer;
        user-select: none;
        background-color: ${selectable ? "pink" : "#37A037"};
        border: 1px solid #000000;
      `}
      onClick={() => onClickSquare()}
    >
      {squareStatus !== "" && (
        <span
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;

            &::before {
              display: block;
              width: 90%;
              height: 90%;
              content: "";
              background-color: ${squareStatus};
              border-radius: 50%;
            }
          `}
        ></span>
      )}
    </div>
  );
};
