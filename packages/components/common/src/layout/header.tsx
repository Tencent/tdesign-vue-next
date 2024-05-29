import { defineComponent } from '@td/adapter-vue';
import props from '@td/components/layout/header-props';

import { usePrefixClass, useTNodeJSX } from '@td/adapter-hooks';

export default defineComponent({
  name: 'THeader',

  props,

  setup(props) {
    const COMPONENT_NAME = usePrefixClass('layout__header');
    const renderTNodeJSX = useTNodeJSX();
    return () => (
      <header class={COMPONENT_NAME.value} style={props.height ? { height: props.height } : {}}>
        {renderTNodeJSX('default')}
      </header>
    );
  },
});
