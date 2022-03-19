import { filterReversibleRightStones } from "src/functions/filterReversibleRightStones";
import { BoardStatus } from "src/types/BoardStatus";

describe("filterReversibleRightStones関数", () => {
  it("選択したマスの右側で、選択したマスとnewStoneColorの石の間に相手の石があるとき、それらの石の位置の配列を返す", () => {
    const boardStatus: BoardStatus = [
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "white", "white", "black", "", "", ""],
      ["", "", "black", "black", "white", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
    ];

    expect(filterReversibleRightStones(boardStatus, "white", 4, 1)).toEqual([
      [4, 2],
      [4, 3],
    ]);
    expect(filterReversibleRightStones(boardStatus, "black", 3, 1)).toEqual([
      [3, 2],
      [3, 3],
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

    expect(filterReversibleRightStones(boardStatus, "white", 3, 3)).toEqual([]);
    expect(filterReversibleRightStones(boardStatus, "black", 3, 3)).toEqual([]);
  });
  it("選択したマスの右側で、選択したマスと他の石の間に空きマスがあるとき、空の配列を返す", () => {
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

    expect(filterReversibleRightStones(boardStatus, "white", 4, 1)).toEqual([]);
    expect(filterReversibleRightStones(boardStatus, "black", 3, 1)).toEqual([]);
  });
  it("選択したマスの右側にnewStoneColorの石がないとき、空の配列を返す", () => {
    const boardStatus: BoardStatus = [
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "black", "black", "black", "black", "black"],
      ["", "", "", "white", "white", "white", "white", "white"],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
    ];

    expect(filterReversibleRightStones(boardStatus, "white", 3, 2)).toEqual([]);
    expect(filterReversibleRightStones(boardStatus, "black", 4, 2)).toEqual([]);
  });
});
