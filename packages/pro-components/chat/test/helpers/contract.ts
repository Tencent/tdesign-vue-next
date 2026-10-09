/**
 * 组件 API 契约采集
 *
 * 只从「组件定义」本身读取 props / emits / name，不从渲染结果推断，
 * 因此与底层实现（webc 自定义元素 或 纯 Vue 组件）无关。
 * 迁移过程中任何 prop 改名、删减、默认值变化都会在这里被拦截。
 */

type AnyRecord = Record<string, any>;

export interface PropContract {
  /** 归一化后的类型描述，如 String / [String, Number] / Boolean */
  type: string;
  /** 归一化后的默认值（工厂函数会展开为返回值） */
  default?: unknown;
  required: boolean;
}

export interface ComponentContract {
  name?: string;
  props: Record<string, PropContract>;
  emits: string[];
}

const typeName = (type: any): string => {
  if (type === null || type === undefined) return 'null';
  if (Array.isArray(type)) return `[${type.map(typeName).join(', ')}]`;
  if (typeof type === 'function') return type.name || 'Function';
  return String(type);
};

/** 保留原有运行时类型成员，允许扩展；Boolean 的转换顺序必须保持。 */
export const acceptsExistingPropTypes = (actual: string, previous: string): boolean => {
  const members = (type: string) =>
    type
      .replace(/^\[|\]$/g, '')
      .split(',')
      .map((name) => name.trim());
  const before = members(previous);
  const after = members(actual);
  if (before.includes('Boolean') || after.includes('Boolean')) {
    if (before.includes('Boolean') !== after.includes('Boolean')) return false;
    const castsString = (types: string[]) =>
      !types.includes('String') || types.indexOf('Boolean') < types.indexOf('String');
    if (castsString(before) !== castsString(after)) return false;
  }
  return actual === 'null' || before.every((type) => after.includes(type));
};

const normalizeDefault = (prop: AnyRecord): unknown => {
  if (!('default' in prop)) return undefined;
  const def = prop.default;
  // 工厂默认值：仅当 prop 类型不是 Function 时才调用
  if (typeof def === 'function' && typeName(prop.type) !== 'Function') {
    try {
      return def();
    } catch {
      return '<factory>';
    }
  }
  if (typeof def === 'function') return '<fn>';
  if (def === undefined) return undefined;
  return def;
};

const toSerializable = (value: unknown): unknown => {
  if (value === undefined || value === null) return value;
  if (typeof value === 'function') return '<fn>';
  if (Array.isArray(value)) return value.map(toSerializable);
  if (typeof value === 'object') {
    return Object.keys(value as AnyRecord)
      .sort()
      .reduce<AnyRecord>((acc, key) => {
        acc[key] = toSerializable((value as AnyRecord)[key]);
        return acc;
      }, {});
  }
  return value;
};

/** 采集组件的 props 契约 */
export const propsOf = (component: any): Record<string, PropContract> => {
  const raw = component?.props || {};
  const result: Record<string, PropContract> = {};
  Object.keys(raw)
    .sort()
    .forEach((key) => {
      const prop = typeof raw[key] === 'function' ? { type: raw[key] } : raw[key] || {};
      result[key] = {
        type: typeName(prop.type),
        default: toSerializable(normalizeDefault(prop)),
        required: Boolean(prop.required),
      };
    });
  return result;
};

/** 采集组件的 emits 契约 */
export const emitsOf = (component: any): string[] => {
  const raw = component?.emits;
  if (!raw) return [];
  const list = Array.isArray(raw) ? raw : Object.keys(raw);
  return [...list].sort();
};

/** 采集组件完整契约 */
export const contractOf = (component: any): ComponentContract => ({
  name: component?.name,
  props: propsOf(component),
  emits: emitsOf(component),
});

/** 仅保留 prop 名称列表，用于「新增/删除 prop」的快速比对 */
export const propNamesOf = (component: any): string[] => Object.keys(propsOf(component));
