import BigNumber from "bignumber.js";
import type { RoundingMode } from "../typing.js";

const RoundingModeMap: Record<RoundingMode, BigNumber.RoundingMode> = {
  up: BigNumber.ROUND_UP,
  down: BigNumber.ROUND_DOWN,
  truncate: BigNumber.ROUND_DOWN,
  halfUp: BigNumber.ROUND_HALF_UP,
  default: BigNumber.ROUND_HALF_UP,
  halfDown: BigNumber.ROUND_HALF_DOWN,
  halfEven: BigNumber.ROUND_HALF_EVEN,
  banker: BigNumber.ROUND_HALF_EVEN,
  ceiling: BigNumber.ROUND_CEIL,
  ceil: BigNumber.ROUND_CEIL,
  floor: BigNumber.ROUND_FLOOR,
};

/**
 * @param {RoundingMode} roundMode BigNumber's rounding mode shortcut.
 *
 * @return {BigNumber.RoundingMode} The related BigNumber rounding mode.
 */
export function expandRoundMode(
  roundMode: RoundingMode,
): BigNumber.RoundingMode {
  return RoundingModeMap[roundMode] ?? RoundingModeMap.default;
}
