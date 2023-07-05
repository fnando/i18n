export const at: Function;
export const chain: {
    <TrapAny extends {
        __lodashAnyHack: any;
    }>(value: TrapAny): _.CollectionChain<any> & _.FunctionChain<any> & _.ObjectChain<any> & _.PrimitiveChain<any> & _.StringChain;
    <T extends null | undefined>(value: T): _.PrimitiveChain<T>;
    (value: string): _.StringChain;
    (value: string | null | undefined): _.StringNullableChain;
    <T_1 extends (...args: any[]) => any>(value: T_1): _.FunctionChain<T_1>;
    <T_2 = any>(value: _.List<T_2> | null | undefined): _.CollectionChain<T_2>;
    <T_3 extends object>(value: T_3 | null | undefined): _.ObjectChain<T_3>;
    <T_4>(value: T_4): _.PrimitiveChain<T_4>;
};
export const commit: typeof import("./commit");
export const lodash: typeof import("./wrapperLodash");
export const next: typeof import("./next");
export const plant: typeof import("./plant");
export const reverse: typeof import("./wrapperReverse");
export const tap: <T>(value: T, interceptor: (value: T) => void) => T;
export const thru: <T, TResult>(value: T, interceptor: (value: T) => TResult) => TResult;
export const toIterator: typeof import("./toIterator");
export const toJSON: typeof import("./wrapperValue");
export const value: typeof import("./wrapperValue");
export const valueOf: typeof import("./wrapperValue");
export const wrapperChain: typeof import("./wrapperChain");
