export = isMaskable;
declare var isMaskable: ((value: any) => value is (...args: any[]) => any) | {
    (): false;
    (): false;
};
