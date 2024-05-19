import { defineComponent } from 'vue';
import props from './header-props';

import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useConfig';

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
