export = ListCache;
declare function ListCache(entries?: any[] | undefined): void;
declare class ListCache {
    private constructor();
    clear: typeof listCacheClear;
    delete: typeof listCacheDelete;
    get: typeof listCacheGet;
    has: typeof listCacheHas;
    set: typeof listCacheSet;
}
import listCacheClear = require("./_listCacheClear");
import listCacheDelete = require("./_listCacheDelete");
import listCacheGet = require("./_listCacheGet");
import listCacheHas = require("./_listCacheHas");
import listCacheSet = require("./_listCacheSet");
