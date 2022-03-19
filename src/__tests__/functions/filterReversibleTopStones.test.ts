import { filterReversibleTopStones } from "src/functions/filterReversibleTopStones";
import { BoardStatus } from "src/types/BoardStatus";

describe("filterReversibleTopStones関数", () => {
  it("選択したマスの上側で、選択したマスとnewStoneColorの石の間に相手の石があるとき、それらの石の位置の配列を返す", () => {
    const boardStatus: BoardStatus = [
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "white", "black", "", "", ""],
      ["", "", "", "black", "white", "", "", ""],
      ["", "", "", "black", "white", "", "", ""],
      ["", "", "", "black", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
    ];

    expect(filterReversibleTopStones(boardStatus, "white", 7, 3)).toEqual([
      [6, 3],
      [5, 3],
      [4, 3],
    ]);
    expect(filterReversibleTopStones(boardStatus, "black", 6, 4)).toEqual([
      [5, 4],
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

    expect(filterReversibleTopStones(boardStatus, "white", 3, 3)).toEqual([]);
    expect(filterReversibleTopStones(boardStatus, "black", 3, 3)).toEqual([]);
  });
  it("選択したマスの上側で、選択したマスと他の石の間に空きマスがあるとき、空の配列を返す", () => {
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

    expect(filterReversibleTopStones(boardStatus, "white", 6, 3)).toEqual([]);
    expect(filterReversibleTopStones(boardStatus, "black", 6, 4)).toEqual([]);
  });
  it("選択したマスの上側にnewStoneColorの石がないとき、空の配列を返す", () => {
    const boardStatus: BoardStatus = [
      ["", "", "", "black", "white", "", "", ""],
      ["", "", "", "black", "white", "", "", ""],
      ["", "", "", "black", "white", "", "", ""],
      ["", "", "", "black", "white", "", "", ""],
      ["", "", "", "black", "white", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
    ];

    expect(filterReversibleTopStones(boardStatus, "white", 5, 3)).toEqual([]);
    expect(filterReversibleTopStones(boardStatus, "black", 5, 4)).toEqual([]);
  });
});
