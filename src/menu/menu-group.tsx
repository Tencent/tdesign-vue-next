import { defineComponent } from 'vue';
import { prefix } from '../config';
import props from './menu-group-props';

const name = `${prefix}-menu-group`;

export default defineComponent({
  name,
  props,
  render() {
    const { default: defaultSlot } = this.$slots;
    return (
      <div class={`${prefix}-menu-group`}>
        <div class={`${prefix}-menu-group-title`}>{this.title}</div>
        {defaultSlot && defaultSlot()}
      </div>
    );
  },
});
