import { defineComponent, VNode } from 'vue';
import { renderTNodeJSX } from '../utils/render-tnode';
import { prefix } from '../config';
import CLASSNAMES from '../utils/classnames';
import props from './option-group-props';
import { ClassName } from '../common';

const name = `${prefix}-select-option-group`;

export default defineComponent({
  name: 'TOptionGroup',
  inject: {
    tSelect: {
      default: undefined,
    },
  },
  props: { ...props },
  data() {
    return {
      visible: true,
    };
  },
  computed: {
    classes(): ClassName {
      return [
        name,
        {
          [CLASSNAMES.SIZE[this.tSelect.size]]: this.tSelect && this.tSelect.size,
          [`${name}__divider`]: this.divider,
        },
      ];
    },
  },
  methods: {
    childrenChange() {
      this.visible =
        this.$children &&
        Array.isArray(this.$children) &&
        this.$children.some((option) => (option as any).show === true);
    },
  },
  render() {
    const children = renderTNodeJSX(this, 'default');
    return (
      <li class={this.classes}>
        <div class={`${name}__header`}>{this.label}</div>
        <ul>{children}</ul>
      </li>
    );
  },
});
