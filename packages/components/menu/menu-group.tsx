import { defineComponent } from 'vue';
import props from './menu-group-props';
import { useTNodeJSX, usePrefixClass } from '@tdesign/shared-hooks';

export default defineComponent({
  name: 'TMenuGroup',
  props,
  setup() {
    const classPrefix = usePrefixClass();
    const renderTNodeJSX = useTNodeJSX();

    return () => (
      <div class={`${classPrefix.value}-menu-group`}>
        <div class={`${classPrefix.value}-menu-group__title`}>{renderTNodeJSX('title', { silent: false })}</div>
        {renderTNodeJSX('default')}
      </div>
    );
  },
});
