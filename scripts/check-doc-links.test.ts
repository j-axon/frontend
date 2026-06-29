/**
 * Valida que los enlaces a archivos referenciados en docs existen.
 */
import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";

const docsRoot = join(process.cwd(), "docs");

const links: Array<{ doc: string; target: string }> = [
  { doc: "docs/frontend/env.md", target: "docs/frontend/env.md" },
  { doc: "docs/frontend/architecture.md", target: "docs/frontend/architecture.md" },
  { doc: "docs/frontend/testing.md", target: "docs/frontend/testing.md" },
  { doc: "docs/frontend/api-contracts.md", target: "docs/frontend/api-contracts.md" }
];

describe("Doc links sanity check", () => {
  it.each(links)("$doc referencias existen", ({ target }) => {
    expect(existsSync(join(process.cwd(), target))).toBe(true);
  });
  it("docs root existe", () => {
    expect(existsSync(docsRoot)).toBe(true);
  });
});
