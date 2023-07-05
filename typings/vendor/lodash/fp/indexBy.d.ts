declare const _exports: {
    <T>(iteratee: _.ValueIterateeCustom<T, _.PropertyName>): import("../fp").LodashKeyBy1x1<T>;
    <T_1>(iteratee: _.LoDashStatic, collection: _.List<T_1> | null | undefined): import("../fp").LodashKeyBy1x2<T_1>;
    <T_2>(iteratee: _.ValueIterateeCustom<T_2, _.PropertyName>, collection: _.List<T_2> | null | undefined): _.Dictionary<T_2>;
    <T_3 extends object>(iteratee: _.LoDashStatic, collection: T_3 | null | undefined): import("../fp").LodashKeyBy2x2<T_3>;
    <T_4 extends object>(iteratee: _.ValueIterateeCustom<T_4[keyof T_4], _.PropertyName>, collection: T_4 | null | undefined): _.Dictionary<T_4[keyof T_4]>;
};
export = _exports;
