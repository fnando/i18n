declare const _exports: {
    <T, TResult>(iteratee: (value: T) => TResult): import("../fp").LodashMap1x1<T, TResult>;
    <T_1>(iteratee: _.LoDashStatic, collection: T_1[] | null | undefined): import("../fp").LodashMap1x2<T_1>;
    <T_2, TResult_1>(iteratee: (value: T_2) => TResult_1, collection: T_2[] | _.List<T_2> | null | undefined): TResult_1[];
    <T_3>(iteratee: _.LoDashStatic, collection: _.List<T_3> | null | undefined): import("../fp").LodashMap2x2<T_3>;
    <T_4 extends object, TResult_2>(iteratee: (value: T_4[keyof T_4]) => TResult_2): import("../fp").LodashMap3x1<T_4, TResult_2>;
    <T_5 extends object>(iteratee: _.LoDashStatic, collection: T_5 | null | undefined): import("../fp").LodashMap3x2<T_5>;
    <T_6 extends object, TResult_3>(iteratee: (value: T_6[keyof T_6]) => TResult_3, collection: T_6 | null | undefined): TResult_3[];
    <T_7, K extends keyof T_7>(iteratee: K): import("../fp").LodashMap4x1<T_7, K>;
    <T_8>(iteratee: _.LoDashStatic, collection: _.Dictionary<T_8> | _.NumericDictionary<T_8> | null | undefined): import("../fp").LodashMap4x2<T_8>;
    <T_9, K_1 extends keyof T_9>(iteratee: K_1, collection: _.Dictionary<T_9> | _.NumericDictionary<T_9> | null | undefined): T_9[K_1][];
    (iteratee: string): import("../fp").LodashMap5x1;
    <T_10>(iteratee: string, collection: _.Dictionary<T_10> | _.NumericDictionary<T_10> | null | undefined): any[];
    (iteratee: object): import("../fp").LodashMap6x1;
    <T_11>(iteratee: object, collection: _.Dictionary<T_11> | _.NumericDictionary<T_11> | null | undefined): boolean[];
};
export = _exports;
