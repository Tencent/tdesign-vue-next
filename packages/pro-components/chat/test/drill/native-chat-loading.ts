import { defineComponent, h } from 'vue';

// 演练替身：保持已验证的文案与公开动画状态，去掉 webc 桥接。
export default defineComponent({
  name: 'TChatLoading',
  props: {
    animation: { type: String, default: 'moving' },
    text: { type: String, default: '' },
  },
  setup: (props) => () =>
    h('div', { class: 't-chat-loading' }, [
      h('div', { class: `t-chat-loading__${props.animation}` }),
      h('span', props.text),
    ]),
});
