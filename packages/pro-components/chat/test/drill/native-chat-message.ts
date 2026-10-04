import { defineComponent, h } from 'vue';
import props from '../../chat-message/chat-message-props';

// 演练替身：保持公开 props、文本内容和插槽，根节点由自定义元素改为普通 HTML。
export default defineComponent({
  name: 'ChatMessage',
  props,
  setup:
    (props, { slots }) =>
    () =>
      h('article', { class: 't-chat-message' }, [
        ...Object.values(slots).flatMap((slot) => slot?.() || []),
        ...(!slots.content && Array.isArray(props.content)
          ? props.content.map((item) => (typeof item.data === 'string' ? item.data : ''))
          : []),
      ]),
});
