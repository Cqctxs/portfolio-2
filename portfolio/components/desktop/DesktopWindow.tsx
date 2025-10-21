"use client";

type DesktopWindowProps = {
  id: string;
  title: string;
  isFocused: boolean;
  onClose: () => void;
  onFocus: () => void;
  children: React.ReactNode;
};

export default function DesktopWindow({
  title,
  isFocused,
  onClose,
  onFocus,
  children,
}: DesktopWindowProps) {
  return (
    <section
      role="dialog"
      aria-label={title}
      aria-modal="false"
      onMouseDown={onFocus}
      className={`flex w-[320px] flex-col border ${
        isFocused
          ? "border-white/70 bg-black/70"
          : "border-white/20 bg-black/50"
      } text-white shadow-[0_0_24px_rgba(124,106,255,0.35)] backdrop-blur`}
    >
      <header className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em]">
        <span>{title}</span>
        <button
          onClick={onClose}
          className="rounded border border-white/20 px-2 py-1 text-[10px] uppercase tracking-[0.2em] hover:border-white/60"
        >
          Close
        </button>
      </header>
      <div className="flex-1 overflow-hidden bg-black/40">{children}</div>
    </section>
  );
}
