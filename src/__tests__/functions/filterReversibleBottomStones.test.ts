import { filterReversibleBottomStones } from "src/functions/filterReversibleBottomStones";
import { BoardStatus } from "src/types/BoardStatus";

describe("filterReversibleBottomStones関数", () => {
  it("選択したマスの下側で、選択したマスとnewStoneColorの石の間に相手の石があるとき、それらの石の位置の配列を返す", () => {
    const boardStatus: BoardStatus = [
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "black", "", "", ""],
      ["", "", "", "white", "black", "", "", ""],
      ["", "", "", "white", "black", "", "", ""],
      ["", "", "", "black", "white", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
    ];

    expect(filterReversibleBottomStones(boardStatus, "black", 1, 3)).toEqual([
      [2, 3],
      [3, 3],
    ]);
    expect(filterReversibleBottomStones(boardStatus, "white", 0, 4)).toEqual([
      [1, 4],
      [2, 4],
      [3, 4],
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

    expect(filterReversibleBottomStones(boardStatus, "white", 3, 3)).toEqual(
      []
    );
    expect(filterReversibleBottomStones(boardStatus, "black", 3, 3)).toEqual(
      []
    );
  });
  it("選択したマスの下側で、選択したマスと他の石の間に空きマスがあるとき、空の配列を返す", () => {
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

    expect(filterReversibleBottomStones(boardStatus, "white", 1, 4)).toEqual(
      []
    );
    expect(filterReversibleBottomStones(boardStatus, "black", 1, 3)).toEqual(
      []
    );
  });
  it("選択したマスの下側にnewStoneColorの石がないとき、空の配列を返す", () => {
    const boardStatus: BoardStatus = [
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "black", "white", "", "", ""],
      ["", "", "", "black", "white", "", "", ""],
      ["", "", "", "black", "white", "", "", ""],
      ["", "", "", "black", "white", "", "", ""],
      ["", "", "", "black", "white", "", "", ""],
    ];

    expect(filterReversibleBottomStones(boardStatus, "white", 2, 3)).toEqual(
      []
    );
    expect(filterReversibleBottomStones(boardStatus, "black", 2, 4)).toEqual(
      []
    );
  });
});
