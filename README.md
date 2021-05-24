<p align="center">
  <strong style="font-size: 36px;">i18n-js</strong>
</p>

<p align="center">
  A small library to provide the <a href="https://rubygems.org/gems/i18n">i18n</a> translations on the JavaScript.
</p>

<p align="center">
  <a href="https://github.com/fnando/i18n/actions?query=workflow%3Atests"><img src="https://github.com/fnando/i18n/workflows/tests/badge.svg" alt="Tests"></a>
  <a href="https://www.npmjs.com/package/i18n"><img src="https://img.shields.io/npm/v/i18n-js.svg" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/i18n"><img src="https://img.shields.io/npm/dt/i18n-js.svg" alt="npm downloads"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a>
</p>

## Installation

- Yarn: `yarn add i18n-js@next`
- NPM: `npm install i18n-js@next`

## Usage

### Setting up

First, you need to instantiate `I18n` with the translations' object, the main
class of this library.

```js
import { I18n } from "i18n";
import translations from "./translations.json";

const i18n = new I18n(translations);
```

The `translations` object is a direct export of translations defined by
[Ruby on Rails](https://guides.rubyonrails.org/i18n.html). To export the
translations, you can use [i18n-js](https://github.com/fnando/i18n-js), a Ruby
gem that's completely disconnected from Rails and that can be used for the
solely purpose of exporting the translations, even if your project is written in
a different language. If all you care about is some basic translation mechanism,
then you can set the object like this:

```js
const i18n = new I18n({
  en: {
    hello: "Hi!",
  },
  "pt-BR": {
    hello: "Olá!",
  },
});
```

Each root key is a different locale that may or may not have the script code.
This library also supports locales with region code, like `zh-Hant-TW`.

Once everything is set up, you can then define the locale. `en` is both the
current and default locale. To override either values, you have to use
`I18n#defaultLocale` and `I18n#locale`.

```js
i18n.defaultLocale = "pt-BR";
i18n.locale = "pt-BR";
```

#### Base translations

This library comes bundled with all base translations made available by
[rails-i18n](https://github.com/svenfuchs/rails-i18n/tree/master/rails/locale).
Base translations allow formatting date, numbers, and sentence connectors, among
other things.

To load the base translations, use something like the following:

```js
import { I18n } from "i18n-js";
import ptBR from "i18n-js/json/pt-BR.json";
import en from "i18n-js/json/en.json";

const i18n = new I18n({
  ...ptBR,
  ...en,
});
```

### Translating messages

To translate messages, you have to use the `I18n#translate`, or its `I18n#t`
alias.

```js
i18n.locale = "en";
i18n.t("hello"); //=> Hi!

i18n.locale = "pt-BR";
i18n.t("hello"); //=> Olá!
```

You can also provide an array as scope. Both calls below are equivalent.

```js
i18n.t(["greetings", "hello"]);
i18n.t("greetings.hello");
```

Your translations may have dynamic values that should be interpolated. Here's a
greeting message that takes a name:

```js
const i18n = new I18n({
  en: { greetings: "Hi, %{name}!" },
  "pt-BR": { greetings: "Olá, %{name}!" },
});

i18n.t("greetings", { name: "John" });
```

#### Missing translations

A translation may be missing. In that case, you may set the default value that's
going to be returned.

```js
i18n.t("missing.scope", { defaultValue: "This is a default message" });
```

Default messages can also have interpolation.

```js
i18n.t("noun", { defaultValue: "I'm a {{noun}}", noun: "Mac" });
```

Alternatively, you can define a list of scopes that will be searched instead.

```js
// As a scope
i18n.t("some.missing.scope", { defaults: [{ scope: "some.existing.scope" }] });

// As a simple translation
i18n.t("some.missing.scope", { defaults: [{ message: "Some message" }] });
```

Default values must be provided as an array of objects where the key is the type
of desired translation, a `scope` or a `message`. The returned translation will
be either the first scope recognized, or the first message defined.

The translation will fall back to the `defaultValue` translation if no scope in
`defaults` matches and if no `message` default is found.

You can enable translation fallback with `I18n#enableFallback`.

```js
i18n.enableFallback = true;
```

By default missing translations will first be looked for in less specific
versions of the requested locale and if that fails by taking them from your
`I18n#defaultLocale`.

```js
// if i18n.defaultLocale = "en" and translation doesn't exist
// for i18n.locale = "de-DE" this key will be taken from "de" locale scope
// or, if that also doesn't exist, from "en" locale scope
i18n.t("some.missing.scope");
```

Custom fallback rules can also be specified for a specific language. There are
three different ways of doing it so. In any case, the locale handler must be
registered using `i18n.locales.register()`.

```js
// Using an array
i18n.locales.register("no", ["nb", "en"]);

// Using a string
i18n.locales.no.register("nb");

// Using a function.
i18n.locales.no.register((locale) => ["nb"]);
```

By default a missing translation will be displayed as
`[missing "name of scope" translation]`. You can override this behavior by
setting `i18n.missingBehavior` to `"guess"`.

```js
i18n.missingBehaviour = "guess";
```

The "guess" behavior will take the last section of the scope and apply some
replace rules; camel case becomes lower case and underscores are replaced with
space. In practice, it means that a scope like
`questionnaire.whatIsYourFavorite_ChristmasPresent` becomes
`what is your favorite Christmas present`.

To detect missing translations, you can also set
`i18n.missingTranslationPrefix`.

```js
i18n.missingTranslationPrefix = "EE: ";
```

The same `questionnaire.whatIsYourFavorite_ChristmasPresent` scope would
converted into `EE: what is your favorite Christmas present`. This is helpful if
you want to add a check to your automated tests.

Finally, you can completely override the missing translation strategy by setting
it to a function. The following example will return `null` for every missing
translation.

```js
i18n.missingTranslation = () => null;
```

#### Pluralization

This library has support for pluralization and by default works with English,
and similar pluralized languages like Portuguese.

First, you have to define your translations with special keywords defined by the
pluralization handler. The default keywords are `zero`, `one`, and `other`.

```js
const i18n = new I18n({
  en: {
    inbox: {
      zero: "You have no messages",
      one: "You have one message",
      other: "You have %{count} messages",
    },
  },

  "pt-BR": {
    inbox: {
      zero: "Você não tem mensagens",
      one: "Você tem uma mensagem",
      other: "Você tem %{count} mensagens",
    },
  },
});
```

To retrieve the pluralized translation you must provide the `count` option with
a numeric value.

```js
i18n.t("inbox", { count: 0 }); //=> You have no messages
i18n.t("inbox", { count: 1 }); //=> You have one message
i18n.t("inbox", { count: 2 }); //=> You have 2 messages
```

You may need to define new rules for other languages like Russian. This can be
done by registering a handler with `i18n.pluralization.register()`. The
following example defines a Russian pluralizer.

```js
i18n.pluralization.register("ru", (_i18n, count) => {
  const mod10 = count % 10;
  const mod100 = count % 100;
  let key;

  const one = mod10 === 1 && mod100 !== 11;
  const few = [2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100);
  const many =
    mod10 === 0 ||
    [5, 6, 7, 8, 9].includes(mod10) ||
    [11, 12, 13, 14].includes(mod100);

  if (one) {
    key = "one";
  } else if (few) {
    key = "few";
  } else if (many) {
    key = "many";
  } else {
    key = "other";
  }

  return [key];
});
```

You can find all rules on
[http://www.unicode.org/](http://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html).

It's encourage to publish your pluralizers using the following name pattern:
`i18n-<locale>-pluralizer`. If you publish a pluralizer, please add a pull
request so we can list it here.

#### Other options

If you're providing the same scope again and again, you can reduce the
boilerplate by setting the `scope` option.

```js
const options = { scope: "activerecord.attributes.user" };

i18n.t("name", options);
i18n.t("email", options);
i18n.t("username", options);
```

### Number Formatting

Similar to Rails helpers, you can have localized number and currency formatting.

```js
i18n.l("currency", 1990.99);
// $1,990.99

i18n.l("number", 1990.99);
// 1,990.99

i18n.l("percentage", 123.45);
// 123.450%
```

To have more control over number formatting, you can use the `I18n#toNumber`,
`I18n#toPercentage`, `I18n#toCurrency` and `I18n#toHumanSize` functions.

```js
i18n.toNumber(1000); // 1,000.000
i18n.toCurrency(1000); // $1,000.00
i18n.toPercentage(100); // 100.000%
```

The `I18n#toNumber` and `I18n#toPercentage` functions accept the following
options:

- `precision`: defaults to `3`
- `separator`: defaults to `.`
- `delimiter`: defaults to `,`
- `strip_insignificant_zeros`: defaults to `false`

See some number formatting examples:

```js
i18n.toNumber(1000, { precision: 0 }); // 1,000
i18n.toNumber(1000, { delimiter: ".", separator: "," }); // 1.000,000
i18n.toNumber(1000, { delimiter: ".", precision: 0 }); // 1.000
```

The `I18n#toCurrency` function accepts the following options:

- `precision`: sets the level of precision
- `separator`: sets the separator between the units
- `delimiter`: sets the thousands delimiter
- `format`: sets the format of the output string
- `unit`: sets the denomination of the currency
- `strip_insignificant_zeros`: defaults to `false`
- `sign_first`: defaults to `true`

You can provide only the options you want to override:

```js
i18n.toCurrency(1000, { precision: 0 }); // $1,000
```

The `I18n#toHumanSize` function accepts the following options:

- `precision`: defaults to `1`
- `separator`: defaults to `.`
- `delimiter`: defaults to `""`
- `strip_insignificant_zeros`: defaults to `false`
- `format`: defaults to `%n%u`

```js
i18n.toHumanSize(1234); // 1KB
i18n.toHumanSize(1234 * 1024); // 1MB
```

### Date Formatting

The `I18n#localize` (or its alias `I18n#l`) can accept a string, epoch time
integer or a `Date` object. You can see below the accepted formats:

```js
// yyyy-mm-dd
i18n.l("date.formats.short", "2009-09-18");

// yyyy-mm-dd hh:mm:ss
i18n.l("time.formats.short", "2009-09-18 23:12:43");

// JSON format with local Timezone (part of ISO-8601)
i18n.l("time.formats.short", "2009-11-09T18:10:34");

// JSON format in UTC (part of ISO-8601)
i18n.l("time.formats.short", "2009-11-09T18:10:34Z");

// Epoch time
i18n.l("date.formats.short", 1251862029000);

// mm/dd/yyyy
i18n.l("date.formats.short", "09/18/2009");

// Date object
i18n.l("date.formats.short", new Date());
```

You can also add placeholders to the date format:

```js
const i18n = new I18n({
  date: {
    formats: {
      ordinal_day: "%B %{day}",
    },
  },
});

i18n.l("date.formats.ordinal_day", "2009-09-18", { day: "18th" }); // Sep 18th
```

If you prefer, you can use the `I18n#toTime` and `I18n#strftime` functions
directly to format dates.

```js
var date = new Date();
i18n.toTime("date.formats.short", "2009-09-18");
i18n.toTime("date.formats.short", date);
i18n.strftime(date, "%d/%m/%Y");
```

The accepted formats for `i18n.strftime` are:

```
%a  - The abbreviated weekday name (Sun)
%A  - The full weekday name (Sunday)
%b  - The abbreviated month name (Jan)
%B  - The full month name (January)
%c  - The preferred local date and time representation
%d  - Day of the month (01..31)
%-d - Day of the month (1..31)
%H  - Hour of the day, 24-hour clock (00..23)
%-H - Hour of the day, 24-hour clock (0..23)
%k  - Hour of the day, 24-hour clock (0..23)
%I  - Hour of the day, 12-hour clock (01..12)
%-I - Hour of the day, 12-hour clock (1..12)
%l  - Hour of the day, 12-hour clock (1..12)
%m  - Month of the year (01..12)
%-m - Month of the year (1..12)
%M  - Minute of the hour (00..59)
%-M - Minute of the hour (0..59)
%p  - Meridian indicator (AM  or  PM)
%P  - Meridian indicator (am  or  pm)
%S  - Second of the minute (00..60)
%-S - Second of the minute (0..60)
%w  - Day of the week (Sunday is 0, 0..6)
%y  - Year without a century (00..99)
%-y - Year without a century (0..99)
%Y  - Year with century
%z  - Timezone offset (+0545)
%Z  - Timezone offset (+0545)
```

Check out
[\_\_tests\_\_/strftime.test.ts](https://github.com/fnando/i18n/blob/main/__tests__/strftime.test.ts)
file for more examples!

Finally, you can also diplay relative time strings using `I18n#timeAgoInWords`.

```js
const to = new Date();
const from = to.getTime() - 60 * 60 * 1000; // ~1h ago.

i18n.timeAgoInWords(from, to);
//=> about 1 hour
```

#### Using pluralization and number formatting together

Sometimes you might want to display translation with formatted number, like
adding thousand delimiters to displayed number You can do this:

```js
const i18n = new I18n({
  en: {
    points: {
      one: "1 Point",
      other: "{{points}} Points",
    },
  },
});

const points = 1234;

i18n.t("points", {
  count: points,
  points: i18n.toNumber(points),
});
```

Output should be `1,234 points`.

### Other helpers

#### `I18n#toSentence(list, options)`

```js
i18n.toSentence(["apple", "banana", "pineapple"]);
//=> apple, banana, and pineapple.
```

## License

(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the 'Software'), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
