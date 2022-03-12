import { render, screen } from "@testing-library/react";

import { Score } from "src/components/Score";
import { BoardStatus } from "src/types/BoardStatus";

describe("Score", () => {
  test("Scoreコンポーネントの初期レンダリング", () => {
    const initialBoardStatus: BoardStatus = [
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "white", "black", "", "", ""],
      ["", "", "", "black", "white", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
    ];
    render(<Score boardStatus={initialBoardStatus} />);

    const blackStoneNumberText = screen.getByText("Black: 2");
    const whiteStoneNumberText = screen.getByText("White: 2");
    expect(blackStoneNumberText).toBeInTheDocument();
    expect(whiteStoneNumberText).toBeInTheDocument();
  });

  test("boardStatusが変更されたとき、Scoreコンポーネントを再レンダリングする", () => {
    const initialBoardStatus: BoardStatus = [
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "white", "black", "", "", ""],
      ["", "", "", "black", "white", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
    ];
    const { rerender } = render(<Score boardStatus={initialBoardStatus} />);

    const newBoardStatus: BoardStatus = [
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "black", "", "black", "", "", "", ""],
      ["", "white", "white", "white", "white", "white", "", ""],
      ["", "", "", "black", "white", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
    ];

    const blackStoneNumberText = screen.getByText("Black: 2");
    const whiteStoneNumberText = screen.getByText("White: 2");
    expect(blackStoneNumberText).toBeInTheDocument();
    expect(whiteStoneNumberText).toBeInTheDocument();

    rerender(<Score boardStatus={newBoardStatus} />);

    const newBlackStoneNumberText = screen.getByText("Black: 3");
    const newWhiteStoneNumberText = screen.getByText("White: 6");
    expect(newBlackStoneNumberText).toBeInTheDocument();
    expect(newWhiteStoneNumberText).toBeInTheDocument();
  });
});
