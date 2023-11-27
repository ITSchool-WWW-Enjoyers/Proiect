import { useRef } from 'react';
import { signal } from '@preact/signals';
import Undo from './Components/Undo';
import Redo from './Components/Redo';
import Reset from './Components/Reset';
import PenTools from './Components/PenTools';
import ShapeTools from './Components/ShapeTools';
import ColorTools from './Components/ColorTools';
import "./App.scss";


function App() {
  const drawCanvasRef = useRef(null);
  const displayCanvasRef = useRef(null);

  let drawing = signal();
  drawing = false;

  let drawingHistory = [];
  let redoStates = [];

  let drawingNumber = 0;
  let checkNumber = 0;

  let rectStart = signal({x: 0, y:0});

  const getMousePos = (canvas, e) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const getTouchPos = (canvas, e) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (e.touches[0].clientX - rect.left) * scaleX ,
      y: (e.touches[0].clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (isTouch) => (e) => {
    const drawCanvas = drawCanvasRef.current;
    const context = drawCanvas.getContext('2d');

    drawing = true;
    let position;

    context.beginPath();
    drawingNumber ++;

    if (isTouch) {
      position = getTouchPos(drawCanvas, e);
    } else {
      position = getMousePos(drawCanvas, e);
    }

    rectStart = position;
  };

  const endDrawing = () => {
    if (drawing) {
      drawing = false;
      const drawCanvas = drawCanvasRef.current;
      const displayCanvas = displayCanvasRef.current;
      const displayContext = displayCanvas.getContext('2d');
      displayContext.drawImage(drawCanvas, 0, 0);
      drawingHistory.push(canvas.toDataURL());
    }
  };

  const draw = (isTouch) => (e) => {
    if (!drawing) return;

    if(document.getElementById('pen').checked) {
      colorPicker();
    }

    if (square.checked) {
      const drawCanvas = drawCanvasRef.current;
      const context = drawCanvas.getContext('2d');

      let position;

      if (isTouch) {
        position = getTouchPos(drawCanvas, e);
      } else {
        position = getMousePos(drawCanvas, e);
      }
      
      let { x , y } = position;

      const width = x - rectStart.x;
      const height = y - rectStart.y;
  
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.strokeRect(rectStart.x, rectStart.y, width, height);

    } else if (ellipse.checked) {

      const drawCanvas = drawCanvasRef.current;
      const context = drawCanvas.getContext('2d');
      
      let position;

      if (isTouch) {
        position = getTouchPos(drawCanvas, e);
      } else {
        position = getMousePos(drawCanvas, e);
      }
      
      let { x , y } = position;

      context.clearRect(0, 0, canvas.width, canvas.height);

      const width = x - rectStart.x;
      const height = y - rectStart.y;
  
      const centerX = rectStart.x + width / 2;
      const centerY = rectStart.y + height / 2;
      const radiusX = Math.abs(width / 2);
      const radiusY = Math.abs(height / 2);
  
      context.beginPath();
      context.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
      context.stroke();

    } else if (triangle.checked) {

      const drawCanvas = drawCanvasRef.current;
      const context = drawCanvas.getContext('2d');
      
      let position;

      if (isTouch) {
        position = getTouchPos(drawCanvas, e);
      } else {
        position = getMousePos(drawCanvas, e);
      }
      
      let { x , y } = position;

      context.clearRect(0, 0, canvas.width, canvas.height);

      const sideLength = Math.sqrt(Math.pow(x - rectStart.x, 2) + Math.pow(y - rectStart.y, 2));

      const angle = Math.atan2(y - rectStart.y, x - rectStart.x);

      const angleOffset = Math.PI / 9;

      const x2 = rectStart.x + sideLength * Math.cos(angle + angleOffset);
      const y2 = rectStart.y + sideLength * Math.sin(angle + angleOffset);

      const x3 = rectStart.x + sideLength * Math.cos(angle - angleOffset);
      const y3 = rectStart.y + sideLength * Math.sin(angle - angleOffset);

      context.beginPath();
      context.moveTo(rectStart.x, rectStart.y);
      context.lineTo(x2, y2);
      context.lineTo(x3, y3);
      context.closePath();
      context.stroke();

    } else {
      
      const drawCanvas = drawCanvasRef.current;
      const context = drawCanvas.getContext('2d');
      
      let position;

      if (isTouch) {
        position = getTouchPos(drawCanvas, e);
      } else {
        position = getMousePos(drawCanvas, e);
      }
  
      let { x , y } = position;

      context.lineTo(x, y);
      context.stroke();
    }
  };

  const eraser = () => {
    const drawCanvas = drawCanvasRef.current;
    const context = drawCanvas.getContext('2d');
    context.strokeStyle = "white";
    context.fillStyle = "white";
  }

  const strokeSize = () => {
    const drawCanvas = drawCanvasRef.current;
    const context = drawCanvas.getContext('2d');
    context.lineWidth = document.getElementById('lineWidth').value;
  }

  const colorPicker = () => {
    const drawCanvas = drawCanvasRef.current;
    const context = drawCanvas.getContext('2d');
    context.strokeStyle = document.getElementById('color-picker').value;
    context.fillStyle = document.getElementById('color-picker').value;
  }

  const fillCanvas = () => {
    const drawCanvas = drawCanvasRef.current;
    const context = drawCanvas.getContext('2d');
    const displayCanvas = displayCanvasRef.current;
    const displayContext = displayCanvas.getContext('2d');
    colorPicker();
    context.fillRect(0, 0, canvas.width, canvas.height);
    displayContext.drawImage(drawCanvas, 0, 0);
    drawingHistory.push(canvas.toDataURL());
    drawingNumber ++;
  }

  const resetCanvas = () => {
    const drawCanvas = drawCanvasRef.current;
    const context = drawCanvas.getContext('2d');
    const displayCanvas = displayCanvasRef.current;
    const displayContext = displayCanvas.getContext('2d');
    drawingHistory.push(displayCanvas.toDataURL());
    context.reset();
    displayContext.reset();
    drawingHistory.push(displayCanvas.toDataURL());
    drawingNumber ++;
    colorPicker();
  }

  const undo = () => {
    const drawCanvas = drawCanvasRef.current;
    const context = drawCanvas.getContext('2d');
    const displayCanvas = displayCanvasRef.current;
    const displayContext = displayCanvas.getContext('2d');

    checkNumber = drawingNumber;
    console.log(checkNumber, drawingNumber)
    redoStates.push(displayCanvas.toDataURL());

    if(drawingHistory.length > 0) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      displayContext.clearRect(0, 0, canvas.width, canvas.height);
      drawingHistory.pop();
      const img = new Image();
      img.src = drawingHistory[drawingHistory.length - 1];
      img.addEventListener("load", () => {
        displayContext.drawImage(img, 0, 0);
        context.drawImage(img, 0, 0);
      });
    }
  }

  const redo = () => {
    if(drawingNumber > checkNumber) {
      redoStates = [];
    }

    const drawCanvas = drawCanvasRef.current;
    const context = drawCanvas.getContext('2d');
    const displayCanvas = displayCanvasRef.current;
    const displayContext = displayCanvas.getContext('2d');

    drawingHistory.push(canvas.toDataURL());

    if (redoStates.length > 0) {
      const img = new Image();
      img.src = redoStates.pop();
      img.addEventListener("load", () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        displayContext.clearRect(0, 0, canvas.width, canvas.height);
        displayContext.drawImage(img, 0, 0);
        context.drawImage(img, 0, 0);
      });
    };
  };

  window.addEventListener("keydown", (ev) => {
    if (ev.key === "z" && ev.ctrlKey) {
        undo();
    };

    if (ev.key === "z" && ev.metaKey) {
        undo();
    };
  })

  window.addEventListener("keydown", (ev) => {
      if (ev.key === "y" && ev.ctrlKey) {
          redo();
      } else if (ev.key === "y" && ev.metaKey) {
          redo();
      };
  });

  window.addEventListener("mouseup", endDrawing);
  window.addEventListener("touchend", endDrawing);

  return (
    <>
      <div className="container">
        <div className='toolbar'>
          <Undo
            undoHandler={undo}></Undo>
          <Redo
            redoHandler={redo}>
          </Redo>
          <Reset
            resetHandler={resetCanvas}
          >  
          </Reset>
          <PenTools
            rangeHandler={strokeSize}
            eraserHandler={eraser}
          >
          </PenTools>
          <ShapeTools>
          </ShapeTools>
          <ColorTools
          colorHandler={colorPicker}
          fillHandler={fillCanvas}
          >
          </ColorTools>
        </div>
        <div className="wrapper">
          <canvas
            ref={drawCanvasRef}
            id="canvas"
            height="1080"
            width="1920"
            onMouseDown={startDrawing(false)}
            onMouseUp={endDrawing}
            onMouseMove={draw(false)}
            onTouchStart={startDrawing(true)}
            onTouchMove={draw(true)}
            onTouchCancel={endDrawing}
          >
          </canvas>
          <canvas
            ref={displayCanvasRef}
            id="display-canvas"
            height="1080"
            width="1920"
          >
          </canvas>
        </div>
      </div>
    </>
  );
}

export default App;