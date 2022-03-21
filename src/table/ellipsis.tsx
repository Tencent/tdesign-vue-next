/** 超出省略显示 */
import { defineComponent, PropType, ref, computed } from 'vue';
import { TNode } from '../common';
import { renderContent } from '../utils/render-tnode';
import { isNodeOverflow } from '../utils/dom';
import TPopup, { PopupProps } from '../popup';
import { useConfig } from '../config-provider/useConfig';

export interface EllipsisProps {
  content: string | TNode;
  default: string | TNode;
  popupContent: string | number | TNode;
  placement: PopupProps['placement'];
  attach: () => HTMLElement;
  popupProps: PopupProps;
  zIndex: number;
}

export default defineComponent({
  name: 'TEllipsis',

  props: {
    /** 内容 */
    content: {
      type: [String, Function] as PropType<EllipsisProps['content']>,
    },
    /** 内容，同 content */
    default: {
      type: [String, Function] as PropType<EllipsisProps['default']>,
    },
    /** 内容，同 content，可以单独自定义浮层内容，无需和触发元素保持一致 */
    popupContent: {
      type: [String, Number, Function] as PropType<EllipsisProps['popupContent']>,
    },
    /** 浮层位置 */
    placement: String as PropType<EllipsisProps['placement']>,
    /** 挂载元素 */
    attach: Function as PropType<EllipsisProps['attach']>,
    /** 透传 Popup 组件属性 */
    popupProps: Object as PropType<EllipsisProps['popupProps']>,
    zIndex: Number,
  },

  // 空 props 是为了 TS 类型检测
  // eslint-disable-next-line
  setup(props: EllipsisProps) {
    const { classPrefix } = useConfig();
    const root = ref();
    const isOverflow = ref(false);

    const ellipsisClasses = computed(() => [
      `${classPrefix.value}-table__ellipsis`,
      `${classPrefix.value}-text-ellipsis`,
    ]);

    // 鼠标 hover 的时候显示浮层
    const updateIsOverflow = () => {
      if (!root.value) return;
      isOverflow.value = isNodeOverflow(root.value);
    };

    const onMouseleave = () => {
      isOverflow.value = false;
    };

    return {
      root,
      isOverflow,
      ellipsisClasses,
      updateIsOverflow,
      onMouseleave,
    };
  },

  render() {
    const cellNode = renderContent(this, 'default', 'content');
    const ellipsisContent = (
      <div
        ref="root"
        class={this.ellipsisClasses}
        onMouseenter={this.updateIsOverflow}
        onMouseleave={this.onMouseleave}
      >
        {cellNode}
      </div>
    );
    if (this.isOverflow) {
      return (
        <TPopup
          content={this.popupContent || (() => cellNode)}
          destroyOnClose={true}
          zIndex={this.zIndex || 80}
          attach={this.attach}
          placement={this.placement}
          {...this.popupProps}
        >
          {ellipsisContent}
        </TPopup>
      );
    }
    return ellipsisContent;
  },
});
