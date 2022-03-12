/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { VFC } from "react";
import { StoneSquare } from "src/components//StoneSquare";
import { SelectableSquare } from "src/components/SelectableSquare";
import { Square } from "src/components/Square";
import { BoardStatus } from "src/types/BoardStatus";
import { SquareNumber } from "src/types/SquareNumber";
import { StoneColor } from "src/types/StoneColor";

type Props = {
  boardStatus: BoardStatus;
  currentPlayer: StoneColor;
  onClickSquare: (newStoneRow: SquareNumber, newStoneCol: SquareNumber) => void;
  squaresSelectableStatus: boolean[][];
  isWhiteAssistModeOn: boolean;
  isBlackAssistModeOn: boolean;
};

export const Board: VFC<Props> = ({
  boardStatus,
  currentPlayer,
  onClickSquare,
  squaresSelectableStatus,
  isWhiteAssistModeOn,
  isBlackAssistModeOn,
}) => {
  return (
    <div css={boardWrapperStyle}>
      <div css={boardStyle}>
        {boardStatus.map((row, i) => {
          return (
            <div css={boardRowStyle} key={i}>
              {row.map((squareStatus, j) => {
                const isSquareSelectable = squaresSelectableStatus[i][j];

                if (squareStatus !== "") {
                  return (
                    <StoneSquare stoneColor={squareStatus} key={`${i}-${j}`} />
                  );
                } else if (isSquareSelectable && currentPlayer === "white") {
                  return (
                    <SelectableSquare
                      currentPlayer="white"
                      isCircleShow={isWhiteAssistModeOn}
                      onClickSquare={() =>
                        onClickSquare(i as SquareNumber, j as SquareNumber)
                      }
                      key={`${i}-${j}`}
                    />
                  );
                } else if (isSquareSelectable && currentPlayer === "black") {
                  return (
                    <SelectableSquare
                      currentPlayer="black"
                      isCircleShow={isBlackAssistModeOn}
                      onClickSquare={() =>
                        onClickSquare(i as SquareNumber, j as SquareNumber)
                      }
                      key={`${i}-${j}`}
                    />
                  );
                } else {
                  return <Square key={`${i}-${j}`}></Square>;
                }
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const boardWrapperStyle = css`
  display: inline-block;
  padding: 10px;
  background-color: #37a037;
`;

const boardStyle = css`
  border: 1px solid #000000;
`;

const boardRowStyle = css`
  display: flex;
`;
