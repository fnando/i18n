function traverse(object, keyModifier) {
    if (object instanceof Array) {
        return traverseArray(object, keyModifier);
    }
    else if (object instanceof Object) {
        return traverseObject(object, keyModifier);
    }
    return object;
}
function traverseArray(list, keyModifier) {
    return list.map((item) => traverse(item, keyModifier));
}
function traverseObject(object, keyModifier) {
    return Object.keys(object).reduce((buffer, key) => (Object.assign(Object.assign({}, buffer), { [keyModifier(key)]: traverse(object[key], keyModifier) })), {});
}
function underscore(text) {
    return text.replace(/([A-Z])/g, "_$1").toLowerCase();
}
function camelize(text) {
    return text.replace(/(_(.))/g, (_fullMatch, _group, match) => match.toUpperCase());
}
export function dump(object) {
    return traverse(object, underscore);
}
export function load(object) {
    return traverse(object, camelize);
}
