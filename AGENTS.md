# Instructions for AI coding assistants

This file is read by AI coding tools working in this repository.
Follow these rules in every session. If a user request conflicts with this file,
point out the conflict and ask before proceeding.

## Project

ApertPLC is a free, browser-based PLC programming app for students:
users draw ladder logic (contacts, coils, timers, counters) and run it in a
simulator with virtual inputs/outputs. Later: tutorials, exercises, and
possibly a server with user accounts.

Tech stack: **React + TypeScript + Vite**. No backend; everything runs in the browser.

## Who you are working with

The developers are 3rd-year automation & robotics students. They are **beginners
in web development**, know some C++, and know PLCs/ladder logic well.

- **Plan first.** Before writing or changing code, show a short plan (which files,
  what changes, why) and **wait for the user's OK**.
- **Small steps.** One small change at a time. After each step, stop and tell the user
  exactly what to check (in the browser or terminal) before continuing.
- **Explain.** When you create or change a file, say what the file is for and how it
  connects to the rest of the project. The first time you use a web/React/TypeScript
  concept (component, props, state, hook, module, import/export, npm package, etc.),
  explain it briefly. Comparisons to C++ are helpful.
- **Options.** If there are several reasonable ways to do something, list them briefly
  and recommend one, with the reason.
- **Correct misunderstandings directly** when the user's question shows one.
- PLC analogies work well: engine = CPU, editor = programming software,
  io = I/O modules, storage = project file.

## Commands

| Command          | Purpose                                     |
|------------------|---------------------------------------------|
| `npm install`    | Install dependencies                        |
| `npm run dev`    | Start dev server (http://localhost:5173)    |
| `npm run build`  | Type-check (`tsc -b`) and production build  |
| `npm run lint`   | Lint with oxlint                            |

**Before saying a task is done, run `npm run build` and `npm run lint` and make sure
both pass.** Report failures honestly with the error output.

On Windows, if `npm` fails with "running scripts is disabled", the user must run
`Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` once (see CONTRIBUTING.md).

## Architecture

```
src/
├─ engine/    PLC data model + scan-cycle simulator. Pure TypeScript.
├─ editor/    Ladder diagram editor UI (React).
├─ io/        Virtual inputs (switches/buttons) and outputs (lamps) (React).
├─ storage/   Save/load projects, behind the ProjectStorage interface.
├─ App.tsx    Top-level component; the ONLY place that wires the parts together.
└─ main.tsx   Entry point.
```

Each folder has an `index.ts` that is its public API. Import from the folder
(`../engine`), not from files deep inside another folder.

### Dependency rules (strict)

| Folder     | May import from      | Must NOT import from          |
|------------|----------------------|-------------------------------|
| `engine/`  | nothing in `src/`    | `editor/`, `io/`, `storage/`, React, browser APIs |
| `editor/`  | `engine/`            | `io/`, `storage/`             |
| `io/`      | `engine/`            | `editor/`, `storage/`         |
| `storage/` | `engine/` (types)    | `editor/`, `io/`, React       |
| `App.tsx`  | everything           | —                             |

### Engine rules

- **No React, no DOM, no `window`/`document`, no `localStorage`.** It must be runnable
  and testable in plain Node.
- **The engine does not read the clock or schedule itself.** No `setTimeout`,
  `setInterval`, `Date.now()` or `performance.now()` inside `engine/`.
  Elapsed time is passed in as a parameter to the scan function. The UI (App) decides
  how often to call it. This keeps timers deterministic and testable.
- Follow real PLC semantics: read inputs → evaluate rungs top to bottom → write outputs.

### Storage rules

- The rest of the app uses only the `ProjectStorage` interface, never a concrete
  provider class directly (except where `App.tsx` creates it).
- New backends (e.g. a server) are added as new classes implementing the same interface.

## Code style

- **Simple and readable over clever.** Beginners must be able to understand the code.
- **Comment the code**: what each function/component does, and the reason behind any
  non-obvious line.
- Descriptive names (`evaluateRung`, not `evR`). No one-letter names except loop counters.
- React: function components only, one main component per `.tsx` file,
  file name = component name in PascalCase (`RungView.tsx`).
- TypeScript compiler settings that affect style:
  - `erasableSyntaxOnly` is on → **do not use `enum`** or `namespace`. Use union types,
    e.g. `type ContactKind = "NO" | "NC";`
  - `verbatimModuleSyntax` is on → import types with `import type { Rung } from "../engine";`
    and export them with `export type`.
- Avoid `any`. Use proper types.
- Keep files small; split when a file gets long or does more than one thing.

## Dependencies

**Do not add npm packages without asking first.** Explain what the package does,
why it is needed, and whether it could be done without it.

## Git rules

- Never commit to `main` (it is protected). Work on a branch named
  `feature/…`, `fix/…`, `docs/…` or `refactor/…`.
- Only commit when the user asks. **Never push, merge, force-push, or rewrite history**
  unless the user explicitly asks.
- Never commit `node_modules/`, `dist/`, secrets, or personal/editor files.
- Commit messages: short imperative sentence describing what changed
  (`Add normally-open contact evaluation`).
- Full team workflow: see [CONTRIBUTING.md](CONTRIBUTING.md).

## Do not touch

- `node_modules/`, `dist/`, `package-lock.json` (only changes via `npm install`)
- `.gitattributes`, `tsconfig*.json`, `vite.config.ts`, `.oxlintrc.json` unless the
  task is specifically about configuration and the user agreed.
