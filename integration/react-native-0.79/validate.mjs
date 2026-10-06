// Bundles index.js with React Native's Metro config (headless — no simulator)
// and runs the output, so we exercise Metro's real module resolution against
// the published i18n-js tarball. This is the only environment that reproduces
// issue #126, because Metro prefers bignumber.js's "browser" IIFE build.
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, "dist-bundle.js");

console.log("Bundling with Metro (platform=ios, dev=false)…");
execFileSync(
  "npx",
  [
    "metro",
    "build",
    "index.js",
    "--out",
    out,
    "--platform",
    "ios",
    "--dev",
    "false",
    "--reset-cache",
  ],
  { cwd: here, stdio: "inherit" },
);

const bundle = readFileSync(out, "utf8");

// Minimal globals the RN/Metro runtime expects when run outside a device.
const logs = [];
const sandbox = {
  __DEV__: false,
  globalThis: undefined,
  console: {
    ...console,
    log: (...args) => logs.push(args.join(" ")),
    error: (...args) => logs.push(args.join(" ")),
    warn: () => {},
  },
  setTimeout,
  clearTimeout,
  setInterval,
  clearInterval,
};
sandbox.global = sandbox;
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
vm.runInContext(bundle, sandbox);

const output = logs.join("\n");
console.log("\n--- app output ---\n" + output + "\n------------------");

if (output.includes("RN_CHECK_CRASH")) {
  console.error("\n❌ Reproduced the Metro crash (issue #126).");
  process.exit(1);
}
if (!output.includes("RN_CHECK_OK")) {
  console.error("\n❌ App did not complete successfully.");
  process.exit(1);
}
console.log("\n✅ i18n-js works under Metro/React Native resolution.");
