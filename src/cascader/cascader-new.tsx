import { defineComponent } from 'vue';

// component
import CascaderPanel from './cascader-panel';

import props from './props';

export default defineComponent({
  name: 'TCascaderNew',

  props: { ...props },

  setup(props) {
    return () => <CascaderPanel {...props} haveInput={true} />;
  },
});
