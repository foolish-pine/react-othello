import { filterReversibleLeftStones } from "src/functions/filterReversibleLeftStones";
import { BoardStatus } from "src/types/BoardStatus";

describe("filterReversibleLeftStones関数", () => {
  it("選択したマスの左側で、選択したマスとnewStoneColorの石の間に相手の石があるとき、それらの石の位置の配列を返す", () => {
    const boardStatus: BoardStatus = [
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "white", "black", "black", "", "", ""],
      ["", "", "", "black", "white", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
    ];

    expect(filterReversibleLeftStones(boardStatus, "white", 3, 5)).toEqual([
      [3, 4],
      [3, 3],
    ]);
  });
  it("選択したマスが空きマスでないとき、空の配列を返す", () => {
    const boardStatus: BoardStatus = [
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "white", "black", "", "", "", ""],
      ["", "", "", "black", "white", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
    ];

    expect(filterReversibleLeftStones(boardStatus, "white", 3, 2)).toEqual([]);
  });
  it("選択したマスの左側で、選択したマスと他の石の間に空きマスがあるとき、空の配列を返す", () => {
    const boardStatus: BoardStatus = [
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "white", "black", "", "", "", ""],
      ["", "", "", "black", "white", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
    ];

    expect(filterReversibleLeftStones(boardStatus, "white", 3, 5)).toEqual([]);
  });
  it("選択したマスの左側にnewStoneColorの石がないとき、空の配列を返す", () => {
    const boardStatus: BoardStatus = [
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["black", "black", "black", "black", "black", "", "", ""],
      ["", "", "", "black", "white", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
    ];

    expect(filterReversibleLeftStones(boardStatus, "white", 3, 5)).toEqual([]);
  });
});
