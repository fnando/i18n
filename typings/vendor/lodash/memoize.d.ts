export = memoize;
declare function memoize(func: Function, resolver?: Function | undefined): Function;
declare namespace memoize {
    export { MapCache as Cache };
}
import MapCache = require("./_MapCache");
