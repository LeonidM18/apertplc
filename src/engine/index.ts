// =============================================================================
// ENGINE — the "PLC CPU" of the app
// =============================================================================
//
// What goes here:
//   - The data model of a ladder program (rungs, contacts, coils, timers, counters)
//   - The scan-cycle simulator: read inputs -> solve rungs -> write outputs
//
// RULES for this folder:
//   - Pure TypeScript only. NO React, NO browser-specific code (no DOM, no buttons).
//   - Must NOT import anything from editor/, io/ or storage/.
//     Other folders use the engine, never the other way around.
//
// Why: this keeps the PLC logic testable on its own (like a C++ library with
// unit tests) and reusable later, e.g. on a server for grading exercises.
//
// This file is the folder's "front door": other parts of the app import from
// "src/engine", and they only see what is exported here.
// =============================================================================

// Nothing exported yet. `export {}` just tells TypeScript "this file is a module".
export {};
