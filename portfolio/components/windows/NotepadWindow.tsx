"use client";

import { useState } from "react";

export default function NotepadWindow() {
  const [text, setText] = useState(`Welcome to my portfolio!

Feel free to use this notepad to jot down anything.
Maybe some project ideas? Or notes from exploring my site?

Quick links:
- GitHub: github.com/Cqctxs
- LinkedIn: linkedin.com/in/cqctxs
- Email: yixiang.s.zhao@gmail.com

Thanks for visiting! :)
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
