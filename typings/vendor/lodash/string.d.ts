export const camelCase: (string?: string | undefined) => string;
export const capitalize: (string?: string | undefined) => string;
export const deburr: (string?: string | undefined) => string;
export const endsWith: (string?: string | undefined, target?: string | undefined, position?: number | undefined) => boolean;
export const escape: (string?: string | undefined) => string;
export const escapeRegExp: (string?: string | undefined) => string;
export const kebabCase: (string?: string | undefined) => string;
export const lowerCase: (string?: string | undefined) => string;
export const lowerFirst: (string?: string | undefined) => string;
export const pad: (string?: string | undefined, length?: number | undefined, chars?: string | undefined) => string;
export const padEnd: (string?: string | undefined, length?: number | undefined, chars?: string | undefined) => string;
export const padStart: (string?: string | undefined, length?: number | undefined, chars?: string | undefined) => string;
export const parseInt: (string: string, radix?: number | undefined) => number;
export const repeat: (string?: string | undefined, n?: number | undefined) => string;
export const replace: {
    (string: string, pattern: string | RegExp, replacement: string | _.ReplaceFunction): string;
    (pattern: string | RegExp, replacement: string | _.ReplaceFunction): string;
};
export const snakeCase: (string?: string | undefined) => string;
export const split: {
    (string: string | null | undefined, separator?: string | RegExp | undefined, limit?: number | undefined): string[];
    (string: string | null | undefined, index: string | number, guard: object): string[];
};
export const startCase: (string?: string | undefined) => string;
export const startsWith: (string?: string | undefined, target?: string | undefined, position?: number | undefined) => boolean;
export const template: (string?: string | undefined, options?: _.TemplateOptions | undefined) => _.TemplateExecutor;
export const templateSettings: Object;
export const toLower: (string?: string | undefined) => string;
export const toUpper: (string?: string | undefined) => string;
export const trim: {
    (string?: string | undefined, chars?: string | undefined): string;
    (string: string, index: string | number, guard: object): string;
};
export const trimEnd: {
    (string?: string | undefined, chars?: string | undefined): string;
    (string: string, index: string | number, guard: object): string;
};
export const trimStart: {
    (string?: string | undefined, chars?: string | undefined): string;
    (string: string, index: string | number, guard: object): string;
};
export const truncate: (string?: string | undefined, options?: _.TruncateOptions | undefined) => string;
export const unescape: (string?: string | undefined) => string;
export const upperCase: (string?: string | undefined) => string;
export const upperFirst: (string?: string | undefined) => string;
export const words: {
    (string?: string | undefined, pattern?: string | RegExp | undefined): string[];
    (string: string, index: string | number, guard: object): string[];
};
