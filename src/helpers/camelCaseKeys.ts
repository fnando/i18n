import { camelCase } from "lodash";

import { Dict } from "../../index.d";

export function camelCaseKeys<T = Dict>(target: unknown): T {
  if (!target) {
    return {} as T;
  }

  return Object.keys(target as Dict).reduce((buffer, key) => {
    (buffer as Dict)[camelCase(key)] = (target as Dict)[key];
    return buffer;
  }, {} as T);
}
