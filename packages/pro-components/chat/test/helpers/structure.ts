/**
 * DOM 结构指纹（structure fingerprint）
 *
 * 目的：为「UI 层不产生 breaking change」提供可比对、可 code review 的断言依据。
 *
 * 设计原则（与底层实现解耦，迁移 webc -> 纯 Vue 后仍然成立）：
 * 1. 只保留标签名 + class + 少量语义属性，丢弃 style / id / data-v-* 等实现噪音；
 * 2. 图标（svg）折叠为一行，避免图标库实现差异导致误报；
 * 3. 注释节点、空白文本节点忽略；
 * 4. 属性采用白名单，webc 桥接期透传给自定义元素的 props（如 allow-content-segment-custom）
 *    不会进入指纹，迁移后这些属性消失也不会让用例失败。
 */

const KEEP_ATTRS = new Set([
  'class',
  'role',
  'type',
  'disabled',
  'href',
  'placement',
  'variant',
  'animation',
  'aria-label',
  'aria-expanded',
  'aria-hidden',
  'data-testid',
  'data-clipboard-text',
  'data-slot',
]);

const TEXT_TRUNCATE = 40;

const indent = (depth: number) => '  '.repeat(depth);

const normalizeText = (text: string) => text.replace(/\s+/g, ' ').trim();

const truncate = (text: string) => {
  const value = normalizeText(text);
  if (!value) return '';
  return value.length > TEXT_TRUNCATE ? `${value.slice(0, TEXT_TRUNCATE)}…` : value;
};

/** 元素自身（不含子节点）直接包含的文本 */
const ownText = (el: Element) =>
  Array.from(el.childNodes)
    .filter((node) => node.nodeType === Node.TEXT_NODE)
    .map((node) => node.textContent || '')
    .join('');

const serializeAttrs = (el: Element) => {
  const parts: string[] = [];
  const classList = Array.from(el.classList).filter(Boolean);
  if (classList.length) {
    parts.push(`.${classList.join('.')}`);
  }
  Array.from(el.attributes)
    .filter((attr) => KEEP_ATTRS.has(attr.name) && attr.name !== 'class')
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((attr) => {
      parts.push(`[${attr.name}=${attr.value}]`);
    });
  return parts.join('');
};

export interface StructureOptions {
  /** 排除已单独测试的子组件根节点，不依赖其底层标签或实现。 */
  omitRoots?: Element[];
}

const serializeNode = (node: Element, depth: number, lines: string[], options: StructureOptions) => {
  const tag = node.tagName.toLowerCase();

  if (options.omitRoots?.includes(node)) return;

  // 图标类元素折叠，避免 icon 实现变化带来的噪音
  if (tag === 'svg' || node.classList.contains('t-icon')) {
    const iconClass = Array.from(node.classList).find((item) => item.startsWith('t-icon-'));
    lines.push(`${indent(depth)}<svg${iconClass ? `.${iconClass}` : ''} />`);
    return;
  }

  const children = Array.from(node.children);
  const text = truncate(ownText(node));
  lines.push(`${indent(depth)}<${tag}${serializeAttrs(node)}>${text ? ` "${text}"` : ''}`);

  // 叶子节点不再递归
  if (!children.length) return;
  children.forEach((child) => serializeNode(child, depth + 1, lines, options));
};

/**
 * 生成 DOM 结构指纹字符串。
 * @param target 组件挂载后的根元素或 wrapper.element
 */
export const structureOf = (target: Element | null | undefined, options: StructureOptions = {}): string => {
  if (!target) return '';
  const lines: string[] = [];
  serializeNode(target, 0, lines, options);
  return lines.join('\n');
};

/** 判断结构中是否包含指定选择器（基于 class 关键字，避免依赖底层元素类型） */
export const hasClassToken = (target: Element | null | undefined, token: string): boolean => {
  if (!target) return false;
  const list = [target, ...Array.from(target.querySelectorAll('*'))];
  return list.some((el) => Array.from(el.classList).some((item) => item === token || item.startsWith(`${token}--`)));
};
