declare const _exports: {
    <T extends object, U extends keyof T>(props: _.Many<U>): import("../fp").LodashPick1x1<T, U>;
    <T_1 extends object>(props: _.LoDashStatic, object: T_1): import("../fp").LodashPick1x2<T_1>;
    <T_2 extends object, U_1 extends keyof T_2>(props: _.Many<U_1>, object: T_2): Pick<T_2, U_1>;
    (props: _.PropertyPath): import("../fp").LodashPick2x1;
    <T_3>(props: _.LoDashStatic, object: T_3 | null | undefined): import("../fp").LodashPick2x2<T_3>;
    <T_4>(props: _.PropertyPath, object: T_4 | null | undefined): Partial<T_4>;
};
export = _exports;
