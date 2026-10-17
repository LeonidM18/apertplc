# ApertPLC roadmap to the MVP

This is the plan for who builds what, and when, until the first usable version (MVP).
Dates are a target, not a promise. If a week slips, move the whole table back one week.
Keep the order.

## What the MVP is

Students can:

- draw rungs in the editor: NO/NC contacts, coils, set/reset coils, parallel branches,
  TON/TOF timers and a CTU counter
- run the program in the simulator with virtual switches (inputs) and lamps (outputs)
- save and load their project in the browser

## Assumptions

- Each of us has about **5 hours per week**, so about **1 PR per person per week**.
- There is no fixed deadline. The target is **end of November 2026**. With exams or slow reviews,
  early to mid-December is realistic.
- We use **Vitest** for engine tests. It's a new npm package, so the team agrees on it first
  (see AGENTS.md).
- Everyone does **at least one engine PR and at least one UI PR**, so everybody learns both sides.

## The team

Leonid, Tasikj, Marko A (written as "Marko" in the tables) and Petar.

Want to swap a task? Fine. Agree on it at the weekly sync and update the GitHub Issue.

## Rules that stop 4 parallel PRs from colliding

1. **Types first.** Every change to `src/engine/types.ts` is its own small PR. The whole team
   reviews it, and it is merged *before* the PRs that use it.
2. **One engine file per instruction.** `scan.ts` only loops over the rungs and hands each element
   to the right file: `branches.ts`, `coils.ts`, `timers.ts`, `counters.ts`. That way, in week 3
   three people can work in the engine without editing the same lines.
3. **Program edits are pure functions.** `src/editor/programEdits.ts` contains functions that take
   a `Program` and return a new `Program`. They can be tested and reviewed without the UI.
4. **Weekly rhythm:** choose issues at the Monday sync, open the PR by Thursday, review and merge on
   the weekend. Inside a week, follow the **merge order** given below. After each merge, update
   your branch from `main`.
5. **One task = one GitHub Issue = one branch = one PR**, under ~200 lines. Engine PRs include
   Vitest tests. Use **Squash and merge**.

## Timeline

### Week 0 (by Sun 18 Oct): done / now

