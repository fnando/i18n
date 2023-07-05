# Changelog

<!--
Prefix your message with one of the following:

- [Added] for new features.
- [Changed] for changes in existing functionality.
- [Deprecated] for soon-to-be removed features.
- [Removed] for now removed features.
- [Fixed] for any bug fixes.
- [Security] in case of vulnerabilities.
-->

All notable changes to this project will be documented in this file. This
project adheres to [Semantic Versioning](http://semver.org/).

## v4.3.0-beta.0 - Jul 5, 2023

- [Changed] Vendor lodash, so it's easier to use i18n-js with importmaps.

## v4.2.3 - Mar 5, 2023

- [Added] Introduce `useMakePlural(options)` function as way of creating
  pluralizers on top of [make-plural](https://github.com/eemeli/make-plural/).
- [Changed] Use `make-plural`'s `en` function as the default pluralizer.
- [Changed] Mark `Scope` type as read-only.

## V4.2.2 - Dec 16, 2022

- [Changed] Import lodash modules directly, which reduces final exported size by
  36% (#41).

## v4.2.1 - Dec 13, 2022

- [Changed] The `I18n#translate`'s return type is now a string and generics
  union.
- [Fixed] Fix issue when pluralization missed a key required by the pluralizer
  raised an error rather thanr returning the missing translation message (#39)

## v4.2.0 - Nov 24, 2022

- [Changed] Interpolate strings when `i18n.t(..args)` returns an array.
- [Fixed] Import cycle issue on `src/helpers/formatNumber.ts`.
- [Added] `I18n#formatNumber` is now available as a `I18n` instance method.

## v4.1.1 - Aug 25, 2022

- [Changed] Removed `@internal` annotation from functions, so TypeScript can
  export types properly.
- [Changed] Export additional types from main file.

## v4.1.0 - Aug 22, 2022

- [Added] `I18n#onChange` now returns a function that removes the handler from
  events.
- [Added] `I18n#interpolate` is now available on the instance of `I18n` and can
  therefore be overridden.

## Jul 29, 2022

- Official release of i18n-js v4.0.0.
