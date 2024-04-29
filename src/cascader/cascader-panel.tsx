import { defineComponent } from 'vue';

import Panel from './components/Panel';
import { useCascaderContext } from './hooks';
import props from './props';

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
