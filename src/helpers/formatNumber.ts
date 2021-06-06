import BigNumber from "bignumber.js";
import { repeat } from "lodash";

import { FormatNumberOptions } from "../../index.d";
import { roundNumber } from ".";

function replaceInFormat(
  format: string,
  {
    formattedNumber,
    unit,
    sign,
  }: { formattedNumber: string; unit: string; sign: string },
): string {
  return format
    .replace("%u", unit)
    .replace("%n", formattedNumber)
    .replace("%s", sign);
}

function computeSignificand({
  significand,
  whole,
  precision,
}: {
  significand: string;
  whole: string;
  precision: number | null;
}) {
  if (whole === "0" || precision === null) {
    return significand;
  }

  const limit = Math.max(0, precision - whole.length);

  return (significand ?? "").substr(0, limit);
}

export function formatNumber(
  input: number | string,
  options: FormatNumberOptions,
): string {
  const originalNumber = new BigNumber(input);

  if (options.raise && !originalNumber.isFinite()) {
    throw new Error(`"${input}" is not a valid numeric value`);
  }

  const roundedNumber = roundNumber(originalNumber, options);
  const numeric = new BigNumber(roundedNumber);
  const isNegative = numeric.lt(0);
  const isZero = numeric.isZero();
  let sign = isNegative ? "-" : "";
  let [whole, significand] = roundedNumber.split(".");
  const buffer: string[] = [];
  let formattedNumber: string;
  const positiveFormat = options.format ?? "%n";
  const negativeFormat = options.negativeFormat ?? `-${positiveFormat}`;
  const format = isNegative && !isZero ? negativeFormat : positiveFormat;

  whole = whole.replace("-", "");

  while (whole.length > 0) {
    buffer.unshift(whole.substr(Math.max(0, whole.length - 3), 3));
    whole = whole.substr(0, whole.length - 3);
  }

  whole = buffer.join("");
  formattedNumber = buffer.join(options.delimiter);

  if (options.significant) {
    significand = computeSignificand({
      whole,
      significand,
      precision: options.precision,
    });
  } else {
    significand = significand ?? repeat("0", options.precision ?? 0);
  }

  if (options.stripInsignificantZeros && significand) {
    significand = significand.replace(/0+$/, "");
  }

  if (originalNumber.isNaN()) {
    formattedNumber = input.toString();
  }

  if (significand && originalNumber.isFinite()) {
    formattedNumber += (options.separator || ".") + significand;
  }

  if (isZero || (options.precision === 0 && !whole)) {
    sign = "";
  }

  return replaceInFormat(format, {
    sign,
    formattedNumber,
    unit: options.unit,
  });
}
