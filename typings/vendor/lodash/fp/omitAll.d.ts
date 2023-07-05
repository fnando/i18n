declare const _exports: {
    <T extends object, K extends keyof T>(paths: _.Many<K>): import("../fp").LodashOmit1x1<T, K>;
    <T_1 extends object>(paths: _.LoDashStatic, object: T_1 | null | undefined): import("../fp").LodashOmit1x2<T_1>;
    <T_2 extends object, K_1 extends keyof T_2>(paths: _.Many<K_1>, object: T_2 | null | undefined): _.Omit<T_2, K_1>;
    (paths: _.Many<_.PropertyName>): import("../fp").LodashOmit2x1;
    <T_3 extends object>(paths: _.Many<_.PropertyName>, object: T_3 | null | undefined): Partial<T_3>;
};
export = _exports;
