/** 超出省略显示 */
import type { PropType } from '@td/adapter-vue';
import { computed, defineComponent, ref } from '@td/adapter-vue';
import { debounce } from 'lodash-es';
import type { AttachNode, TNode } from '@td/shared/interface';
import { useContent } from '@td/adapter-hooks';
import { isNodeOverflow } from '@td/adapter-utils';
import { Tooltip as TTooltip } from '@td/component';
import type { TdTooltipProps } from '@td/intel/components/tooltip/type';

export interface EllipsisProps {
  content: string | TNode;
  default: string | TNode;
  tooltipContent: string | number | TNode;
  placement: TdTooltipProps['placement'];
  attach?: AttachNode;
  tooltipProps: TdTooltipProps;
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
    tooltipContent: {
      type: [String, Number, Function] as PropType<EllipsisProps['tooltipContent']>,
    },
    /** 浮层位置 */
    placement: String as PropType<EllipsisProps['placement']>,
    /** 挂载元素 */
    attach: [String, Function] as PropType<EllipsisProps['attach']>,
    /** 透传 Tooltip 组件属性 */
    tooltipProps: Object as PropType<EllipsisProps['tooltipProps']>,
    zIndex: Number,
    overlayClassName: String,
    classPrefix: {
      type: String,
      default: 't',
    },
  },

  setup(props) {
    const root = ref();
    const isOverflow = ref(false);

    const ellipsisClasses = computed(() => [
      `${props.classPrefix}-table__ellipsis`,
      `${props.classPrefix}-text-ellipsis`,
    ]);

    const innerEllipsisClassName = computed<TdTooltipProps['overlayClassName']>(() => [
      `${props.classPrefix}-table__ellipsis-content`,
      props.overlayClassName,
    ]);

    // 当表格数据量大时，不希望默认渲染全量的 Tooltip，期望在用户 mouseenter 的时候再显示
    const onTriggerMouseenter = () => {
      if (!root.value) {
        return;
      }
      isOverflow.value = isNodeOverflow(root.value);
    };

    const onTriggerMouseleave = () => {
      if (!root.value) {
        return;
      }
      isOverflow.value = isNodeOverflow(root.value);
    };

    // 使用 debounce 有两个原因：1. 避免 safari/firefox 等浏览器不显示省略浮层；2. 避免省略列快速滚动时，出现一堆的省略浮层
    const onMouseAround = debounce((e: MouseEvent) => {
      e.type === 'mouseleave' ? onTriggerMouseleave() : onTriggerMouseenter();
    }, 80);

    return {
      root,
      isOverflow,
      ellipsisClasses,
      innerEllipsisClassName,
      onMouseAround,
    };
  },

  render() {
    // vue23:!
    const renderContent = useContent();
    const cellNode = renderContent('default', 'content');
    const ellipsisContent = (
      <div ref="root" class={this.ellipsisClasses} onMouseenter={this.onMouseAround} onMouseleave={this.onMouseAround}>
        {cellNode}
      </div>
    );
    let content = null;
    const tooltipProps = this.tooltipProps as EllipsisProps['tooltipProps'];
    if (this.isOverflow) {
      const rProps = {
        content: (this.tooltipContent as string) || (() => cellNode),
        destroyOnClose: true,
        zIndex: this.zIndex,
        attach: this.attach,
        placement: this.placement,
        overlayClassName: tooltipProps?.overlayClassName
          ? this.innerEllipsisClassName.concat(tooltipProps.overlayClassName)
          : this.innerEllipsisClassName,
        ...tooltipProps,
      };
      content = <TTooltip {...rProps}>{ellipsisContent}</TTooltip>;
    } else {
      content = ellipsisContent;
    }
    return content;
  },
});
