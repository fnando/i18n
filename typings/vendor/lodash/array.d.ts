export const chunk: <T>(array: _.List<T> | null | undefined, size?: number | undefined) => T[][];
export const compact: <T>(array: _.List<T | _.Falsey> | null | undefined) => T[];
export const concat: <T>(...values: _.Many<T>[]) => T[];
export const difference: <T>(array: _.List<T> | null | undefined, ...values: _.List<T>[]) => T[];
export const differenceBy: {
    <T1, T2>(array: _.List<T1> | null | undefined, values: _.List<T2>, iteratee: _.ValueIteratee<T1 | T2>): T1[];
    <T1_1, T2_1, T3>(array: _.List<T1_1> | null | undefined, values1: _.List<T2_1>, values2: _.List<T3>, iteratee: _.ValueIteratee<T1_1 | T2_1 | T3>): T1_1[];
    <T1_2, T2_2, T3_1, T4>(array: _.List<T1_2> | null | undefined, values1: _.List<T2_2>, values2: _.List<T3_1>, values3: _.List<T4>, iteratee: _.ValueIteratee<T1_2 | T2_2 | T3_1 | T4>): T1_2[];
    <T1_3, T2_3, T3_2, T4_1, T5>(array: _.List<T1_3> | null | undefined, values1: _.List<T2_3>, values2: _.List<T3_2>, values3: _.List<T4_1>, values4: _.List<T5>, iteratee: _.ValueIteratee<T1_3 | T2_3 | T3_2 | T4_1 | T5>): T1_3[];
    <T1_4, T2_4, T3_3, T4_2, T5_1, T6>(array: _.List<T1_4> | null | undefined, values1: _.List<T2_4>, values2: _.List<T3_3>, values3: _.List<T4_2>, values4: _.List<T5_1>, values5: _.List<T6>, iteratee: _.ValueIteratee<T1_4 | T2_4 | T3_3 | T4_2 | T5_1 | T6>): T1_4[];
    <T1_5, T2_5, T3_4, T4_3, T5_2, T6_1, T7>(array: _.List<T1_5> | null | undefined, values1: _.List<T2_5>, values2: _.List<T3_4>, values3: _.List<T4_3>, values4: _.List<T5_2>, values5: _.List<T6_1>, ...values: (_.List<T7> | _.ValueIteratee<T1_5 | T2_5 | T3_4 | T4_3 | T5_2 | T6_1 | T7>)[]): T1_5[];
    <T>(array: _.List<T> | null | undefined, ...values: _.List<T>[]): T[];
};
export const differenceWith: {
    <T1, T2>(array: _.List<T1> | null | undefined, values: _.List<T2>, comparator: _.Comparator2<T1, T2>): T1[];
    <T1_1, T2_1, T3>(array: _.List<T1_1> | null | undefined, values1: _.List<T2_1>, values2: _.List<T3>, comparator: _.Comparator2<T1_1, T2_1 | T3>): T1_1[];
    <T1_2, T2_2, T3_1, T4>(array: _.List<T1_2> | null | undefined, values1: _.List<T2_2>, values2: _.List<T3_1>, ...values: (_.List<T4> | _.Comparator2<T1_2, T2_2 | T3_1 | T4>)[]): T1_2[];
    <T>(array: _.List<T> | null | undefined, ...values: _.List<T>[]): T[];
};
export const drop: <T>(array: _.List<T> | null | undefined, n?: number | undefined) => T[];
export const dropRight: <T>(array: _.List<T> | null | undefined, n?: number | undefined) => T[];
export const dropRightWhile: <T>(array: _.List<T> | null | undefined, predicate?: _.ListIteratee<T> | undefined) => T[];
export const dropWhile: <T>(array: _.List<T> | null | undefined, predicate?: _.ListIteratee<T> | undefined) => T[];
export const fill: {
    <T>(array: any[] | null | undefined, value: T): T[];
    <T_1>(array: _.List<any> | null | undefined, value: T_1): _.List<T_1>;
    <T_2, U>(array: U[] | null | undefined, value: T_2, start?: number | undefined, end?: number | undefined): (T_2 | U)[];
    <T_3, U_1>(array: _.List<U_1> | null | undefined, value: T_3, start?: number | undefined, end?: number | undefined): _.List<T_3 | U_1>;
};
export const findIndex: <T>(array: _.List<T> | null | undefined, predicate?: _.ListIterateeCustom<T, boolean> | undefined, fromIndex?: number | undefined) => number;
export const findLastIndex: <T>(array: _.List<T> | null | undefined, predicate?: _.ListIterateeCustom<T, boolean> | undefined, fromIndex?: number | undefined) => number;
export const first: <T>(array: _.List<T> | null | undefined) => T | undefined;
export const flatten: <T>(array: _.List<_.Many<T>> | null | undefined) => T[];
export const flattenDeep: <T>(array: _.ListOfRecursiveArraysOrValues<T> | null | undefined) => _.Flat<T>[];
export const flattenDepth: <T>(array: _.ListOfRecursiveArraysOrValues<T> | null | undefined, depth?: number | undefined) => T[];
export const fromPairs: {
    <T>(pairs: _.List<[_.PropertyName, T]> | null | undefined): _.Dictionary<T>;
    (pairs: _.List<any[]> | null | undefined): _.Dictionary<any>;
};
export const head: <T>(array: _.List<T> | null | undefined) => T | undefined;
export const indexOf: <T>(array: _.List<T> | null | undefined, value: T, fromIndex?: number | undefined) => number;
export const initial: <T>(array: _.List<T> | null | undefined) => T[];
export const intersection: <T>(...arrays: (_.List<T> | null | undefined)[]) => T[];
export const intersectionBy: {
    <T1, T2>(array: _.List<T1> | null, values: _.List<T2>, iteratee: _.ValueIteratee<T1 | T2>): T1[];
    <T1_1, T2_1, T3>(array: _.List<T1_1> | null, values1: _.List<T2_1>, values2: _.List<T3>, iteratee: _.ValueIteratee<T1_1 | T2_1 | T3>): T1_1[];
    <T1_2, T2_2, T3_1, T4>(array: _.List<T1_2> | null | undefined, values1: _.List<T2_2>, values2: _.List<T3_1>, ...values: (_.List<T4> | _.ValueIteratee<T1_2 | T2_2 | T3_1 | T4>)[]): T1_2[];
    <T>(array?: _.List<T> | null | undefined, ...values: _.List<T>[]): T[];
    <T_1>(...values: (_.List<T_1> | _.ValueIteratee<T_1>)[]): T_1[];
};
export const intersectionWith: {
    <T1, T2>(array: _.List<T1> | null | undefined, values: _.List<T2>, comparator: _.Comparator2<T1, T2>): T1[];
    <T1_1, T2_1, T3>(array: _.List<T1_1> | null | undefined, values1: _.List<T2_1>, values2: _.List<T3>, comparator: _.Comparator2<T1_1, T2_1 | T3>): T1_1[];
    <T1_2, T2_2, T3_1, T4>(array: _.List<T1_2> | null | undefined, values1: _.List<T2_2>, values2: _.List<T3_1>, ...values: (_.List<T4> | _.Comparator2<T1_2, T2_2 | T3_1 | T4>)[]): T1_2[];
    <T>(array?: _.List<T> | null | undefined, ...values: (_.List<T> | _.Comparator2<T, never>)[]): T[];
};
export const join: (array: _.List<any> | null | undefined, separator?: string | undefined) => string;
export const last: <T>(array: _.List<T> | null | undefined) => T | undefined;
export const lastIndexOf: <T>(array: _.List<T> | null | undefined, value: T, fromIndex?: number | true | undefined) => number;
export const nth: <T>(array: _.List<T> | null | undefined, n?: number | undefined) => T | undefined;
export const pull: {
    <T>(array: T[], ...values: T[]): T[];
    <T_1>(array: _.List<T_1>, ...values: T_1[]): _.List<T_1>;
};
export const pullAll: {
    <T>(array: T[], values?: _.List<T> | undefined): T[];
    <T_1>(array: _.List<T_1>, values?: _.List<T_1> | undefined): _.List<T_1>;
};
export const pullAllBy: {
    <T>(array: T[], values?: _.List<T> | undefined, iteratee?: _.ValueIteratee<T> | undefined): T[];
    <T_1>(array: _.List<T_1>, values?: _.List<T_1> | undefined, iteratee?: _.ValueIteratee<T_1> | undefined): _.List<T_1>;
    <T1, T2>(array: T1[], values: _.List<T2>, iteratee: _.ValueIteratee<T1 | T2>): T1[];
    <T1_1, T2_1>(array: _.List<T1_1>, values: _.List<T2_1>, iteratee: _.ValueIteratee<T1_1 | T2_1>): _.List<T1_1>;
};
export const pullAllWith: {
    <T>(array: T[], values?: _.List<T> | undefined, comparator?: _.Comparator<T> | undefined): T[];
    <T_1>(array: _.List<T_1>, values?: _.List<T_1> | undefined, comparator?: _.Comparator<T_1> | undefined): _.List<T_1>;
    <T1, T2>(array: T1[], values: _.List<T2>, comparator: _.Comparator2<T1, T2>): T1[];
    <T1_1, T2_1>(array: _.List<T1_1>, values: _.List<T2_1>, comparator: _.Comparator2<T1_1, T2_1>): _.List<T1_1>;
};
export const pullAt: {
    <T>(array: T[], ...indexes: _.Many<number>[]): T[];
    <T_1>(array: _.List<T_1>, ...indexes: _.Many<number>[]): _.List<T_1>;
};
export const remove: <T>(array: _.List<T>, predicate?: _.ListIteratee<T> | undefined) => T[];
export const reverse: <TList extends _.List<any>>(array: TList) => TList;
export const slice: <T>(array: _.List<T> | null | undefined, start?: number | undefined, end?: number | undefined) => T[];
export const sortedIndex: {
    <T>(array: _.List<T> | null | undefined, value: T): number;
    <T_1>(array: _.List<T_1> | null | undefined, value: T_1): number;
};
export const sortedIndexBy: <T>(array: _.List<T> | null | undefined, value: T, iteratee?: _.ValueIteratee<T> | undefined) => number;
export const sortedIndexOf: <T>(array: _.List<T> | null | undefined, value: T) => number;
export const sortedLastIndex: <T>(array: _.List<T> | null | undefined, value: T) => number;
export const sortedLastIndexBy: <T>(array: _.List<T> | null | undefined, value: T, iteratee: _.ValueIteratee<T>) => number;
export const sortedLastIndexOf: <T>(array: _.List<T> | null | undefined, value: T) => number;
export const sortedUniq: <T>(array: _.List<T> | null | undefined) => T[];
export const sortedUniqBy: <T>(array: _.List<T> | null | undefined, iteratee: _.ValueIteratee<T>) => T[];
export const tail: <T>(array: _.List<T> | null | undefined) => T[];
export const take: <T>(array: _.List<T> | null | undefined, n?: number | undefined) => T[];
export const takeRight: <T>(array: _.List<T> | null | undefined, n?: number | undefined) => T[];
export const takeRightWhile: <T>(array: _.List<T> | null | undefined, predicate?: _.ListIteratee<T> | undefined) => T[];
export const takeWhile: <T>(array: _.List<T> | null | undefined, predicate?: _.ListIteratee<T> | undefined) => T[];
export const union: <T>(...arrays: (_.List<T> | null | undefined)[]) => T[];
export const unionBy: {
    <T>(arrays: _.List<T> | null | undefined, iteratee?: _.ValueIteratee<T> | undefined): T[];
    <T_1>(arrays1: _.List<T_1> | null | undefined, arrays2: _.List<T_1> | null | undefined, iteratee?: _.ValueIteratee<T_1> | undefined): T_1[];
    <T_2>(arrays1: _.List<T_2> | null | undefined, arrays2: _.List<T_2> | null | undefined, arrays3: _.List<T_2> | null | undefined, iteratee?: _.ValueIteratee<T_2> | undefined): T_2[];
    <T_3>(arrays1: _.List<T_3> | null | undefined, arrays2: _.List<T_3> | null | undefined, arrays3: _.List<T_3> | null | undefined, arrays4: _.List<T_3> | null | undefined, iteratee?: _.ValueIteratee<T_3> | undefined): T_3[];
    <T_4>(arrays1: _.List<T_4> | null | undefined, arrays2: _.List<T_4> | null | undefined, arrays3: _.List<T_4> | null | undefined, arrays4: _.List<T_4> | null | undefined, arrays5: _.List<T_4> | null | undefined, ...iteratee: (_.ValueIteratee<T_4> | _.List<T_4> | null | undefined)[]): T_4[];
};
export const unionWith: {
    <T>(arrays: _.List<T> | null | undefined, comparator?: _.Comparator<T> | undefined): T[];
    <T_1>(arrays: _.List<T_1> | null | undefined, arrays2: _.List<T_1> | null | undefined, comparator?: _.Comparator<T_1> | undefined): T_1[];
    <T_2>(arrays: _.List<T_2> | null | undefined, arrays2: _.List<T_2> | null | undefined, arrays3: _.List<T_2> | null | undefined, ...comparator: (_.Comparator<T_2> | _.List<T_2> | null | undefined)[]): T_2[];
};
export const uniq: <T>(array: _.List<T> | null | undefined) => T[];
export const uniqBy: <T>(array: _.List<T> | null | undefined, iteratee: _.ValueIteratee<T>) => T[];
export const uniqWith: <T>(array: _.List<T> | null | undefined, comparator?: _.Comparator<T> | undefined) => T[];
export const unzip: <T>(array: T[][] | _.List<_.List<T>> | null | undefined) => T[][];
export const unzipWith: {
    <T, TResult>(array: _.List<_.List<T>> | null | undefined, iteratee: (...values: T[]) => TResult): TResult[];
    <T_1>(array: _.List<_.List<T_1>> | null | undefined): T_1[][];
};
export const without: <T>(array: _.List<T> | null | undefined, ...values: T[]) => T[];
export const xor: <T>(...arrays: (_.List<T> | null | undefined)[]) => T[];
export const xorBy: {
    <T>(arrays: _.List<T> | null | undefined, iteratee?: _.ValueIteratee<T> | undefined): T[];
    <T_1>(arrays: _.List<T_1> | null | undefined, arrays2: _.List<T_1> | null | undefined, iteratee?: _.ValueIteratee<T_1> | undefined): T_1[];
    <T_2>(arrays: _.List<T_2> | null | undefined, arrays2: _.List<T_2> | null | undefined, arrays3: _.List<T_2> | null | undefined, ...iteratee: (_.ValueIteratee<T_2> | _.List<T_2> | null | undefined)[]): T_2[];
};
export const xorWith: {
    <T>(arrays: _.List<T> | null | undefined, comparator?: _.Comparator<T> | undefined): T[];
    <T_1>(arrays: _.List<T_1> | null | undefined, arrays2: _.List<T_1> | null | undefined, comparator?: _.Comparator<T_1> | undefined): T_1[];
    <T_2>(arrays: _.List<T_2> | null | undefined, arrays2: _.List<T_2> | null | undefined, arrays3: _.List<T_2> | null | undefined, ...comparator: (_.Comparator<T_2> | _.List<T_2> | null | undefined)[]): T_2[];
};
export const zip: {
    <T1, T2>(arrays1: _.List<T1>, arrays2: _.List<T2>): [T1 | undefined, T2 | undefined][];
    <T1_1, T2_1, T3>(arrays1: _.List<T1_1>, arrays2: _.List<T2_1>, arrays3: _.List<T3>): [T1_1 | undefined, T2_1 | undefined, T3 | undefined][];
    <T1_2, T2_2, T3_1, T4>(arrays1: _.List<T1_2>, arrays2: _.List<T2_2>, arrays3: _.List<T3_1>, arrays4: _.List<T4>): [T1_2 | undefined, T2_2 | undefined, T3_1 | undefined, T4 | undefined][];
    <T1_3, T2_3, T3_2, T4_1, T5>(arrays1: _.List<T1_3>, arrays2: _.List<T2_3>, arrays3: _.List<T3_2>, arrays4: _.List<T4_1>, arrays5: _.List<T5>): [T1_3 | undefined, T2_3 | undefined, T3_2 | undefined, T4_1 | undefined, T5 | undefined][];
    <T>(...arrays: (_.List<T> | null | undefined)[]): (T | undefined)[][];
};
export const zipObject: {
    <T>(props: _.List<_.PropertyName>, values: _.List<T>): _.Dictionary<T>;
    (props?: _.List<_.PropertyName> | undefined): _.Dictionary<undefined>;
};
export const zipObjectDeep: (paths?: _.List<_.PropertyPath> | undefined, values?: _.List<any> | undefined) => object;
export const zipWith: {
    <T, TResult>(arrays: _.List<T>, iteratee: (value1: T) => TResult): TResult[];
    <T1, T2, TResult_1>(arrays1: _.List<T1>, arrays2: _.List<T2>, iteratee: (value1: T1, value2: T2) => TResult_1): TResult_1[];
    <T1_1, T2_1, T3, TResult_2>(arrays1: _.List<T1_1>, arrays2: _.List<T2_1>, arrays3: _.List<T3>, iteratee: (value1: T1_1, value2: T2_1, value3: T3) => TResult_2): TResult_2[];
    <T1_2, T2_2, T3_1, T4, TResult_3>(arrays1: _.List<T1_2>, arrays2: _.List<T2_2>, arrays3: _.List<T3_1>, arrays4: _.List<T4>, iteratee: (value1: T1_2, value2: T2_2, value3: T3_1, value4: T4) => TResult_3): TResult_3[];
    <T1_3, T2_3, T3_2, T4_1, T5, TResult_4>(arrays1: _.List<T1_3>, arrays2: _.List<T2_3>, arrays3: _.List<T3_2>, arrays4: _.List<T4_1>, arrays5: _.List<T5>, iteratee: (value1: T1_3, value2: T2_3, value3: T3_2, value4: T4_1, value5: T5) => TResult_4): TResult_4[];
    <T_1, TResult_5>(...iteratee: (((...group: T_1[]) => TResult_5) | _.List<T_1> | null | undefined)[]): TResult_5[];
};
