export function inferType(instance) {
    const type = typeof instance;
    if (type !== "object") {
        return type;
    }
    return type.constructor.name.toLowerCase();
}
