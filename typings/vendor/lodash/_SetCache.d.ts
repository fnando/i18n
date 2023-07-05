export = SetCache;
declare function SetCache(values?: any[] | undefined): void;
declare class SetCache {
    private constructor();
    __data__: MapCache;
    add: typeof setCacheAdd;
    push: typeof setCacheAdd;
    has: typeof setCacheHas;
}
import MapCache = require("./_MapCache");
import setCacheAdd = require("./_setCacheAdd");
import setCacheHas = require("./_setCacheHas");
