import { defineComponent } from 'vue';

import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useConfig';

import props from './footer-props';

export default defineComponent({
  name: 'TFooter',
  props,
  setup(props) {
    const COMPONENT_NAME = usePrefixClass('layout__footer');
    const renderTNodeJSX = useTNodeJSX();

    return () => (
      <footer class={COMPONENT_NAME.value} style={props.height ? { height: props.height } : {}}>
        {renderTNodeJSX('default')}
      </footer>
    );
  },
});
