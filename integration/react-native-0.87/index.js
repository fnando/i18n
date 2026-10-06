// Metro entry point. Imports i18n-js exactly as an app would and exercises
// numberToCurrency, which is what crashes under Metro when bignumber.js
// resolves to its "browser" IIFE build (issue #126).
import { I18n } from "i18n-js";

const i18n = new I18n({
  en: {
    greeting: "Hello, %{name}!",
    inbox: {
      one: "You have 1 message",
      other: "You have %{count} messages",
    },
  },
});

const results = [];

function check(name, actual, expected) {
  const ok = actual === expected;
  results.push(ok);
  console.log(`${ok ? "PASS" : "FAIL"} ${name}: ${JSON.stringify(actual)}`);
}

try {
  check("translate", i18n.t("greeting", { name: "Nando" }), "Hello, Nando!");
  check("pluralize", i18n.t("inbox", { count: 5 }), "You have 5 messages");
  check("numberToCurrency", i18n.numberToCurrency(1500), "$1,500.00");
  console.log(results.every(Boolean) ? "RN_CHECK_OK" : "RN_CHECK_FAIL");
} catch (error) {
  console.log(`RN_CHECK_CRASH: ${error.name}: ${error.message}`);
}
