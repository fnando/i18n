declare const _exports: {
    <T>(collection: T[], iteratee?: _.ArrayIterator<T, any> | undefined): T[];
    (collection: string, iteratee?: _.StringIterator<any> | undefined): string;
    <T_1>(collection: _.List<T_1>, iteratee?: _.ListIterator<T_1, any> | undefined): _.List<T_1>;
    <T_2 extends object>(collection: T_2, iteratee?: _.ObjectIterator<T_2, any> | undefined): T_2;
    <T_3, TArray extends T_3[] | null | undefined>(collection: TArray & (T_3[] | null | undefined), iteratee?: _.ArrayIterator<T_3, any> | undefined): TArray;
    <TString extends string | null | undefined>(collection: TString, iteratee?: _.StringIterator<any> | undefined): TString;
    <T_4, TList extends _.List<T_4> | null | undefined>(collection: TList & (_.List<T_4> | null | undefined), iteratee?: _.ListIterator<T_4, any> | undefined): TList;
    <T_5 extends object>(collection: T_5 | null | undefined, iteratee?: _.ObjectIterator<T_5, any> | undefined): T_5 | null | undefined;
};
export = _exports;
