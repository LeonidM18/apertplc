// =============================================================================
// IO — virtual input/output panel (the "I/O modules" with switches and lamps)
// =============================================================================
//
// What goes here:
//   - React components for virtual inputs (switches, push buttons)
//     and virtual outputs (lamps), shown while the simulator runs.
//
// RULES for this folder:
//   - May import from engine/ (to read output states / set input states).
//   - Must NOT import from editor/ or storage/. App.tsx connects those together.
//
// This file is the folder's "front door": other parts of the app import from
// "src/io", and they only see what is exported here.
// =============================================================================

// Nothing exported yet. `export {}` just tells TypeScript "this file is a module".
export {};
