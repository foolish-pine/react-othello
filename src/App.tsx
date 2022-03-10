import { useState } from "react";
import _ from "lodash";
import { Board } from "src/components/Board";
import { BoardStatus } from "./types/BoardStatus";

type CurrentPlayer = "white" | "black";

export const App = () => {
  // ボードの初期表示
  const initialBoardStatus: BoardStatus = [
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "white", "black", "", "", ""],
    ["", "", "", "black", "white", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
  ];
  // ボードの状態をステート化
  const [boardStatus, setBoardStatus] = useState(initialBoardStatus);

  // 白を先行として、現在プレイ中のプレイヤーをステート化
  const [currentPlayer, setCurrentPlayer] = useState<CurrentPlayer>("white");

  // プレイ中のプレイヤーが白なら黒に、黒なら白にcurrentPlayerを変更する
  const changeCurrentPlayer = () => {
    currentPlayer === "white"
      ? setCurrentPlayer("black")
      : setCurrentPlayer("white");
  };

  // 石が置かれたマスの左横を調査し、挟んだ相手の石の位置を配列に格納して返す
  const filterReversibleStonesLeft = (
    newStoneRow: number,
    newStoneCol: number
  ) => {
    const leftStones = [];
    for (let i = 0; i < newStoneCol; i++) {
      leftStones.push(boardStatus[newStoneRow][i]);
    }

    let reversibleStonesLeft = [];
    for (let i = leftStones.length - 1; i >= 0; i--) {
      if (leftStones[i] === "") {
        reversibleStonesLeft = [];
        break;
      }
      if (leftStones[i] === currentPlayer) break;

      reversibleStonesLeft.push([newStoneRow, i]);

      if (i === 0) {
        reversibleStonesLeft = [];
      }
    }
    return reversibleStonesLeft;
  };

  // 石が置かれたマスの右横を調査し、挟んだ相手の石の位置を配列に格納して返す
  const filterReversibleStonesRight = (
    newStoneRow: number,
    newStoneCol: number
  ) => {
    const rightStones = [];
    for (let i = newStoneCol + 1; i < 8; i++) {
      rightStones.push(boardStatus[newStoneRow][i]);
    }

    let reversibleStonesRight = [];
    for (let i = 0; i < rightStones.length; i++) {
      if (rightStones[i] === "") {
        reversibleStonesRight = [];
        break;
      }
      if (rightStones[i] === currentPlayer) break;

      reversibleStonesRight.push([newStoneRow, newStoneCol + i + 1]);

      if (i === rightStones.length - 1) {
        reversibleStonesRight = [];
      }
    }
    return reversibleStonesRight;
  };

  // 石が置かれたマスの上を調査し、挟んだ相手の石の位置を配列に格納して返す
  const filterReversibleStonesTop = (
    newStoneRow: number,
    newStoneCol: number
  ) => {
    const topStones = [];
    for (let i = 0; i < newStoneRow; i++) {
      topStones.push(boardStatus[i][newStoneCol]);
    }

    let reversibleStonesTop = [];
    for (let i = topStones.length - 1; i >= 0; i--) {
      if (topStones[i] === "") {
        reversibleStonesTop = [];
        break;
      }
      if (topStones[i] === currentPlayer) break;

      reversibleStonesTop.push([i, newStoneCol]);

      if (i === 0) {
        reversibleStonesTop = [];
      }
    }

    return reversibleStonesTop;
  };

  // 石が置かれたマスの下を調査し、挟んだ相手の石の位置を配列に格納して返す
  const filterReversibleStonesBottom = (
    newStoneRow: number,
    newStoneCol: number
  ) => {
    const bottomStones = [];
    for (let i = newStoneRow + 1; i < 8; i++) {
      bottomStones.push(boardStatus[i][newStoneCol]);
    }

    let reversibleStonesBottom = [];
    for (let i = 0; i < bottomStones.length; i++) {
      if (bottomStones[i] === "") {
        reversibleStonesBottom = [];
        break;
      }
      if (bottomStones[i] === currentPlayer) break;

      reversibleStonesBottom.push([newStoneRow + i + 1, newStoneCol]);

      if (i === bottomStones.length - 1) {
        reversibleStonesBottom = [];
      }
    }

    return reversibleStonesBottom;
  };

  // 石が置かれたマスの右上を調査し、挟んだ相手の石の位置を配列に格納して返す
  const filterReversibleStonesTopRight = (
    newStoneRow: number,
    newStoneCol: number
  ) => {
    const topRightStones = [];
    if (newStoneRow + newStoneCol <= 6) {
      let col = newStoneCol + 1;
      for (let i = newStoneRow - 1; i >= 0; i--) {
        topRightStones.push(boardStatus[i][col++]);
      }
    } else if (newStoneRow + newStoneCol === 7) {
      for (let i = newStoneRow - 1; i >= 0; i--) {
        topRightStones.push(boardStatus[i][7 - i]);
      }
    } else {
      let row = newStoneRow - 1;
      for (let i = newStoneCol + 1; i < 8; i++) {
        topRightStones.push(boardStatus[row--][i]);
      }
    }

    let reversibleStonesTopRight = [];
    for (let i = 0; i < topRightStones.length; i++) {
      if (topRightStones[i] === "") {
        reversibleStonesTopRight = [];
        break;
      }
      if (topRightStones[i] === currentPlayer) break;

      reversibleStonesTopRight.push([newStoneRow - i - 1, newStoneCol + i + 1]);

      if (i === topRightStones.length - 1) {
        reversibleStonesTopRight = [];
      }
    }

    return reversibleStonesTopRight;
  };

  // 石が置かれたマスの右下を調査し、挟んだ相手の石の位置を配列に格納して返す
  const filterReversibleStonesBottomRight = (
    newStoneRow: number,
    newStoneCol: number
  ) => {
    const bottomRightStones = [];
    if (newStoneRow < newStoneCol) {
      let row = newStoneRow + 1;
      for (let i = newStoneCol + 1; i < 8; i++) {
        bottomRightStones.push(boardStatus[row++][i]);
      }
    } else if (newStoneRow === newStoneCol) {
      for (let i = newStoneRow + 1; i < 8; i++) {
        bottomRightStones.push(boardStatus[i][i]);
      }
    } else {
      let col = newStoneCol + 1;
      for (let i = newStoneRow + 1; i < 8; i++) {
        bottomRightStones.push(boardStatus[i][col++]);
      }
    }

    let reversibleStonesUpRight = [];
    for (let i = 0; i < bottomRightStones.length; i++) {
      if (bottomRightStones[i] === "") {
        reversibleStonesUpRight = [];
        break;
      }
      if (bottomRightStones[i] === currentPlayer) break;

      reversibleStonesUpRight.push([newStoneRow + i + 1, newStoneCol + i + 1]);

      if (i === bottomRightStones.length - 1) {
        reversibleStonesUpRight = [];
      }
    }

    return reversibleStonesUpRight;
  };

  // 石が置かれたマスの左上を調査し、挟んだ相手の石の位置を配列に格納して返す
  const filterReversibleStonesTopLeft = (
    newStoneRow: number,
    newStoneCol: number
  ) => {
    const topLeftStones = [];
    if (newStoneRow < newStoneCol) {
      let col = newStoneCol - 1;
      for (let i = newStoneRow - 1; i >= 0; i--) {
        topLeftStones.push(boardStatus[i][col--]);
      }
    } else if (newStoneRow === newStoneCol) {
      for (let i = newStoneRow - 1; i >= 0; i--) {
        topLeftStones.push(boardStatus[i][i]);
      }
    } else {
      let row = newStoneRow - 1;
      for (let i = newStoneCol - 1; i >= 0; i--) {
        topLeftStones.push(boardStatus[row--][i]);
      }
    }

    let reversibleStonesTopLeft = [];
    for (let i = 0; i < topLeftStones.length; i++) {
      if (topLeftStones[i] === "") {
        reversibleStonesTopLeft = [];
        break;
      }
      if (topLeftStones[i] === currentPlayer) break;

      reversibleStonesTopLeft.push([newStoneRow - i - 1, newStoneCol - i - 1]);

      if (i === topLeftStones.length - 1) {
        reversibleStonesTopLeft = [];
      }
    }

    return reversibleStonesTopLeft;
  };

  // 石が置かれたマスの左下を調査し、挟んだ相手の石の位置を配列に格納して返す
  const filterReversibleStonesBottomLeft = (
    newStoneRow: number,
    newStoneCol: number
  ) => {
    const bottomLeftStones = [];
    if (newStoneRow + newStoneCol <= 6) {
      let row = newStoneRow + 1;
      for (let i = newStoneCol - 1; i >= 0; i--) {
        bottomLeftStones.push(boardStatus[row++][i]);
      }
    } else if (newStoneRow + newStoneCol === 7) {
      for (let i = newStoneRow + 1; i < 8; i++) {
        bottomLeftStones.push(boardStatus[i][7 - i]);
      }
    } else {
      let col = newStoneCol - 1;
      for (let i = newStoneRow + 1; i < 8; i++) {
        bottomLeftStones.push(boardStatus[i][col++]);
      }
    }

    let reversibleStonesBottomLeft = [];
    for (let i = 0; i < bottomLeftStones.length; i++) {
      if (bottomLeftStones[i] === "") {
        reversibleStonesBottomLeft = [];
        break;
      }
      if (bottomLeftStones[i] === currentPlayer) break;

      reversibleStonesBottomLeft.push([
        newStoneRow + i + 1,
        newStoneCol - i - 1,
      ]);

      if (i === bottomLeftStones.length - 1) {
        reversibleStonesBottomLeft = [];
      }
    }

    return reversibleStonesBottomLeft;
  };

  // 裏返し可能な石の位置の配列を返す
  const filterReversibleStones = (newStoneRow: number, newStoneCol: number) => {
    const reversibleStonesLeft = filterReversibleStonesLeft(
      newStoneRow,
      newStoneCol
    );

    const reversibleStonesRight = filterReversibleStonesRight(
      newStoneRow,
      newStoneCol
    );

    const reversibleStonesTop = filterReversibleStonesTop(
      newStoneRow,
      newStoneCol
    );

    const reversibleStonesBottom = filterReversibleStonesBottom(
      newStoneRow,
      newStoneCol
    );

    const reversibleStonesTopRight = filterReversibleStonesTopRight(
      newStoneRow,
      newStoneCol
    );

    const reversibleStonesBottomRight = filterReversibleStonesBottomRight(
      newStoneRow,
      newStoneCol
    );

    const reversibleStonesTopLeft = filterReversibleStonesTopLeft(
      newStoneRow,
      newStoneCol
    );

    const reversibleStonesBottomLeft = filterReversibleStonesBottomLeft(
      newStoneRow,
      newStoneCol
    );

    const reversibleStones: number[][] = [
      ..._.cloneDeep(reversibleStonesLeft),
      ..._.cloneDeep(reversibleStonesRight),
      ..._.cloneDeep(reversibleStonesTop),
      ..._.cloneDeep(reversibleStonesBottom),
      ..._.cloneDeep(reversibleStonesTopRight),
      ..._.cloneDeep(reversibleStonesBottomRight),
      ..._.cloneDeep(reversibleStonesTopLeft),
      ..._.cloneDeep(reversibleStonesBottomLeft),
    ];

    return reversibleStones;
  };

  // 裏返す石の位置の配列を引数に取り、boardStatusを更新する
  const reverseStones = (reversibleStones: number[][]) => {
    const newBoardStatus = _.cloneDeep(boardStatus);

    reversibleStones.forEach((reversibleStone) => {
      newBoardStatus[reversibleStone[0]][reversibleStone[1]] = currentPlayer;
    });

    setBoardStatus(newBoardStatus);
  };

  // マス目をクリックしたときの処理
  const onClickSquare = (newStoneRow: number, newStoneCol: number) => {
    // クリックしたマスに既に石が置かれている場合は処理を中断する
    if (boardStatus[newStoneRow][newStoneCol]) return;

    // クリックしたマスに石を置いても他の石を裏返せない場合、処理を中断する
    if (!isReversibleStonesExist(newStoneRow, newStoneCol)) return;

    // クリックしたマスに新しい石を表示する
    const newBoardStatus = [...boardStatus];
    newBoardStatus[newStoneRow][newStoneCol] = currentPlayer;
    setBoardStatus(newBoardStatus);

    // 裏返し可能な石をフィルタリングしてその位置の配列を取得する
    const reversibleStones = filterReversibleStones(newStoneRow, newStoneCol);

    // 置いた石と既存の石で挟んだ相手の石を裏返す
    reverseStones(reversibleStones);

    changeCurrentPlayer();
  };

  // 石の座標を引数に、その場所に石を置いたとき裏返し可能な石が存在するか判定する
  const isReversibleStonesExist = (stoneRow: number, stoneCol: number) => {
    if (
      filterReversibleStonesLeft(stoneRow, stoneCol).length > 0 ||
      filterReversibleStonesRight(stoneRow, stoneCol).length > 0 ||
      filterReversibleStonesTop(stoneRow, stoneCol).length > 0 ||
      filterReversibleStonesBottom(stoneRow, stoneCol).length > 0 ||
      filterReversibleStonesTopRight(stoneRow, stoneCol).length > 0 ||
      filterReversibleStonesBottomRight(stoneRow, stoneCol).length > 0 ||
      filterReversibleStonesTopLeft(stoneRow, stoneCol).length > 0 ||
      filterReversibleStonesBottomLeft(stoneRow, stoneCol).length > 0
    ) {
      return true;
    }
    return false;
  };

  const selectableCell: number[][] = [];
  boardStatus.forEach((row, i) =>
    row.forEach((col, j) => {
      if (col === "" && isReversibleStonesExist(i, j)) {
        selectableCell.push([i, j]);
      }
    })
  );

  return (
    <>
      <Board
        boardStatus={boardStatus}
        onClickSquare={onClickSquare}
        selectableCells={selectableCell}
      />
      <p>Current Player is {currentPlayer}</p>
    </>
  );
};
