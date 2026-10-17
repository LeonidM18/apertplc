# How we work on ApertPLC

Read this once, fully. Then use it as a checklist.
Every command here is meant to be copied and pasted into the VS Code terminal
(**Terminal → New Terminal**).

---

## Part 1: One-time setup (do this once per computer)

### 1.1 Install the tools

1. **Node.js**: https://nodejs.org → download the **LTS** version → install with default options.
2. **Git**: https://git-scm.com → download → install with default options.
3. **VS Code**: https://code.visualstudio.com (if you don't have it yet).
4. A **GitHub account**: send your username to Leonid so he can add you to the repository.
   Then **accept the invitation** in your email (or at https://github.com/notifications).

### 1.2 Allow npm to run in PowerShell (Windows only)

Windows blocks npm in PowerShell by default. You'd get an error like
*"npm.ps1 cannot be loaded because running scripts is disabled"*. Fix it once:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Type `Y` if asked. Then **close the terminal and open a new one**.

### 1.3 Tell git who you are

Use the same email as your GitHub account:

```powershell
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

### 1.4 Download the project and run it

Pick a folder for your projects (for example `D:\dev`), open a terminal there, and run:

```powershell
git clone https://github.com/LeonidM18/apertplc.git
cd apertplc
npm install
npm run dev
```

- `git clone` downloads the repository into a new `apertplc` folder.
- `npm install` downloads the libraries the project needs into `node_modules/`.
- `npm run dev` starts the app.

Open http://localhost:5173 in your browser. If you see the app, setup is done.
Stop the app with `Ctrl+C` in the terminal.

In VS Code use **File → Open Folder** and open the `apertplc` folder.

---

## Part 2: Rules

1. **Never work directly on `main`.** `main` is protected: GitHub will reject the push anyway.
   Every change goes: **branch → Pull Request → 1 approval → merge**.
2. **One branch = one small task.** "Add NO contact to engine", not "engine + editor + saving".
   Small PRs are easy to review; huge PRs never get reviewed properly.
3. **Before you push, both of these must pass with no errors:**
   ```powershell
   npm run build
   npm run lint
   ```
4. **You are responsible for every line you commit, also if AI wrote it.**
   If you cannot explain what the code does, don't commit it. Ask the AI to explain it first.
5. **Tell the team what you are working on** before starting (group chat or a GitHub Issue),
   so two people don't build the same thing.
6. **Never commit** `node_modules/`, `dist/`, passwords or personal files.
   (`.gitignore` already blocks the first two.)

### Branch names

`<type>/<short-description>`, lowercase, words joined with `-`:

| Type        | Use for                 | Example                     |
|-------------|-------------------------|-----------------------------|
| `feature/`  | new functionality       | `feature/timer-ton`         |
| `fix/`      | bug fix                 | `fix/coil-not-resetting`    |
| `docs/`     | documentation only      | `docs/update-readme`        |
| `refactor/` | cleanup, same behavior  | `refactor/split-scan-cycle` |

### Commit messages

Short sentence in the imperative ("Add …", "Fix …", "Remove …"), describing **what changed**:

- Good: `Add normally-open contact evaluation to engine`
- Bad: `stuff`, `fixed`, `wip`, `changes`

---

## Part 3: The daily workflow

Do these steps **in this order** every time you start a new task.

### Step 1: Get the latest code

```powershell
git switch main
git pull
npm install
```

`npm install` is only needed when someone added a library, but running it is always safe.

### Step 2: Create your branch

```powershell
git switch -c feature/your-task-name
```

Check the bottom-left corner of VS Code: it should show your branch name, not `main`.

### Step 3: Work

Write code (with or without AI, see Part 4). Save often. Keep `npm run dev` running to see changes.

### Step 4: Check before committing

```powershell
npm run build
npm run lint
git status
```

`git status` lists changed files. Make sure every file in the list is one you meant to change.
Also look at the changes in VS Code's **Source Control** panel (left sidebar): click a file to see what changed.

### Step 5: Commit

```powershell
git add -A
git commit -m "Add normally-open contact evaluation to engine"
```

You can make several commits on the same branch. That's normal.

### Step 6: Push your branch to GitHub

The first time for this branch:

```powershell
git push -u origin feature/your-task-name
```

Later pushes on the same branch: just `git push`.

### Step 7: Open a Pull Request (PR)

1. Go to https://github.com/LeonidM18/apertplc. GitHub shows a yellow bar
   "**your-branch had recent pushes**" → click **Compare & pull request**.
2. **Title:** what the PR does. **Description:** what you changed, why, and how to test it
   ("Run the app, click X, lamp Q0.0 should turn on").
3. Click **Create pull request**. Tell the team in the group chat.

### Step 8: Review and merge

- **A teammate** reviews it: **Files changed** tab → read the code → **Review changes** →
  **Approve** (or **Request changes** with comments).
- If changes are requested: fix them on the same branch, commit, `git push`. The PR updates by itself.
- When approved: the PR author clicks **Squash and merge** → **Confirm**.
  (If the green button says "Merge pull request", click the small arrow next to it and pick **Squash and merge**.)
  ("Squash" turns all your branch commits into one clean commit on `main`.)
- Then click **Delete branch** on GitHub.

### Step 9: Clean up locally

```powershell
git switch main
git pull
git branch -D feature/your-task-name
```

Now go back to Step 1 for your next task.

---

## Part 4: Working with AI assistants

The file [AGENTS.md](AGENTS.md) contains the project rules for AI assistants
(folder structure, coding style, what not to touch). Most AI coding tools read it **automatically**
when you open this folder: Claude Code (through `CLAUDE.md`), GitHub Copilot, Cursor, Codex, Gemini, and others.
If your tool does not, start the chat with: *"Read AGENTS.md and follow it."*

### How to get good results

1. **Create your branch first** (Part 3, Step 2), *then* start the AI.
2. **Give one small task at a time**, and say which folder it belongs to.
   Good: *"In src/engine, add a function that evaluates a normally-open contact. Show me a plan first."*
   Bad: *"Build the PLC simulator."*
3. **Read the plan the AI proposes** before saying OK. If the plan touches folders it shouldn't, say no.
4. **Ask "why?"** whenever you don't understand something. That's how you learn.
5. **Check the result yourself**: run the app, run `npm run build` and `npm run lint`, read the diff.
6. **Don't let the AI push or merge for you.** Committing on your branch is fine if you've read the changes.

### The AI's suggestion conflicts with AGENTS.md?

AGENTS.md wins. If you think a rule in AGENTS.md is wrong, open a PR that changes AGENTS.md
and discuss it with the team. Don't ignore it silently.

---

## Part 5: When something goes wrong

| Problem | What to do |
|---|---|
| `npm.ps1 cannot be loaded` | Do Part 1.2. |
| `git push` rejected, "protected branch" | You are on `main`. Run `git switch -c feature/name`, then commit and push there. |
| `git pull` says "your local changes would be overwritten" | Commit your work on a branch first (Part 3, Step 5), then pull again. |
| **Merge conflict** (git says `CONFLICT`) | Two people changed the same lines. VS Code highlights them: choose **Accept Current**, **Accept Incoming** or **Accept Both**, save, then `git add -A` and `git commit`. If unsure, ask the person who wrote the other change. |
| App shows errors after `git pull` | Run `npm install`. Someone probably added a library. |
| You broke something and want to undo uncommitted changes to a file | VS Code Source Control panel → right-click the file → **Discard Changes**. (This cannot be undone.) |
| Anything else | Copy the **full** error text and ask in the group chat or ask your AI assistant. |
