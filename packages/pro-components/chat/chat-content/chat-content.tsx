import { defineComponent, computed, inject, onMounted, ComputedRef } from 'vue';
import { useConfig } from 'tdesign-vue-next/es/config-provider/hooks';
import { usePrefixClass } from '@tdesign/shared-hooks';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import Clipboard from 'clipboard';
import props from './chat-content-props';
import ChatMarkdown from '../chat-markdown';

const escapeTest = /[&<>"']/;
const escapeReplace = new RegExp(escapeTest.source, 'g');
const escapeTestNoEncode = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;
const escapeReplaceNoEncode = new RegExp(escapeTestNoEncode.source, 'g');
type IEscape = {
  [key in '&<>"\'']: string;
};
const escapeReplacements: IEscape = {
  // @ts-ignore
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};
const getEscapeReplacement = (ch: string): string => escapeReplacements[ch as keyof IEscape];

function escape(html: string, encode: Boolean = false) {
  if (encode) {
    if (escapeTest.test(html)) {
      return html.replace(escapeReplace, getEscapeReplacement);
    }
  } else if (escapeTestNoEncode.test(html)) {
    return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
  }

  return html;
}

export default defineComponent({
  name: 'TChatContent',
  components: {},
  props,
  setup(props) {
    const COMPONENT_NAME = usePrefixClass('chat');
    const { globalConfig } = useConfig('chat');

    // role 没被注入的时候，使用props.role来自chat-item传入，content在插槽里的inject，修复role数据混乱问题
    const injectedRole = inject<ComputedRef<string>>('role', null);
    const role = computed(() => props.role || injectedRole?.value || '');
    onMounted(() => {
      const clipboard = new Clipboard(`.${COMPONENT_NAME.value}__copy-btn`, {
        target: (trigger: HTMLDivElement) => (trigger.parentNode as HTMLElement).nextElementSibling,
      });
      const { copyCodeBtnText, copyCodeSuccessText } = globalConfig.value;

      clipboard.on('success', (e) => {
        e.trigger.textContent = copyCodeSuccessText;
        setTimeout(() => {
          e.trigger.textContent = copyCodeBtnText;
        }, 2000);
        e.clearSelection();
      });
    });

    const marked = new Marked(
      markedHighlight({
        highlight(code) {
          return hljs.highlightAuto(code).value;
        },
      }),
      {
        renderer: {
          code(code, lang, escaped) {
            return `<pre class="hljs"><div class="t-chat__code-header">
        <span class="t-chat__language-txt">${escape(lang) || ''}</span>
        <div class="t-chat__copy-btn" data-clipboard-action="copy">${globalConfig.value.copyCodeBtnText}</div>
        </div><code class="hljs language-${escape(lang)}" >${escaped ? code : escape(code)}</code></pre>`;
          },
        },
      },
    );

    const getHtmlByMarked = (markdown: string) => {
      if (props.markdownProps.engine !== 'marked') return;
      if (!markdown) {
        return '<div class="waiting"></div>';
      }
      return marked.parse(markdown);
    };
    const textInfo = computed(() => {
      if (['model-change', 'system', 'error'].includes(role.value)) {
        return props.content || '';
      }
      if (typeof props.content === 'string') {
        return role.value === 'user' ? escape(props.content) : getHtmlByMarked(props.content);
      }
      // 处理结构化内容类型
      if (typeof props.content === 'object' && props.content !== null) {
        const { type, data } = props.content;
        switch (type) {
          case 'text':
            return escape(data || '');
          case 'markdown':
            return getHtmlByMarked(data || '');
          default:
            return getHtmlByMarked(JSON.stringify(data) || '');
        }
      }
      // 如果内容为空或不是字符串，返回空内容
      return props.content || '';
    });
    return () => (
      <div class={[`${COMPONENT_NAME.value}__text`]}>
        {/* role兼容旧版 */}
        {(typeof props.content === 'object' && props.content?.type === 'text') ||
        (role.value && ['user', 'model-change', 'system', 'error'].includes(role.value)) ? (
          <div class={[`${COMPONENT_NAME.value}__text--user`, `other__${role.value}`]}>
            <pre v-html={textInfo.value}></pre>
          </div>
        ) : props.markdownProps?.engine && props.markdownProps?.engine === 'marked' ? (
          <div class={`${COMPONENT_NAME.value}__text__assistant`}>
            <div
              class={[`${COMPONENT_NAME.value}__text__content`, `${COMPONENT_NAME.value}__text--assistant`]}
              v-html={textInfo.value}
            ></div>
          </div>
        ) : (
          <ChatMarkdown
            content={
              typeof props.content === 'string'
                ? props.content
                : typeof props.content === 'object' && props.content?.type === 'markdown'
                ? props.content.data
                : JSON.stringify(props.content)
            }
            options={props.markdownProps.options}
          />
        )}
      </div>
    );
  },
});
