import { existsSync, statSync } from "node:fs";
import { registerHooks } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";

/**
 * Makes the Node test runner resolve modules the way the bundler does.
 *
 * Two gaps, both because Node runs these tests directly (stripping TypeScript
 * types rather than compiling) so nothing rewrites specifiers first:
 *
 *   1. The "@/" alias from tsconfig.json.
 *   2. Extensionless imports, which TypeScript source is written with and
 *      Node's ESM resolver rejects.
 *
 * registerHooks is synchronous and in-thread, so it applies to the module graph
 * loaded by --import without needing a worker. `root` is captured at load time,
 * before any test can chdir.
 */
const root = pathToFileURL(`${process.cwd()}/`).href;

const EXTENSIONS = ["", ".ts", ".tsx", ".js", ".mjs", "/index.ts", "/index.tsx"];

/**
 * First candidate that is a FILE on disk, or null to let Node report the
 * miss. A bare directory hit ("@/lib/store" with no extension) must fall
 * through to the "/index.ts" candidate, not resolve to the directory.
 */
function probe(base) {
  for (const ext of EXTENSIONS) {
    const url = new URL(base.href + ext);
    const path = fileURLToPath(url);
    if (existsSync(path) && statSync(path).isFile()) return url.href;
  }
  return null;
}

registerHooks({
  resolve(specifier, context, next) {
    // Dependencies ship resolvable specifiers already and include CommonJS,
    // where probing actively breaks resolution. Only our own source needs help.
    if (context.parentURL?.includes("/node_modules/")) {
      return next(specifier, context);
    }

    if (
      specifier === "next/server" ||
      specifier === "next/navigation" ||
      specifier === "next/headers"
    ) {
      return next(`${specifier}.js`, context);
    }

    const base = specifier.startsWith("@/")
      ? new URL(specifier.slice(2), root)
      : specifier.startsWith(".") && context.parentURL?.startsWith("file:")
        ? new URL(specifier, context.parentURL)
        : null;

    const found = base ? probe(base) : null;
    return next(found ?? specifier, context);
  },
});
