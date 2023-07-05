export namespace aliasToReal {
    const each: string;
    const eachRight: string;
    const entries: string;
    const entriesIn: string;
    const extend: string;
    const extendAll: string;
    const extendAllWith: string;
    const extendWith: string;
    const first: string;
    const conforms: string;
    const matches: string;
    const property: string;
    const __: string;
    const F: string;
    const T: string;
    const all: string;
    const allPass: string;
    const always: string;
    const any: string;
    const anyPass: string;
    const apply: string;
    const assoc: string;
    const assocPath: string;
    const complement: string;
    const compose: string;
    const contains: string;
    const dissoc: string;
    const dissocPath: string;
    const dropLast: string;
    const dropLastWhile: string;
    const equals: string;
    const identical: string;
    const indexBy: string;
    const init: string;
    const invertObj: string;
    const juxt: string;
    const omitAll: string;
    const nAry: string;
    const path: string;
    const pathEq: string;
    const pathOr: string;
    const paths: string;
    const pickAll: string;
    const pipe: string;
    const pluck: string;
    const prop: string;
    const propEq: string;
    const propOr: string;
    const props: string;
    const symmetricDifference: string;
    const symmetricDifferenceBy: string;
    const symmetricDifferenceWith: string;
    const takeLast: string;
    const takeLastWhile: string;
    const unapply: string;
    const unnest: string;
    const useWith: string;
    const where: string;
    const whereEq: string;
    const zipObj: string;
}
export const aryMethod: {
    '1': string[];
    '2': string[];
    '3': string[];
    '4': string[];
};
export const aryRearg: {
    '2': number[];
    '3': number[];
    '4': number[];
};
export namespace iterateeAry {
    const dropRightWhile: number;
    const dropWhile: number;
    const every: number;
    const filter: number;
    const find: number;
    const findFrom: number;
    const findIndex: number;
    const findIndexFrom: number;
    const findKey: number;
    const findLast: number;
    const findLastFrom: number;
    const findLastIndex: number;
    const findLastIndexFrom: number;
    const findLastKey: number;
    const flatMap: number;
    const flatMapDeep: number;
    const flatMapDepth: number;
    const forEach: number;
    const forEachRight: number;
    const forIn: number;
    const forInRight: number;
    const forOwn: number;
    const forOwnRight: number;
    const map: number;
    const mapKeys: number;
    const mapValues: number;
    const partition: number;
    const reduce: number;
    const reduceRight: number;
    const reject: number;
    const remove: number;
    const some: number;
    const takeRightWhile: number;
    const takeWhile: number;
    const times: number;
    const transform: number;
}
export namespace iterateeRearg {
    const mapKeys_1: number[];
    export { mapKeys_1 as mapKeys };
    const reduceRight_1: number[];
    export { reduceRight_1 as reduceRight };
}
export namespace methodRearg {
    const assignInAllWith: number[];
    const assignInWith: number[];
    const assignAllWith: number[];
    const assignWith: number[];
    const differenceBy: number[];
    const differenceWith: number[];
    const getOr: number[];
    const intersectionBy: number[];
    const intersectionWith: number[];
    const isEqualWith: number[];
    const isMatchWith: number[];
    const mergeAllWith: number[];
    const mergeWith: number[];
    const padChars: number[];
    const padCharsEnd: number[];
    const padCharsStart: number[];
    const pullAllBy: number[];
    const pullAllWith: number[];
    const rangeStep: number[];
    const rangeStepRight: number[];
    const setWith: number[];
    const sortedIndexBy: number[];
    const sortedLastIndexBy: number[];
    const unionBy: number[];
    const unionWith: number[];
    const updateWith: number[];
    const xorBy: number[];
    const xorWith: number[];
    const zipWith: number[];
}
export namespace methodSpread {
    export namespace assignAll {
        const start: number;
    }
    export namespace assignAllWith_1 {
        const start_1: number;
        export { start_1 as start };
    }
    export { assignAllWith_1 as assignAllWith };
    export namespace assignInAll {
        const start_2: number;
        export { start_2 as start };
    }
    export namespace assignInAllWith_1 {
        const start_3: number;
        export { start_3 as start };
    }
    export { assignInAllWith_1 as assignInAllWith };
    export namespace defaultsAll {
        const start_4: number;
        export { start_4 as start };
    }
    export namespace defaultsDeepAll {
        const start_5: number;
        export { start_5 as start };
    }
    export namespace invokeArgs {
        const start_6: number;
        export { start_6 as start };
    }
    export namespace invokeArgsMap {
        const start_7: number;
        export { start_7 as start };
    }
    export namespace mergeAll {
        const start_8: number;
        export { start_8 as start };
    }
    export namespace mergeAllWith_1 {
        const start_9: number;
        export { start_9 as start };
    }
    export { mergeAllWith_1 as mergeAllWith };
    export namespace partial {
        const start_10: number;
        export { start_10 as start };
    }
    export namespace partialRight {
        const start_11: number;
        export { start_11 as start };
    }
    export namespace without {
        const start_12: number;
        export { start_12 as start };
    }
    export namespace zipAll {
        const start_13: number;
        export { start_13 as start };
    }
}
export namespace mutate {
    namespace array {
        export const fill: boolean;
        export const pull: boolean;
        export const pullAll: boolean;
        const pullAllBy_1: boolean;
        export { pullAllBy_1 as pullAllBy };
        const pullAllWith_1: boolean;
        export { pullAllWith_1 as pullAllWith };
        export const pullAt: boolean;
        const remove_1: boolean;
        export { remove_1 as remove };
        export const reverse: boolean;
    }
    namespace object {
        export const assign: boolean;
        const assignAll_1: boolean;
        export { assignAll_1 as assignAll };
        const assignAllWith_2: boolean;
        export { assignAllWith_2 as assignAllWith };
        export const assignIn: boolean;
        const assignInAll_1: boolean;
        export { assignInAll_1 as assignInAll };
        const assignInAllWith_2: boolean;
        export { assignInAllWith_2 as assignInAllWith };
        const assignInWith_1: boolean;
        export { assignInWith_1 as assignInWith };
        const assignWith_1: boolean;
        export { assignWith_1 as assignWith };
        export const defaults: boolean;
        const defaultsAll_1: boolean;
        export { defaultsAll_1 as defaultsAll };
        export const defaultsDeep: boolean;
        const defaultsDeepAll_1: boolean;
        export { defaultsDeepAll_1 as defaultsDeepAll };
        export const merge: boolean;
        const mergeAll_1: boolean;
        export { mergeAll_1 as mergeAll };
        const mergeAllWith_2: boolean;
        export { mergeAllWith_2 as mergeAllWith };
        const mergeWith_1: boolean;
        export { mergeWith_1 as mergeWith };
    }
    namespace set {
        const set_1: boolean;
        export { set_1 as set };
        const setWith_1: boolean;
        export { setWith_1 as setWith };
        export const unset: boolean;
        export const update: boolean;
        const updateWith_1: boolean;
        export { updateWith_1 as updateWith };
    }
}
export const realToAlias: {};
export namespace remap {
    const assignAll_2: string;
    export { assignAll_2 as assignAll };
    const assignAllWith_3: string;
    export { assignAllWith_3 as assignAllWith };
    const assignInAll_2: string;
    export { assignInAll_2 as assignInAll };
    const assignInAllWith_3: string;
    export { assignInAllWith_3 as assignInAllWith };
    export const curryN: string;
    export const curryRightN: string;
    const defaultsAll_2: string;
    export { defaultsAll_2 as defaultsAll };
    const defaultsDeepAll_2: string;
    export { defaultsDeepAll_2 as defaultsDeepAll };
    const findFrom_1: string;
    export { findFrom_1 as findFrom };
    const findIndexFrom_1: string;
    export { findIndexFrom_1 as findIndexFrom };
    const findLastFrom_1: string;
    export { findLastFrom_1 as findLastFrom };
    const findLastIndexFrom_1: string;
    export { findLastIndexFrom_1 as findLastIndexFrom };
    const getOr_1: string;
    export { getOr_1 as getOr };
    export const includesFrom: string;
    export const indexOfFrom: string;
    const invokeArgs_1: string;
    export { invokeArgs_1 as invokeArgs };
    const invokeArgsMap_1: string;
    export { invokeArgsMap_1 as invokeArgsMap };
    export const lastIndexOfFrom: string;
    const mergeAll_2: string;
    export { mergeAll_2 as mergeAll };
    const mergeAllWith_3: string;
    export { mergeAllWith_3 as mergeAllWith };
    const padChars_1: string;
    export { padChars_1 as padChars };
    const padCharsEnd_1: string;
    export { padCharsEnd_1 as padCharsEnd };
    const padCharsStart_1: string;
    export { padCharsStart_1 as padCharsStart };
    export const propertyOf: string;
    const rangeStep_1: string;
    export { rangeStep_1 as rangeStep };
    const rangeStepRight_1: string;
    export { rangeStepRight_1 as rangeStepRight };
    export const restFrom: string;
    export const spreadFrom: string;
    export const trimChars: string;
    export const trimCharsEnd: string;
    export const trimCharsStart: string;
    const zipAll_1: string;
    export { zipAll_1 as zipAll };
}
export namespace skipFixed {
    const castArray: boolean;
    const flow: boolean;
    const flowRight: boolean;
    const iteratee: boolean;
    const mixin: boolean;
    const rearg: boolean;
    const runInContext: boolean;
}
export namespace skipRearg {
    export const add: boolean;
    const assign_1: boolean;
    export { assign_1 as assign };
    const assignIn_1: boolean;
    export { assignIn_1 as assignIn };
    export const bind: boolean;
    export const bindKey: boolean;
    export const concat: boolean;
    export const difference: boolean;
    export const divide: boolean;
    export const eq: boolean;
    export const gt: boolean;
    export const gte: boolean;
    export const isEqual: boolean;
    export const lt: boolean;
    export const lte: boolean;
    export const matchesProperty: boolean;
    const merge_1: boolean;
    export { merge_1 as merge };
    export const multiply: boolean;
    export const overArgs: boolean;
    const partial_1: boolean;
    export { partial_1 as partial };
    const partialRight_1: boolean;
    export { partialRight_1 as partialRight };
    const propertyOf_1: boolean;
    export { propertyOf_1 as propertyOf };
    export const random: boolean;
    export const range: boolean;
    export const rangeRight: boolean;
    export const subtract: boolean;
    export const zip: boolean;
    export const zipObject: boolean;
    export const zipObjectDeep: boolean;
}
