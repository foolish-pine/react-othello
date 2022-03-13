import { render, screen } from "@testing-library/react";
import { matchers } from "@emotion/jest";

import { Square } from "src/components/Square";
import { StoneSquare } from "src/components/StoneSquare";

// Add the custom matchers provided by '@emotion/jest'
expect.extend(matchers);

jest.mock("src/components/Square");

const MockSquare = Square as jest.Mock;

afterEach(() => {
  jest.resetAllMocks();
});

describe("StoneSquareコンポーネント", () => {
  it("stoneColorがwhiteのとき、::beforeにbackground-color: white;が指定されたspan要素を持つSquareコンポーネントがレンダリングされる", () => {
    // Squareコンポーネントを、childrenを受け取って表示する関数にモック化
    MockSquare.mockImplementation(({ children }) => {
      return <div data-testid="Square">{children}</div>;
    });
    render(<StoneSquare stoneColor="white" />);

    // Squareコンポーネント
    const Square = screen.getByTestId("Square");

    // spanエレメント
    const span = screen.getByRole((_, element) => {
      if (element) {
        return element.tagName.toLowerCase() === "span";
      }
      return null;
    });

    // Squareコンポーネントが1度だけ呼ばれる
    expect(MockSquare).toHaveBeenCalledTimes(1);
    // Squareコンポーネントはspanエレメントを子要素に持つ
    expect(Square).toContainElement(span);
    // spanエレメントの::beforeにはbackground-color: white;が指定されている
    expect(span).toHaveStyleRule("background-color", "white", {
      target: "::before",
    });
  });
  it("stoneColorがblackのとき、::beforeにbackground-color: black;が指定されたspan要素を持つSquareコンポーネントがレンダリングされる", () => {
    MockSquare.mockImplementation(({ children }) => {
      return <div data-testid="Square">{children}</div>;
    });
    render(<StoneSquare stoneColor="black" />);

    const Square = screen.getByTestId("Square");

    const span = screen.getByRole((_, element) => {
      if (element) {
        return element.tagName.toLowerCase() === "span";
      }
      return null;
    });

    expect(MockSquare).toHaveBeenCalledTimes(1);
    expect(Square).toContainElement(span);
    // spanエレメントの::beforeにはbackground-color: black;が指定されている
    expect(span).toHaveStyleRule("background-color", "black", {
      target: "::before",
    });
  });
});
