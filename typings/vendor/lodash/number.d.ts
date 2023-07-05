export const clamp: {
    (number: number, lower: number, upper: number): number;
    (number: number, upper: number): number;
};
export const inRange: (n: number, start: number, end?: number | undefined) => boolean;
export const random: {
    (floating?: boolean | undefined): number;
    (max: number, floating?: boolean | undefined): number;
    (min: number, max: number, floating?: boolean | undefined): number;
    (min: number, index: string | number, guard: object): number;
};
