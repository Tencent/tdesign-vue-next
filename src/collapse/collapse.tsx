import { defineComponent, VNode } from 'vue';
import { prefix } from '../config';
import props from './props';

const preName = `${prefix}-collapse`;

export default defineComponent({
  name: 'TCollapse',
  provide() {
    return {
      collapse: this,
    };
  },
  props,
  setup() {},
  render(): VNode {
    const nodes = this.$slots.default && this.$slots.default(null);
    return <div>{nodes}</div>;
  },
});
