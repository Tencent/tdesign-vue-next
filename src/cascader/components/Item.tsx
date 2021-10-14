import { defineComponent, PropType } from 'vue';
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
import ChevronRightCircleIcon from '../../icon/chevron-right';
import LoadingIcon from '../../icon/loading';

// type
import TreeNode from '../../_common/js/tree/tree-node';
import { ClassName } from '../../common';
import { ContextType, CascaderContextType } from '../interface';
import { TreeNodeValue } from '../../_common/js/tree/types';

const name = `${prefix}-cascader-item`;

function RenderLabelInner(name: string, node: TreeNode, cascaderContext: CascaderContextType) {
  const { filterActive, inputVal } = cascaderContext;
  const labelText = filterActive ? getFullPathLabel(node) : node.label;
  if (filterActive) {
    const ctx = labelText.split(inputVal);
    return (() => (
      <>
        {ctx[0]}
        <span class={`${name}__label--filter`}>{inputVal}</span>
        {ctx[1]}
      </>
    ))();
  }
  return (() => (
    <>
      {labelText}
    </>
  ))();
}

function RenderLabelContent(node: TreeNode, cascaderContext: CascaderContextType) {
  const label = RenderLabelInner(name, node, cascaderContext);
  const isEllipsis = getLabelIsEllipsis(node, cascaderContext.size);
  if (isEllipsis) {
    return (<span class={`${name}__label`} role="label">
      {label}
      <div class={`${name}__label--ellipsis`}>
        <Tooltip content={node.label} placement="top-left" />
      </div>
    </span>);
  }
  return (<span class={[`${name}__label`]} role="label" >{label}</span>);
}

function RenderCheckBox(node: TreeNode, cascaderContext: CascaderContextType, handleChange: CheckboxProps['onChange']) {
  const name = `${prefix}-cascader-item`;

  const { checkProps, model, max } = cascaderContext;
  const label = RenderLabelInner(name, node, cascaderContext);
  return (<Checkbox
    {...checkProps}
    checked={node.checked}
    indeterminate={node.indeterminate}
    disabled={node.isDisabled() || ((model as TreeNodeValue[]).length >= max && max !== 0)}
    name={node.value}
    onChange={handleChange}
  >{label}</Checkbox>);
}

export default defineComponent({
  name,

  directives: { ripple },

  props: {
    node: {
      type: Object as PropType<TreeNode>,
      default() {
        return {};
      },
    },
    checkProps: {
      type: Object,
      default() {
        return {};
      },
    },
    cascaderContext: {
      type: Object as PropType<CascaderContextType>,
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

    const {
      node,
      itemClass,
      iconClass,
      cascaderContext,
    } = this;
    return (<li v-ripple class={itemClass} onClick={handleClick} onMouseenter={handleMouseenter}>
      {cascaderContext.multiple ? RenderCheckBox(node, cascaderContext, handleChange) : RenderLabelContent(node, cascaderContext)}
      {node.children
        && (node.loading ? <LoadingIcon class={iconClass} /> : <ChevronRightCircleIcon class={iconClass} />)}
    </li >);
  },
});
