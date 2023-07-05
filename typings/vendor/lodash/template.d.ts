export = template;
declare function template(string?: string | undefined, options?: {
    escape?: RegExp | undefined;
    evaluate?: RegExp | undefined;
    imports?: Object | undefined;
    interpolate?: RegExp | undefined;
    sourceURL?: string | undefined;
    variable?: string | undefined;
} | undefined, guard: any): Function;
