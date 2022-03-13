import { render, screen } from "@testing-library/react";

import { CurrentPlayer } from "src/components/CurrentPlayer";

describe("CurrentPlayer", () => {
  it("currentPlayerがwhiteのときのレンダリング", () => {
    render(<CurrentPlayer currentPlayer="white" />);
    const currentPlayerText = screen.getByText("white");
    expect(currentPlayerText).toBeInTheDocument();
  });
  it("currentPlayerがblackのときのレンダリング", () => {
    render(<CurrentPlayer currentPlayer="black" />);
    const currentPlayerText = screen.getByText("black");
    expect(currentPlayerText).toBeInTheDocument();
  });
});
