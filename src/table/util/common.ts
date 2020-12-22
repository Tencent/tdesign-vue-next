export function toString(obj: any): string {
  return Object.prototype.toString
    .call(obj)
    .slice(8, -1)
    .toLowerCase();
}

export function debounce<T = any>(fn: Function, delay = 200): () => void {
  let timer: ReturnType<typeof setTimeout>;
  return function newFn(this: T, ...args: Array<any>): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}

export function filterDataByIds(
  data: Array<object> = [],
  ids: Array<string | number> = [],
  byId = 'id',
): Array<object> {
  return data.filter((d: Record<string, any> = {}) => ids.includes(d[byId]));
}

export const INNER_PRE_NAME = '@@inner-';
