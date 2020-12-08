import React, { useEffect, useRef } from "react";

function Canvas({ setContext }) {
  //effects
  useEffect(() => {
    setContext(canvasRef);
  });

  const canvasRef = useRef(null);

  return (
    <canvas
      ref={canvasRef}
      style={{ border: "1px solid black", width: "50vw", height: "50vw" }}
      id="gameField"
    >
      I am canvas
    </canvas>
  );
}

export default Canvas;
