import { useState } from "react";
import _ from "lodash";
import { Board } from "src/components/Board";
import { CurrentPlayer } from "src/components/CurrentPlayer";
import { Score } from "src/components/Score";
import { BoardStatus } from "src/types/BoardStatus";
import { StoneColor } from "src/types/StoneColor";
import { SquareNumber } from "./types/SquareNumber";
import { filterReversibleLeftStones } from "src/functions/filterReversibleLeftStones";
import { filterReversibleRightStones } from "src/functions/filterReversibleRightStones";

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

export const App = () => {
  // ボードの状態をステート化
  const [boardStatus, setBoardStatus] = useState(initialBoardStatus);

  // 白を先行として、現在プレイ中のプレイヤーをステート化
  const [currentPlayer, setCurrentPlayer] = useState<StoneColor>("white");

  // プレイ中のプレイヤーが白なら黒に、黒なら白にcurrentPlayerを変更する
  const changeCurrentPlayer = () => {
    currentPlayer === "white"
      ? setCurrentPlayer("black")
      : setCurrentPlayer("white");
  };

  //白プレイヤーのアシストのON・OFF
  const [isWhiteAssistModeOn, setIsWhiteAssistModeOn] =
    useState<boolean>(false);

  //黒プレイヤーのアシストのON・OFF
  const [isBlackAssistModeOn, setIsBlackAssistModeOn] =
    useState<boolean>(false);

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
        bottomLeftStones.push(boardStatus[i][col--]);
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

  // 石の座標を引数に、その場所に石を置いたとき裏返し可能な石が存在するか判定する
  const isReversibleStonesExist = (
    stoneRow: SquareNumber,
    stoneCol: SquareNumber
  ) => {
    if (
      filterReversibleLeftStones(boardStatus, currentPlayer, stoneRow, stoneCol)
        .length > 0 ||
      filterReversibleRightStones(
        boardStatus,
        currentPlayer,
        stoneRow,
        stoneCol
      ).length > 0 ||
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

  // 裏返し可能な石の位置の配列を返す
  const filterReversibleStones = (
    newStoneRow: SquareNumber,
    newStoneCol: SquareNumber
  ) => {
    const reversibleLeftStones = filterReversibleLeftStones(
      boardStatus,
      currentPlayer,
      newStoneRow,
      newStoneCol
    );

    const reversibleStonesRight = filterReversibleRightStones(
      boardStatus,
      currentPlayer,
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
      ..._.cloneDeep(reversibleLeftStones),
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
  const onClickSquare = (
    newStoneRow: SquareNumber,
    newStoneCol: SquareNumber
  ) => {
    // クリックしたマスに既に石が置かれている場合は処理を中断する
    if (boardStatus[newStoneRow][newStoneCol]) return;

    // クリックしたマスに石を置いても他の石を裏返せない場合、処理を中断する
    if (!isReversibleStonesExist(newStoneRow, newStoneCol)) return;

    // 裏返し可能な石をフィルタリングしてその位置の配列を取得する
    const reversibleStones = filterReversibleStones(newStoneRow, newStoneCol);

    // クリックしたマスに新しい石を表示する
    const newBoardStatus = [...boardStatus];
    newBoardStatus[newStoneRow][newStoneCol] = currentPlayer;
    setBoardStatus(newBoardStatus);

    // 置いた石と既存の石で挟んだ相手の石を裏返す
    reverseStones(reversibleStones);

    changeCurrentPlayer();
  };

  // マスが選択可能かどうかの状態を示す配列
  const squaresSelectableStatus: boolean[][] = [];
  boardStatus.forEach((row, i) => {
    squaresSelectableStatus.push([]);
    row.forEach((col, j) => {
      squaresSelectableStatus[i].push(
        col === "" &&
          isReversibleStonesExist(i as SquareNumber, j as SquareNumber)
      );
    });
  });

  return (
    <>
      <Board
        boardStatus={boardStatus}
        currentPlayer={currentPlayer}
        onClickSquare={onClickSquare}
        squaresSelectableStatus={squaresSelectableStatus}
        isWhiteAssistModeOn={isWhiteAssistModeOn}
        isBlackAssistModeOn={isBlackAssistModeOn}
      />
      <CurrentPlayer currentPlayer={currentPlayer} />
      <Score boardStatus={boardStatus} />
      <button onClick={() => setIsWhiteAssistModeOn(!isWhiteAssistModeOn)}>
        {isWhiteAssistModeOn ? "白アシストOFF" : "白アシストON"}
      </button>
      <button onClick={() => setIsBlackAssistModeOn(!isBlackAssistModeOn)}>
        {isBlackAssistModeOn ? "黒アシストOFF" : "黒アシストON"}
      </button>
    </>
  );
};
