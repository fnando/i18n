declare const _exports: {
    <T>(iteratee: (value: T) => any): import("../fp").LodashForEach1x1<T>;
    <T_1>(iteratee: _.LoDashStatic, collection: readonly T_1[]): import("../fp").LodashForEach1x2<T_1>;
    <T_2>(iteratee: (value: T_2) => any, collection: readonly T_2[]): T_2[];
    <T_3>(iteratee: _.LoDashStatic, collection: _.List<T_3>): import("../fp").LodashForEach2x2<T_3>;
    <T_4>(iteratee: (value: T_4) => any, collection: _.List<T_4>): _.List<T_4>;
    <T_5 extends object>(iteratee: _.LoDashStatic, collection: T_5): import("../fp").LodashForEach3x2<T_5>;
    <T_6 extends object>(iteratee: (value: T_6[keyof T_6]) => any, collection: T_6): T_6;
    <T_7, TArray extends T_7[] | null | undefined>(iteratee: _.LoDashStatic, collection: TArray & (T_7[] | null | undefined)): import("../fp").LodashForEach4x2<T_7, TArray>;
    <T_8, TArray_1 extends T_8[] | null | undefined>(iteratee: (value: T_8) => any, collection: TArray_1 & (T_8[] | null | undefined)): TArray_1;
    <T_9, TList extends _.List<T_9> | null | undefined>(iteratee: _.LoDashStatic, collection: TList & (_.List<T_9> | null | undefined)): import("../fp").LodashForEach5x2<T_9, TList>;
    <T_10, TList_1 extends _.List<T_10> | null | undefined>(iteratee: (value: T_10) => any, collection: TList_1 & (_.List<T_10> | null | undefined)): TList_1;
    <T_11 extends object>(iteratee: _.LoDashStatic, collection: T_11 | null | undefined): import("../fp").LodashForEach6x2<T_11>;
    <T_12 extends object>(iteratee: (value: T_12[keyof T_12]) => any, collection: T_12 | null | undefined): T_12 | null | undefined;
};
export = _exports;
