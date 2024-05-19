import { defineComponent } from 'vue';
import props from '@td/intel/layout/header-props';

import { useTNodeJSX } from '@td/adapter-hooks';
import { usePrefixClass } from '@td/adapter-hooks';

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
