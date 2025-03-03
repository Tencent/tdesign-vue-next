export * from './useAction';
export * from './useSameTarget';

export function GetCSSValue(v: string | number) {
  return Number.isNaN(Number(v)) ? v : `${Number(v)}px`;
}
