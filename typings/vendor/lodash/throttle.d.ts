export = throttle;
declare function throttle(func: Function, wait?: number | undefined, options?: {
    leading?: boolean | undefined;
    trailing?: boolean | undefined;
} | undefined): Function;
