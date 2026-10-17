// =============================================================================
// EDITOR — the ladder diagram editor (the "programming software")
// =============================================================================
//
// What goes here:
//   - React components for drawing ladder logic: the rung grid, a toolbox with
//     contacts/coils/timers/counters, placing and deleting elements, etc.
//
// RULES for this folder:
//   - May import from engine/ (to use the program data types).
//   - Must NOT import from io/ or storage/. App.tsx connects those together.
//
// This file is the folder's "front door": other parts of the app import from
// "src/editor", and they only see what is exported here.
// =============================================================================

// Nothing exported yet. `export {}` just tells TypeScript "this file is a module".
export {};
