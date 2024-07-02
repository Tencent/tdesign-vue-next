import { defineComponent } from 'vue';
import { useTNodeJSX } from '../hooks/tnode';

import Text from './text';
export default defineComponent({
  name: 'TTypography',

  setup() {
    const readerTNodeJSX = useTNodeJSX();
    return () => {
      return <Text>{readerTNodeJSX('default')}</Text>;
    };
  },
});
