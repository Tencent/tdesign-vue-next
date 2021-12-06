import { defineComponent, PropType } from 'vue';
import { ChevronRightCircleIcon } from 'tdesign-icons-vue-next';
import { prefix } from '../../config';

// utils
import CLASSNAMES from '../../utils/classnames';
import ripple from '../../utils/ripple';

// common logic
import { getFullPathLabel } from '../utils/helper';
import { getCascaderItemClass, getCascaderItemIconClass, getLabelIsEllipsis } from '../utils/item';

// component
import Checkbox, { CheckboxProps } from '../../checkbox/index';
import Tooltip from '../../tooltip/index';
import TLoading from '../../loading';

// type
import TreeNode from '../../_common/js/tree/tree-node';
import { ClassName } from '../../common';
import { ContextType, CascaderContextType, CascaderItemPropsType } from '../interface';
import { TreeNodeValue } from '../../_common/js/tree/types';

const name = `${prefix}-cascader-item`;

export default defineComponent({
  name,

  directives: { ripple },

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

  computed: {
    itemClass(): ClassName {
      return getCascaderItemClass(prefix, this.node, CLASSNAMES, this.cascaderContext);
    },
    iconClass(): ClassName {
      return getCascaderItemIconClass(prefix, this.node, CLASSNAMES, this.cascaderContext);
    },
  },
  render() {
    const { node, itemClass, iconClass, cascaderContext } = this;

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

    function RenderLabelInner(name: string, node: TreeNode, cascaderContext: CascaderContextType) {
      const { filterActive, inputVal } = cascaderContext;
      const labelText = filterActive ? getFullPathLabel(node) : node.label;
      if (filterActive) {
        const ctx = labelText.split(inputVal);
        return (() => (
          <span>
            {ctx[0]}
            <span class={`${name}__label--filter`}>{inputVal}</span>
            {ctx[1]}
          </span>
        ))();
      }
      return (() => <>{labelText}</>)();
    }

    function RenderLabelContent(node: TreeNode, cascaderContext: CascaderContextType) {
      const label = RenderLabelInner(name, node, cascaderContext);
      const isEllipsis = getLabelIsEllipsis(node, cascaderContext.size);
      if (isEllipsis) {
        return (
          <span class={`${name}__label`} role="label">
            {label}
            <div class={`${name}__label--ellipsis`}>
              <Tooltip content={node.label} placement="top-left" />
            </div>
          </span>
        );
      }
      return (
        <span class={[`${name}__label`]} role="label">
          {label}
        </span>
      );
    }

    function RenderCheckBox(
      node: TreeNode,
      cascaderContext: CascaderContextType,
      handleChange: CheckboxProps['onChange'],
    ) {
      const name = `${prefix}-cascader-item`;

      const { checkProps, value, max, size } = cascaderContext;
      const label = RenderLabelInner(name, node, cascaderContext);
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
      <li v-ripple class={itemClass} onClick={handleClick} onMouseenter={handleMouseenter}>
        {cascaderContext.multiple
          ? RenderCheckBox(node, cascaderContext, handleChange)
          : RenderLabelContent(node, cascaderContext)}
        {node.children &&
          (node.loading ? <TLoading class={iconClass} /> : <ChevronRightCircleIcon class={iconClass} />)}
      </li>
    );
  },
});
