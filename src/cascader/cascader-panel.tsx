import { defineComponent } from 'vue';

import Panel from './components/Panel';

import props from './props';

import { useCascaderContext } from './hooks';

export default defineComponent({
  name: 'TCascaderPanel',

  components: {
    Panel,
  },

  props: { ...props, haveInput: Boolean },

  setup(props, { slots }) {
    const { cascaderContext } = useCascaderContext(props);

    return () => (
      <panel empty={props.empty} trigger={props.trigger} cascaderContext={cascaderContext.value}>
        {{ empty: slots.empty }}
      </panel>
    );
  },
});
