export = debounce;
declare function debounce(func: Function, wait?: number | undefined, options?: {
    leading?: boolean | undefined;
    maxWait?: number | undefined;
    trailing?: boolean | undefined;
} | undefined): Function;
