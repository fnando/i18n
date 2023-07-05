declare const _exports: {
    (props: _.PropertyPath): import("../fp").LodashAt1x1;
    <T>(props: _.LoDashStatic, object: _.Dictionary<T> | _.NumericDictionary<T> | null | undefined): import("../fp").LodashAt1x2<T>;
    <T_1>(props: _.PropertyPath, object: _.Dictionary<T_1> | _.NumericDictionary<T_1> | null | undefined): T_1[];
    <T_2 extends object>(props: _.Many<keyof T_2>): import("../fp").LodashAt2x1<T_2>;
    <T_3 extends object>(props: _.LoDashStatic, object: T_3 | null | undefined): import("../fp").LodashAt2x2<T_3>;
    <T_4 extends object>(props: _.Many<keyof T_4>, object: T_4 | null | undefined): T_4[keyof T_4][];
};
export = _exports;
