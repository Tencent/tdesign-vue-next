import { defineComponent, PropType, computed, CSSProperties } from 'vue';
import { usePrefixClass } from '../hooks/useConfig';

// 统一使用的翻转箭头组件
export default defineComponent({
  name: 'TFakeArrow',
  props: {
    // 是否active状态 active状态下箭头向上翻转
    isActive: {
      type: Boolean as PropType<boolean>,
    },
    overlayClassName: {
      type: [String, Object, Array],
    },
    overlayStyle: {
      type: Object || (String as PropType<string | CSSProperties>),
    },
  },

  setup(props) {
    const COMPONENT_NAME = usePrefixClass('fake-arrow');
    const classes = computed(() => [
      COMPONENT_NAME.value,
      {
        [`${COMPONENT_NAME.value}--active`]: props.isActive,
      },
      props.overlayClassName,
    ]);
    return {
      classes,
    };
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
