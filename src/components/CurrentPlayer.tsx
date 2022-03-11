/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { VFC } from "react";
import { StoneColor } from "src/types/StoneColor";

type Props = {
  currentPlayer: StoneColor;
};

export const CurrentPlayer: VFC<Props> = ({ currentPlayer }) => {
  return (
    <p
      css={css`
        font-size: 16px;
        font-weight: bold;
      `}
    >
      Current player is{" "}
      <span
        css={css`
          text-transform: uppercase;
        `}
      >
        {currentPlayer}
      </span>
    </p>
  );
};
