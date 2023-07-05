export const ary: (func: (...args: any[]) => any, n?: number | undefined) => (...args: any[]) => any;
export const assign: typeof import("../_baseAssign");
export const clone: <T>(value: T) => T;
export const curry: _.Curry;
export const forEach: typeof import("../_arrayEach");
export const isArray: {
    (value?: any): value is any[];
    <T>(value?: any): value is any[];
};
export const isError: (value: any) => value is Error;
export const isFunction: (value: any) => value is (...args: any[]) => any;
export const isWeakMap: (value?: any) => value is WeakMap<object, any>;
export const iteratee: {
    <TFunction extends (...args: any[]) => any>(func: TFunction): TFunction;
    (func: string | number | symbol | object): (...args: any[]) => any;
};
export const keys: typeof import("../_baseKeys");
export const rearg: (func: (...args: any[]) => any, ...indexes: _.Many<number>[]) => (...args: any[]) => any;
export const toInteger: (value: any) => number;
export const toPath: (value: any) => string[];
