import { defineComponent } from 'vue';
import props from './menu-group-props';
import { usePrefixClass } from '@tdesign/hooks';
import { useTNodeJSX } from '@tdesign/hooks';

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
