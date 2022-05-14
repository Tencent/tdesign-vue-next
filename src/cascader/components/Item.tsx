import { defineComponent, PropType, computed, ref } from 'vue';
import { ChevronRightIcon } from 'tdesign-icons-vue-next';

import { getFullPathLabel } from '../core/helper';
import { getCascaderItemClass, getCascaderItemIconClass } from '../core/className';

import Checkbox from '../../checkbox/index';
import TLoading from '../../loading';

import { CascaderContextType, TreeNodeValue, TreeNode } from '../interface';
import { usePrefixClass, useCommonClassName } from '../../hooks/useConfig';
import useRipple from '../../hooks/useRipple';

const props = {
  node: {
    type: Object as PropType<TreeNode>,
    default() {
      return {};
    },
  },
  cascaderContext: {
    type: Object as PropType<CascaderContextType>,
  },
  onChange: Function as PropType<(node: TreeNode) => void>,
  onClick: Function as PropType<(node: TreeNode) => void>,
  onMouseenter: Function as PropType<(node: TreeNode) => void>,
};

export default defineComponent({
  name: 'TCascaderItem',
  props,
  setup(props) {
    const liRef = ref<HTMLElement>();
    const liRef2 = ref<HTMLElement>();
    useRipple(liRef);

    const COMPONENT_NAME = usePrefixClass('cascader__item');
    const classPrefix = usePrefixClass();
    const { STATUS, SIZE } = useCommonClassName();

    const itemClass = computed(() => {
      return getCascaderItemClass(classPrefix.value, props.node, SIZE.value, STATUS.value, props.cascaderContext);
    });

    const iconClass = computed(() => {
      return getCascaderItemIconClass(classPrefix.value, props.node, STATUS.value, props.cascaderContext);
    });

    function RenderLabelInner(node: TreeNode, cascaderContext: CascaderContextType) {
      const { inputVal } = cascaderContext;
      const labelText = inputVal ? getFullPathLabel(node) : node.label;
      if (inputVal) {
        const texts = labelText.split(inputVal as string);
        const doms = [];
        for (let index = 0; index < texts.length; index++) {
          doms.push(<span key={index}>{texts[index]}</span>);
          if (index === texts.length - 1) break;
          doms.push(
            <span key={`${index}filter`} class={`${COMPONENT_NAME.value}-label--filter`}>
              {inputVal}
            </span>,
          );
        }
        return doms;
      }
      return labelText;
    }

    function RenderLabelContent(node: TreeNode, cascaderContext: CascaderContextType) {
      const label = RenderLabelInner(node, cascaderContext);

      const labelCont = (
        <span
          title={cascaderContext.inputVal ? getFullPathLabel(node) : node.label}
          ref={liRef2}
          class={[`${COMPONENT_NAME.value}-label`, `${COMPONENT_NAME.value}-label--ellipsis`]}
          role="label"
        >
          {label}
        </span>
      );

      return labelCont;
    }

    function RenderCheckBox(node: TreeNode, cascaderContext: CascaderContextType) {
      const { checkProps, value, max, inputVal, size } = cascaderContext;
      const label = RenderLabelInner(node, cascaderContext);
      return (
        <Checkbox
          checked={node.checked}
          indeterminate={node.indeterminate}
          disabled={node.isDisabled() || ((value as TreeNodeValue[]).length >= max && max !== 0)}
          name={node.value}
          size={size}
          title={inputVal ? getFullPathLabel(node) : node.label}
          onChange={() => {
            props.onChange(node);
          }}
          {...checkProps}
        >
          {label}
        </Checkbox>
      );
    }

    return () => {
      const { cascaderContext, node } = props;
      return (
        <li
          ref={liRef}
          class={itemClass.value}
          onClick={(e: Event) => {
            e.stopPropagation();
            props.onClick(node);
          }}
          onMouseenter={(e: Event) => {
            e.stopPropagation();
            props.onMouseenter(node);
          }}
        >
          {cascaderContext.multiple ? RenderCheckBox(node, cascaderContext) : RenderLabelContent(node, cascaderContext)}
          {node.children &&
            (node.loading ? (
              <TLoading class={iconClass.value} size="small" />
            ) : (
              <ChevronRightIcon class={iconClass.value} />
            ))}
        </li>
      );
    };
  },
});
