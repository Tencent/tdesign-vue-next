import type { FilterPattern } from 'unplugin-utils';

export function isExclude(name: string, exclude?: FilterPattern): boolean {
  if (!exclude) return false;

  if (typeof exclude === 'string') return name === exclude;

  if (exclude instanceof RegExp) return !!name.match(exclude);

  if (Array.isArray(exclude)) {
    for (const item of exclude) {
      if (name === item || name.match(item)) return true;
    }
  }
  return false;
}
