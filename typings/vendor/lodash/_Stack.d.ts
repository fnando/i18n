export = Stack;
declare function Stack(entries?: any[] | undefined): void;
declare class Stack {
    private constructor();
    __data__: ListCache;
    size: any;
    clear: typeof stackClear;
    delete: typeof stackDelete;
    get: typeof stackGet;
    has: typeof stackHas;
    set: typeof stackSet;
}
import ListCache = require("./_ListCache");
import stackClear = require("./_stackClear");
import stackDelete = require("./_stackDelete");
import stackGet = require("./_stackGet");
import stackHas = require("./_stackHas");
import stackSet = require("./_stackSet");
