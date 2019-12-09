import { AnyObject, ArrayType, ObjectType } from "../../index.d";

export type KeyModifier = (key: string) => string;

function traverse(object: AnyObject, keyModifier: KeyModifier): AnyObject {
  if (object instanceof Array) {
    return traverseArray(object as ArrayType, keyModifier);
  } else if (object instanceof Object) {
    return traverseObject(object as ObjectType, keyModifier);
  }

  return object;
}

function traverseArray(list: ArrayType, keyModifier: KeyModifier): ArrayType {
  return list.map((item: AnyObject) => traverse(item, keyModifier));
}

function traverseObject(
  object: ObjectType,
  keyModifier: KeyModifier,
): ObjectType {
  return Object.keys(object).reduce(
    (buffer, key) => ({
      ...buffer,
      [keyModifier(key)]: traverse(object[key], keyModifier),
    }),
    {},
  );
}

function underscore(text: string): string {
  return text.replace(/([A-Z])/g, "_$1").toLowerCase();
}

function camelize(text: string): string {
  return text.replace(/(_(.))/g, (_fullMatch, _group, match) =>
    match.toUpperCase(),
  );
}

export function dump(object: AnyObject): AnyObject {
  return traverse(object, underscore);
}

export function load(object: AnyObject): AnyObject {
  return traverse(object, camelize);
}
