import { defineComponent, PropType, ref } from 'vue';
import { ChevronRightIcon } from 'tdesign-icons-vue-next';

// utils
import CLASSNAMES from '../../utils/classnames';
import useRipple from '../../hooks/useRipple';

// common logic
import { getFullPathLabel } from '../utils/helper';
import { getCascaderItemClass, getCascaderItemIconClass, getLabelIsEllipsis } from '../utils/item';

// component
import Checkbox, { CheckboxProps } from '../../checkbox/index';
import Tooltip from '../../tooltip/index';
import TLoading from '../../loading';

// type
import { ClassName } from '../../common';
import { ContextType, CascaderContextType, CascaderItemPropsType, TreeNodeValue, TreeNode } from '../interface';
import { usePrefixClass, useConfig } from '../../hooks/useConfig';

export default defineComponent({
  name: 'TCascaderItem',
  props: {
    node: {
      type: Object as PropType<CascaderItemPropsType['node']>,
      default() {
        return {};
      },
    },
    cascaderContext: {
      type: Object as PropType<CascaderItemPropsType['cascaderContext']>,
    },
  },

  emits: ['change', 'click', 'mouseenter'],
  setup() {
    const liRef = ref<HTMLElement>();
    useRipple(liRef);

    const ComponentClassName = usePrefixClass('cascader__item');
    const classPrefix = usePrefixClass();

    return { liRef, ComponentClassName, classPrefix };
  },
  computed: {
    itemClass(): ClassName {
      return getCascaderItemClass(this.classPrefix, this.node, CLASSNAMES, this.cascaderContext);
    },
    iconClass(): ClassName {
      return getCascaderItemIconClass(this.classPrefix, this.node, CLASSNAMES, this.cascaderContext);
    },
  },
  render() {
    const { node, itemClass, iconClass, cascaderContext, ComponentClassName } = this;

    const handleClick = (e: Event) => {
      e.stopPropagation();
      const ctx: ContextType = {
        e,
        node,
      };
      this.$emit('click', ctx);
    };

    const handleChange: CheckboxProps['onChange'] = (e) => {
      const ctx = {
        e,
        node,
      };
      this.$emit('change', ctx);
    };

    const handleMouseenter = (e: Event) => {
      e.stopPropagation();
      const ctx: ContextType = {
        e,
        node,
      };
      this.$emit('mouseenter', ctx);
    };

    function RenderLabelInner(node: TreeNode, cascaderContext: CascaderContextType) {
      const { filterActive, inputVal } = cascaderContext;
      const labelText = filterActive ? getFullPathLabel(node) : node.label;
      if (filterActive) {
        const texts = labelText.split(inputVal);
        const doms = [];
        for (let index = 0; index < texts.length; index++) {
          doms.push(<span key={index}>{texts[index]}</span>);
          if (index === texts.length - 1) break;
          doms.push(
            <span key={`${index}filter`} class={`${ComponentClassName}__label--filter`}>
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
      const isEllipsis = getLabelIsEllipsis(node, cascaderContext.size);
      if (isEllipsis) {
        return (
          <span class={`${ComponentClassName}-label`} role="label">
            {label}
            <div class={`${ComponentClassName}-label--ellipsis`}>
              <Tooltip content={node.label} placement="top-left" />
            </div>
          </span>
        );
      }
      return (
        <span class={[`${ComponentClassName}-label`]} role="label">
          {label}
        </span>
      );
    }

    function RenderCheckBox(
      node: TreeNode,
      cascaderContext: CascaderContextType,
      handleChange: CheckboxProps['onChange'],
    ) {
      const { checkProps, value, max, size } = cascaderContext;
      const label = RenderLabelInner(node, cascaderContext);
      return (
        <Checkbox
          checked={node.checked}
          indeterminate={node.indeterminate}
          disabled={node.isDisabled() || ((value as TreeNodeValue[]).length >= max && max !== 0)}
          name={node.value}
          size={size}
          onChange={handleChange}
          {...checkProps}
        >
          {label}
        </Checkbox>
      );
    }

    return (
      <li ref="liRef" class={itemClass} onClick={handleClick} onMouseenter={handleMouseenter}>
        {cascaderContext.multiple
          ? RenderCheckBox(node, cascaderContext, handleChange)
          : RenderLabelContent(node, cascaderContext)}
        {node.children &&
          (node.loading ? <TLoading class={iconClass} size="small" /> : <ChevronRightIcon class={iconClass} />)}
      </li>
    );
  },
});
