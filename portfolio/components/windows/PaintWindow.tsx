"use client";

import { useRef, useState, useEffect } from "react";

export default function PaintWindow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(2);
  const [isEraser, setIsEraser] = useState(false);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  // Windows 98 color palette
  const win98Colors = [
    "#000000",
    "#808080",
    "#800000",
    "#808000",
    "#008000",
    "#008080",
    "#000080",
    "#800080",
    "#ffffff",
    "#c0c0c0",
    "#ff0000",
    "#ffff00",
    "#00ff00",
    "#00ffff",
    "#0000ff",
    "#ff00ff",
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const context = canvas.getContext("2d");
    if (context) {
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      contextRef.current = context;
    }
  }, []);

  const getCanvasCoordinates = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const coords = getCanvasCoordinates(e);
    const context = contextRef.current;
    if (!context) return;

    context.beginPath();
    context.moveTo(coords.x, coords.y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const coords = getCanvasCoordinates(e);
    const context = contextRef.current;
    if (!context) return;

    context.lineTo(coords.x, coords.y);
    context.strokeStyle = isEraser ? "#ffffff" : color;
    context.lineWidth = brushSize;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();
  };

  const stopDrawing = () => {
    const context = contextRef.current;
    if (context) {
      context.closePath();
    }
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (canvas && context) {
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div
      style={{
        background: "#c0c0c0",
        fontFamily: "'W98UI', Tahoma, sans-serif",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "4px 8px",
          background: "#c0c0c0",
          borderBottom: "1px solid #808080",
          flexWrap: "wrap",
          height: "auto",
          flexShrink: 0,
        }}
      >
        {/* Color Picker */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <label style={{ fontSize: "11px", color: "#000000" }}>Color:</label>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(8, 16px)",
              gap: "2px",
              padding: "2px",
              background: "#c0c0c0",
              border: "2px solid",
              borderColor: "#808080 #ffffff #ffffff #808080",
            }}
          >
            {win98Colors.map((c) => (
              <div
                key={c}
                onClick={() => {
                  setColor(c);
                  setIsEraser(false);
                }}
                style={{
                  width: "16px",
                  height: "16px",
                  backgroundColor: c,
                  cursor: "pointer",
                  border:
                    color === c && !isEraser
                      ? "2px solid #000000"
                      : "1px solid #808080",
                  boxSizing: "border-box",
                }}
              />
            ))}
          </div>
        </div>

        {/* Tool Buttons */}
        <div style={{ display: "flex", gap: "4px" }}>
          {/* Pen Button */}
          <button
            onClick={() => setIsEraser(false)}
            style={{
              width: "32px",
              height: "32px",
              background: !isEraser ? "#ffffff" : "#c0c0c0",
              border: "2px solid",
              borderColor: !isEraser
                ? "#808080 #ffffff #ffffff #808080"
                : "#ffffff #808080 #808080 #ffffff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "4px",
            }}
            title="Pen"
          >
            <img src="/icons/win98/pen.ico" alt="Pen" width="16" height="16" />
          </button>

          {/* Eraser Button */}
          <button
            onClick={() => setIsEraser(true)}
            style={{
              width: "32px",
              height: "32px",
              background: isEraser ? "#ffffff" : "#c0c0c0",
              border: "2px solid",
              borderColor: isEraser
                ? "#808080 #ffffff #ffffff #808080"
                : "#ffffff #808080 #808080 #ffffff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "4px",
            }}
            title="Eraser"
          >
            <img
              src="/icons/win98/eraser.ico"
              alt="Eraser"
              width="16"
              height="16"
            />
          </button>
        </div>

        {/* Brush Size */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <label style={{ fontSize: "11px", color: "#000000" }}>Size:</label>
          <input
            type="range"
            min="1"
            max="10"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            style={{
              width: "80px",
              height: "18px",
              cursor: "pointer",
            }}
          />
          <span
            style={{ fontSize: "11px", color: "#000000", minWidth: "20px" }}
          >
            {brushSize}px
          </span>
        </div>

        {/* Clear Button */}
        <button
          onClick={clearCanvas}
          style={{
            padding: "4px 12px",
            background: "#c0c0c0",
            border: "2px solid",
            borderColor: "#ffffff #808080 #808080 #ffffff",
            fontSize: "11px",
            cursor: "pointer",
            color: "#000000",
            fontFamily: "'W98UI', Tahoma, sans-serif",
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.borderColor =
              "#808080 #ffffff #ffffff #808080";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.borderColor =
              "#ffffff #808080 #808080 #ffffff";
          }}
        >
          Clear
        </button>
      </div>

      {/* Canvas Area */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          overflow: "hidden",
          border: "2px solid",
          borderColor: "#808080 #ffffff #ffffff #808080",
          margin: "4px",
          position: "relative",
        }}
      >
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          style={{
            display: "block",
            cursor: isEraser ? "cell" : "crosshair",
            backgroundColor: "#ffffff",
            imageRendering: "pixelated",
          }}
        />
      </div>
    </div>
  );
}
