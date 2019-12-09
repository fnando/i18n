import { toFixed } from ".";
export function toNumber(numeric, options) {
    const negative = numeric < 0;
    const parts = toFixed(Math.abs(numeric), options.precision)
        .toString()
        .split(".");
    let [numericStr, precision] = parts;
    const buffer = [];
    let formattedNumber;
    let format = options.format || "%n";
    const sign = negative ? "-" : "";
    while (numericStr.length > 0) {
        buffer.unshift(numericStr.substr(Math.max(0, numericStr.length - 3), 3));
        numericStr = numericStr.substr(0, numericStr.length - 3);
    }
    formattedNumber = buffer.join(options.delimiter);
    if (options.strip_insignificant_zeros && precision) {
        precision = precision.replace(/0+$/, "");
    }
    if (options.precision > 0 && precision) {
        formattedNumber += options.separator + precision;
    }
    if (options.sign_first) {
        format = "%s" + format;
    }
    else {
        format = format.replace("%n", "%s%n");
    }
    formattedNumber = format
        .replace("%u", options.unit)
        .replace("%n", formattedNumber)
        .replace("%s", sign);
    return formattedNumber;
}
