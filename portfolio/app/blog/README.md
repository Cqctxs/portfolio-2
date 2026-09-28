# Blog

A tiny Markdown-based blog served at `/blog`, styled to match the rest of the
Win98 portfolio.

## How content is stored

There are three layers:

1. **`public/blog/posts.json`** — the committed source of truth. Anyone visiting
   your site fetches this and sees these posts. This is where "published" posts
   live.
2. **`localStorage` (`portfolio-blog-posts-v2`)** — a per-browser overlay. When
   you (or anyone else) make edits in the editor, they get saved here. These
   edits are **never shared**: every visitor has their own local copy.
3. **`posts.json` import/export** — once you're happy with your drafts, use the
   `Export JSON` button in the editor to download a new `posts.json`, then
   replace `public/blog/posts.json` with it and commit. That's how you publish.

## How "only you can edit" works

- Visitors with no password never see the edit UI at all. It's a read-only blog.
- You set an environment variable `NEXT_PUBLIC_BLOG_EDIT_HASH` to a SHA-256 hash
  of your chosen editor password. When the variable is present, the UI shows
  an "Unlock editor" button; clicking it prompts for the password and hashes
  what you type to compare.
- While unlocked, the auth state is stored in `sessionStorage` so it persists
  across reloads within the same tab but clears when you close the tab. There
  is also a `Lock` button in the menu bar.

Since your posts live in `posts.json` and each visitor's edits stay in their
own browser's `localStorage`, a visitor literally **cannot** change the posts
other visitors see — the password gate is a UX/clarity layer, not the security
boundary.

## Setting your password

1. Pick a password, e.g. `my-blog-is-secret`.
2. Hash it to SHA-256 hex:

   ```bash
   node -e "crypto.webcrypto.subtle.digest('SHA-256', new TextEncoder().encode('my-blog-is-secret')).then(b => console.log(Buffer.from(b).toString('hex')))"
   ```

3. Put the hex digest in `.env.local` (ignored by git) for local use:

   ```
   NEXT_PUBLIC_BLOG_EDIT_HASH=8f14e45fceea167a5a36dedd4bea2543...
   ```

4. For production, set the same variable in your Vercel / hosting dashboard.

If the variable is **empty in dev**, editing is open (no password needed) — so
you can write without friction locally. If it's **empty in a production build**,
editing is fully disabled.

## Typical flow

1. `npm run dev`, visit `http://localhost:3000/blog`.
2. Unlock (or skip if no password is set).
3. Click **New Post**, write markdown. Preview updates live on the right.
4. Click **Export JSON** to download an updated `posts.json`.
5. Replace `public/blog/posts.json` with that file and commit.
6. Push. Your blog is updated for everyone.
