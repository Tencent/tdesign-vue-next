import { isFunction, isObject } from 'lodash-es';

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
export const isPlainObject = <T extends object>(val: unknown): val is T => toTypeString(val) === '[object Object]';
export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return (isObject(val) || isFunction(val)) && isFunction((val as any).then) && isFunction((val as any).catch);
};
