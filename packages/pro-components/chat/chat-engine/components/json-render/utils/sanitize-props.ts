/**
 * A2UI / json-render 传入组件 props 前的黑名单过滤工具
 *
 * 使用场景：
 * 服务端下发的 element.props 经过 `{...restProps}` 展开到 DOM 元素时，可能
 * 携带如下危险字段：
 *   1. `innerHTML` / `outerHTML` / `textContent` / `srcdoc`：Vue 3 patchDOMProp
 *       对原生元素上命中 DOM property 的键会直接赋值，可执行任意脚本（XSS）
 *   2. `dangerouslySetInnerHTML`：跨端 schema 复用时的兜底禁字段
 *   3. `href` / `src` 等 URL 属性中的 `javascript:` / `data:` / `vbscript:` 协议
 *   4. 字符串型的 `onXxx` 事件处理器（Vue 只接受函数，字符串会被 setAttribute
 *      落到原生元素上，浏览器会作为 HTML 事件处理器执行）
 *
 * 本工具通过黑名单方式过滤上述危险字段，保证展开到 DOM 的 props 安全。
 *
 * 为什么不用 DOMPurify：
 * - DOMPurify 用于清洗「HTML 字符串」，我们的场景是过滤「组件 props 对象」
 * - 引入 DOMPurify 会增加 ~20KB gzip 包体积，且用途不对口
 * - chat-engine 明确禁止使用 v-html 渲染 AI 内容
 */

/** 禁止透传到 DOM 的 XSS 通道字段 */
const BLOCKED_KEYS = new Set<string>([
  // Vue 3 patchDOMProp 命中即赋值到真实 DOM property 的键
  'innerHTML',
  'outerHTML',
  'textContent',
  'srcdoc',
  // 跨端 schema 兼容兜底
  'dangerouslySetInnerHTML',
]);

/** 危险的 URL 协议 */
const DANGEROUS_URL_PROTOCOL = /^\s*(javascript|data|vbscript):/i;

/** 需要做协议白名单校验的 URL 类属性 */
const URL_PROPS = new Set<string>(['href', 'src', 'action', 'formaction', 'poster', 'background', 'xlink:href']);

/** 事件处理器字段命名规则（Vue JSX 规范：onXxx） */
const EVENT_HANDLER_RE = /^on[A-Z]/;

/**
 * 过滤服务端下发的 props，避免 XSS 通道
 *
 * 处理规则：
 * 1. 命中 BLOCKED_KEYS 的字段直接丢弃
 * 2. URL 类属性中若使用危险协议（javascript: / data: / vbscript:），丢弃该字段
 * 3. `onXxx` 事件处理器若不是函数类型（例如字符串），丢弃该字段
 *
 * @param props 服务端下发的 props 对象
 * @returns 过滤后的安全 props 对象
 *
 * @example
 * ```tsx
 * const safeProps = sanitizeProps(element.props);
 * return <span {...safeProps}>{text}</span>;
 * ```
 */
export function sanitizeProps<T extends Record<string, unknown>>(props: T | null | undefined): Partial<T> {
  if (!props || typeof props !== 'object') {
    return {} as Partial<T>;
  }

  const result: Record<string, unknown> = {};

  for (const key of Object.keys(props)) {
    const value = props[key];

    // 1. 黑名单 key
    if (BLOCKED_KEYS.has(key)) continue;

    // 2. URL 协议校验
    if (URL_PROPS.has(key) && typeof value === 'string' && DANGEROUS_URL_PROTOCOL.test(value)) {
      continue;
    }

    // 3. 事件处理器必须是函数
    if (EVENT_HANDLER_RE.test(key) && typeof value !== 'function') {
      continue;
    }

    result[key] = value;
  }

  return result as Partial<T>;
}

export default sanitizeProps;
