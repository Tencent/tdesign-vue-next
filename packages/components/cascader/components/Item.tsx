import { defineComponent, PropType, computed, ref } from 'vue';
import { ChevronRightIcon as TdChevronRightIcon } from 'tdesign-icons-vue-next';

import { getFullPathLabel, getCascaderItemClass, getCascaderItemIconClass } from '../utils';

import Checkbox from '../../checkbox/index';
import TLoading from '../../loading';

import { CascaderContextType, TreeNodeValue, TreeNode, TdCascaderProps } from '../types';
import { usePrefixClass, useCommonClassName } from '@tdesign/hooks';
import { useGlobalIcon } from '@tdesign/hooks';
import { useRipple } from '@tdesign/hooks';

const props = {
  node: {
    type: Object as PropType<TreeNode>,
    default() {
      return {};
    },
  },
  optionChild: {
    type: [Object, Array] as PropType<TdCascaderProps['option']>,
  },
  cascaderContext: {
    type: Object as PropType<CascaderContextType>,
  },
  onChange: Function as PropType<() => void>,
  onClick: Function as PropType<() => void>,
  onMouseenter: Function as PropType<() => void>,
};

export default defineComponent({
  name: 'TCascaderItem',
  props,
  setup(props) {
    const liRef = ref<HTMLElement>();
    useRipple(liRef);

    const COMPONENT_NAME = usePrefixClass('cascader__item');
    const classPrefix = usePrefixClass();
    const { ChevronRightIcon } = useGlobalIcon({ ChevronRightIcon: TdChevronRightIcon });
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

    const renderTitle = (node: TreeNode) => {
      if (typeof node.label === 'string') return node.label;

      return null;
    };

    function RenderLabelContent(node: TreeNode, cascaderContext: CascaderContextType) {
      const label = RenderLabelInner(node, cascaderContext);

      const labelCont = (
        <span
          title={cascaderContext.inputVal ? getFullPathLabel(node) : renderTitle(node)}
          class={[`${COMPONENT_NAME.value}-label`, `${COMPONENT_NAME.value}-label--ellipsis`]}
          role="label"
        >
          {label}
        </span>
      );

      return labelCont;
    }

    function RenderCheckBox(node: TreeNode, cascaderContext: CascaderContextType) {
      const { checkProps, value, max, inputVal } = cascaderContext;
      const label = RenderLabelInner(node, cascaderContext);
      return (
        <Checkbox
          checked={node.checked}
          indeterminate={node.indeterminate}
          disabled={node.isDisabled() || ((value as TreeNodeValue[]).length >= max && max !== 0)}
          // node.value maybe string or number
          name={String(node.value)}
          stopLabelTrigger={!!node.children}
          title={inputVal ? getFullPathLabel(node) : renderTitle(node)}
          onChange={() => {
            props.onChange();
          }}
          {...checkProps}
        >
          {label}
        </Checkbox>
      );
    }

    return () => {
      const { cascaderContext, node, optionChild } = props;
      const isOptionChildAndMultiple = optionChild && cascaderContext.multiple;
      return (
        <li
          ref={liRef}
          class={itemClass.value}
          onClick={() => (isOptionChildAndMultiple ? props.onChange() : props.onClick())}
          onMouseenter={props.onMouseenter}
        >
          {optionChild ||
            (cascaderContext.multiple
              ? RenderCheckBox(node, cascaderContext)
              : RenderLabelContent(node, cascaderContext))}
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
