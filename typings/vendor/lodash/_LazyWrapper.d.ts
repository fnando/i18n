export = LazyWrapper;
declare function LazyWrapper(value: any): void;
declare class LazyWrapper {
    private constructor();
    __wrapped__: any;
    __actions__: any[];
    __dir__: number;
    __filtered__: boolean;
    __iteratees__: any[];
    __takeCount__: number;
    __views__: any[];
    constructor: typeof LazyWrapper;
}
