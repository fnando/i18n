import { isArray, isObject, flattenDeep } from "lodash";
import { Dict } from "../../index.d";

interface Indexable {
  [key: string]: unknown;
}

class FlatMap {
  public target: Dict;

  constructor(target: Dict) {
    this.target = target;
  }

  call(): string[] {
    const keys = flattenDeep(
      Object.keys(this.target).map((key) =>
        this.compute(this.target[key], key),
      ),
    );

    keys.sort();

    return keys as string[];
  }

  compute(value: unknown, path: string): unknown {
    if (!isArray(value) && isObject(value)) {
      return Object.keys(value).map((key) =>
        this.compute((value as Indexable)[key] as unknown, `${path}.${key}`),
      );
    } else {
      return path;
    }
  }
}

export function flatMap(target: Dict): string[] {
  return new FlatMap(target).call();
}
