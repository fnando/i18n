export const assign: {
    <TObject, TSource>(object: TObject, source: TSource): TObject & TSource;
    <TObject_1, TSource1, TSource2>(object: TObject_1, source1: TSource1, source2: TSource2): TObject_1 & TSource1 & TSource2;
    <TObject_2, TSource1_1, TSource2_1, TSource3>(object: TObject_2, source1: TSource1_1, source2: TSource2_1, source3: TSource3): TObject_2 & TSource1_1 & TSource2_1 & TSource3;
    <TObject_3, TSource1_2, TSource2_2, TSource3_1, TSource4>(object: TObject_3, source1: TSource1_2, source2: TSource2_2, source3: TSource3_1, source4: TSource4): TObject_3 & TSource1_2 & TSource2_2 & TSource3_1 & TSource4;
    <TObject_4>(object: TObject_4): TObject_4;
    (object: any, ...otherArgs: any[]): any;
};
export const assignIn: {
    <TObject, TSource>(object: TObject, source: TSource): TObject & TSource;
    <TObject_1, TSource1, TSource2>(object: TObject_1, source1: TSource1, source2: TSource2): TObject_1 & TSource1 & TSource2;
    <TObject_2, TSource1_1, TSource2_1, TSource3>(object: TObject_2, source1: TSource1_1, source2: TSource2_1, source3: TSource3): TObject_2 & TSource1_1 & TSource2_1 & TSource3;
    <TObject_3, TSource1_2, TSource2_2, TSource3_1, TSource4>(object: TObject_3, source1: TSource1_2, source2: TSource2_2, source3: TSource3_1, source4: TSource4): TObject_3 & TSource1_2 & TSource2_2 & TSource3_1 & TSource4;
    <TObject_4>(object: TObject_4): TObject_4;
    <TResult>(object: any, ...otherArgs: any[]): TResult;
};
export const assignInWith: {
    <TObject, TSource>(object: TObject, source: TSource, customizer: _.AssignCustomizer): TObject & TSource;
    <TObject_1, TSource1, TSource2>(object: TObject_1, source1: TSource1, source2: TSource2, customizer: _.AssignCustomizer): TObject_1 & TSource1 & TSource2;
    <TObject_2, TSource1_1, TSource2_1, TSource3>(object: TObject_2, source1: TSource1_1, source2: TSource2_1, source3: TSource3, customizer: _.AssignCustomizer): TObject_2 & TSource1_1 & TSource2_1 & TSource3;
    <TObject_3, TSource1_2, TSource2_2, TSource3_1, TSource4>(object: TObject_3, source1: TSource1_2, source2: TSource2_2, source3: TSource3_1, source4: TSource4, customizer: _.AssignCustomizer): TObject_3 & TSource1_2 & TSource2_2 & TSource3_1 & TSource4;
    <TObject_4>(object: TObject_4): TObject_4;
    <TResult>(object: any, ...otherArgs: any[]): TResult;
};
export const assignWith: {
    <TObject, TSource>(object: TObject, source: TSource, customizer: _.AssignCustomizer): TObject & TSource;
    <TObject_1, TSource1, TSource2>(object: TObject_1, source1: TSource1, source2: TSource2, customizer: _.AssignCustomizer): TObject_1 & TSource1 & TSource2;
    <TObject_2, TSource1_1, TSource2_1, TSource3>(object: TObject_2, source1: TSource1_1, source2: TSource2_1, source3: TSource3, customizer: _.AssignCustomizer): TObject_2 & TSource1_1 & TSource2_1 & TSource3;
    <TObject_3, TSource1_2, TSource2_2, TSource3_1, TSource4>(object: TObject_3, source1: TSource1_2, source2: TSource2_2, source3: TSource3_1, source4: TSource4, customizer: _.AssignCustomizer): TObject_3 & TSource1_2 & TSource2_2 & TSource3_1 & TSource4;
    <TObject_4>(object: TObject_4): TObject_4;
    <TResult>(object: any, ...otherArgs: any[]): TResult;
};
export const at: {
    <T>(object: _.Dictionary<T> | _.NumericDictionary<T> | null | undefined, ...props: _.PropertyPath[]): T[];
    <T_1 extends object>(object: T_1 | null | undefined, ...props: _.Many<keyof T_1>[]): T_1[keyof T_1][];
};
export const create: <T extends object, U extends object>(prototype: T, properties?: U | undefined) => T & U;
export const defaults: {
    <TObject, TSource>(object: TObject, source: TSource): NonNullable<TSource & TObject>;
    <TObject_1, TSource1, TSource2>(object: TObject_1, source1: TSource1, source2: TSource2): NonNullable<TSource2 & TSource1 & TObject_1>;
    <TObject_2, TSource1_1, TSource2_1, TSource3>(object: TObject_2, source1: TSource1_1, source2: TSource2_1, source3: TSource3): NonNullable<TSource3 & TSource2_1 & TSource1_1 & TObject_2>;
    <TObject_3, TSource1_2, TSource2_2, TSource3_1, TSource4>(object: TObject_3, source1: TSource1_2, source2: TSource2_2, source3: TSource3_1, source4: TSource4): NonNullable<TSource4 & TSource3_1 & TSource2_2 & TSource1_2 & TObject_3>;
    <TObject_4>(object: TObject_4): NonNullable<TObject_4>;
    (object: any, ...sources: any[]): any;
};
export const defaultsDeep: (object: any, ...sources: any[]) => any;
export const entries: {
    <T>(object?: _.Dictionary<T> | _.NumericDictionary<T> | undefined): [string, T][];
    (object?: object | undefined): [string, any][];
};
export const entriesIn: {
    <T>(object?: _.Dictionary<T> | _.NumericDictionary<T> | undefined): [string, T][];
    (object?: object | undefined): [string, any][];
};
export const extend: {
    <TObject, TSource>(object: TObject, source: TSource): TObject & TSource;
    <TObject_1, TSource1, TSource2>(object: TObject_1, source1: TSource1, source2: TSource2): TObject_1 & TSource1 & TSource2;
    <TObject_2, TSource1_1, TSource2_1, TSource3>(object: TObject_2, source1: TSource1_1, source2: TSource2_1, source3: TSource3): TObject_2 & TSource1_1 & TSource2_1 & TSource3;
    <TObject_3, TSource1_2, TSource2_2, TSource3_1, TSource4>(object: TObject_3, source1: TSource1_2, source2: TSource2_2, source3: TSource3_1, source4: TSource4): TObject_3 & TSource1_2 & TSource2_2 & TSource3_1 & TSource4;
    <TObject_4>(object: TObject_4): TObject_4;
    <TResult>(object: any, ...otherArgs: any[]): TResult;
};
export const extendWith: {
    <TObject, TSource>(object: TObject, source: TSource, customizer: _.AssignCustomizer): TObject & TSource;
    <TObject_1, TSource1, TSource2>(object: TObject_1, source1: TSource1, source2: TSource2, customizer: _.AssignCustomizer): TObject_1 & TSource1 & TSource2;
    <TObject_2, TSource1_1, TSource2_1, TSource3>(object: TObject_2, source1: TSource1_1, source2: TSource2_1, source3: TSource3, customizer: _.AssignCustomizer): TObject_2 & TSource1_1 & TSource2_1 & TSource3;
    <TObject_3, TSource1_2, TSource2_2, TSource3_1, TSource4>(object: TObject_3, source1: TSource1_2, source2: TSource2_2, source3: TSource3_1, source4: TSource4, customizer: _.AssignCustomizer): TObject_3 & TSource1_2 & TSource2_2 & TSource3_1 & TSource4;
    <TObject_4>(object: TObject_4): TObject_4;
    <TResult>(object: any, ...otherArgs: any[]): TResult;
};
export const findKey: <T>(object: T | null | undefined, predicate?: _.ObjectIteratee<T> | undefined) => string | undefined;
export const findLastKey: <T>(object: T | null | undefined, predicate?: _.ObjectIteratee<T> | undefined) => string | undefined;
export const forIn: {
    <T>(object: T, iteratee?: _.ObjectIterator<T, any> | undefined): T;
    <T_1>(object: T_1 | null | undefined, iteratee?: _.ObjectIterator<T_1, any> | undefined): T_1 | null | undefined;
};
export const forInRight: {
    <T>(object: T, iteratee?: _.ObjectIterator<T, any> | undefined): T;
    <T_1>(object: T_1 | null | undefined, iteratee?: _.ObjectIterator<T_1, any> | undefined): T_1 | null | undefined;
};
export const forOwn: {
    <T>(object: T, iteratee?: _.ObjectIterator<T, any> | undefined): T;
    <T_1>(object: T_1 | null | undefined, iteratee?: _.ObjectIterator<T_1, any> | undefined): T_1 | null | undefined;
};
export const forOwnRight: {
    <T>(object: T, iteratee?: _.ObjectIterator<T, any> | undefined): T;
    <T_1>(object: T_1 | null | undefined, iteratee?: _.ObjectIterator<T_1, any> | undefined): T_1 | null | undefined;
};
export const functions: (object: any) => string[];
export const functionsIn: <T extends {}>(object: any) => string[];
export const get: {
    <TObject extends object, TKey extends keyof TObject>(object: TObject, path: TKey | [TKey]): TObject[TKey];
    <TObject_1 extends object, TKey_1 extends keyof TObject_1>(object: TObject_1 | null | undefined, path: TKey_1 | [TKey_1]): TObject_1[TKey_1] | undefined;
    <TObject_2 extends object, TKey_2 extends keyof TObject_2, TDefault>(object: TObject_2 | null | undefined, path: TKey_2 | [TKey_2], defaultValue: TDefault): TDefault | Exclude<TObject_2[TKey_2], undefined>;
    <TObject_3 extends object, TKey1 extends keyof TObject_3, TKey2 extends keyof TObject_3[TKey1]>(object: TObject_3, path: [TKey1, TKey2]): TObject_3[TKey1][TKey2];
    <TObject_4 extends object, TKey1_1 extends keyof TObject_4, TKey2_1 extends keyof TObject_4[TKey1_1]>(object: TObject_4 | null | undefined, path: [TKey1_1, TKey2_1]): TObject_4[TKey1_1][TKey2_1] | undefined;
    <TObject_5 extends object, TKey1_2 extends keyof TObject_5, TKey2_2 extends keyof TObject_5[TKey1_2], TDefault_1>(object: TObject_5 | null | undefined, path: [TKey1_2, TKey2_2], defaultValue: TDefault_1): TDefault_1 | Exclude<TObject_5[TKey1_2][TKey2_2], undefined>;
    <TObject_6 extends object, TKey1_3 extends keyof TObject_6, TKey2_3 extends keyof TObject_6[TKey1_3], TKey3 extends keyof TObject_6[TKey1_3][TKey2_3]>(object: TObject_6, path: [TKey1_3, TKey2_3, TKey3]): TObject_6[TKey1_3][TKey2_3][TKey3];
    <TObject_7 extends object, TKey1_4 extends keyof TObject_7, TKey2_4 extends keyof TObject_7[TKey1_4], TKey3_1 extends keyof TObject_7[TKey1_4][TKey2_4]>(object: TObject_7 | null | undefined, path: [TKey1_4, TKey2_4, TKey3_1]): TObject_7[TKey1_4][TKey2_4][TKey3_1] | undefined;
    <TObject_8 extends object, TKey1_5 extends keyof TObject_8, TKey2_5 extends keyof TObject_8[TKey1_5], TKey3_2 extends keyof TObject_8[TKey1_5][TKey2_5], TDefault_2>(object: TObject_8 | null | undefined, path: [TKey1_5, TKey2_5, TKey3_2], defaultValue: TDefault_2): TDefault_2 | Exclude<TObject_8[TKey1_5][TKey2_5][TKey3_2], undefined>;
    <TObject_9 extends object, TKey1_6 extends keyof TObject_9, TKey2_6 extends keyof TObject_9[TKey1_6], TKey3_3 extends keyof TObject_9[TKey1_6][TKey2_6], TKey4 extends keyof TObject_9[TKey1_6][TKey2_6][TKey3_3]>(object: TObject_9, path: [TKey1_6, TKey2_6, TKey3_3, TKey4]): TObject_9[TKey1_6][TKey2_6][TKey3_3][TKey4];
    <TObject_10 extends object, TKey1_7 extends keyof TObject_10, TKey2_7 extends keyof TObject_10[TKey1_7], TKey3_4 extends keyof TObject_10[TKey1_7][TKey2_7], TKey4_1 extends keyof TObject_10[TKey1_7][TKey2_7][TKey3_4]>(object: TObject_10 | null | undefined, path: [TKey1_7, TKey2_7, TKey3_4, TKey4_1]): TObject_10[TKey1_7][TKey2_7][TKey3_4][TKey4_1] | undefined;
    <TObject_11 extends object, TKey1_8 extends keyof TObject_11, TKey2_8 extends keyof TObject_11[TKey1_8], TKey3_5 extends keyof TObject_11[TKey1_8][TKey2_8], TKey4_2 extends keyof TObject_11[TKey1_8][TKey2_8][TKey3_5], TDefault_3>(object: TObject_11 | null | undefined, path: [TKey1_8, TKey2_8, TKey3_5, TKey4_2], defaultValue: TDefault_3): TDefault_3 | Exclude<TObject_11[TKey1_8][TKey2_8][TKey3_5][TKey4_2], undefined>;
    <T>(object: _.NumericDictionary<T>, path: number): T;
    <T_1>(object: _.NumericDictionary<T_1> | null | undefined, path: number): T_1 | undefined;
    <T_2, TDefault_4>(object: _.NumericDictionary<T_2> | null | undefined, path: number, defaultValue: TDefault_4): T_2 | TDefault_4;
    <TDefault_5>(object: null | undefined, path: _.PropertyPath, defaultValue: TDefault_5): TDefault_5;
    (object: null | undefined, path: _.PropertyPath): undefined;
    <TObject_12, TPath extends string>(data: TObject_12, path: TPath): string extends TPath ? any : _.GetFieldType<TObject_12, TPath>;
    <TObject_13, TPath_1 extends string, TDefault_6 = _.GetFieldType<TObject_13, TPath_1>>(data: TObject_13, path: TPath_1, defaultValue: TDefault_6): TDefault_6 | Exclude<_.GetFieldType<TObject_13, TPath_1>, null | undefined>;
    (object: any, path: _.PropertyPath, defaultValue?: any): any;
};
export const has: <T>(object: T, path: _.PropertyPath) => boolean;
export const hasIn: <T>(object: T, path: _.PropertyPath) => boolean;
export const invert: (object: object) => _.Dictionary<string>;
export const invertBy: {
    <T>(object: _.Dictionary<T> | _.NumericDictionary<T> | null | undefined, interatee?: _.ValueIteratee<T> | undefined): _.Dictionary<string[]>;
    <T_1 extends object>(object: T_1 | null | undefined, interatee?: _.ValueIteratee<T_1[keyof T_1]> | undefined): _.Dictionary<string[]>;
};
export const invoke: (object: any, path: _.PropertyPath, ...args: any[]) => any;
export const keys: (object?: any) => string[];
export const keysIn: (object?: any) => string[];
export const mapKeys: {
    <T>(object: _.List<T> | null | undefined, iteratee?: _.ListIteratee<T> | undefined): _.Dictionary<T>;
    <T_1 extends object>(object: T_1 | null | undefined, iteratee?: _.ObjectIteratee<T_1> | undefined): _.Dictionary<T_1[keyof T_1]>;
};
export const mapValues: {
    <TResult>(obj: string | null | undefined, callback: _.StringIterator<TResult>): _.NumericDictionary<TResult>;
    <T extends object, TResult_1>(obj: T | null | undefined, callback: _.ObjectIterator<T, TResult_1>): { [P in keyof T]: TResult_1; };
    <T_1>(obj: _.Dictionary<T_1> | _.NumericDictionary<T_1> | null | undefined, iteratee: object): _.Dictionary<boolean>;
    <T_2 extends object>(obj: T_2 | null | undefined, iteratee: object): { [P_1 in keyof T_2]: boolean; };
    <T_3, TKey extends keyof T_3>(obj: _.Dictionary<T_3> | _.NumericDictionary<T_3> | null | undefined, iteratee: TKey): _.Dictionary<T_3[TKey]>;
    <T_4>(obj: _.Dictionary<T_4> | _.NumericDictionary<T_4> | null | undefined, iteratee: string): _.Dictionary<any>;
    <T_5 extends object>(obj: T_5 | null | undefined, iteratee: string): { [P_2 in keyof T_5]: any; };
    (obj: string | null | undefined): _.NumericDictionary<string>;
    <T_6>(obj: _.Dictionary<T_6> | _.NumericDictionary<T_6> | null | undefined): _.Dictionary<T_6>;
    <T_7 extends object>(obj: T_7): T_7;
    <T_8 extends object>(obj: T_8 | null | undefined): Partial<T_8>;
};
export const merge: {
    <TObject, TSource>(object: TObject, source: TSource): TObject & TSource;
    <TObject_1, TSource1, TSource2>(object: TObject_1, source1: TSource1, source2: TSource2): TObject_1 & TSource1 & TSource2;
    <TObject_2, TSource1_1, TSource2_1, TSource3>(object: TObject_2, source1: TSource1_1, source2: TSource2_1, source3: TSource3): TObject_2 & TSource1_1 & TSource2_1 & TSource3;
    <TObject_3, TSource1_2, TSource2_2, TSource3_1, TSource4>(object: TObject_3, source1: TSource1_2, source2: TSource2_2, source3: TSource3_1, source4: TSource4): TObject_3 & TSource1_2 & TSource2_2 & TSource3_1 & TSource4;
    (object: any, ...otherArgs: any[]): any;
};
export const mergeWith: {
    <TObject, TSource>(object: TObject, source: TSource, customizer: (value: any, srcValue: any, key: string, object: any, source: any) => any): TObject & TSource;
    <TObject_1, TSource1, TSource2>(object: TObject_1, source1: TSource1, source2: TSource2, customizer: (value: any, srcValue: any, key: string, object: any, source: any) => any): TObject_1 & TSource1 & TSource2;
    <TObject_2, TSource1_1, TSource2_1, TSource3>(object: TObject_2, source1: TSource1_1, source2: TSource2_1, source3: TSource3, customizer: (value: any, srcValue: any, key: string, object: any, source: any) => any): TObject_2 & TSource1_1 & TSource2_1 & TSource3;
    <TObject_3, TSource1_2, TSource2_2, TSource3_1, TSource4>(object: TObject_3, source1: TSource1_2, source2: TSource2_2, source3: TSource3_1, source4: TSource4, customizer: (value: any, srcValue: any, key: string, object: any, source: any) => any): TObject_3 & TSource1_2 & TSource2_2 & TSource3_1 & TSource4;
    (object: any, ...otherArgs: any[]): any;
};
export const omit: {
    <T extends object, K extends _.PropertyName[]>(object: T | null | undefined, ...paths: K): Pick<T, Exclude<keyof T, K[number]>>;
    <T_1 extends object, K_1 extends keyof T_1>(object: T_1 | null | undefined, ...paths: _.Many<K_1>[]): _.Omit<T_1, K_1>;
    <T_2 extends object>(object: T_2 | null | undefined, ...paths: _.Many<_.PropertyName>[]): Partial<T_2>;
};
export const omitBy: {
    <T>(object: _.Dictionary<T> | null | undefined, predicate?: _.ValueKeyIteratee<T> | undefined): _.Dictionary<T>;
    <T_1>(object: _.NumericDictionary<T_1> | null | undefined, predicate?: _.ValueKeyIteratee<T_1> | undefined): _.NumericDictionary<T_1>;
    <T_2 extends object>(object: T_2 | null | undefined, predicate: _.ValueKeyIteratee<T_2[keyof T_2]>): Partial<T_2>;
};
export const pick: {
    <T extends object, U extends keyof T>(object: T, ...props: _.Many<U>[]): Pick<T, U>;
    <T_1>(object: T_1 | null | undefined, ...props: _.Many<_.PropertyPath>[]): Partial<T_1>;
};
export const pickBy: {
    <T, S extends T>(object: _.Dictionary<T> | null | undefined, predicate: _.ValueKeyIterateeTypeGuard<T, S>): _.Dictionary<S>;
    <T_1, S_1 extends T_1>(object: _.NumericDictionary<T_1> | null | undefined, predicate: _.ValueKeyIterateeTypeGuard<T_1, S_1>): _.NumericDictionary<S_1>;
    <T_2>(object: _.Dictionary<T_2> | null | undefined, predicate?: _.ValueKeyIteratee<T_2> | undefined): _.Dictionary<T_2>;
    <T_3>(object: _.NumericDictionary<T_3> | null | undefined, predicate?: _.ValueKeyIteratee<T_3> | undefined): _.NumericDictionary<T_3>;
    <T_4 extends object>(object: T_4 | null | undefined, predicate?: _.ValueKeyIteratee<T_4[keyof T_4]> | undefined): Partial<T_4>;
};
export const result: <TResult>(object: any, path: _.PropertyPath, defaultValue?: TResult | ((...args: any[]) => TResult) | undefined) => TResult;
export const set: {
    <T extends object>(object: T, path: _.PropertyPath, value: any): T;
    <TResult>(object: object, path: _.PropertyPath, value: any): TResult;
};
export const setWith: {
    <T extends object>(object: T, path: _.PropertyPath, value: any, customizer?: _.SetWithCustomizer<T> | undefined): T;
    <T_1 extends object, TResult>(object: T_1, path: _.PropertyPath, value: any, customizer?: _.SetWithCustomizer<T_1> | undefined): TResult;
};
export const toPairs: {
    <T>(object?: _.Dictionary<T> | _.NumericDictionary<T> | undefined): [string, T][];
    (object?: object | undefined): [string, any][];
};
export const toPairsIn: {
    <T>(object?: _.Dictionary<T> | _.NumericDictionary<T> | undefined): [string, T][];
    (object?: object | undefined): [string, any][];
};
export const transform: {
    <T, TResult>(object: readonly T[], iteratee: _.MemoVoidArrayIterator<T, TResult>, accumulator?: TResult | undefined): TResult;
    <T_1, TResult_1>(object: _.Dictionary<T_1>, iteratee: _.MemoVoidDictionaryIterator<T_1, string, TResult_1>, accumulator?: TResult_1 | undefined): TResult_1;
    <T_2 extends object, TResult_2>(object: T_2, iteratee: _.MemoVoidDictionaryIterator<T_2[keyof T_2], keyof T_2, TResult_2>, accumulator?: TResult_2 | undefined): TResult_2;
    (object: any[]): any[];
    (object: object): _.Dictionary<any>;
};
export const unset: (object: any, path: _.PropertyPath) => boolean;
export const update: (object: object, path: _.PropertyPath, updater: (value: any) => any) => any;
export const updateWith: {
    <T extends object>(object: T, path: _.PropertyPath, updater: (oldValue: any) => any, customizer?: _.SetWithCustomizer<T> | undefined): T;
    <T_1 extends object, TResult>(object: T_1, path: _.PropertyPath, updater: (oldValue: any) => any, customizer?: _.SetWithCustomizer<T_1> | undefined): TResult;
};
export const values: {
    <T>(object: _.Dictionary<T> | _.NumericDictionary<T> | _.List<T> | null | undefined): T[];
    <T_1 extends object>(object: T_1 | null | undefined): T_1[keyof T_1][];
    (object: any): any[];
};
export const valuesIn: {
    <T>(object: _.Dictionary<T> | _.NumericDictionary<T> | _.List<T> | null | undefined): T[];
    <T_1 extends object>(object: T_1 | null | undefined): T_1[keyof T_1][];
};
