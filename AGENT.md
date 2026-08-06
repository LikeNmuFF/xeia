# AGENT.md — Xeia Project Agent Instructions

This file is read by any coding agent (opencode, Claude Code, etc.) working on this
repo — whether launched from **WSL** or **Git Bash**. Both environments can point at
the **same working copy** on disk, so two agent sessions can easily step on each
other. This file exists to prevent that, and to make sure work survives a crashed
or closed session.

Read this file, then `.agent/PROGRESS.md` and `.agent/TASKS.md`, **before doing
anything else** in a new session.

---

## 0. Project Snapshot

- **App**: Xeia — offline-first anniversary app (Expo / React Native).
- **Stack**: Expo SDK 57 (Expo Router, NativeWind, Reanimated) · Firebase
  (Auth, Firestore, Storage) · Vercel (web export + optional `/api` routes) ·
  local cache via AsyncStorage + expo-file-system.
- **Full architecture**: see `docs/Xeia-Expo-Plan.md` (or wherever that plan file
  lives in this repo) for the target architecture, project structure, and
  migration checklist. Treat it as the spec — don't re-derive decisions already
  made there.

---

## 1. Golden Rule: One Source of Truth for "What's Happening Right Now"

All state that needs to survive a session ending lives in **`.agent/`**, not in
an agent's own head or a chat transcript. Every session — WSL or Git Bash,
doesn't matter — reads and writes the same three files:

| File | Purpose |
|---|---|
| `.agent/TASKS.md` | The task board. Every unit of work is a row. Claim before you touch, update when you finish. |
| `.agent/PROGRESS.md` | Append-only running log: what was done, in what order, and why. The "session memory." |
| `.agent/DECISIONS.md` | Short log of any non-obvious technical decision (library choice, schema shape, naming) so it isn't re-litigated or contradicted later. |

If any of these three files don't exist yet, **create them** using the templates
in §5 before starting work.

---

## 2. Preventing Duplicate Work Across Concurrent Sessions

WSL-opencode and Git Bash-opencode may be running **at the same time** against
the same files. Treat every other session as a stranger you can't talk to
directly — coordinate only through files on disk.

### 2.1 Claim before you code
1. Open `.agent/TASKS.md`.
2. Find an unclaimed task (status `TODO`).
3. Immediately change its status to `IN_PROGRESS` and add:
   - who claimed it: `agent:<shell>` (e.g. `agent:wsl`, `agent:gitbash`)
   - a timestamp
   - the files/paths you intend to touch
4. Save and commit that change **by itself** (`git commit -m "claim: <task>"`)
   before writing any code. This is your lock. A commit is atomic — if two
   sessions try to claim the same task at once, the second `git push`/pull
   will conflict and that session must back off and pick a different task.

### 2.2 Stay inside your claim
- Only edit files you listed when you claimed the task. If you discover you
  need to touch a file outside that scope, update the claim first (small
  commit), so the other session can see the scope grew.
- Never edit a file another `IN_PROGRESS` task has claimed. Check
  `.agent/TASKS.md` before opening any file you didn't create.

### 2.3 Finish visibly
- When done, move the task to `DONE` in `TASKS.md`, append a summary entry to
  `PROGRESS.md` (§5.2 format), and commit both together with your code:
  `git commit -m "done: <task> — <one-line summary>"`.
- If you stop mid-task (context runs out, session closes, you get stuck),
  leave it `IN_PROGRESS` but add a `## Handoff notes` block under that task in
  `TASKS.md` describing exactly where you left off and what the next step is.
  Do **not** leave it claimed with no notes — that blocks the other shell for
  no reason.

### 2.4 Small, frequent commits
Commit after every coherent step (not just at the end). This is what makes
"session disappeared, pick up where it left off" possible — the git log plus
`PROGRESS.md` should let a brand-new session reconstruct exactly what state
the code is in without re-reading everything from scratch.

### 2.5 Before starting *any* session
Run, in order:
1. `git pull` (or `git fetch && git status`) — make sure you have the other
   shell's latest commits.
2. Read `.agent/TASKS.md` — check nothing you're about to do is already
   `IN_PROGRESS` elsewhere.
3. Read the last ~20 entries of `.agent/PROGRESS.md` for context.
4. Only then start working.

---

## 3. Coding Conventions

- **Language**: TypeScript everywhere (app, `lib/`, and the optional
  `vercel-api/` Next.js project).
- **Formatting/linting**: run `npx expo lint` (and `prettier` if configured)
  before committing. Don't hand-format around the linter.
- **Firebase access**: never call the Firebase Admin SDK from the Expo app —
  Admin SDK usage is server-only (`vercel-api/lib/firebaseAdmin.ts`). The app
  uses the client SDK (`lib/firebase.ts`) with security-rule-scoped access.
- **Local cache**: all reads in UI components go through `lib/storage.ts`
  helpers, never directly against `AsyncStorage`/`expo-file-system`. Keep one
  choke point so the sync logic stays consistent.
- **Secrets**: Firebase web config that's safe to expose client-side can live
  in `app.config.ts`/env vars prefixed `EXPO_PUBLIC_`. Anything sensitive
  (service account keys) only ever lives in Vercel environment variables,
  never committed, never referenced from the Expo app.
- **Commits**: prefix with `claim:`, `done:`, `wip:`, or `fix:` so the log is
  scannable (see §2).

---

## 4. When You're Unsure

If a task in `TASKS.md` is ambiguous, or conflicts with something in
`DECISIONS.md`, don't guess silently — add a `## Question` note under the
task in `TASKS.md` and leave it `BLOCKED` rather than making a unilateral
call that the other session (or the human) will have to unwind later.

---

## 5. Templates

### 5.1 `.agent/TASKS.md` format

```markdown
# Xeia Task Board

## TODO
- [ ] Set up Firebase project + `lib/firebase.ts`

## IN_PROGRESS
- [ ] Scaffold Expo Router screens
  - claimed by: agent:wsl
  - claimed at: 2026-07-24 14:02
  - files: app/index.tsx, app/intro.tsx, app/_layout.tsx
  - Handoff notes: (fill in if you stop before DONE)

## DONE
- [x] Initial `create-expo-app` scaffold — agent:gitbash — 2026-07-24 13:10
```

### 5.2 `.agent/PROGRESS.md` format (append-only, newest at bottom)

```markdown
# Progress Log

## 2026-07-24 13:10 — agent:gitbash
Ran `create-expo-app`, added NativeWind + Expo Router. Repo builds and runs
on web (`npx expo start --web`). Next: scaffold screens per Xeia-Expo-Plan.md.

## 2026-07-24 14:02 — agent:wsl
Claimed "Scaffold Expo Router screens". Starting with app/_layout.tsx and the
lock screen (app/index.tsx).
```

### 5.3 `.agent/DECISIONS.md` format

```markdown
# Decisions Log

## 2026-07-24 — Local structured cache
Chose expo-sqlite over a single AsyncStorage JSON blob for gallery metadata,
since the gallery is expected to grow past ~50 photos and we want indexed
queries. AsyncStorage still used for small state (love-meter, letter-read flag).
```

---

## 6. Quick Checklist for Every Session

- [ ] `git pull`
- [ ] Read `.agent/TASKS.md`
- [ ] Read recent `.agent/PROGRESS.md` entries
- [ ] Claim a task (small commit)
- [ ] Do the work, committing in small steps
- [ ] Update `PROGRESS.md` and mark task `DONE` (or leave clear handoff notes)
- [ ] `git push`
