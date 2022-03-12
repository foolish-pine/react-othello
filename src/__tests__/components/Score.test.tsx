import { render, screen } from "@testing-library/react";

import { Score } from "src/components/Score";
import { BoardStatus } from "src/types/BoardStatus";

describe("Scoreコンポーネント", () => {
  test("レンダリング", () => {
    const boardStatus: BoardStatus = [
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "black", "", "black", "", "", "", ""],
      ["", "white", "white", "white", "white", "white", "", ""],
      ["", "", "", "black", "white", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
    ];
    render(<Score boardStatus={boardStatus} />);

    const blackStoneNumberText = screen.getByText("Black: 3");
    const whiteStoneNumberText = screen.getByText("White: 6");
    expect(blackStoneNumberText).toBeInTheDocument();
    expect(whiteStoneNumberText).toBeInTheDocument();
  });
});
