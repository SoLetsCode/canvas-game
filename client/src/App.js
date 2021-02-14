import "./App.css";
import React, { useEffect, useState } from "react";

//components
import Canvas from "./components/Canvas";
import Score from "./components/Score";
import Board from "./components/Board";

import { BOARD_MULTIPLIER, BOARD_SEPARATION, COLLISION } from "./constants";

const defaultSnake = [
  { x: 0, y: 0 },
  { x: 30, y: 0 },
  { x: 60, y: 0 },
];

function App() {
  const [ctx, setCtx] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [foodPositions, setFoodPositions] = useState([]);
  const [snakePositions, setSnakePositions] = useState(defaultSnake);
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
      x + BOARD_SEPARATION,
      y + BOARD_SEPARATION,
      ctx.canvas.width * BOARD_MULTIPLIER - BOARD_SEPARATION,
      ctx.canvas.height * BOARD_MULTIPLIER - BOARD_SEPARATION
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

    if (snakeCheckIndex !== -1) {
      return COLLISION.SNAKE;
    }

    if (foodCheckIndex !== -1) {
      let tempFoodPositions = foodPositions;
      tempFoodPositions.splice(foodCheckIndex, 1);

      createFood();
      setScore(score + 1);
      return COLLISION.FOOD;
    } else {
      return COLLISION.CLEAR;
    }
  };

  const createFood = () => {
    let x, y;

    if (foodPositions.length < 1) {
      do {
        x =
          Math.floor(Math.random() * 100 * BOARD_MULTIPLIER) *
          ctx.canvas.width *
          BOARD_MULTIPLIER;
        y =
          Math.floor(Math.random() * 100 * BOARD_MULTIPLIER) *
          ctx.canvas.height *
          BOARD_MULTIPLIER;
        console.log(x, y);
      } while (snakePositions.some((snake) => snake.x === x && snake.y === y));
      setFoodPositions([{ x, y }]);
    }

    foodPositions.forEach((position) => {
      drawShape(position.x, position.y, "green");
    });
  };

  const moveSnake = (direction) => {
    let tempSnake = [...snakePositions];
    let lastPosition = tempSnake[0];
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
    let collision = checkCollision(checkBoundary(newPosition));
    switch (collision) {
      case COLLISION.SNAKE:
        alert(`YOU LOSE
        you ate ${score} pellets`);
        setSnakePositions(defaultSnake);
        setScore(0);
        clearField();
        break;
      case COLLISION.FOOD:
        setSnakePositions(tempSnake);
        break;
      case COLLISION.CLEAR:
        setSnakePositions(tempSnake);
        tempSnake.shift();
        break;
      default:
    }
  };

  const setContext = (canvas) => {
    const context = canvas.current.getContext("2d");
    setCtx(context);
  };

  return (
    <div className="App" tabIndex={0} onKeyDown={(e) => moveSnake(e.code)}>
      <Canvas setContext={setContext}></Canvas>
      <Score score={score} />
    </div>
  );
}

export default App;
