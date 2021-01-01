import "./App.css";
import React, { useEffect, useState } from "react";

//components
import Canvas from "./components/Canvas";

function App() {
  const [ctx, setCtx] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (ctx !== null) {
      drawShape(position.x, position.y, "black");
      createFood();
    }
  });

  //functions

  const drawShape = (x, y, colour = "black") => {
    ctx.fillStyle = colour;
    ctx.fillRect(x, y, ctx.canvas.width * 0.1, ctx.canvas.height * 0.1);
  };

  const clearField = () => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  const checkBoundary = (position) => {
    //checking if out of bounds 4 cases up, down, left, right
    let newPosition = position;
    if (newPosition.x < 0) {
      return { ...newPosition, x: ctx.canvas.width * 0.9 };
    } else if (newPosition.x >= ctx.canvas.width) {
      return { ...newPosition, x: 0 };
    } else if (newPosition.y < 0) {
      return { ...newPosition, y: ctx.canvas.height * 0.9 };
    } else if (position.y >= ctx.canvas.height) {
      return { ...newPosition, y: 0 };
    }
    return newPosition;
  };

  const createFood = () => {
    let x = Math.floor(Math.random() * 100 * 0.1) * ctx.canvas.width * 0.1;
    let y = Math.floor(Math.random() * 100 * 0.1) * ctx.canvas.height * 0.1;

    drawShape(x, y, "green");
  };

  const moveShape = (direction) => {
    let newPosition = position;

    switch (direction) {
      case "ArrowDown":
        clearField();
        newPosition = { ...position, y: position.y + ctx.canvas.height * 0.1 };
        setPosition(checkBoundary(newPosition));
        break;
      case "ArrowUp":
        clearField();
        newPosition = { ...position, y: position.y - ctx.canvas.height * 0.1 };
        setPosition(checkBoundary(newPosition));
        break;
      case "ArrowLeft":
        clearField();
        newPosition = { ...position, x: position.x - ctx.canvas.width * 0.1 };
        setPosition(checkBoundary(newPosition));
        break;
      case "ArrowRight":
        clearField();
        newPosition = { ...position, x: position.x + ctx.canvas.width * 0.1 };
        setPosition(checkBoundary(newPosition));
        break;
      default:
    }
  };

  const setContext = (canvas) => {
    const context = canvas.current.getContext("2d");
    setCtx(context);
  };

  return (
    <div className="App" tabIndex={0} onKeyDown={(e) => moveShape(e.code)}>
      <Canvas setContext={setContext}></Canvas>
    </div>
  );
}

export default App;
