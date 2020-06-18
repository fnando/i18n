module.exports = {
  root: true,
  extends: ["@fnando/codestyle/javascript", "@fnando/codestyle/typescript"],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/camelcase": "off",
    "lines-between-class-members": "off",
    "prefer-destructuring": "off",
    "no-use-before-define": "off",
  },
};
