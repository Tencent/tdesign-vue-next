import { defineComponent } from '@td/adapter-vue';
import { usePrefixClass } from '@td/adapter-hooks';
import { useTNodeJSX } from '@td/adapter-hooks';

export default defineComponent({
  name: 'TContent',
  setup() {
    const COMPONENT_NAME = usePrefixClass('layout__content');
    const renderTNodeJSX = useTNodeJSX();

    return () => <main class={COMPONENT_NAME.value}>{renderTNodeJSX('default')}</main>;
  },
});
