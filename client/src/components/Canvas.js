import React, { useEffect, useRef } from "react";

//constants
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants";

function Canvas({ setContext }) {
  //effects
  useEffect(() => {
    setContext(canvasRef);
  });

  const canvasRef = useRef(null);

  return (
    <canvas
      ref={canvasRef}
      style={{
        border: "1px solid black",
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
      }}
      id="gameField"
    />
  );
}

export default Canvas;
