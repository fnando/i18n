export = Hash;
declare function Hash(entries?: any[] | undefined): void;
declare class Hash {
    private constructor();
    clear: typeof hashClear;
    delete: typeof hashDelete;
    get: typeof hashGet;
    has: typeof hashHas;
    set: typeof hashSet;
}
import hashClear = require("./_hashClear");
import hashDelete = require("./_hashDelete");
import hashGet = require("./_hashGet");
import hashHas = require("./_hashHas");
import hashSet = require("./_hashSet");
