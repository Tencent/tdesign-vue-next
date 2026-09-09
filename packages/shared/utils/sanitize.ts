/** 默认允许的 URL 协议白名单（用于 markdown link 等普通 href 场景） */
export const SAFE_URL_PROTOCOL_RE = /^(?:https?|mailto|tel|ftp|sms):/i;

/** data: 协议中仅放行的图片类 MIME 白名单（避免 data:text/html 被滥用） */
export const SAFE_DATA_IMAGE_RE = /^data:image\/(?:png|jpe?g|gif|webp|svg\+xml|bmp|x-icon)[;,]/i;

/** 危险脚本协议（javascript:/vbscript:） */
export const DANGEROUS_SCRIPT_PROTOCOL_RE = /^(?:javascript|vbscript):/i;

/** 相对路径 / 锚点 / 协议相对（//xxx） */
export const RELATIVE_URL_RE = /^(?:[/?#]|\.{1,2}\/|\/\/)/;

/** 任意"协议:"前缀（用于判断是否包含协议） */
export const ANY_PROTOCOL_RE = /^[a-z][a-z0-9+.-]*:/i;

/** 危险标签：完全移除（含其内容） */
export const DANGEROUS_TAG_RE =
  /<\s*\/?\s*(script|iframe|frame|frameset|object|embed|applet|link|meta|style|base|form|input|button|textarea|select|option|svg|math|template|portal|noscript)\b[^>]*>/gi;
/** 容器型危险标签内的内容也要清除（如 <script>...</script>、<style>...</style>） */
export const DANGEROUS_BLOCK_RE =
  /<\s*(script|style|iframe|object|embed|noscript|template|svg|math)\b[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi;
/** 事件属性：onxxx= */
export const ON_EVENT_ATTR_RE = /\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi;
/** 含 javascript: / vbscript: / data: 协议的危险属性 */
export const DANGEROUS_URL_ATTR_RE =
  /\s+(href|src|xlink:href|formaction|action|poster|background|data|cite|longdesc|ping|srcdoc)\s*=\s*(?:"\s*(?:javascript|vbscript|data)\s*:[^"]*"|'\s*(?:javascript|vbscript|data)\s*:[^']*'|\s*(?:javascript|vbscript|data)\s*:[^\s>]*)/gi;
/** srcdoc 属性（允许 iframe 内嵌任意 HTML）一律去除 */
export const SRCDOC_ATTR_RE = /\s+srcdoc\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi;

/**
 * 剥离 URL/属性值中的控制字符（含 NUL、Tab、换行等），用于挡住
 * `java&#9;script:` / `java\tscript:` 之类的协议黑名单绕过。
 */
export const stripCtrlChars = (value: string): string => (value || '').replace(/[\u0000-\u001F\u007F]+/g, '');

const normalizeUrlInput = (rawHref: string | null | undefined): string => {
  if (rawHref == null) return '';
  return stripCtrlChars(String(rawHref)).trim();
};

/**
 * 判定一个 URL 字符串是否含有危险协议（javascript:/vbscript:/非图片 data:）。
 * 在判定前会自动剥离控制字符。
 */
export const isDangerousUrl = (rawValue: string): boolean => {
  const value = normalizeUrlInput(rawValue);
  if (!value) return false;
  if (DANGEROUS_SCRIPT_PROTOCOL_RE.test(value)) return true;
  if (/^data:/i.test(value) && !SAFE_DATA_IMAGE_RE.test(value)) return true;
  return false;
};

/**
 * 判定 style 属性值是否含有危险表达式（IE expression / 协议跳转 / @import）。
 */
export const isDangerousStyle = (rawValue: string): boolean => {
  const value = stripCtrlChars(rawValue || '');
  return /expression\s*\(|javascript\s*:|vbscript\s*:|@import/i.test(value);
};

/**
 * 通用 URL 清洗：放行 http(s)/mailto/tel/ftp/sms 与相对路径/锚点/协议相对，
 * 否则返回空串。适用于 markdown link 等纯链接场景。
 */
export function sanitizeUrl(rawHref: string | null | undefined): string {
  const href = normalizeUrlInput(rawHref);
  if (!href) return '';
  // 相对路径、锚点、协议相对一律放行
  if (RELATIVE_URL_RE.test(href)) return href;
  // 不带协议的纯文本，按相对路径处理
  if (!ANY_PROTOCOL_RE.test(href)) return href;
  if (SAFE_URL_PROTOCOL_RE.test(href)) return href;
  return '';
}

/**
 * 图片 URL 清洗：在 sanitizeUrl 基础上额外允许安全的 data:image/* 协议。
 * 适用于 markdown img src 等场景。
 */
export function sanitizeImageUrl(rawHref: string | null | undefined): string {
  const href = normalizeUrlInput(rawHref);
  if (!href) return '';
  if (RELATIVE_URL_RE.test(href)) return href;
  if (!ANY_PROTOCOL_RE.test(href)) return href;
  if (SAFE_URL_PROTOCOL_RE.test(href)) return href;
  if (SAFE_DATA_IMAGE_RE.test(href)) return href;
  return '';
}

/**
 * 基于正则的 HTML 清洗：移除危险标签/属性，适用于 Markdown 渲染后的 XSS 过滤。
 */
export function sanitizeHtml(html: string): string {
  if (!html) return '';
  return html
    .replace(DANGEROUS_BLOCK_RE, '')
    .replace(DANGEROUS_TAG_RE, '')
    .replace(ON_EVENT_ATTR_RE, '')
    .replace(SRCDOC_ATTR_RE, '')
    .replace(DANGEROUS_URL_ATTR_RE, '');
}

// ---------------------------------------------------------------------------
// SVG 结构化清洗
// ---------------------------------------------------------------------------

/** 需要整体剔除（连同其子节点）的危险标签 */
const SVG_DANGEROUS_TAGS = new Set<string>([
  'script',
  'foreignobject',
  'iframe',
  'frame',
  'frameset',
  'object',
  'embed',
  'link',
  'meta',
  'base',
  'style',
  'form',
  'input',
  'button',
  'textarea',
  'select',
  'option',
  'audio',
  'video',
  'source',
  'track',
  'portal',
  'noscript',
  'template',
  'handler',
  'listener',
  'set',
]);

/** 可能承载危险 URL 的属性名（覆盖常见 SVG / HTML 用法） */
const SVG_URL_ATTR_NAMES = new Set<string>([
  'href',
  'xlink:href',
  'src',
  'action',
  'formaction',
  'background',
  'poster',
  'ping',
  'longdesc',
  'cite',
  'data',
  'srcdoc',
]);

const sanitizeElementAttributes = (el: Element): void => {
  for (const attr of Array.from(el.attributes)) {
    const name = attr.name.toLowerCase();
    // 1) 所有 on* 事件属性一律删除
    if (name.startsWith('on')) {
      el.removeAttribute(attr.name);
      continue;
    }
    // 2) URL 类属性中含危险协议则删除该属性
    if (SVG_URL_ATTR_NAMES.has(name) && isDangerousUrl(attr.value)) {
      el.removeAttribute(attr.name);
      continue;
    }
    // 3) style 中的 expression / javascript: / @import 等
    if (name === 'style' && isDangerousStyle(attr.value)) {
      el.removeAttribute(attr.name);
    }
  }
};

const sanitizeElementTree = (node: Element): void => {
  // 先做快照避免在迭代过程中删除节点导致集合变化
  for (const child of Array.from(node.children)) {
    const tag = child.localName?.toLowerCase?.() ?? '';
    if (SVG_DANGEROUS_TAGS.has(tag)) {
      child.remove();
      continue;
    }
    sanitizeElementAttributes(child);
    sanitizeElementTree(child);
  }
};

export const sanitizeSvg = (svgText: string): string => {
  if (!svgText || typeof svgText !== 'string') return '';
  if (typeof DOMParser === 'undefined' || typeof XMLSerializer === 'undefined') return '';

  let doc: Document;
  try {
    doc = new DOMParser().parseFromString(svgText, 'image/svg+xml');
  } catch {
    return '';
  }

  // XML 解析失败时浏览器会插入 <parsererror>
  if (doc.querySelector('parsererror')) return '';

  const root = doc.documentElement;
  if (!root || root.localName?.toLowerCase() !== 'svg') return '';

  sanitizeElementAttributes(root);
  sanitizeElementTree(root);

  try {
    return new XMLSerializer().serializeToString(root);
  } catch {
    return '';
  }
};

// ---------------------------------------------------------------------------
// Props 对象清洗（用于把服务端 / LLM 下发的 JSON props 展开到 DOM 前的 XSS 兜底）
// ---------------------------------------------------------------------------

/**
 * 禁止透传到 DOM 的 XSS 通道字段。
 *
 * - `innerHTML` / `outerHTML` / `textContent` / `srcdoc`：Vue 3 `patchDOMProp`
 *   对原生元素上命中 DOM property 的键会直接赋值，可执行任意脚本。
 * - `dangerouslySetInnerHTML`：跨端（React）schema 兼容兜底。
 */
const BLOCKED_PROP_KEYS = new Set<string>([
  'innerHTML',
  'outerHTML',
  'textContent',
  'srcdoc',
  'dangerouslySetInnerHTML',
]);

/**
 * 需要做协议校验的 URL 类属性键（覆盖 Vue JSX camelCase / kebab-case / SVG xlink）。
 */
const URL_PROP_KEYS = new Set<string>([
  'href',
  'src',
  'action',
  'formaction',
  'formAction',
  'poster',
  'background',
  'ping',
  'longdesc',
  'cite',
  'data',
  'xlink:href',
  'xlinkHref',
]);

/** 事件处理器字段命名规则（Vue JSX 规范：onXxx；同时兼容小写 onclick 之类） */
const EVENT_HANDLER_PROP_RE = /^on[a-zA-Z]/;

/**
 * 过滤服务端 / LLM 下发的组件 props 对象，避免 XSS 通道。
 *
 * 适用场景：JSON-driven UI（如 a2ui / json-render）把 `element.props` 通过
 * `{...props}` 展开到 TDesign 组件或原生 DOM 元素时的兜底净化。
 *
 * 处理规则：
 * 1. 命中 `BLOCKED_PROP_KEYS` 的字段直接丢弃
 * 2. URL 类属性通过 `isDangerousUrl` 判定为危险协议时丢弃该字段
 * 3. `style` 字符串通过 `isDangerousStyle` 判定含 expression / javascript: / @import 时丢弃
 * 4. `onXxx` 事件处理器若不是函数类型（例如字符串），丢弃该字段
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
    if (BLOCKED_PROP_KEYS.has(key)) continue;

    // 2. URL 协议校验（复用 isDangerousUrl，自动剥离控制字符）
    if (URL_PROP_KEYS.has(key) && typeof value === 'string' && isDangerousUrl(value)) {
      continue;
    }

    // 3. style 表达式校验
    if (key === 'style' && typeof value === 'string' && isDangerousStyle(value)) {
      continue;
    }

    // 4. 事件处理器必须是函数
    if (EVENT_HANDLER_PROP_RE.test(key) && typeof value !== 'function') {
      continue;
    }

    result[key] = value;
  }

  return result as Partial<T>;
}