- [x] Engine data model types merged (PR #2)
- [ ] Merge this roadmap
- [ ] Leonid creates GitHub Issues for weeks 1–2 and assigns them
- [ ] Team agrees on Vitest

### Week 1 (19–25 Oct): foundations

All 4 PRs only need the types that are already on `main`, so they run in parallel.

| Who | Branch | What | Folder |
|---|---|---|---|
| Tasikj | `feature/vitest-address` | Add Vitest (`npm run test`). Add `address.ts` with `addressToKey({ area: "I", byte: 0, bit: 2 })` → `"I0.2"` and `parseAddress("I0.2")`, plus tests. **Merge first (mid-week)**, because Leonid's PR uses it. | engine + tooling |
| Leonid | `feature/engine-scan` | `scan(program, state, inputs, elapsedMs)`: read inputs → evaluate rungs top to bottom → write outputs. NO/NC contacts and coils. Tests. | engine |
| Marko | `feature/io-panel` | `InputPanel` (switches I0.0–I0.7) and `OutputPanel` (lamps Q0.0–Q0.7). Values come in through props, changes go out through callbacks. Try it with a temporary hard-coded state. | io |
| Petar | `feature/rung-view` | `ProgramView` / `RungView`: draw a hard-coded program on screen (display only, no editing). | editor |

### Week 2 (26 Oct–1 Nov): Milestone 1 and types v2

| Who | Branch | What | Merge order |
|---|---|---|---|
| Leonid | `feature/app-wiring` | `App.tsx` holds the `Program` and `PlcState`. A timer calls `scan` with `elapsedMs` and passes the state to the I/O panel and the viewer. **→ Milestone 1: switch I0.0 lights lamp Q0.0.** | 1 |
| Marko | `feature/sim-controls` | `SimulatorControls`: Run / Stop / Single scan buttons, shows the scan count. Wire it into `App.tsx`. | 2 |
| Petar | `feature/editor-edit-address` | Click a contact or coil to select it. Change its address and switch NO ↔ NC, using `programEdits.ts`. | 3 |
| Tasikj | `feature/engine-types-v2` | **Types v2 (whole team reviews):** a rung becomes a series of `RungElement = Contact \| Branch` (a branch is a list of parallel paths); `Coil.kind: "normal" \| "set" \| "reset"`; a rung output can also be a timer `TON`/`TOF` (preset in ms) or a counter `CTU` (preset); new areas `T` and `C` so contacts can read the done bits; `PlcState.timers` and `PlcState.counters`. Split `scan.ts` into the dispatcher plus empty files (rule 2). Update existing code so the build passes; behavior stays the same. | 4 (last) |

### Week 3 (2–8 Nov): engine features and storage

Everything here builds on types v2.

| Who | Branch | What | Folder |
|---|---|---|---|
| Leonid | `feature/engine-branches` | Parallel branches (OR logic), including series contacts inside a branch. Tests. | engine (`branches.ts`) |
| Tasikj | `feature/engine-ton` | TON on-delay timer using `elapsedMs`; contacts that read the timer's T bit. Tests. | engine (`timers.ts`) |
| Marko | `feature/engine-setreset-ctu` | Set/reset coils (latching) and the CTU counter (counts rising edges, preset, reset). Tests. | engine (`coils.ts`, `counters.ts`) |
| Petar | `feature/storage-local` | `ProjectStorage` interface + `LocalStorageProjectStorage` (save, load, list; check the JSON when loading). Tests. | storage |

### Week 4 (9–15 Nov): editor for the new features

| Who | Branch | What | Folder |
|---|---|---|---|
| Marko | `feature/editor-add-delete` | Toolbar: add/delete rungs, add/delete contacts, choose the coil type. **Merge first**, the others build on the toolbar. | editor |
| Leonid | `feature/editor-branches` | Draw parallel branches; "add branch around the selected element", "remove branch". | editor |
| Tasikj | `feature/editor-timer-counter` | Draw TON/TOF/CTU boxes; edit their preset. | editor |
| Petar | `feature/app-save-load` | New / Save / Load buttons in `App.tsx`, plus autosave. **→ Milestone 2: build a program by hand, run it, reload the page, and it's still there.** | App |

### Week 5 (16–22 Nov): finish features and monitoring

| Who | Branch | What | Folder |
|---|---|---|---|
| Petar | `feature/engine-tof` | TOF off-delay timer. Tests. | engine |
| Leonid | `feature/monitor-mode` | While running, color the contacts and coils that carry power green, like online monitoring in TIA Portal. | editor |
| Tasikj | `feature/io-status-view` | A table of M bits, timer values (elapsed/done) and counter values. | io |
| Marko | `feature/example-programs` | 3 built-in examples (start/stop latch, blinker with 2 TONs, part counter), loadable from a menu. | App / storage |

### Week 6 (23–29 Nov): stabilize → MVP v0.1

- **Everyone: bug bash.** Each person tests an area they did *not* build. Every bug becomes an
  issue and a `fix/…` PR.
- Leonid: `docs/user-guide`, a short "how to use" section in the README with screenshots.
- Optional: publish the app on GitHub Pages so students can use it without installing anything.
  This needs a `vite.config.ts` change and a GitHub Action, so the team agrees first.
- Tag `v0.1` on `main`. **MVP done.**

## How the pieces depend on each other

```
types v1 ─┬─ vitest + address ─ engine-scan ─┐
          ├─ io-panel ────────────────────────┼─ app-wiring (Milestone 1) ─ types v2 ─┐
          └─ rung-view ───────────────────────┘                                       │
                                                                                      │
   ┌──────────────────────────────────────────────────────────────────────────────────┘
   ├─ engine: branches, TON, set/reset + CTU   +   storage
   └─ editor: toolbar, branches, timer boxes ─ save/load (Milestone 2)
          ─ TOF, monitor mode, status view, examples ─ v0.1
```

## How we check each step

- **Every PR:** `npm run build`, `npm run lint` and (from week 1) `npm run test` pass.
  UI PRs say in the description what to click in `npm run dev` to see the change.
- **Milestone 1 (end of week 2):** in the browser, turning on switch I0.0 lights lamp Q0.0.
- **Milestone 2 (end of week 4):** build a start/stop latch with a branch in the editor, run it,
  reload the page, and it's still there.
- **MVP (week 6):** the 3 example programs run correctly, and every bug-bash issue is fixed or
  moved to after the MVP.
