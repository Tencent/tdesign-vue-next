import { defineComponent, PropType } from 'vue';
import TreeNode from '../../_common/js/tree/tree-node';
import { prefix } from '../../config';
import Checkbox from '../../checkbox/index';
import Button from '../../radio/index';
import ChevronRightCircleIcon from '../../icon/chevron-right';
import Tooltip from '../../tooltip/index';
import CLASSNAMES from '../../utils/classnames';
import { ClassName } from '../../common';
import ripple from '../../utils/ripple';

const name = `${prefix}-cascader-item`;

export default defineComponent({
  name,

  components: {
    Checkbox,
    ChevronRightCircleIcon,
    Button,
    Tooltip,
  },

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
      type: Object,
    },
  },

  emits: ['inject', 'change', 'click', 'mouseenter'],

  data() {
    return {
      name,
      width: '',
      defaultProps: {
        trigger: 'manual',
        placement: 'bottomLeft',
      },
    };
  },

  computed: {
    isEllipsis() {
      const { node } = this;
      const sizeMap = {
        small: 11,
        medium: 9,
        large: 8,
      };
      return sizeMap[this.cascaderContext.size] < node.label.length;
    },
    itemClass(): ClassName {
      const { node, cascaderContext: { checkStrictly, multiple, size } } = this;
      const expandedActive = !checkStrictly && node.expanded && (multiple ? !node.isLeaf() : true);
      return [
        `${prefix}-cascader-item`,
        {
          [CLASSNAMES.STATUS.selected]: node.checked,
          [CLASSNAMES.STATUS.expanded]: expandedActive,
          [CLASSNAMES.STATUS.disabled]: node.disabled,
          [CLASSNAMES.STATUS.active]: node.actived,
          [CLASSNAMES.SIZE[size]]: size,
          [`${name}-have-icon`]: node.children,
        },
      ];
    },
    iconClass(): ClassName {
      const { node, cascaderContext: { checkStrictly } } = this;
      return [
        `${prefix}-cascader-icon`,
        {
          [CLASSNAMES.STATUS.expanded]: !checkStrictly && node.expanded,
        },
      ];
    },
  },
  methods: {
    handleChange(_: boolean, { e }: { e: Event }) {
      const { node } = this;
      const state = {
        e,
        node,
      };
      this.$emit('change', state);
    },
    handleClick(e: Event) {
      const { node } = this;
      const state = {
        e,
        node,
      };
      this.$emit('click', state);
    },
    handleMouseenter(e: Event) {
      const { node } = this;
      const state = {
        e,
        node,
      };
      this.$emit('mouseenter', state);
    },
    RenderLabelContent() {
      const { node } = this;
      if (this.isEllipsis) {
        return (<span class={`${name}__label`} role="label">
          {node.label}
          <div class={`${name}__label--ellipsis`}>
            <t-tooltip content={node.label} placement="top-left" />
          </div>
        </span>);
      }
      return (<span class={`${name}__label`} role="label">{node.label}</span>);
    },
  },
  render() {
    const {
      node,
      itemClass,
      iconClass,
      cascaderContext,
      handleChange,
      handleClick,
      handleMouseenter,
      RenderLabelContent,
    } = this;
    return (<li v-ripple class={itemClass} onClick={handleClick} onMouseenter={handleMouseenter}>
      {cascaderContext.multiple
        ? <checkbox
          checked={node.checked}
          indeterminate={node.indeterminate}
          disabled={node.isDisabled()}
          name={node.value}
          role="label"
          onChange={handleChange}
        >{node.label}</checkbox>
        : RenderLabelContent()}
      {node.children ? <ChevronRightCircleIcon class={iconClass} /> : null}
    </li >);
  },
});
