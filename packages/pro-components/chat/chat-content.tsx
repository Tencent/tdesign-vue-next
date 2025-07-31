import { defineComponent, computed, onMounted, inject, ComputedRef, toRefs } from 'vue';
import { useConfig } from 'tdesign-vue-next/es/config-provider/hooks';
import { usePrefixClass } from '@tdesign/shared-hooks';
import props from './chat-content-props';
import Clipboard from 'clipboard';
import hljs from 'highlight.js';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

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
    const injectedRole = inject<ComputedRef<string>>('role');
    const role = computed(() => props.role || injectedRole?.value || '');
    onMounted(() => {
      const clipboard = new Clipboard(`.${COMPONENT_NAME.value}__copy-btn`, {
        target: (trigger: HTMLDivElement) => (trigger.parentNode as HTMLElement).nextElementSibling,
      });

      clipboard.on('success', (e) => {
        e.trigger.textContent = globalConfig.value.copyCodeSuccessText;
        setTimeout(() => {
          e.trigger.textContent = globalConfig.value.copyCodeBtnText;
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
      if (!markdown) {
        return '<div class="waiting"></div>';
      }
      return marked.parse(markdown);
    };
    const textInfo = computed(() => {
      if (role.value === 'model-change') {
        return props.content || '';
      }

      if (role.value === 'user' && typeof props.content === 'string') {
        return escape(props.content);
      }
      // @ts-ignore 暂时处理
      return getHtmlByMarked(props.content);
    });
    return () => (
      <div class={[`${COMPONENT_NAME.value}__text`]}>
        {role.value === 'user' ? (
          <div class={`${COMPONENT_NAME.value}__text--${role.value}`}>
            <pre v-html={textInfo.value}></pre>
          </div>
        ) : (
          <div class={`${COMPONENT_NAME.value}__text__assistant`}>
            <div
              class={[`${COMPONENT_NAME.value}__text__content`, `${COMPONENT_NAME.value}__text--${role.value}`]}
              v-html={textInfo.value}
            ></div>
          </div>
        )}
      </div>
    );
  },
});
