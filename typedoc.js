const pkg = require("./package.json");

module.exports = {
  out: `docs/v${pkg.version}`,
  mode: "modules",
  excludePrivate: true,
  excludeProtected: true,
  ignoreCompilerErrors: true,
};
