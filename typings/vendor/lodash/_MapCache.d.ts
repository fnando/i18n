export = MapCache;
declare function MapCache(entries?: any[] | undefined): void;
declare class MapCache {
    private constructor();
    clear: typeof mapCacheClear;
    delete: typeof mapCacheDelete;
    get: typeof mapCacheGet;
    has: typeof mapCacheHas;
    set: typeof mapCacheSet;
}
import mapCacheClear = require("./_mapCacheClear");
import mapCacheDelete = require("./_mapCacheDelete");
import mapCacheGet = require("./_mapCacheGet");
import mapCacheHas = require("./_mapCacheHas");
import mapCacheSet = require("./_mapCacheSet");
