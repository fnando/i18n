export const castArray: <T>(value?: _.Many<T> | undefined) => T[];
export const clone: <T>(value: T) => T;
export const cloneDeep: <T>(value: T) => T;
export const cloneDeepWith: {
    <T>(value: T, customizer: _.CloneDeepWithCustomizer<T>): any;
    <T_1>(value: T_1): T_1;
};
export const cloneWith: {
    <T, TResult extends string | number | boolean | object | null>(value: T, customizer: _.CloneWithCustomizer<T, TResult>): TResult;
    <T_1, TResult_1>(value: T_1, customizer: _.CloneWithCustomizer<T_1, TResult_1 | undefined>): T_1 | TResult_1;
    <T_2>(value: T_2): T_2;
};
export const conformsTo: <T>(object: T, source: _.ConformsPredicateObject<T>) => boolean;
export const eq: (value: any, other: any) => boolean;
export const gt: (value: any, other: any) => boolean;
export const gte: (value: any, other: any) => boolean;
export const isArguments: (value?: any) => value is IArguments;
export const isArray: {
    (value?: any): value is any[];
    <T>(value?: any): value is any[];
};
export const isArrayBuffer: (value?: any) => value is ArrayBuffer;
export const isArrayLike: {
    <T extends {
        __lodashAnyHack: any;
    }>(t: T): boolean;
    (value: ((...args: any[]) => any) | null | undefined): value is never;
    (value: any): value is {
        length: number;
    };
};
export const isArrayLikeObject: {
    <T extends {
        __lodashAnyHack: any;
    }>(value: T): boolean;
    (value: string | number | boolean | Function | ((...args: any[]) => any) | null | undefined): value is never;
    (value: any): value is object & {
        length: number;
    };
};
export const isBoolean: (value?: any) => value is boolean;
export const isBuffer: (value?: any) => boolean;
export const isDate: (value?: any) => value is Date;
export const isElement: (value?: any) => boolean;
export const isEmpty: {
    <T extends {
        __trapAny: any;
    }>(value?: T | undefined): boolean;
    (value: string): value is "";
    (value: _.List<any> | Set<any> | Map<any, any> | null | undefined): boolean;
    (value: object): boolean;
    <T_1 extends object>(value: T_1 | null | undefined): value is _.EmptyObjectOf<T_1> | null | undefined;
    (value?: any): boolean;
};
export const isEqual: (value: any, other: any) => boolean;
export const isEqualWith: (value: any, other: any, customizer?: _.IsEqualCustomizer | undefined) => boolean;
export const isError: (value: any) => value is Error;
export const isFinite: (value?: any) => boolean;
export const isFunction: (value: any) => value is (...args: any[]) => any;
export const isInteger: (value?: any) => boolean;
export const isLength: (value?: any) => boolean;
export const isMap: (value?: any) => value is Map<any, any>;
export const isMatch: (object: object, source: object) => boolean;
export const isMatchWith: (object: object, source: object, customizer: _.isMatchWithCustomizer) => boolean;
export const isNaN: (value?: any) => boolean;
export const isNative: (value: any) => value is (...args: any[]) => any;
export const isNil: (value: any) => value is null | undefined;
export const isNull: (value: any) => value is null;
export const isNumber: (value?: any) => value is number;
export const isObject: (value?: any) => value is object;
export const isObjectLike: (value?: any) => boolean;
export const isPlainObject: (value?: any) => boolean;
export const isRegExp: (value?: any) => value is RegExp;
export const isSafeInteger: (value: any) => boolean;
export const isSet: (value?: any) => value is Set<any>;
export const isString: (value?: any) => value is string;
export const isSymbol: (value: any) => value is symbol;
export const isTypedArray: (value: any) => boolean;
export const isUndefined: (value: any) => value is undefined;
export const isWeakMap: (value?: any) => value is WeakMap<object, any>;
export const isWeakSet: (value?: any) => value is WeakSet<object>;
export const lt: (value: any, other: any) => boolean;
export const lte: (value: any, other: any) => boolean;
export const toArray: {
    <T>(value: _.Dictionary<T> | _.NumericDictionary<T> | null | undefined): T[];
    <T_1>(value: T_1): T_1[keyof T_1][];
    (): any[];
};
export const toFinite: (value: any) => number;
export const toInteger: (value: any) => number;
export const toLength: (value: any) => number;
export const toNumber: (value: any) => number;
export const toPlainObject: (value?: any) => any;
export const toSafeInteger: (value: any) => number;
export const toString: (value: any) => string;
