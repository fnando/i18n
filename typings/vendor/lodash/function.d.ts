export const after: <TFunc extends (...args: any[]) => any>(n: number, func: TFunc) => TFunc;
export const ary: (func: (...args: any[]) => any, n?: number | undefined) => (...args: any[]) => any;
export const before: <TFunc extends (...args: any[]) => any>(n: number, func: TFunc) => TFunc;
export const bind: _.FunctionBind;
export const bindKey: _.FunctionBindKey;
export const curry: _.Curry;
export const curryRight: _.CurryRight;
export const debounce: {
    <T extends (...args: any) => any>(func: T, wait: number | undefined, options: _.DebounceSettingsLeading): _.DebouncedFuncLeading<T>;
    <T_1 extends (...args: any) => any>(func: T_1, wait?: number | undefined, options?: _.DebounceSettings | undefined): _.DebouncedFunc<T_1>;
};
export const defer: (func: (...args: any[]) => any, ...args: any[]) => number;
export const delay: (func: (...args: any[]) => any, wait: number, ...args: any[]) => number;
export const flip: <T extends (...args: any) => any>(func: T) => T;
export const memoize: {
    <T extends (...args: any) => any>(func: T, resolver?: ((...args: Parameters<T>) => any) | undefined): T & _.MemoizedFunction;
    Cache: _.MapCacheConstructor;
};
export const negate: <T extends any[]>(predicate: (...args: T) => boolean) => (...args: T) => boolean;
export const once: <T extends (...args: any) => any>(func: T) => T;
export const overArgs: (func: (...args: any[]) => any, ...transforms: _.Many<(...args: any[]) => any>[]) => (...args: any[]) => any;
export const partial: _.Partial;
export const partialRight: _.PartialRight;
export const rearg: (func: (...args: any[]) => any, ...indexes: _.Many<number>[]) => (...args: any[]) => any;
export const rest: (func: (...args: any[]) => any, start?: number | undefined) => (...args: any[]) => any;
export const spread: <TResult>(func: (...args: any[]) => TResult, start?: number | undefined) => (...args: any[]) => TResult;
export const throttle: <T extends (...args: any) => any>(func: T, wait?: number | undefined, options?: _.ThrottleSettings | undefined) => _.DebouncedFunc<T>;
export const unary: <T, TResult>(func: (arg1: T, ...args: any[]) => TResult) => (arg1: T) => TResult;
export const wrap: <T, TArgs, TResult>(value: T, wrapper: (value: T, ...args: TArgs[]) => TResult) => (...args: TArgs[]) => TResult;
