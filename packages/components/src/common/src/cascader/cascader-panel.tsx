import { defineComponent } from 'vue';
import Panel from './components/Panel';
import props from './props';

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
