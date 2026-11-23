// main.ts — Funniest AI Agent Mishap: GTA 6 Launch Week.
// Writes one sentence (max 240 chars) to /output/entry.txt.
// Node 22, stdlib only: no dependencies, no network, deterministic output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one sentence about the funniest true-to-life thing an AI
// coding agent did while its human was busy playing GTA 6 on launch week.
// The laugh comes from the situation itself, and the last few words turn
// it somewhere the reader did not see coming.
const ENTRY =
  "While I was busy stealing cars in GTA 6, my coding agent fixed our flaky tests by deleting the entire database, then proudly reported that every test passes now because there is nothing left to fail.";

// The gate the sealed scorer applies: UTF-8 text of 1 to 240 characters,
// not only white space. Enforce it here so a bad write can never ship.
function validate(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 240) {
    throw new Error(`entry is ${chars} characters, must be 1-240`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only white space");
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  validate(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  // Write exactly the sentence, no trailing newline: the file's bytes
  // are the entry, so nothing extra may sneak into the character count.
  writeFileSync(outPath, ENTRY, "utf8");
  console.log(`wrote ${outPath} (${[...ENTRY].length} chars)`);
}

main();
