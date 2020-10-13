import routes from 'Src/routes';
import {matchPath} from 'react-router';

const isArray = Array.isArray || function(val) {
    return (val instanceof Array);
};

const isAttributes = (jml) => {
    return !!jml && ('object' === typeof jml) && !isArray(jml);
};

const isElement = (jml) => {
    return isArray(jml) && ('string' === typeof jml[0]);
};

const hasAttributes = (jml) => {
    if (!isElement(jml)) {
        //   throw new SyntaxError('invalid JsonML');
        console.log('error');
    }

    return isAttributes(jml[1]);
};

export const random = (number) => {
    let text = '';
    let possible = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < number; i++) {text += possible.charAt(Math.floor(Math.random() * possible.length))}

    return text;
    
};

export const getChildren = (jml) => {
    if (hasAttributes(jml)) {
        return jml.slice(2);
    }

    return jml.slice(1);
};

export const getObjectPropSafely = (fn, defaultValue = '') => {
    try {
        return fn();
    } catch (e) {
        return defaultValue;
    }
};

/**
 * Pick props from an object
 * @example
 * pickProps(['name'])({id: 1, name: 'Thao'}) = {name: 'Thao'}
 *
 * Use with Array.prototype.map
 * @example
 * [{id: 1, name: 'Thao'}].map(pickProps('id')) = [{id: 1}]
 */
export const pickProps = (...names) => obj => Object.fromEntries(names.flat().map(key => [key, obj[key]]));

/**
 * Pick props (that not in params) from an object 
 * 
 * Oposite with @see pickProps
 * @example
 * pullProps(['name'])({id: 1, name: 'Thao'}) = {id: 1}
 *
 * Use with Array.prototype.map
 * @example
 * [{id: 1, name: 'Thao'}].map(pullProps('id')) = [{name: 'Thao'}]
 */
export const pullProps = (...names) => obj => Object.fromEntries(Object.entries(obj).filter(([k]) => !names.flat().includes(k)));

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Combines n functions. It’s a pipe flowing left-to-right, calling each function with the output of the last one.
 * @example
 * pipe(
 *  getName,
 *  uppercase,
 *  get6Characters,
 *  reverse
 * )({ name: 'Buckethead' }) === reverse(get6Characters(uppercase(getName({ name: 'Buckethead' }))));
 * @param  {...Function} fns
 */
export const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

/**
 * Combines n functions. It’s a pipe flowing right-to-left, calling each function with the output of the last one.
 * @example
 * pipe(
 * reverse,
 * get6Characters,
 * uppercase,
 * getName
 * )({ name: 'Buckethead' }) === reverse(get6Characters(uppercase(getName({ name: 'Buckethead' }))));
 * @param  {...Function} fns
 */
export const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x);

export const broadcastChannel = getObjectPropSafely(() => new BroadcastChannel('antalyser-broadcast-channel')) || {};

export const noop = () => {};
export const returnEmptyObj = () => ({});

// Check if value is undefined
export const isUndefined = v => v === undefined;

// Check if value is null
export const isNull = v => v === null;

// Check if value is a function
export const isFunction = v => typeof v === 'function';

/**
 * Take n functions to make their execution results AND with each others
 * @param  {...Function} ops 
 * 
 * @example
 * const isNotUndefined = v => v !== undefined;
 * const isObject = v => typeof v === 'object';
 * and(isNotUndefined, isObject)({'asd': true})) = true
 */
export const and = (...ops) => (...args) => ops.reduce((a, b) => a && b(...args), true);

/**
 * Take n functions to make their execution results OR with each others
 * @param  {...Function} ops 
 * 
 * @example
 * or(isUndefined, isNull)({'asd': true})) = false
 * or(isUndefined, isNull)(null)) = true
 * or(isUndefined, isNull)(undefined)) = true
 */
export const or = (...ops) => (...args) => ops.reduce((a, b) => a || b(...args), false);

/**
 * If @param obj is undefined then return @param alt
 * @param {any} obj
 * @param {any} alt
 * 
 * @example
 * otherwise(21, 23) = 21;
 * otherwise(undefined, 123) = 123;
 */
export const otherwise = (obj, alt) => isUndefined(obj) ? alt : obj;

export const immutableSet = (obj, key, value) => set({...obj}, key, value);

/**
 * Execute the function with each value
 * @param {Function} fn 
 * @example 
 * executeWithSpreadedArray((v) => v*2)(1, 2) = [2, 4]
 */
export const executeWithSpreadedArray = fn => (...arr) => arr.map(fn);

/**
 * Expose two functions
 * 
 * `.keys`: Execute the function with each key of object
 * 
 * `.values`: Execute the function with each value in object
 * 
 * @example 
 * executeWithObject.keys((v) => v + v)({a: 1, b: 2}) = {a: 'aa', b: 'bb'}
 * 
 * @example 
 * executeWithObject.values((v) => v*2)({a: 1, b: 2}) = {a: 2, b: 4}
 */
export const executeWithObject = (() => {
    const withKey = fn => ([k, _]) => fn(k);
    const withVal = fn => ([_, v]) => fn(v);
    const withEntry = fn => ([k, v]) => fn([k, v]);
    const toEntry = fn => ([k, v]) => [k, fn([k, v])];

    const execute = hof => fn => obj => 
        Object.fromEntries(Object.entries(obj).map(toEntry(hof(fn))));

    return {
        keys: execute(withKey),
        values: execute(withVal),
        entries: execute(withEntry)
    };
})();

export const isEmpty = obj => !Object.keys(obj).length;

// Helper to create partially applied functions
// Takes a function and some arguments
export const partial = (f, ...args) =>
// returns a function that takes the rest of the arguments
    (...moreArgs) =>
    // and calls the original function with all of them
        f(...args, ...moreArgs);

export const getMatchFromPath = (path) => {
    try {
        // path: /1210044026/report/my-report-template

        let result = null;

        routes.forEach(function(route) {
            const match = matchPath(path, {
                path: route.path,
                exact: true,
                strict: false
            });

            if (match && match.params && match.path && route.state) {
                result = {
                    ...match,
                    state: route.state
                };

                return result;
            }
        });

        return result;
    } catch (error) {}
};
