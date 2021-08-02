export type LocalRule<T = any> = string | ((args: T) => string);

export interface ComponentLocale<T = any> {
  [propName: string]: LocalRule<T>;
}
export interface Locale {
  [componentName: string]: ComponentLocale;
};