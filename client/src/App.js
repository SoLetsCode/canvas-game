import "./App.css";
import React, { useEffect, useState } from "react";

//components
import Canvas from "./components/Canvas";

function App() {
  const [ctx, setCtx] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (ctx !== null) {
      drawShape();
    }
  });

  //functions

  const drawShape = () => {
    ctx.fillRect(
      position.x,
      position.y,
      ctx.canvas.width * 0.1,
      ctx.canvas.height * 0.1
    );
  };

  const clearField = () => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  const moveShape = (direction) => {
    switch (direction) {
      case "ArrowDown":
        clearField();
        setPosition({ ...position, y: position.y + ctx.canvas.height * 0.1 });
        break;
      case "ArrowUp":
        clearField();
        setPosition({ ...position, y: position.y - ctx.canvas.height * 0.1 });
        break;
      case "ArrowLeft":
        clearField();
        setPosition({ ...position, x: position.x - ctx.canvas.width * 0.1 });
        break;
      case "ArrowRight":
        clearField();
        setPosition({ ...position, x: position.x + ctx.canvas.width * 0.1 });
        break;
      default:
    }
  };

  const setContext = (canvas) => {
    const context = canvas.current.getContext("2d");
    console.log(context);
    setCtx(context);
  };

  return (
    <div className="App" tabIndex={1} onKeyDown={(e) => moveShape(e.code)}>
      <Canvas setContext={setContext}></Canvas>
    </div>
  );
}

export default App;
