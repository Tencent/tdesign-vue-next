import { defineComponent } from 'vue';
import TCascaderSubPanel from './components/Panel';
import props from './props';

import { useCascaderContext } from './hooks';

export default defineComponent({
  name: 'TCascaderPanel',
  props,
  setup(props, { slots }) {
    const { cascaderContext } = useCascaderContext(props);

    return () => (
      <TCascaderSubPanel
        trigger={props.trigger}
        cascaderContext={cascaderContext.value}
        empty={props.empty}
        scroll={props.scroll}
        v-slots={{ empty: slots.empty, option: slots.option, loadingText: slots.loadingText }}
      />
    );
  },
});
