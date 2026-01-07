"use client";

import { useState } from "react";

export default function NotepadWindow() {
  const [text, setText] = useState(`Portfolio Notes

This is a simple notepad application.
You can write and edit text here!

Feel free to take notes about:
- Project ideas
- Skills to learn
- Contact information
- Random thoughts
`);

  return (
    <div
      style={{
        background: "#c0c0c0",
        color: "#000000",
        fontFamily: "'W98UI', Tahoma, sans-serif",
        fontSize: "11px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Text Area */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          flex: 1,
          border: "2px solid",
          borderColor: "#808080 #ffffff #ffffff #808080",
          margin: "2px",
          padding: "4px",
          fontFamily: "'Courier New', monospace",
          fontSize: "11px",
          color: "#000000",
          background: "#ffffff",
          resize: "none",
          outline: "none",
        }}
      />

      {/* Status Bar */}
      <div
        style={{
          background: "#c0c0c0",
          borderTop: "1px solid #808080",
          padding: "2px 4px",
          fontSize: "11px",
          color: "#000000",
          height: "16px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span>
          Line {text.split("\n").length}, Col{" "}
          {text.split("\n").pop()?.length || 0}
        </span>
      </div>
    </div>
  );
}
