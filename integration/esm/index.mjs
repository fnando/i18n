// Validates the ESM build (dist/import), the target of package.json "module"
// and the "import" condition. It loads the emitted files directly under Node's
// native ESM loader — no bundler involved.
import { I18n } from "../../dist/import/index.js";
import { check, report } from "../scenario.mjs";

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

report("esm");
