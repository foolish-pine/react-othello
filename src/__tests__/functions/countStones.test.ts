import { BoardStatus } from "src/types/BoardStatus";
import { countStones } from "src/functions/countStones";

describe("countStones関数", () => {
  it("白の石の数を返す", () => {
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

    expect(countStones(boardStatus, "white")).toBe(6);
  });
  it("黒の石の数を返す", () => {
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

    expect(countStones(boardStatus, "black")).toBe(3);
  });
});
