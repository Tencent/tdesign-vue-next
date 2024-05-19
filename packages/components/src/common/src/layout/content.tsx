import { defineComponent } from 'vue';
import { usePrefixClass } from '../hooks/useConfig';
import { useTNodeJSX } from '../hooks/tnode';

export default defineComponent({
  name: 'TContent',
  setup() {
    const COMPONENT_NAME = usePrefixClass('layout__content');
    const renderTNodeJSX = useTNodeJSX();

    return () => <main class={COMPONENT_NAME.value}>{renderTNodeJSX('default')}</main>;
  },
});
