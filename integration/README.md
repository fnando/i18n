# Integration tests

These exercise the **emitted `dist/` files** (not `src/`) to confirm each
published build output works when consumed for real. The Node checks all run the
same scenario from [`scenario.mjs`](./scenario.mjs): translation with
interpolation, pluralization, and currency formatting.

Build first, then run everything:

```bash
npm run build
npm run test:integration
```

Or individually:

| Script                             | Build output                                          | How it's consumed                                                                                                  |
| ---------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `npm run test:integration:cjs`     | `dist/require` (package `main`)                       | `require()` directly under Node.                                                                                   |
| `npm run test:integration:esm`     | `dist/import` (package `module` / `import` condition) | Loaded directly under Node's native ESM loader — no bundler.                                                       |
| `npm run test:integration:browser` | `dist/browser` (global `var I18n`)                    | Loaded in a VM context, mirroring a `<script>` tag. Also openable as [`browser/index.html`](./browser/index.html). |

Each check exits non-zero if any assertion fails. They run in CI as part of
`npm run test:ci`.

## React Native / Metro

[`react-native-0.79/`](./react-native-0.79) and
[`react-native-0.87/`](./react-native-0.87) bundle i18n-js with React Native's
real Metro config and run the output, to confirm it resolves correctly on React
Native. **0.79** is the minimum supported version — the first release where
Metro enables package [`exports`](https://nodejs.org/api/packages.html) by
default, which i18n-js v5 relies on (see issue #126); **0.87** is a second,
newer data point.

They run in CI as part of `npm run test:ci` (via
`npm run test:integration:react-native`), after the workflow installs each app's
toolchain. To run one locally:

```bash
npm run build                 # in the repo root, so the local dist/ exists
cd integration/react-native-0.79   # or react-native-0.87
npm install                   # uses install-links to copy the local i18n-js build
npm run validate              # bundles with Metro (headless) and runs it
```
