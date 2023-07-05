export const countBy: {
    <T>(collection: _.List<T> | null | undefined, iteratee?: _.ValueIteratee<T> | undefined): _.Dictionary<number>;
    <T_1 extends object>(collection: T_1 | null | undefined, iteratee?: _.ValueIteratee<T_1[keyof T_1]> | undefined): _.Dictionary<number>;
};
export const each: {
    <T>(collection: T[], iteratee?: _.ArrayIterator<T, any> | undefined): T[];
    (collection: string, iteratee?: _.StringIterator<any> | undefined): string;
    <T_1>(collection: _.List<T_1>, iteratee?: _.ListIterator<T_1, any> | undefined): _.List<T_1>;
    <T_2 extends object>(collection: T_2, iteratee?: _.ObjectIterator<T_2, any> | undefined): T_2;
    <T_3, TArray extends T_3[] | null | undefined>(collection: TArray & (T_3[] | null | undefined), iteratee?: _.ArrayIterator<T_3, any> | undefined): TArray;
    <TString extends string | null | undefined>(collection: TString, iteratee?: _.StringIterator<any> | undefined): TString;
    <T_4, TList extends _.List<T_4> | null | undefined>(collection: TList & (_.List<T_4> | null | undefined), iteratee?: _.ListIterator<T_4, any> | undefined): TList;
    <T_5 extends object>(collection: T_5 | null | undefined, iteratee?: _.ObjectIterator<T_5, any> | undefined): T_5 | null | undefined;
};
export const eachRight: {
    <T>(collection: T[], iteratee?: _.ArrayIterator<T, any> | undefined): T[];
    (collection: string, iteratee?: _.StringIterator<any> | undefined): string;
    <T_1>(collection: _.List<T_1>, iteratee?: _.ListIterator<T_1, any> | undefined): _.List<T_1>;
    <T_2 extends object>(collection: T_2, iteratee?: _.ObjectIterator<T_2, any> | undefined): T_2;
    <T_3, TArray extends T_3[] | null | undefined>(collection: TArray & (T_3[] | null | undefined), iteratee?: _.ArrayIterator<T_3, any> | undefined): TArray;
    <TString extends string | null | undefined>(collection: TString, iteratee?: _.StringIterator<any> | undefined): TString;
    <T_4, TList extends _.List<T_4> | null | undefined>(collection: TList & (_.List<T_4> | null | undefined), iteratee?: _.ListIterator<T_4, any> | undefined): TList;
    <T_5 extends object>(collection: T_5 | null | undefined, iteratee?: _.ObjectIterator<T_5, any> | undefined): T_5 | null | undefined;
};
export const every: {
    <T>(collection: _.List<T> | null | undefined, predicate?: _.ListIterateeCustom<T, boolean> | undefined): boolean;
    <T_1 extends object>(collection: T_1 | null | undefined, predicate?: _.ObjectIterateeCustom<T_1, boolean> | undefined): boolean;
};
export const filter: {
    (collection: string | null | undefined, predicate?: _.StringIterator<boolean> | undefined): string[];
    <T, S extends T>(collection: _.List<T> | null | undefined, predicate: _.ListIteratorTypeGuard<T, S>): S[];
    <T_1>(collection: _.List<T_1> | null | undefined, predicate?: _.ListIterateeCustom<T_1, boolean> | undefined): T_1[];
    <T_2 extends object, S_1 extends T_2[keyof T_2]>(collection: T_2 | null | undefined, predicate: _.ObjectIteratorTypeGuard<T_2, S_1>): S_1[];
    <T_3 extends object>(collection: T_3 | null | undefined, predicate?: _.ObjectIterateeCustom<T_3, boolean> | undefined): T_3[keyof T_3][];
};
export const find: {
    <T, S extends T>(collection: _.List<T> | null | undefined, predicate: _.ListIteratorTypeGuard<T, S>, fromIndex?: number | undefined): S | undefined;
    <T_1>(collection: _.List<T_1> | null | undefined, predicate?: _.ListIterateeCustom<T_1, boolean> | undefined, fromIndex?: number | undefined): T_1 | undefined;
    <T_2 extends object, S_1 extends T_2[keyof T_2]>(collection: T_2 | null | undefined, predicate: _.ObjectIteratorTypeGuard<T_2, S_1>, fromIndex?: number | undefined): S_1 | undefined;
    <T_3 extends object>(collection: T_3 | null | undefined, predicate?: _.ObjectIterateeCustom<T_3, boolean> | undefined, fromIndex?: number | undefined): T_3[keyof T_3] | undefined;
};
export const findLast: {
    <T, S extends T>(collection: _.List<T> | null | undefined, predicate: _.ListIteratorTypeGuard<T, S>, fromIndex?: number | undefined): S | undefined;
    <T_1>(collection: _.List<T_1> | null | undefined, predicate?: _.ListIterateeCustom<T_1, boolean> | undefined, fromIndex?: number | undefined): T_1 | undefined;
    <T_2 extends object, S_1 extends T_2[keyof T_2]>(collection: T_2 | null | undefined, predicate: _.ObjectIteratorTypeGuard<T_2, S_1>, fromIndex?: number | undefined): S_1 | undefined;
    <T_3 extends object>(collection: T_3 | null | undefined, predicate?: _.ObjectIterateeCustom<T_3, boolean> | undefined, fromIndex?: number | undefined): T_3[keyof T_3] | undefined;
};
export const flatMap: {
    <T>(collection: _.Dictionary<_.Many<T>> | _.NumericDictionary<_.Many<T>> | null | undefined): T[];
    (collection: object | null | undefined): any[];
    <T_1, TResult>(collection: _.List<T_1> | null | undefined, iteratee: _.ListIterator<T_1, _.Many<TResult>>): TResult[];
    <T_2 extends object, TResult_1>(collection: T_2 | null | undefined, iteratee: _.ObjectIterator<T_2, _.Many<TResult_1>>): TResult_1[];
    (collection: object | null | undefined, iteratee: string): any[];
    (collection: object | null | undefined, iteratee: object): boolean[];
};
export const flatMapDeep: {
    <T>(collection: _.Dictionary<T | _.ListOfRecursiveArraysOrValues<T>> | _.NumericDictionary<T | _.ListOfRecursiveArraysOrValues<T>> | null | undefined): T[];
    <T_1, TResult>(collection: _.List<T_1> | null | undefined, iteratee: _.ListIterator<T_1, TResult | _.ListOfRecursiveArraysOrValues<TResult>>): TResult[];
    <T_2 extends object, TResult_1>(collection: T_2 | null | undefined, iteratee: _.ObjectIterator<T_2, TResult_1 | _.ListOfRecursiveArraysOrValues<TResult_1>>): TResult_1[];
    (collection: object | null | undefined, iteratee: string): any[];
    (collection: object | null | undefined, iteratee: object): boolean[];
};
export const flatMapDepth: {
    <T>(collection: _.Dictionary<T | _.ListOfRecursiveArraysOrValues<T>> | _.NumericDictionary<T | _.ListOfRecursiveArraysOrValues<T>> | null | undefined): T[];
    <T_1, TResult>(collection: _.List<T_1> | null | undefined, iteratee: _.ListIterator<T_1, TResult | _.ListOfRecursiveArraysOrValues<TResult>>, depth?: number | undefined): TResult[];
    <T_2 extends object, TResult_1>(collection: T_2 | null | undefined, iteratee: _.ObjectIterator<T_2, TResult_1 | _.ListOfRecursiveArraysOrValues<TResult_1>>, depth?: number | undefined): TResult_1[];
    (collection: object | null | undefined, iteratee: string, depth?: number | undefined): any[];
    (collection: object | null | undefined, iteratee: object, depth?: number | undefined): boolean[];
};
export const forEach: {
    <T>(collection: T[], iteratee?: _.ArrayIterator<T, any> | undefined): T[];
    (collection: string, iteratee?: _.StringIterator<any> | undefined): string;
    <T_1>(collection: _.List<T_1>, iteratee?: _.ListIterator<T_1, any> | undefined): _.List<T_1>;
    <T_2 extends object>(collection: T_2, iteratee?: _.ObjectIterator<T_2, any> | undefined): T_2;
    <T_3, TArray extends T_3[] | null | undefined>(collection: TArray & (T_3[] | null | undefined), iteratee?: _.ArrayIterator<T_3, any> | undefined): TArray;
    <TString extends string | null | undefined>(collection: TString, iteratee?: _.StringIterator<any> | undefined): TString;
    <T_4, TList extends _.List<T_4> | null | undefined>(collection: TList & (_.List<T_4> | null | undefined), iteratee?: _.ListIterator<T_4, any> | undefined): TList;
    <T_5 extends object>(collection: T_5 | null | undefined, iteratee?: _.ObjectIterator<T_5, any> | undefined): T_5 | null | undefined;
};
export const forEachRight: {
    <T>(collection: T[], iteratee?: _.ArrayIterator<T, any> | undefined): T[];
    (collection: string, iteratee?: _.StringIterator<any> | undefined): string;
    <T_1>(collection: _.List<T_1>, iteratee?: _.ListIterator<T_1, any> | undefined): _.List<T_1>;
    <T_2 extends object>(collection: T_2, iteratee?: _.ObjectIterator<T_2, any> | undefined): T_2;
    <T_3, TArray extends T_3[] | null | undefined>(collection: TArray & (T_3[] | null | undefined), iteratee?: _.ArrayIterator<T_3, any> | undefined): TArray;
    <TString extends string | null | undefined>(collection: TString, iteratee?: _.StringIterator<any> | undefined): TString;
    <T_4, TList extends _.List<T_4> | null | undefined>(collection: TList & (_.List<T_4> | null | undefined), iteratee?: _.ListIterator<T_4, any> | undefined): TList;
    <T_5 extends object>(collection: T_5 | null | undefined, iteratee?: _.ObjectIterator<T_5, any> | undefined): T_5 | null | undefined;
};
export const groupBy: {
    <T>(collection: _.List<T> | null | undefined, iteratee?: _.ValueIteratee<T> | undefined): _.Dictionary<T[]>;
    <T_1 extends object>(collection: T_1 | null | undefined, iteratee?: _.ValueIteratee<T_1[keyof T_1]> | undefined): _.Dictionary<T_1[keyof T_1][]>;
};
export const includes: <T>(collection: _.Dictionary<T> | _.NumericDictionary<T> | null | undefined, target: T, fromIndex?: number | undefined) => boolean;
export const invokeMap: {
    (collection: object | null | undefined, methodName: string, ...args: any[]): any[];
    <TResult>(collection: object | null | undefined, method: (...args: any[]) => TResult, ...args: any[]): TResult[];
};
export const keyBy: {
    <T>(collection: _.List<T> | null | undefined, iteratee?: _.ValueIterateeCustom<T, _.PropertyName> | undefined): _.Dictionary<T>;
    <T_1 extends object>(collection: T_1 | null | undefined, iteratee?: _.ValueIterateeCustom<T_1[keyof T_1], _.PropertyName> | undefined): _.Dictionary<T_1[keyof T_1]>;
};
export const map: {
    <T, TResult>(collection: T[] | null | undefined, iteratee: _.ArrayIterator<T, TResult>): TResult[];
    <T_1, TResult_1>(collection: _.List<T_1> | null | undefined, iteratee: _.ListIterator<T_1, TResult_1>): TResult_1[];
    <T_2>(collection: _.Dictionary<T_2> | _.NumericDictionary<T_2> | null | undefined): T_2[];
    <T_3 extends object, TResult_2>(collection: T_3 | null | undefined, iteratee: _.ObjectIterator<T_3, TResult_2>): TResult_2[];
    <T_4, K extends keyof T_4>(collection: _.Dictionary<T_4> | _.NumericDictionary<T_4> | null | undefined, iteratee: K): T_4[K][];
    <T_5>(collection: _.Dictionary<T_5> | _.NumericDictionary<T_5> | null | undefined, iteratee?: string | undefined): any[];
    <T_6>(collection: _.Dictionary<T_6> | _.NumericDictionary<T_6> | null | undefined, iteratee?: object | undefined): boolean[];
};
export const orderBy: {
    <T>(collection: _.List<T> | null | undefined, iteratees?: _.Many<_.ListIterator<T, unknown>> | undefined, orders?: _.Many<boolean | "desc" | "asc"> | undefined): T[];
    <T_1>(collection: _.List<T_1> | null | undefined, iteratees?: _.Many<_.ListIteratee<T_1>> | undefined, orders?: _.Many<boolean | "desc" | "asc"> | undefined): T_1[];
    <T_2 extends object>(collection: T_2 | null | undefined, iteratees?: _.Many<_.ObjectIterator<T_2, unknown>> | undefined, orders?: _.Many<boolean | "desc" | "asc"> | undefined): T_2[keyof T_2][];
    <T_3 extends object>(collection: T_3 | null | undefined, iteratees?: _.Many<_.ObjectIteratee<T_3>> | undefined, orders?: _.Many<boolean | "desc" | "asc"> | undefined): T_3[keyof T_3][];
};
export const partition: {
    <T, U extends T>(collection: _.List<T> | null | undefined, callback: _.ValueIteratorTypeGuard<T, U>): [U[], Exclude<T, U>[]];
    <T_1>(collection: _.List<T_1> | null | undefined, callback: _.ValueIteratee<T_1>): [T_1[], T_1[]];
    <T_2 extends object>(collection: T_2 | null | undefined, callback: _.ValueIteratee<T_2[keyof T_2]>): [T_2[keyof T_2][], T_2[keyof T_2][]];
};
export const reduce: {
    <T, TResult>(collection: T[] | null | undefined, callback: _.MemoListIterator<T, TResult, T[]>, accumulator: TResult): TResult;
    <T_1, TResult_1>(collection: _.List<T_1> | null | undefined, callback: _.MemoListIterator<T_1, TResult_1, _.List<T_1>>, accumulator: TResult_1): TResult_1;
    <T_2 extends object, TResult_2>(collection: T_2 | null | undefined, callback: _.MemoObjectIterator<T_2[keyof T_2], TResult_2, T_2>, accumulator: TResult_2): TResult_2;
    <T_3>(collection: T_3[] | null | undefined, callback: _.MemoListIterator<T_3, T_3, T_3[]>): T_3 | undefined;
    <T_4>(collection: _.List<T_4> | null | undefined, callback: _.MemoListIterator<T_4, T_4, _.List<T_4>>): T_4 | undefined;
    <T_5 extends object>(collection: T_5 | null | undefined, callback: _.MemoObjectIterator<T_5[keyof T_5], T_5[keyof T_5], T_5>): T_5[keyof T_5] | undefined;
};
export const reduceRight: {
    <T, TResult>(collection: T[] | null | undefined, callback: _.MemoListIterator<T, TResult, T[]>, accumulator: TResult): TResult;
    <T_1, TResult_1>(collection: _.List<T_1> | null | undefined, callback: _.MemoListIterator<T_1, TResult_1, _.List<T_1>>, accumulator: TResult_1): TResult_1;
    <T_2 extends object, TResult_2>(collection: T_2 | null | undefined, callback: _.MemoObjectIterator<T_2[keyof T_2], TResult_2, T_2>, accumulator: TResult_2): TResult_2;
    <T_3>(collection: T_3[] | null | undefined, callback: _.MemoListIterator<T_3, T_3, T_3[]>): T_3 | undefined;
    <T_4>(collection: _.List<T_4> | null | undefined, callback: _.MemoListIterator<T_4, T_4, _.List<T_4>>): T_4 | undefined;
    <T_5 extends object>(collection: T_5 | null | undefined, callback: _.MemoObjectIterator<T_5[keyof T_5], T_5[keyof T_5], T_5>): T_5[keyof T_5] | undefined;
};
export const reject: {
    (collection: string | null | undefined, predicate?: _.StringIterator<boolean> | undefined): string[];
    <T>(collection: _.List<T> | null | undefined, predicate?: _.ListIterateeCustom<T, boolean> | undefined): T[];
    <T_1 extends object>(collection: T_1 | null | undefined, predicate?: _.ObjectIterateeCustom<T_1, boolean> | undefined): T_1[keyof T_1][];
};
export const sample: {
    <T>(collection: _.Dictionary<T> | _.NumericDictionary<T> | null | undefined): T | undefined;
    <T_1 extends object>(collection: T_1 | null | undefined): T_1[keyof T_1] | undefined;
};
export const sampleSize: {
    <T>(collection: _.Dictionary<T> | _.NumericDictionary<T> | null | undefined, n?: number | undefined): T[];
    <T_1 extends object>(collection: T_1 | null | undefined, n?: number | undefined): T_1[keyof T_1][];
};
export const shuffle: {
    <T>(collection: _.List<T> | null | undefined): T[];
    <T_1 extends object>(collection: T_1 | null | undefined): T_1[keyof T_1][];
};
export const size: (collection: string | object | null | undefined) => number;
export const some: {
    <T>(collection: _.List<T> | null | undefined, predicate?: _.ListIterateeCustom<T, boolean> | undefined): boolean;
    <T_1 extends object>(collection: T_1 | null | undefined, predicate?: _.ObjectIterateeCustom<T_1, boolean> | undefined): boolean;
};
export const sortBy: {
    <T>(collection: _.List<T> | null | undefined, ...iteratees: _.Many<_.ListIteratee<T>>[]): T[];
    <T_1 extends object>(collection: T_1 | null | undefined, ...iteratees: _.Many<_.ObjectIteratee<T_1>>[]): T_1[keyof T_1][];
};
