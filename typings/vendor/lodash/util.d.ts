export const attempt: <TResult>(func: (...args: any[]) => TResult, ...args: any[]) => Error | TResult;
export const bindAll: <T>(object: T, ...methodNames: _.Many<string>[]) => T;
export const cond: {
    <R>(pairs: _.CondPairNullary<R>[]): () => R;
    <T, R_1>(pairs: _.CondPairUnary<T, R_1>[]): (Target: T) => R_1;
};
export const conforms: typeof import("./conforms");
export const constant: <T>(value: T) => () => T;
export const defaultTo: {
    <T>(value: T | null | undefined, defaultValue: T): T;
    <T_1, TDefault>(value: T_1 | null | undefined, defaultValue: TDefault): T_1 | TDefault;
};
export const flow: {
    <A extends any[], R1, R2, R3, R4, R5, R6, R7>(f1: (...args: A) => R1, f2: (a: R1) => R2, f3: (a: R2) => R3, f4: (a: R3) => R4, f5: (a: R4) => R5, f6: (a: R5) => R6, f7: (a: R6) => R7): (...args: A) => R7;
    <A_1 extends any[], R1_1, R2_1, R3_1, R4_1, R5_1, R6_1, R7_1>(f1: (...args: A_1) => R1_1, f2: (a: R1_1) => R2_1, f3: (a: R2_1) => R3_1, f4: (a: R3_1) => R4_1, f5: (a: R4_1) => R5_1, f6: (a: R5_1) => R6_1, f7: (a: R6_1) => R7_1, ...func: _.Many<(a: any) => any>[]): (...args: A_1) => any;
    <A_2 extends any[], R1_2, R2_2, R3_2, R4_2, R5_2, R6_2>(f1: (...args: A_2) => R1_2, f2: (a: R1_2) => R2_2, f3: (a: R2_2) => R3_2, f4: (a: R3_2) => R4_2, f5: (a: R4_2) => R5_2, f6: (a: R5_2) => R6_2): (...args: A_2) => R6_2;
    <A_3 extends any[], R1_3, R2_3, R3_3, R4_3, R5_3>(f1: (...args: A_3) => R1_3, f2: (a: R1_3) => R2_3, f3: (a: R2_3) => R3_3, f4: (a: R3_3) => R4_3, f5: (a: R4_3) => R5_3): (...args: A_3) => R5_3;
    <A_4 extends any[], R1_4, R2_4, R3_4, R4_4>(f1: (...args: A_4) => R1_4, f2: (a: R1_4) => R2_4, f3: (a: R2_4) => R3_4, f4: (a: R3_4) => R4_4): (...args: A_4) => R4_4;
    <A_5 extends any[], R1_5, R2_5, R3_5>(f1: (...args: A_5) => R1_5, f2: (a: R1_5) => R2_5, f3: (a: R2_5) => R3_5): (...args: A_5) => R3_5;
    <A_6 extends any[], R1_6, R2_6>(f1: (...args: A_6) => R1_6, f2: (a: R1_6) => R2_6): (...args: A_6) => R2_6;
    (...func: _.Many<(...args: any[]) => any>[]): (...args: any[]) => any;
};
export const flowRight: {
    <A extends any[], R1, R2, R3, R4, R5, R6, R7>(f7: (a: R6) => R7, f6: (a: R5) => R6, f5: (a: R4) => R5, f4: (a: R3) => R4, f3: (a: R2) => R3, f2: (a: R1) => R2, f1: (...args: A) => R1): (...args: A) => R7;
    <A_1 extends any[], R1_1, R2_1, R3_1, R4_1, R5_1, R6_1>(f6: (a: R5_1) => R6_1, f5: (a: R4_1) => R5_1, f4: (a: R3_1) => R4_1, f3: (a: R2_1) => R3_1, f2: (a: R1_1) => R2_1, f1: (...args: A_1) => R1_1): (...args: A_1) => R6_1;
    <A_2 extends any[], R1_2, R2_2, R3_2, R4_2, R5_2>(f5: (a: R4_2) => R5_2, f4: (a: R3_2) => R4_2, f3: (a: R2_2) => R3_2, f2: (a: R1_2) => R2_2, f1: (...args: A_2) => R1_2): (...args: A_2) => R5_2;
    <A_3 extends any[], R1_3, R2_3, R3_3, R4_3>(f4: (a: R3_3) => R4_3, f3: (a: R2_3) => R3_3, f2: (a: R1_3) => R2_3, f1: (...args: A_3) => R1_3): (...args: A_3) => R4_3;
    <A_4 extends any[], R1_4, R2_4, R3_4>(f3: (a: R2_4) => R3_4, f2: (a: R1_4) => R2_4, f1: (...args: A_4) => R1_4): (...args: A_4) => R3_4;
    <A_5 extends any[], R1_5, R2_5>(f2: (a: R1_5) => R2_5, f1: (...args: A_5) => R1_5): (...args: A_5) => R2_5;
    (...func: _.Many<(...args: any[]) => any>[]): (...args: any[]) => any;
};
export const identity: {
    <T>(value: T): T;
    (): undefined;
};
export const iteratee: {
    <TFunction extends (...args: any[]) => any>(func: TFunction): TFunction;
    (func: string | number | symbol | object): (...args: any[]) => any;
};
export const matches: {
    <T>(source: T): (value: any) => boolean;
    <T_1, V>(source: T_1): (value: V) => boolean;
};
export const matchesProperty: {
    <T>(path: _.PropertyPath, srcValue: T): (value: any) => boolean;
    <T_1, V>(path: _.PropertyPath, srcValue: T_1): (value: V) => boolean;
};
export const method: (path: _.PropertyPath, ...args: any[]) => (object: any) => any;
export const methodOf: (object: object, ...args: any[]) => (path: _.PropertyPath) => any;
export const mixin: {
    <TObject>(object: TObject, source: _.Dictionary<(...args: any[]) => any>, options?: _.MixinOptions | undefined): TObject;
    <TResult>(source: _.Dictionary<(...args: any[]) => any>, options?: _.MixinOptions | undefined): _.LoDashStatic;
};
export const noop: (...args: any[]) => void;
export const nthArg: (n?: number | undefined) => (...args: any[]) => any;
export const over: <TResult>(...iteratees: _.Many<(...args: any[]) => TResult>[]) => (...args: any[]) => TResult[];
export const overEvery: {
    <T, Result1 extends T, Result2 extends T>(predicates_0: (arg: T) => arg is Result1, predicates_1: (arg: T) => arg is Result2): (arg: T) => arg is Result1 & Result2;
    <T_1>(...predicates: _.Many<(...args: T_1[]) => boolean>[]): (...args: T_1[]) => boolean;
};
export const overSome: {
    <T, Result1 extends T, Result2 extends T>(predicates_0: (arg: T) => arg is Result1, predicates_1: (arg: T) => arg is Result2): (arg: T) => arg is Result1 | Result2;
    <T_1>(...predicates: _.Many<(...args: T_1[]) => boolean>[]): (...args: T_1[]) => boolean;
};
export const property: <TObj, TResult>(path: _.PropertyPath) => (obj: TObj) => TResult;
export const propertyOf: <T extends {}>(object: T) => (path: _.PropertyPath) => any;
export const range: {
    (start: number, end?: number | undefined, step?: number | undefined): number[];
    (end: number, index: string | number, guard: object): number[];
};
export const rangeRight: {
    (start: number, end?: number | undefined, step?: number | undefined): number[];
    (end: number, index: string | number, guard: object): number[];
};
export const stubArray: typeof import("./stubArray");
export const stubFalse: {
    (): false;
    (): false;
};
export const stubObject: typeof import("./stubObject");
export const stubString: typeof import("./stubString");
export const stubTrue: {
    (): true;
    (): true;
};
export const times: {
    <TResult>(n: number, iteratee: (num: number) => TResult): TResult[];
    (n: number): number[];
};
export const toPath: (value: any) => string[];
export const uniqueId: (prefix?: string | undefined) => string;
