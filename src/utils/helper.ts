export function omit(obj: object, fields: string[]): object {
  const shallowCopy = {
    ...obj,
  };
  for (let i = 0; i < fields.length; i++) {
    const key = fields[i];
    delete shallowCopy[key];
  }
  return shallowCopy;
};

export function removeEmptyAttrs<T>(obj: T): Partial<T>  {
  const newObj = {};

  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] !== 'undefined' || obj[key] === null) {
      newObj[key] = obj[key];
    }
  });

  return newObj;
}

export function getTabElementByName(tabs: [] = [], name: string): object {
  const [result] = tabs.filter((item) => {
    const { id } = item as any;
    return id === name;
  });
  return result || null;
}

export function firstUpperCase(str: string): string {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (char: string) => char.toUpperCase());
}
