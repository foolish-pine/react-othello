import { render, screen } from "@testing-library/react";

import { CurrentPlayer } from "src/components/CurrentPlayer";

describe("CurrentPlayer", () => {
  it("currentPlayerがwhiteのときのレンダリング", () => {
    render(<CurrentPlayer currentPlayer="white" />);
    const text = screen.getByText("Current player is");
    const currentPlayerText = screen.getByText("white");
    expect(text).toBeInTheDocument();
    expect(currentPlayerText).toBeInTheDocument();
  });
  it("currentPlayerがblackのときのレンダリング", () => {
    render(<CurrentPlayer currentPlayer="black" />);
    const text = screen.getByText("Current player is");
    const currentPlayerText = screen.getByText("black");
    expect(text).toBeInTheDocument();
    expect(currentPlayerText).toBeInTheDocument();
  });
});
