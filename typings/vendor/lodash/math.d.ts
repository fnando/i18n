export const add: (augend: number, addend: number) => number;
export const ceil: (n: number, precision?: number | undefined) => number;
export const divide: (dividend: number, divisor: number) => number;
export const floor: (n: number, precision?: number | undefined) => number;
export const max: <T>(collection: _.List<T> | null | undefined) => T | undefined;
export const maxBy: <T>(collection: _.List<T> | null | undefined, iteratee?: _.ValueIteratee<T> | undefined) => T | undefined;
export const mean: (collection: _.List<any> | null | undefined) => number;
export const meanBy: <T>(collection: _.List<T> | null | undefined, iteratee?: _.ValueIteratee<T> | undefined) => number;
export const min: <T>(collection: _.List<T> | null | undefined) => T | undefined;
export const minBy: <T>(collection: _.List<T> | null | undefined, iteratee?: _.ValueIteratee<T> | undefined) => T | undefined;
export const multiply: (multiplier: number, multiplicand: number) => number;
export const round: (n: number, precision?: number | undefined) => number;
export const subtract: (minuend: number, subtrahend: number) => number;
export const sum: (collection: _.List<any> | null | undefined) => number;
export const sumBy: <T>(collection: _.List<T> | null | undefined, iteratee?: string | ((value: T) => number) | undefined) => number;