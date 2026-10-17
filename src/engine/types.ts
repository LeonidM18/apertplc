// =============================================================================
// ENGINE TYPES: the data model of a ladder program
// =============================================================================
//
// This file only DESCRIBES what the data looks like (like struct definitions
// in a C++ header). It contains no logic. The scan cycle that USES these
// types will live in its own file.
//
// Syntax reminders for C++ programmers:
//   - `type Name = ...;`   defines a new type name (like `using Name = ...;`)
//   - `field: Type;`       name FIRST, then `:`, then the type
//                          (opposite of C++, where it is `Type field;`)
//   - `"A" | "B"`          "one of these exact texts" (replaces `enum`)
//   - `Type[]`             an array/list of Type (like std::vector<Type>)
//   - `export`             makes the name usable from other files
//
// These types disappear when the program runs. They exist only so that
// TypeScript can check our code for mistakes before it runs.
// =============================================================================

// -----------------------------------------------------------------------------
// Addresses
// -----------------------------------------------------------------------------

// The memory area a bit belongs to (Siemens-style naming):
//   "I" = inputs  (e.g. a push button wired to the PLC)
//   "Q" = outputs (e.g. a lamp or motor contactor)
//   "M" = memory bits / markers (internal helper bits, like auxiliary relays)
// A value of this type can only be one of these three texts. Anything
// else (e.g. "X") is a compile error.
export type AreaKind = "I" | "Q" | "M";

// One bit address, e.g. I0.2 = input area, byte 0, bit 2.
// Written as an object, I0.2 is: { area: "I", byte: 0, bit: 2 }
//
// Note: in our simulator, byte and bit are only numbers in the name.
// We do not really pack 8 bits into a byte of memory. We use the same
// naming as a real PLC so students see familiar addresses.
export type Address = {
  area: AreaKind; // which area: "I", "Q" or "M"
  byte: number;   // byte number: 0, 1, 2, ...  (`number` = TS's only number type)
  bit: number;    // bit number inside the byte: 0..7
};

// -----------------------------------------------------------------------------
// Ladder elements
// -----------------------------------------------------------------------------

// The two kinds of contact:
//   "NO" = normally open   --] [--   passes power when the bit is ON (true)
//   "NC" = normally closed --]/[--   passes power when the bit is OFF (false)
export type ContactKind = "NO" | "NC";

// A contact on a rung, e.g. --] [-- I0.0
export type Contact = {
  // The "tag": always exactly the text "contact". When we later have a list
  // that mixes different elements, code can check `element.type === "contact"`
  // to know what it is looking at (like a tagged union in C++).
  type: "contact";
  kind: ContactKind; // "NO" or "NC"
  address: Address;  // which bit this contact reads
};

// An output coil at the end of a rung, e.g. --( )-- Q0.0
// It writes the rung's result (power or no power) to its bit.
export type Coil = {
  type: "coil";     // the tag, always exactly "coil"
  address: Address; // which bit this coil writes
};

// -----------------------------------------------------------------------------
// Program structure
// -----------------------------------------------------------------------------

// One rung of the ladder diagram.
// For now: contacts in SERIES (AND logic), left to right, driving one coil.
//
//   |--] [--]/[--------( )--|
//      contacts[0..n]  coil
//
// Parallel branches (OR logic) will be added later.
export type Rung = {
  contacts: Contact[]; // list of contacts, in order from left to right
  coil: Coil;          // the coil at the right end of the rung
};

// A whole PLC program: a list of rungs, scanned from top to bottom.
export type Program = {
  rungs: Rung[];
};

// -----------------------------------------------------------------------------
// Runtime state
// -----------------------------------------------------------------------------

// The current value of every bit in the PLC (inputs, outputs and memory).
//
// `Record<string, boolean>` is a lookup table (map) from a text key to
// true/false, like std::map<std::string, bool> in C++.
// The key is the address written as text, e.g. "I0.0" or "Q0.1".
//
// Example:
//   bits: { "I0.0": true, "I0.1": false, "Q0.0": true }
//
// Reading a key that was never set gives `undefined` ("no value").
// The engine will treat that as false (OFF).
export type PlcState = {
  bits: Record<string, boolean>;
};
