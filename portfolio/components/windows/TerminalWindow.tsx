"use client";

import { useState, useRef, useEffect } from "react";

type Command = {
  input: string;
  output: string[];
};

export default function TerminalWindow() {
  const [commands, setCommands] = useState<Command[]>([
    {
      input: "",
      output: [
        "Starting cactus terminal...\n",
        "Cactus OS 1.0",
        "  (C) 2026 Sean Zhao\n",
        "Type 'help' for available commands",
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [commands]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let output: string[] = [];

    switch (trimmed) {
      case "help":
        output = [
          "Available commands:",
          "  about       - Learn about me",
          "  projects    - View my projects",
          "  skills      - View my skills",
          "  contact     - Get my contact info",
          "  github      - Open my GitHub",
          "  linkedin    - Open my LinkedIn",
          "  clear       - Clear terminal",
          "  help        - Show this help",
        ];
        break;
      case "about":
        output = [
          "Hey! I'm Sean Zhao",
          "Computer Engineering @ UofT (Class of 2030)",
          "Cybersecurity nerd, hackathon enthusiast, full-stack dev",
          "I love building things that solve real problems!",
        ];
        break;
      case "projects":
        output = [
          "Some stuff I've built:",
          "",
          "Patchy - AI security scanner (Won Best App @ Hack the 6ix)",
          "Cursequence - Card battler game (Won Best Game @ Counterspell)",
          "Wanderlust - AI travel planner (Gemini Developer Competition)",
          "",
          "Check out the Projects window for more!",
        ];
        break;
      case "skills":
        output = [
          "Languages: JavaScript, TypeScript, Python, Java, C/C++",
          "Frontend: React, Next.js, TailwindCSS",
          "Backend: Node.js, Express.js, MongoDB",
          "AI/APIs: OpenAI, Gemini, Vellum, GitHub API",
          "Cloud: GCP, Oracle Cloud, Docker, Vercel",
        ];
        break;
      case "contact":
        output = [
          "Let's connect!",
          "",
          "Email: yixiang.s.zhao@gmail.com",
          "Phone: +1-647-333-1548",
          "LinkedIn: linkedin.com/in/cqctxs",
          "GitHub: github.com/Cqctxs",
        ];
        break;
      case "github":
        output = ["Opening GitHub..."];
        setTimeout(
          () => window.open("https://github.com/Cqctxs", "_blank"),
          500
        );
        break;
      case "linkedin":
        output = ["Opening LinkedIn..."];
        setTimeout(
          () => window.open("https://linkedin.com/in/cqctxs", "_blank"),
          500
        );
        break;
      case "clear":
        setCommands([
          {
            input: "",
            output: ["Terminal cleared"],
          },
        ]);
        setInput("");
        return;
      case "":
        output = [];
        break;
      default:
        output = [
          `Command not found: ${cmd}. Type 'help' for available commands.`,
        ];
    }

    setCommands([...commands, { input: cmd, output }]);
    setInput("");
  };

  return (
    <div
      style={{
        background: "#000000",
        color: "#ffffff",
        fontFamily: "'Courier New', monospace",
        fontSize: "11px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Terminal Output */}
      <div
        ref={scrollRef}
        onClick={() => inputRef.current?.focus()}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "8px",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          cursor: "text",
        }}
      >
        {commands.map((cmd, idx) => (
          <div key={idx}>
            {cmd.input && (
              <div>
                <span style={{ color: "#ffffff" }}>C:\&gt; </span>
                <span>{cmd.input}</span>
              </div>
            )}
            {cmd.output.map((line, lineIdx) => (
              <div key={lineIdx}>{line}</div>
            ))}
          </div>
        ))}
        {/* Current input line */}
        <div style={{ display: "flex" }}>
          <span style={{ color: "#ffffff" }}>C:\&gt; </span>
          <div style={{ position: "relative", flex: 1 }}>
            <span style={{ visibility: "hidden" }}>{input}</span>
            <span
              style={{
                display: "inline-block",
                width: "8px",
                height: "2px",
                backgroundColor: cursorVisible ? "#ffffff" : "transparent",
                marginLeft: "0px",
                verticalAlign: "baseline",
                position: "relative",
                top: "2px",
              }}
            />
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  executeCommand(input);
                }
              }}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                background: "transparent",
                color: "#ffffff",
                border: "none",
                fontFamily: "'Courier New', monospace",
                fontSize: "11px",
                outline: "none",
                caretColor: "transparent",
              }}
              autoFocus
            />
          </div>
        </div>
      </div>
    </div>
  );
}
