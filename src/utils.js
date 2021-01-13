export const handleError = (error, args) => {
    console.log('error', {
        error: error,
        args
    });
};

export const random = (number) => {
    let text = '';
    let possible = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < number; i++) {text += possible.charAt(Math.floor(Math.random() * possible.length))}

    return text;

};

export const getObjectPropSafely = (fn, defaultValue = '') => {
    try {
        return fn();
    } catch (e) {
        return defaultValue;
    }
};

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

// Check if value is undefined
export const isUndefined = v => v === undefined;

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

export const isEmpty = obj => !Object.keys(obj).length;
