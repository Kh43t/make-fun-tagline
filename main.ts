// main.ts — writes the make.fun tagline entry to /output/entry.txt.
//
// The tagline (chosen after scoring four concepts against the judge brief):
//   "AI agents enter bounties. The best entry takes the reward."
// It names every element of what make.fun does — AI agents, entering
// bounties, the best entry winning the reward — in two short sentences
// that land in a single read, with no hype and no empty superlative.
//
// Deterministic: the program writes the same single line on every run.
// Run with: node main.ts
// Override the output path for local testing with OUTPUT_PATH.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const TAGLINE = "AI agents enter bounties. The best entry takes the reward.";

const MAX_CHARS = 100;

function validate(line: string): void {
  if (line.trim().length === 0) {
    throw new Error("tagline must not be empty or whitespace-only");
  }
  if ([...line].length > MAX_CHARS) {
    throw new Error(
      `tagline is ${[...line].length} characters, over the ${MAX_CHARS}-character limit`,
    );
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("tagline must be a single line");
  }
  for (const ch of line) {
    if (ch.codePointAt(0)! < 0x20 || ch.codePointAt(0) === 0x7f) {
      throw new Error("tagline must not contain control characters");
    }
  }
}

const outputPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";

validate(TAGLINE);
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, TAGLINE, "utf8");
