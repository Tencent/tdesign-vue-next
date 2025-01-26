import { defineComponent } from 'vue';
import { useTNodeJSX } from '../hooks/tnode';

import Text from './text';

export default defineComponent({
  name: 'TTypography',

  setup() {
    const renderTNodeJSX = useTNodeJSX();
    return () => {
      return <Text>{renderTNodeJSX('default')}</Text>;
    };
  },
});
