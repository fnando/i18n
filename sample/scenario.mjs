// Tiny shared assertion helpers so each sample exercises the same scenario
// against a different build output.
const results = [];

export function check(name, actual, expected) {
  const ok = actual === expected;
  results.push(ok);
  const status = ok ? "✓" : "✗";
  const detail = ok ? "" : ` (expected ${JSON.stringify(expected)})`;
  console.log(`${status} ${name}: ${JSON.stringify(actual)}${detail}`);
}

export function report(label) {
  const passed = results.filter(Boolean).length;
  console.log(`\n${label}: ${passed}/${results.length} passed`);

  if (passed !== results.length) {
    process.exit(1);
  }
}
