import "./App.css";
import React, { useEffect, useState } from "react";

//components
import Canvas from "./components/Canvas";
import Score from "./components/Score";
import Board from "./components/Board";

import { BOARD_MULTIPLIER } from "./constants";

function App() {
  const [ctx, setCtx] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [foodPositions, setFoodPositions] = useState([]);
  const [snakePositions, setSnakePositions] = useState([
    { x: 0, y: 0 },
    { x: 30, y: 0 },
    { x: 60, y: 0 },
  ]);
  let [score, setScore] = useState(0);

  useEffect(() => {
    if (ctx !== null) {
      createFood();
      drawSnake();
    }
  });

  //functions

  const drawShape = (x, y, colour = "black") => {
    ctx.fillStyle = colour;
    ctx.fillRect(
      x,
      y,
      ctx.canvas.width * BOARD_MULTIPLIER,
      ctx.canvas.height * BOARD_MULTIPLIER
    );
  };

  const drawSnake = () => {
    for (let each of snakePositions) {
      drawShape(each.x, each.y, "black");
    }
  };

  const clearField = () => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  const clearPosition = (x, y) => {
    ctx.clearRect(
      x,
      y,
      ctx.canvas.width * BOARD_MULTIPLIER,
      ctx.canvas.height * BOARD_MULTIPLIER
    );
  };

  const checkBoundary = (position) => {
    //checking if out of bounds 4 cases up, down, left, right
    let newPosition = position;
    if (newPosition.x < 0) {
      return { ...newPosition, x: ctx.canvas.width * (1 - BOARD_MULTIPLIER) };
    } else if (newPosition.x >= ctx.canvas.width) {
      return { ...newPosition, x: 0 };
    } else if (newPosition.y < 0) {
      return { ...newPosition, y: ctx.canvas.height * (1 - BOARD_MULTIPLIER) };
    } else if (position.y >= ctx.canvas.height) {
      return { ...newPosition, y: 0 };
    }
    return newPosition;
  };

  const checkCollision = (position) => {
    //checks to see if the snake hits a food or itself
    let foodCheckIndex = foodPositions.findIndex(
      (foodPosition) =>
        foodPosition.x === position.x && foodPosition.y === position.y
    );

    let snakeCheckIndex = snakePositions.findIndex(
      (snakePosition) =>
        snakePosition.x === position.x && snakePosition.y === position.y
    );

    if (foodCheckIndex !== -1) {
      let tempFoodPositions = foodPositions;
      tempFoodPositions.splice(foodCheckIndex, 1);

      createFood();
      setScore(score + 1);
    }

    if (snakeCheckIndex !== -1) {
      alert("YOU LOSE");
    }
  };

  const createFood = () => {
    let x =
      Math.floor(Math.random() * 100 * BOARD_MULTIPLIER) *
      ctx.canvas.width *
      BOARD_MULTIPLIER;
    let y =
      Math.floor(Math.random() * 100 * BOARD_MULTIPLIER) *
      ctx.canvas.height *
      BOARD_MULTIPLIER;

    if (foodPositions.length === 0) {
      setFoodPositions([{ x, y }]);
    }

    foodPositions.forEach((position) => {
      drawShape(position.x, position.y, "green");
    });
  };

  const moveShape = (direction) => {
    let tempSnake = [...snakePositions];
    let lastPosition = tempSnake.shift();
    let newPosition = snakePositions[snakePositions.length - 1];

    switch (direction) {
      case "ArrowDown":
        newPosition = {
          ...snakePositions[snakePositions.length - 1],
          y:
            snakePositions[snakePositions.length - 1].y +
            ctx.canvas.height * BOARD_MULTIPLIER,
        };
        break;
      case "ArrowUp":
        newPosition = {
          ...snakePositions[snakePositions.length - 1],
          y:
            snakePositions[snakePositions.length - 1].y -
            ctx.canvas.height * BOARD_MULTIPLIER,
        };

        break;
      case "ArrowLeft":
        newPosition = {
          ...snakePositions[snakePositions.length - 1],
          x:
            snakePositions[snakePositions.length - 1].x -
            ctx.canvas.width * BOARD_MULTIPLIER,
        };
        break;
      case "ArrowRight":
        newPosition = {
          ...snakePositions[snakePositions.length - 1],
          x:
            snakePositions[snakePositions.length - 1].x +
            ctx.canvas.width * BOARD_MULTIPLIER,
        };
        break;
      default:
    }
    newPosition = checkBoundary(newPosition);
    tempSnake.push(newPosition);
    clearPosition(lastPosition.x, lastPosition.y);
    checkCollision(checkBoundary(newPosition));
    setSnakePositions(tempSnake);
  };

  const setContext = (canvas) => {
    const context = canvas.current.getContext("2d");
    setCtx(context);
  };

  return (
    <div className="App" tabIndex={0} onKeyDown={(e) => moveShape(e.code)}>
      <Canvas setContext={setContext}></Canvas>
      <Score score={score} />
    </div>
  );
}

export default App;
