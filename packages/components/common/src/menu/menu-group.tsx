import { defineComponent } from '@td/adapter-vue';
import props from '@td/intel/menu/menu-group-props';
import { usePrefixClass } from '@td/adapter-hooks';
import { renderTNodeJSX } from '../utils/render-tnode';

export default defineComponent({
  name: 'TMenuGroup',
  props,
  setup() {
    const classPrefix = usePrefixClass();
    return {
      classPrefix,
    };
  },
  render() {
    const { classPrefix } = this;
    return (
      <div class={`${classPrefix}-menu-group`}>
        <div class={`${classPrefix}-menu-group__title`}>{this.title}</div>
        {renderTNodeJSX(this, 'default')}
      </div>
    );
  },
});
