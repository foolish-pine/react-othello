/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { VFC } from "react";
import { Player } from "src/types/Player";

type Props = {
  currentPlayer: Player;
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
