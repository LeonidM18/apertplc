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

// Re-export the data model types from ./types.ts, so other folders can write:
//   import type { Rung } from "../engine";
// without knowing which file inside engine/ the type comes from.
//
// `export type { ... } from "./types"` means: take these type names from the
// file types.ts in this same folder ("./" = this folder, the ".ts" is left
// out) and make them public. The word `type` says these are only types, not
// code that runs (our compiler settings require writing it).
export type {
  AreaKind,
  Address,
  ContactKind,
  Contact,
  Coil,
  Rung,
  Program,
  PlcState,
} from "./types";
