import BigNumber from "bignumber.js";
import { Numeric } from "typing";

export function parseBigNumber(input: Numeric, raise: boolean = false) {
  let output = BigNumber(NaN);

  try {
    output = new BigNumber(input);
  } catch {
    if (raise && output.isNaN()) {
      throw new Error(`"${input}" is not a valid numeric value`);
    }
  }

  return output;
}
