import type { I18n } from "../I18n.js";
import type { Pluralizer } from "../typing.js";

export const westSlavic: Pluralizer = (_i18n: I18n, count: number) => {
  const few = [2, 3, 4];
  let key: string;

  if (count === 1) {
    key = "one";
  } else if (few.includes(count)) {
    key = "few";
  } else {
    key = "other";
  }

  return [key];
};
