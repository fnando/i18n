export = truncate;
declare function truncate(string?: string | undefined, options?: {
    length?: number | undefined;
    omission?: string | undefined;
    separator?: string | RegExp | undefined;
} | undefined): string;
