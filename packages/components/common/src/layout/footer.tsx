import { defineComponent } from '@td/adapter-vue';
import props from '@td/intel/layout/footer-props';

import { useTNodeJSX } from '@td/adapter-hooks';
import { usePrefixClass } from '@td/adapter-hooks';

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
