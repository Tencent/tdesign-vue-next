/**
 * 类型函数
 * 将字符类型转换成 CamelCase 类型
 * @param S 字符串
 * @param B 字符串的分隔符，默认为 '_'
 * @example CamelCase<'a_b_c'> -> aBC
 * @example CamelCase<'a-b-c', '-'> -> aBC
 */
export type CamelCase<S extends string, B extends string = '_'> = S extends Lowercase<S>
  ? S extends `${infer F}${B}${infer RF}${infer R}`
    ? `${F}${Uppercase<RF>}${CamelCase<R, B>}`
    : S
  : CamelCase<Lowercase<S>, B>;
