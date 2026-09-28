"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { marked } from "marked";

type BlogPost = {
  id: string;
  title: string;
  /** Raw Markdown source. */
  content: string;
  updatedAt: number;
  createdAt: number;
};

const LOCAL_STORAGE_KEY = "portfolio-blog-posts-v2";
const AUTH_STORAGE_KEY = "portfolio-blog-auth";
const POSTS_URL = "/blog/posts.json";

// Production-mode password hash (SHA-256 hex). If empty, editing is open
// locally for development but completely hidden in production.
const PASSWORD_HASH =
  process.env.NEXT_PUBLIC_BLOG_EDIT_HASH?.trim() ?? "";
const IS_DEV = process.env.NODE_ENV !== "production";

marked.use({
  gfm: true,
  breaks: false,
});

function createEmptyPost(): BlogPost {
  const now = Date.now();
  return {
    id: `post-${now}-${Math.random().toString(36).slice(2, 8)}`,
    title: "Untitled",
    content: "# Untitled\n\nStart writing in markdown...",
    createdAt: now,
    updatedAt: now,
  };
}

function formatDate(timestamp: number) {
  const d = new Date(timestamp);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

async function sha256Hex(text: string): Promise<string> {
  const buf = new TextEncoder().encode(text);
  const hashBuf = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(hashBuf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function renderMarkdown(md: string): string {
  // marked returns string (sync mode by default for our usage)
  return marked.parse(md) as string;
}

export default function BlogApp() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mode, setMode] = useState<"edit" | "read">("read");
  const [hydrated, setHydrated] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved">("idle");
  const [now, setNow] = useState<Date | null>(null);
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Editing is possible at all only when there's a password configured, or we're
  // in dev. Visitors in production with no env configured see a pure read-only blog.
  const editingEnabled = IS_DEV || PASSWORD_HASH.length > 0;

  // Password not needed if there's no hash set (dev mode, open editing).
  const requiresPassword = PASSWORD_HASH.length > 0;

  // Clock in the status bar
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Check session auth
  useEffect(() => {
    if (!requiresPassword) {
      setAuthed(true);
      return;
    }
    try {
      if (sessionStorage.getItem(AUTH_STORAGE_KEY) === "true") {
        setAuthed(true);
      }
    } catch {
      // ignore
    }
  }, [requiresPassword]);

  // Load posts: fetch the committed posts.json, then layer in localStorage drafts.
  useEffect(() => {
    let cancelled = false;

    async function load() {
      let base: BlogPost[] = [];
      try {
        const res = await fetch(POSTS_URL, { cache: "no-store" });
        if (res.ok) {
          const parsed = await res.json();
          if (Array.isArray(parsed)) base = parsed;
        }
      } catch {
        // offline or file missing — just continue with empty base
      }

      let local: BlogPost[] | null = null;
      try {
        const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) local = parsed;
        }
      } catch {
        // ignore
      }

      if (cancelled) return;

      const merged = local ?? base;
      setPosts(merged);
      setSelectedId(merged[0]?.id ?? null);
      setHydrated(true);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Persist whenever posts change (after hydration), but only if authed.
  // Non-authed viewers shouldn't pollute their own localStorage with edits they
  // can't even make, though in practice setPosts won't run for them anyway.
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts));
    } catch {
      // quota / privacy mode — silently ignore
    }
  }, [posts, hydrated]);

  const selectedPost = useMemo(
    () => posts.find((p) => p.id === selectedId) ?? null,
    [posts, selectedId]
  );

  const updateSelected = useCallback(
    (patch: Partial<BlogPost>) => {
      if (!selectedPost) return;
      setPosts((prev) =>
        prev.map((p) =>
          p.id === selectedPost.id
            ? { ...p, ...patch, updatedAt: Date.now() }
            : p
        )
      );
      setSaveStatus("saved");
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(() => setSaveStatus("idle"), 1200);
    },
    [selectedPost]
  );

  const handleNewPost = () => {
    if (!authed) return;
    const post = createEmptyPost();
    setPosts((prev) => [post, ...prev]);
    setSelectedId(post.id);
    setMode("edit");
  };

  const handleDelete = (id: string) => {
    if (!authed) return;
    if (!confirm("Delete this post? This cannot be undone.")) return;
    setPosts((prev) => {
      const next = prev.filter((p) => p.id !== id);
      if (id === selectedId) {
        setSelectedId(next[0]?.id ?? null);
      }
      return next;
    });
  };

  const handleUnlock = async () => {
    setAuthError(null);
    try {
      const hex = await sha256Hex(passwordInput);
      if (hex === PASSWORD_HASH) {
        setAuthed(true);
        setShowAuthDialog(false);
        setPasswordInput("");
        try {
          sessionStorage.setItem(AUTH_STORAGE_KEY, "true");
        } catch {
          // ignore
        }
      } else {
        setAuthError("Wrong password.");
      }
    } catch {
      setAuthError("Could not verify password (crypto unavailable?).");
    }
  };

  const handleLock = () => {
    setAuthed(false);
    setMode("read");
    try {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(posts, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "posts.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (!Array.isArray(parsed)) throw new Error("Not an array");
        setPosts(parsed);
        setSelectedId(parsed[0]?.id ?? null);
        alert(`Imported ${parsed.length} post(s).`);
      } catch {
        alert("Invalid posts.json file.");
      }
    };
    reader.readAsText(file);
  };

  const handleResetToPublished = async () => {
    if (
      !confirm(
        "Reload posts from posts.json? This discards any local edits."
      )
    )
      return;
    try {
      const res = await fetch(POSTS_URL, { cache: "no-store" });
      const parsed = await res.json();
      if (!Array.isArray(parsed)) throw new Error("Not an array");
      setPosts(parsed);
      setSelectedId(parsed[0]?.id ?? null);
    } catch {
      alert("Could not fetch posts.json.");
    }
  };

  const sortedPosts = useMemo(
    () => [...posts].sort((a, b) => b.updatedAt - a.updatedAt),
    [posts]
  );

  const goHome = () => router.push("/");

  const canEdit = editingEnabled && authed;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background:
          "#008080 url(\"data:image/svg+xml,%3Csvg width='4' height='4' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='4' height='4' fill='%23008080'/%3E%3Crect width='1' height='1' fill='%23006666'/%3E%3C/svg%3E\")",
        display: "flex",
        flexDirection: "column",
        padding: "8px",
        fontFamily: "'W98UI', Tahoma, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Win98-style window chrome */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          background: "#c0c0c0",
          border: "2px solid",
          borderColor: "#ffffff #000000 #000000 #ffffff",
          boxShadow: "inset 1px 1px 0 #dfdfdf, 2px 2px 0 rgba(0,0,0,0.4)",
          overflow: "hidden",
        }}
      >
        {/* Title bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "linear-gradient(90deg, #000080 0%, #1084d0 100%)",
            color: "#ffffff",
            padding: "3px 3px 3px 6px",
            fontSize: "12px",
            fontWeight: "bold",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/win98/pen.ico"
              alt=""
              width={16}
              height={16}
              style={{ imageRendering: "pixelated" }}
            />
            <span>Blog - CactusOS</span>
          </div>
          <div style={{ display: "flex", gap: "2px" }}>
            <TitleBarButton onClick={goHome} title="Back to desktop">
              _
            </TitleBarButton>
            <TitleBarButton onClick={goHome} title="Back to desktop">
              ×
            </TitleBarButton>
          </div>
        </div>

        {/* Menu bar */}
        <div
          style={{
            display: "flex",
            gap: "2px",
            padding: "2px 4px",
            background: "#c0c0c0",
            borderBottom: "1px solid #808080",
            fontSize: "11px",
            flexShrink: 0,
            alignItems: "center",
          }}
        >
          {canEdit && (
            <>
              <MenuItem onClick={handleNewPost}>New Post</MenuItem>
              <MenuItem
                onClick={() => selectedPost && handleDelete(selectedPost.id)}
                disabled={!selectedPost}
              >
                Delete
              </MenuItem>
              <MenuItem
                onClick={() => setMode(mode === "edit" ? "read" : "edit")}
                disabled={!selectedPost}
              >
                {mode === "edit" ? "Preview" : "Edit"}
              </MenuItem>
              <MenuItem onClick={handleExport}>Export JSON</MenuItem>
              <MenuItem onClick={() => fileInputRef.current?.click()}>
                Import JSON
              </MenuItem>
              <MenuItem onClick={handleResetToPublished}>
                Reload Published
              </MenuItem>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/json,.json"
                style={{ display: "none" }}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleImport(f);
                  e.target.value = "";
                }}
              />
            </>
          )}
          <div style={{ marginLeft: "auto", display: "flex", gap: "4px" }}>
            {editingEnabled && requiresPassword && (
              <button
                onClick={
                  authed ? handleLock : () => setShowAuthDialog(true)
                }
                style={{
                  padding: "1px 10px",
                  fontSize: "11px",
                  background: "#c0c0c0",
                  border: "2px solid",
                  borderColor: "#ffffff #808080 #808080 #ffffff",
                  color: "#000000",
                  cursor: "pointer",
                  fontFamily: "'W98UI', Tahoma, sans-serif",
                }}
                onMouseDown={win98ButtonDown}
                onMouseUp={win98ButtonUp}
                onMouseLeave={win98ButtonUp}
              >
                {authed ? "Lock" : "Unlock editor"}
              </button>
            )}
            <Link
              href="/"
              style={{
                padding: "2px 8px",
                fontSize: "11px",
                color: "#000000",
                textDecoration: "none",
              }}
            >
              Home
            </Link>
          </div>
        </div>

        {/* Main body: sidebar + content */}
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          {/* Sidebar: post list */}
          <div
            style={{
              width: "220px",
              borderRight: "1px solid #808080",
              display: "flex",
              flexDirection: "column",
              background: "#c0c0c0",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                background: "#000080",
                color: "#ffffff",
                padding: "3px 6px",
                fontWeight: "bold",
                fontSize: "11px",
              }}
            >
              Posts
            </div>

            {canEdit && (
              <div
                style={{ padding: "6px", display: "flex", gap: "4px" }}
              >
                <button
                  onClick={handleNewPost}
                  style={win98Button()}
                  onMouseDown={win98ButtonDown}
                  onMouseUp={win98ButtonUp}
                  onMouseLeave={win98ButtonUp}
                >
                  + New Post
                </button>
              </div>
            )}

            <div
              style={{
                flex: 1,
                overflowY: "auto",
                border: "2px solid",
                borderColor: "#808080 #ffffff #ffffff #808080",
                margin: canEdit ? "0 6px 6px" : "6px",
                background: "#ffffff",
              }}
            >
              {sortedPosts.length === 0 && (
                <div
                  style={{
                    padding: "8px",
                    color: "#808080",
                    fontSize: "10px",
                  }}
                >
                  {canEdit
                    ? 'No posts yet. Click "+ New Post" to get started.'
                    : "No posts published yet."}
                </div>
              )}
              {sortedPosts.map((post) => {
                const active = post.id === selectedId;
                return (
                  <div
                    key={post.id}
                    onClick={() => {
                      setSelectedId(post.id);
                      setMode("read");
                    }}
                    style={{
                      padding: "6px 8px",
                      cursor: "pointer",
                      background: active ? "#000080" : "transparent",
                      color: active ? "#ffffff" : "#000000",
                      borderBottom: "1px solid #e0e0e0",
                      fontSize: "11px",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {post.title || "Untitled"}
                    </div>
                    <div
                      style={{
                        fontSize: "10px",
                        color: active ? "#c0c0c0" : "#808080",
                        marginTop: "1px",
                      }}
                    >
                      {formatDate(post.updatedAt)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main panel */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              minWidth: 0,
            }}
          >
            {/* Sub-title bar */}
            <div
              style={{
                background: "#000080",
                color: "#ffffff",
                padding: "3px 8px",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "11px",
              }}
            >
              <span>
                {canEdit && mode === "edit" ? "Editing (Markdown)" : "Reading"}
                {saveStatus === "saved" && (
                  <span
                    style={{
                      fontWeight: "normal",
                      marginLeft: "8px",
                      color: "#b0ffb0",
                    }}
                  >
                    Saved
                  </span>
                )}
              </span>
              <div style={{ display: "flex", gap: "4px" }}>
                {canEdit && selectedPost && (
                  <>
                    <button
                      onClick={() =>
                        setMode(mode === "edit" ? "read" : "edit")
                      }
                      style={win98Button()}
                      onMouseDown={win98ButtonDown}
                      onMouseUp={win98ButtonUp}
                      onMouseLeave={win98ButtonUp}
                    >
                      {mode === "edit" ? "Preview" : "Edit"}
                    </button>
                    <button
                      onClick={() => handleDelete(selectedPost.id)}
                      style={win98Button()}
                      onMouseDown={win98ButtonDown}
                      onMouseUp={win98ButtonUp}
                      onMouseLeave={win98ButtonUp}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Content area */}
            <div
              style={{
                flex: 1,
                overflow: "hidden",
                background: "#ffffff",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {!selectedPost ? (
                <div
                  style={{
                    color: "#808080",
                    textAlign: "center",
                    marginTop: "80px",
                  }}
                >
                  Select a post from the sidebar
                  {canEdit ? ', or click "+ New Post" to start writing.' : "."}
                </div>
              ) : canEdit && mode === "edit" ? (
                /* SPLIT EDITOR: markdown source on left, preview on right */
                <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
                  {/* Markdown source */}
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      borderRight: "1px solid #c0c0c0",
                      minWidth: 0,
                    }}
                  >
                    <PaneHeader>Markdown</PaneHeader>
                    <div style={{ padding: "12px 16px", flexShrink: 0 }}>
                      <input
                        value={selectedPost.title}
                        onChange={(e) =>
                          updateSelected({ title: e.target.value })
                        }
                        placeholder="Post title"
                        style={{
                          width: "100%",
                          fontSize: "14px",
                          fontFamily:
                            "'W98UI', Tahoma, sans-serif",
                          padding: "4px 6px",
                          border: "2px solid",
                          borderColor:
                            "#808080 #ffffff #ffffff #808080",
                          background: "#ffffff",
                          outline: "none",
                        }}
                      />
                    </div>
                    <textarea
                      value={selectedPost.content}
                      onChange={(e) =>
                        updateSelected({ content: e.target.value })
                      }
                      spellCheck={false}
                      style={{
                        flex: 1,
                        margin: "0 16px 16px",
                        border: "2px solid",
                        borderColor: "#808080 #ffffff #ffffff #808080",
                        background: "#ffffff",
                        padding: "10px 12px",
                        fontFamily:
                          "'SFMono-Regular', 'Consolas', 'Menlo', 'Courier New', monospace",
                        fontSize: "13px",
                        lineHeight: "1.6",
                        color: "#222",
                        outline: "none",
                        resize: "none",
                      }}
                    />
                  </div>

                  {/* Preview */}
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      minWidth: 0,
                    }}
                  >
                    <PaneHeader>Preview</PaneHeader>
                    <div
                      style={{
                        flex: 1,
                        overflowY: "auto",
                        padding: "12px 32px 32px",
                      }}
                    >
                      <article
                        className="blog-article"
                        style={{
                          maxWidth: "640px",
                          margin: "0 auto",
                          fontFamily:
                            "'Georgia', 'Times New Roman', Times, serif",
                          color: "#222",
                        }}
                      >
                        <h1
                          style={{
                            fontSize: "28px",
                            fontWeight: "bold",
                            marginBottom: "4px",
                            lineHeight: "1.2",
                          }}
                        >
                          {selectedPost.title || "Untitled"}
                        </h1>
                        <div
                          style={{
                            color: "#808080",
                            fontSize: "12px",
                            marginBottom: "20px",
                            fontFamily:
                              "'W98UI', Tahoma, sans-serif",
                          }}
                        >
                          {formatDate(selectedPost.createdAt)}
                        </div>
                        <div
                          style={{ fontSize: "16px", lineHeight: "1.7" }}
                          dangerouslySetInnerHTML={{
                            __html: renderMarkdown(selectedPost.content),
                          }}
                        />
                      </article>
                    </div>
                  </div>
                </div>
              ) : (
                /* READER */
                <div
                  style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "32px 48px",
                  }}
                >
                  <article
                    className="blog-article"
                    style={{
                      maxWidth: "720px",
                      margin: "0 auto",
                      fontFamily:
                        "'Georgia', 'Times New Roman', Times, serif",
                      color: "#222",
                    }}
                  >
                    <h1
                      style={{
                        fontSize: "36px",
                        fontWeight: "bold",
                        marginBottom: "4px",
                        lineHeight: "1.2",
                      }}
                    >
                      {selectedPost.title || "Untitled"}
                    </h1>
                    <div
                      style={{
                        color: "#808080",
                        fontSize: "12px",
                        marginBottom: "24px",
                        fontFamily: "'W98UI', Tahoma, sans-serif",
                      }}
                    >
                      {formatDate(selectedPost.createdAt)}
                      {selectedPost.updatedAt !== selectedPost.createdAt && (
                        <>
                          {" "}
                          &middot; updated {formatDate(selectedPost.updatedAt)}
                        </>
                      )}
                    </div>
                    <div
                      style={{ fontSize: "18px", lineHeight: "1.8" }}
                      dangerouslySetInnerHTML={{
                        __html: renderMarkdown(selectedPost.content),
                      }}
                    />
                  </article>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Status bar */}
        <div
          style={{
            display: "flex",
            borderTop: "1px solid #808080",
            background: "#c0c0c0",
            fontSize: "11px",
            flexShrink: 0,
          }}
        >
          <StatusCell flex>
            {posts.length} post{posts.length === 1 ? "" : "s"}
          </StatusCell>
          <StatusCell>
            {canEdit
              ? saveStatus === "saved"
                ? "Saved to localStorage"
                : "Editing unlocked"
              : "Read-only"}
          </StatusCell>
          <StatusCell width={100}>
            {now
              ? now.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "--:--"}
          </StatusCell>
        </div>
      </div>

      {/* Password dialog */}
      {showAuthDialog && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowAuthDialog(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#c0c0c0",
              border: "2px solid",
              borderColor: "#ffffff #000000 #000000 #ffffff",
              boxShadow: "inset 1px 1px 0 #dfdfdf, 2px 2px 0 rgba(0,0,0,0.5)",
              minWidth: "320px",
            }}
          >
            <div
              style={{
                background: "linear-gradient(90deg, #000080 0%, #1084d0 100%)",
                color: "#ffffff",
                padding: "3px 6px",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              Unlock editor
            </div>
            <div style={{ padding: "16px" }}>
              <div style={{ fontSize: "11px", marginBottom: "10px" }}>
                Enter the editor password to enable editing.
              </div>
              <input
                type="password"
                value={passwordInput}
                autoFocus
                onChange={(e) => setPasswordInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleUnlock();
                }}
                style={{
                  width: "100%",
                  fontSize: "12px",
                  padding: "4px 6px",
                  border: "2px solid",
                  borderColor: "#808080 #ffffff #ffffff #808080",
                  background: "#ffffff",
                  outline: "none",
                  fontFamily: "'W98UI', Tahoma, sans-serif",
                }}
              />
              {authError && (
                <div
                  style={{ color: "#a00000", fontSize: "11px", marginTop: "8px" }}
                >
                  {authError}
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  gap: "6px",
                  justifyContent: "flex-end",
                  marginTop: "14px",
                }}
              >
                <button
                  onClick={() => setShowAuthDialog(false)}
                  style={win98Button()}
                  onMouseDown={win98ButtonDown}
                  onMouseUp={win98ButtonUp}
                  onMouseLeave={win98ButtonUp}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUnlock}
                  style={win98Button()}
                  onMouseDown={win98ButtonDown}
                  onMouseUp={win98ButtonUp}
                  onMouseLeave={win98ButtonUp}
                >
                  Unlock
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scoped styles for rendered markdown content */}
      <style>{`
        .blog-article h1 { font-size: 30px; font-weight: bold; margin: 24px 0 8px; line-height: 1.2; }
        .blog-article h2 { font-size: 24px; font-weight: bold; margin: 22px 0 8px; line-height: 1.3; }
        .blog-article h3 { font-size: 20px; font-weight: bold; margin: 18px 0 6px; line-height: 1.3; }
        .blog-article p { margin: 0 0 16px; }
        .blog-article ul, .blog-article ol { margin: 0 0 16px; padding-left: 28px; }
        .blog-article li { margin-bottom: 6px; }
        .blog-article li > p { margin: 0 0 6px; }
        .blog-article blockquote {
          border-left: 4px solid #000080;
          margin: 20px 0;
          padding: 4px 0 4px 18px;
          color: #555;
          font-style: italic;
        }
        .blog-article pre {
          background: #f4f4f4;
          border: 1px solid #c0c0c0;
          padding: 12px 14px;
          margin: 0 0 16px;
          font-family: 'SFMono-Regular', 'Consolas', 'Menlo', 'Courier New', monospace;
          font-size: 14px;
          line-height: 1.55;
          white-space: pre-wrap;
          overflow-x: auto;
        }
        .blog-article code {
          background: #f4f4f4;
          border: 1px solid #e0e0e0;
          padding: 0 4px;
          border-radius: 3px;
          font-family: 'SFMono-Regular', 'Consolas', 'Menlo', 'Courier New', monospace;
          font-size: 0.9em;
        }
        .blog-article pre code {
          background: transparent;
          border: none;
          padding: 0;
          font-size: 14px;
        }
        .blog-article a { color: #0000ee; text-decoration: underline; }
        .blog-article hr { border: none; border-top: 1px solid #c0c0c0; margin: 24px 0; }
        .blog-article img { max-width: 100%; height: auto; }
        .blog-article table { border-collapse: collapse; margin: 0 0 16px; }
        .blog-article th, .blog-article td { border: 1px solid #c0c0c0; padding: 6px 10px; }
        .blog-article th { background: #f4f4f4; }
      `}</style>
    </div>
  );
}

