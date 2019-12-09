export function toFixed(numeric, precision) {
    return decimalAdjust(numeric, -precision).toFixed(precision);
}
export function decimalAdjust(value, exponent) {
    if (typeof exponent === "undefined" || +exponent === 0) {
        return Math.round(value);
    }
    value = +value;
    exponent = +exponent;
    if (isNaN(value) || !(typeof exponent === "number" && exponent % 1 === 0)) {
        return NaN;
    }
    let parts = value.toString().split("e");
    value = Math.round(+(parts[0] + "e" + (parts[1] ? +parts[1] - exponent : -exponent)));
    parts = value.toString().split("e");
    value = +(parts[0] + "e" + (parts[1] ? +parts[1] + exponent : exponent));
    return value;
}
