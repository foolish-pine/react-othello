import { filterReversibleLeftStones } from "src/functions/filterReversibleLeftStones";
import { BoardStatus } from "src/types/BoardStatus";

describe("filterReversibleLeftStones関数", () => {
  it("選択したマスの左側で、選択したマスとnewStoneColorの石の間に相手の石があるとき、それらの石の位置の配列を返す", () => {
    const boardStatus: BoardStatus = [
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "white", "black", "black", "", ""],
      ["", "", "", "black", "white", "white", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
    ];

    expect(filterReversibleLeftStones(boardStatus, "white", 3, 6)).toEqual([
      [3, 5],
      [3, 4],
    ]);
    expect(filterReversibleLeftStones(boardStatus, "black", 4, 6)).toEqual([
      [4, 5],
      [4, 4],
    ]);
  });
  it("選択したマスが空きマスでないとき、空の配列を返す", () => {
    const boardStatus: BoardStatus = [
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "white", "black", "", "", ""],
      ["", "", "", "black", "white", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
    ];

    expect(filterReversibleLeftStones(boardStatus, "white", 3, 3)).toEqual([]);
    expect(filterReversibleLeftStones(boardStatus, "black", 3, 3)).toEqual([]);
  });
  it("選択したマスの左側で、選択したマスと他の石の間に空きマスがあるとき、空の配列を返す", () => {
    const boardStatus: BoardStatus = [
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "white", "black", "", "", ""],
      ["", "", "", "black", "white", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
    ];

    expect(filterReversibleLeftStones(boardStatus, "white", 3, 6)).toEqual([]);
    expect(filterReversibleLeftStones(boardStatus, "black", 4, 6)).toEqual([]);
  });
  it("選択したマスの左側にnewStoneColorの石がないとき、空の配列を返す", () => {
    const boardStatus: BoardStatus = [
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["black", "black", "black", "black", "black", "", "", ""],
      ["white", "white", "white", "white", "white", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
    ];

    expect(filterReversibleLeftStones(boardStatus, "white", 3, 5)).toEqual([]);
    expect(filterReversibleLeftStones(boardStatus, "black", 3, 5)).toEqual([]);
  });
});
