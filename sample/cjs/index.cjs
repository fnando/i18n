// Validates the CommonJS build (dist/require), the target of package.json "main".
// Run with: node sample/cjs/index.cjs
const { I18n } = require("../../dist/require/index.js");

async function main() {
  const { check, report } = await import("../scenario.mjs");

  const i18n = new I18n({
    en: {
      greeting: "Hello, %{name}!",
      inbox: {
        one: "You have 1 message",
        other: "You have %{count} messages",
      },
    },
  });

  check("translate + interpolation", i18n.t("greeting", { name: "Nando" }), "Hello, Nando!");
  check("pluralize (one)", i18n.t("inbox", { count: 1 }), "You have 1 message");
  check("pluralize (other)", i18n.t("inbox", { count: 5 }), "You have 5 messages");
  check("numberToCurrency", i18n.numberToCurrency(1234.56), "$1,234.56");

  report("cjs");
}

main();
