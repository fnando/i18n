export = stackSet;
declare function stackSet(key: string, value: any): Object;
declare class stackSet {
    private constructor();
    size: any;
    __data__: MapCache | undefined;
}
import MapCache = require("./_MapCache");
