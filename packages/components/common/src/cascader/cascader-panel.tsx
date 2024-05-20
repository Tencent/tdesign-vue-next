import { defineComponent } from '@td/adapter-vue';
import props from '@td/intel/cascader/props';
import Panel from './components/Panel';

import { useCascaderContext } from './hooks';

export default defineComponent({
  name: 'TCascaderPanel',

  props: { ...props },

  setup(props, { slots }) {
    const { cascaderContext } = useCascaderContext(props);

    return () => (
      <Panel
        trigger={props.trigger}
        cascaderContext={cascaderContext.value}
        empty={props.empty}
        v-slots={{ empty: slots.empty }}
      />
    );
  },
});
