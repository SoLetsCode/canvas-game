//I want to represent snake board as an array matrix
//what should each spot on the board look like?
//Obj = {content: color, type, snake, food, mine}
import React, { useEffect, useState } from "react";

import * as constants from "../constants";

const Board = () => {
  const [board, setBoard] = useState([]);
  const [snakePositions, setSnakePositions] = useState([]);
  const [foodPositions, setFoodPositions] = useState([]);

  useEffect(() => {
    generateEmptyBoard();
  }, []);

  const generateEmptyBoard = () => {
    let tempBoard = [];
    for (let x = 0; x <= constants.BOARD_ROWS; x++) {
      tempBoard.push([]);
      for (let y = 0; y <= constants.BOARD_COLS; y++) {
        tempBoard[x][y] = "none";
      }
    }
    console.table(tempBoard);
    setBoard(tempBoard);
  };

  const generateItem = (item = "") => {
    let tempBoard = board;
    let x = Math.floor(Math.random() * constants.BOARD_COLS);
    let y = Math.floor(Math.random() * constants.BOARD_ROWS);

    while (tempBoard[x][y] !== "none") {
      x = Math.floor(Math.random() * constants.BOARD_COLS);
      y = Math.floor(Math.random() * constants.BOARD_ROWS);
    }
    console.log(`setting ${x}, ${y} to ${item}`);
    tempBoard[x][y] = item;
    setBoard(tempBoard);
  };

  return <div>HELLO</div>;
};

export default Board;
