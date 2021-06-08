const pkg = require("./package.json");

module.exports = {
  out: `docs/v${pkg.version}`,
  excludePrivate: true,
  excludeProtected: true,
  excludeInternal: true,
};
