const pkg = require("./package.json");

module.exports = {
  out: `docs/v${pkg.version}`,
  excludePrivate: true,
  excludeProtected: true,
  excludeInternal: true,
  gitRemote: "origin",
  gitRevision: `v${pkg.version}`,
  name: `i18n-js v${pkg.version}`,
};
