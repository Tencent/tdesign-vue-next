import { defineComponent, PropType } from 'vue';
import { prefix } from '../config';

const name = `${prefix}-fake-arrow`;

// 统一使用的翻转箭头组件
export default defineComponent({
  name,
  props: {
    // 是否active状态 active状态下箭头向上翻转
    isActive: {
      type: Boolean as PropType<boolean>,
    },
    overlayClassName: {
      type: [String, Object, Array],
    },
    overlayStyle: {
      type: Object || (String as PropType<string | object>),
    },
  },

  computed: {
    classes(): Array<string | object> {
      return [
        name,
        {
          [`${name}--active`]: this.isActive,
        },
        this.overlayClassName,
      ];
    },
  },

  render() {
    return (
      <svg
        class={this.classes}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={this.overlayStyle}
      >
        <path d="M3.75 5.7998L7.99274 10.0425L12.2361 5.79921" stroke="black" stroke-opacity="0.9" stroke-width="1.3" />
      </svg>
    );
  },
});
