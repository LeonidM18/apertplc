// =============================================================================
// STORAGE — saving and loading projects (the "project file / memory card")
// =============================================================================
//
// What goes here (later):
//   - ProjectStorage.ts       An INTERFACE describing what any storage must do
//                             (save, load, list projects). Like a C++ abstract
//                             class with only pure virtual functions.
//   - LocalStorageProvider.ts First implementation: saves inside the browser.
//   - Later maybe ServerStorageProvider.ts: same interface, but talks to a server.
//
// RULES for this folder:
//   - May import from engine/ (to know what a "program" looks like).
//   - No React here. Must NOT import from editor/ or io/.
//   - The rest of the app should only use the ProjectStorage interface, never a
//     specific provider directly. Then switching to a server = changing one line.
//
// This file is the folder's "front door": other parts of the app import from
// "src/storage", and they only see what is exported here.
// =============================================================================

// Nothing exported yet. `export {}` just tells TypeScript "this file is a module".
export {};
