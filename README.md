# ApertPLC

A free, browser-based PLC programming app for students.

Draw ladder logic (contacts, coils, timers, counters) and run it in a simulator
with virtual switches and lamps. No real PLC hardware or paid software needed.

> Status: early development. Nothing works yet. We are setting up the project.

## Run it on your computer

You need [Node.js](https://nodejs.org) (LTS version) and [Git](https://git-scm.com).

```powershell
git clone https://github.com/LeonidM18/apertplc.git
cd apertplc
npm install
npm run dev
```

Then open the address it prints (usually http://localhost:5173).

## Useful commands

| Command         | What it does                                              |
|-----------------|-----------------------------------------------------------|
| `npm run dev`   | Starts the app locally. The page reloads when you save.   |
| `npm run build` | Checks all TypeScript types and builds the final website. |
| `npm run lint`  | Checks the code for common mistakes.                      |

## Project structure

```
src/
├─ engine/    PLC logic and scan-cycle simulator (pure TypeScript, no React)
├─ editor/    Ladder diagram editor UI
├─ io/        Virtual switches (inputs) and lamps (outputs)
├─ storage/   Saving and loading projects (behind an interface)
├─ App.tsx    Connects all parts together
└─ main.tsx   Entry point that starts the app
```

## For the team

- **[CONTRIBUTING.md](CONTRIBUTING.md)**: setup and the daily git workflow. Start here.
- **[AGENTS.md](AGENTS.md)**: rules for AI coding assistants. They read it automatically.

## Tech stack

React + TypeScript + Vite. Everything runs in the browser; there is no server yet.
