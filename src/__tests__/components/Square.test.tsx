import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Square } from "src/components/Square";

describe("Squareコンポーネント", () => {
  it("Squareのレンダリング", () => {
    const mockOnClickHandler = jest.fn().mockImplementation();
    render(<Square onClickSquare={mockOnClickHandler}>mocked children</Square>);

    const renderedChildren = screen.getByText("mocked children");
    expect(renderedChildren).toBeInTheDocument();

    const square = screen.getByRole("button");
    userEvent.click(square);
    expect(mockOnClickHandler).toHaveBeenCalledTimes(1);
  });
});
