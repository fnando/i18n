# Samples

Smoke tests that exercise the **emitted `dist/` files** (not `src/`) to confirm
each published build output works. All three run the same scenario from
[`scenario.mjs`](./scenario.mjs): translation with interpolation, pluralization,
and currency formatting.

Run everything (rebuilds `dist/` first):

```bash
npm run sample
```

Or individually:

| Script                   | Build output                       | How it's consumed                                                                                                      |
| ------------------------ | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `npm run sample:cjs`     | `dist/require` (package `main`)    | `require()` directly under Node.                                                                                       |
| `npm run sample:esm`     | `dist/import` (package `module` / `import` condition) | Loaded directly under Node's native ESM loader — no bundler.                                                           |
| `npm run sample:browser` | `dist/browser` (global `var I18n`) | Loaded in a VM context, mirroring a `<script>` tag. Also openable as [`browser/index.html`](./browser/index.html).     |

Each sample exits non-zero if any assertion fails, so they double as CI checks.
