const config = require("@fnando/codestyle/typescript/jest");

module.exports = {
  ...config,
  testRegex: ".*?\\.test\\.ts",
  roots: ["<rootDir>/src", "<rootDir>/__tests__"],
  modulePaths: ["src"],
  testPathIgnorePatterns: ["/vendor/bundle/"],
};
