import { defineComponent } from 'vue';
import props from './footer-props';

import { useTNodeJSX, usePrefixClass } from '@tdesign/shared-hooks';

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
