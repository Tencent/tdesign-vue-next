import { defineComponent, VNode } from 'vue';
import { renderTNodeJSX } from '../utils/render-tnode';
import props from './option-group-props';
import { ClassName } from '../common';
import { usePrefixClass, useCommonClassName } from '../hooks/useConfig';

export default defineComponent({
  name: 'TOptionGroup',
  inject: {
    tSelect: {
      default: undefined,
    },
  },
  props: { ...props },
  setup() {
    const COMPONENT_NAME = usePrefixClass('select-option-group');
    const { SIZE } = useCommonClassName();
    return {
      SIZE,
      COMPONENT_NAME,
    };
  },
  data() {
    return {
      visible: true,
    };
  },
  computed: {
    classes(): ClassName {
      return [
        this.COMPONENT_NAME,
        {
          [this.SIZE[this.tSelect.size]]: this.tSelect && this.tSelect.size,
          [`${this.COMPONENT_NAME}__divider`]: this.divider,
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
        <div class={`${this.COMPONENT_NAME}__header`}>{this.label}</div>
        <ul>{children}</ul>
      </li>
    );
  },
});
