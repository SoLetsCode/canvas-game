import "./App.css";

//components
import Canvas from "./components/Canvas";

function App() {
  const setContext = (canvas) => {
    const ctx = canvas.current.getContext("2d");
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, ctx.canvas.width * 0.1, ctx.canvas.height * 0.1);
    ctx.fillRect(
      0 + ctx.canvas.width * 0.1,
      0,
      ctx.canvas.width * 0.1,
      ctx.canvas.height * 0.1
    );
    console.log(ctx);
    return ctx;
  };

  return (
    <div className="App">
      <Canvas setContext={setContext}></Canvas>
    </div>
  );
}

export default App;
