import { defineComponent } from '@td/adapter-vue';
import props from '@td/intel/components/menu/menu-group-props';
import { usePrefixClass, useTNodeJSX } from '@td/adapter-hooks';

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
    const renderTNodeJSX = useTNodeJSX();

    return (
      <div class={`${classPrefix}-menu-group`}>
        <div class={`${classPrefix}-menu-group__title`}>{this.title}</div>
        {renderTNodeJSX('default')}
      </div>
    );
  },
});
