const hasOwnProperty = Object.prototype.hasOwnProperty;

export const hasOwn = <T extends object>(val: T, key: string | symbol | number): key is keyof T =>
  hasOwnProperty.call(val, key);
export const getPropertyValFromObj = <T extends object>(
  val: T,
  key: string | symbol | number,
): T[keyof T] | undefined => {
  return hasOwn(val, key) ? val[key] : undefined;
};

const objectToString: typeof Object.prototype.toString = Object.prototype.toString;
const toTypeString = (value: unknown): string => objectToString.call(value);
export const isArray: typeof Array.isArray = Array.isArray;
export const isMap = (val: unknown): val is Map<any, any> => toTypeString(val) === '[object Map]';
export const isSet = (val: unknown): val is Set<any> => toTypeString(val) === '[object Set]';
export const isDate = (val: unknown): val is Date => toTypeString(val) === '[object Date]';
export const isRegExp = (val: unknown): val is RegExp => toTypeString(val) === '[object RegExp]';
export const isFunction = (val: unknown): val is Function => typeof val === 'function';
export const isString = (val: unknown): val is string => typeof val === 'string';
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol';
export const isPlainObject = (val: unknown): val is object => toTypeString(val) === '[object Object]';
export const isObject = (val: unknown): val is object => val !== null && typeof val === 'object';
export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return (isObject(val) || isFunction(val)) && isFunction((val as any).then) && isFunction((val as any).catch);
};
