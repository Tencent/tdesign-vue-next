const SAFE_URL_PROTOCOL_RE = /^(?:https?|mailto|tel|ftp|sms):/i;
// data: 仅允许图片白名单
const SAFE_DATA_IMAGE_RE = /^data:image\/(?:png|jpe?g|gif|webp|svg\+xml|bmp|x-icon)[;,]/i;

// 危险标签：完全移除（含其内容）
const DANGEROUS_TAG_RE =
  /<\s*\/?\s*(script|iframe|frame|frameset|object|embed|applet|link|meta|style|base|form|input|button|textarea|select|option|svg|math|template|portal|noscript)\b[^>]*>/gi;
// 容器型危险标签内的内容也要清除（如 <script>...</script>、<style>...</style>）
const DANGEROUS_BLOCK_RE =
  /<\s*(script|style|iframe|object|embed|noscript|template|svg|math)\b[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi;
// 事件属性：onxxx=
const ON_EVENT_ATTR_RE = /\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi;
// 含 javascript: / vbscript: / data: 协议的危险属性
const DANGEROUS_URL_ATTR_RE =
  /\s+(href|src|xlink:href|formaction|action|poster|background|data|cite|longdesc|ping|srcdoc)\s*=\s*(?:"\s*(?:javascript|vbscript|data)\s*:[^"]*"|'\s*(?:javascript|vbscript|data)\s*:[^']*'|\s*(?:javascript|vbscript|data)\s*:[^\s>]*)/gi;
// srcdoc 属性（允许 iframe 内嵌任意 HTML）一律去除
const SRCDOC_ATTR_RE = /\s+srcdoc\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi;

export function sanitizeUrl(rawHref: string | null | undefined): string {
  if (rawHref == null) return '';
  // 去掉控制字符（含 \t \n \r 等），浏览器会忽略但可用于绕过协议匹配。
  const href = String(rawHref)
    .replace(/[\u0000-\u001F\u007F]+/g, '')
    .trim();
  if (!href) return '';
  // 允许相对路径、协议相对、锚点
  if (/^(?:[/?#]|\.{1,2}\/|\/\/)/.test(href)) return href;
  // 不带协议的纯文本，按相对路径处理
  if (!/^[a-z][a-z0-9+.-]*:/i.test(href)) return href;
  if (SAFE_URL_PROTOCOL_RE.test(href)) return href;
  return '';
}

export function sanitizeImageUrl(rawHref: string | null | undefined): string {
  if (rawHref == null) return '';
  const href = String(rawHref)
    .replace(/[\u0000-\u001F\u007F]+/g, '')
    .trim();
  if (!href) return '';
  if (/^(?:[/?#]|\.{1,2}\/|\/\/)/.test(href)) return href;
  if (!/^[a-z][a-z0-9+.-]*:/i.test(href)) return href;
  if (SAFE_URL_PROTOCOL_RE.test(href)) return href;
  if (SAFE_DATA_IMAGE_RE.test(href)) return href;
  return '';
}

export function sanitizeHtml(html: string): string {
  if (!html) return '';
  return html
    .replace(DANGEROUS_BLOCK_RE, '')
    .replace(DANGEROUS_TAG_RE, '')
    .replace(ON_EVENT_ATTR_RE, '')
    .replace(SRCDOC_ATTR_RE, '')
    .replace(DANGEROUS_URL_ATTR_RE, '');
}
