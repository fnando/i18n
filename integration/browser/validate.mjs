// Validates the browser build (dist/browser) without a real browser by running
// the bundle inside a VM context, the same way a <script> tag would expose its
// `var I18n` global. For an in-browser check, open integration/browser/index.html.
// Run with: node integration/browser/validate.mjs
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { check, report } from "../scenario.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const bundle = readFileSync(join(here, "../../dist/browser/index.js"), "utf8");

// A top-level `var I18n` in the bundle becomes a property of the VM's global.
const sandbox = { console };
sandbox.window = sandbox;
sandbox.self = sandbox;
vm.createContext(sandbox);
vm.runInContext(bundle, sandbox);

const { I18n } = sandbox.I18n;

const i18n = new I18n({
  en: {
    greeting: "Hello, %{name}!",
    inbox: {
      one: "You have 1 message",
      other: "You have %{count} messages",
    },
  },
});

check("global I18n exposed", typeof sandbox.I18n.I18n, "function");
check("translate + interpolation", i18n.t("greeting", { name: "Nando" }), "Hello, Nando!");
check("pluralize (one)", i18n.t("inbox", { count: 1 }), "You have 1 message");
check("pluralize (other)", i18n.t("inbox", { count: 5 }), "You have 5 messages");
check("numberToCurrency", i18n.numberToCurrency(1234.56), "$1,234.56");

report("browser");