/* ---------- Win98-style helpers ---------- */

function win98Button(): React.CSSProperties {
  return {
    background: "#c0c0c0",
    border: "2px solid",
    borderColor: "#ffffff #808080 #808080 #ffffff",
    padding: "1px 10px",
    fontFamily: "'W98UI', Tahoma, sans-serif",
    fontSize: "11px",
    color: "#000000",
    cursor: "pointer",
    minWidth: "24px",
  };
}

function win98ButtonDown(e: React.MouseEvent<HTMLButtonElement>) {
  e.currentTarget.style.borderColor = "#808080 #ffffff #ffffff #808080";
}

function win98ButtonUp(e: React.MouseEvent<HTMLButtonElement>) {
  e.currentTarget.style.borderColor = "#ffffff #808080 #808080 #ffffff";
}

function TitleBarButton({
  children,
  onClick,
  title,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title?: string;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      style={{
        width: "18px",
        height: "16px",
        background: "#c0c0c0",
        border: "2px solid",
        borderColor: "#ffffff #808080 #808080 #ffffff",
        fontFamily: "'W98UI', Tahoma, sans-serif",
        fontSize: "10px",
        fontWeight: "bold",
        color: "#000000",
        cursor: "pointer",
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: 1,
      }}
      onMouseDown={win98ButtonDown}
      onMouseUp={win98ButtonUp}
      onMouseLeave={win98ButtonUp}
    >
      {children}
    </button>
  );
}

function MenuItem({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        padding: "2px 8px",
        background: "transparent",
        border: "none",
        fontSize: "11px",
        color: disabled ? "#808080" : "#000000",
        cursor: disabled ? "default" : "pointer",
        fontFamily: "'W98UI', Tahoma, sans-serif",
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
        e.currentTarget.style.background = "#000080";
        e.currentTarget.style.color = "#ffffff";
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = "#000000";
      }}
    >
      {children}
    </button>
  );
}

function PaneHeader({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "#c0c0c0",
        borderBottom: "1px solid #808080",
        padding: "3px 12px",
        fontSize: "10px",
        fontWeight: "bold",
        color: "#404040",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  );
}

function StatusCell({
  children,
  flex,
  width,
}: {
  children: React.ReactNode;
  flex?: boolean;
  width?: number;
}) {
  return (
    <div
      style={{
        flex: flex ? 1 : "0 0 auto",
        width: width,
        padding: "2px 8px",
        borderRight: "1px solid #808080",
        borderLeft: "1px solid #ffffff",
        background: "#c0c0c0",
      }}
    >
      {children}
    </div>
  );
}
