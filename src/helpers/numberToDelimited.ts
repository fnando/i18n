import BigNumber from "bignumber.js";

import { I18n } from "../I18n";
import { Numeric, NumberToDelimitedOptions } from "../../index.d";

export function numberToDelimited(
  _i18n: I18n,
  input: Numeric,
  options: NumberToDelimitedOptions,
): string {
  const numeric = new BigNumber(input);

  if (!numeric.isFinite()) {
    return input.toString();
  }

  if (!options.delimiterPattern.global) {
    throw new Error(
      `options.delimiterPattern must be a global regular expression; received ${options.delimiterPattern}`,
    );
  }

  // eslint-disable-next-line prefer-const
  let [left, right] = numeric.toString().split(".");

  left = left.replace(
    options.delimiterPattern,
    (digitToDelimiter) => `${digitToDelimiter}${options.delimiter}`,
  );

  return [left, right].filter(Boolean).join(options.separator);
}
