import { defineComponent } from 'vue';
import props from './props';
import { useTNodeJSX } from '../hooks/tnode';
import { provideConfig } from './hooks/useConfig';

export default defineComponent({
  name: 'TConfigProvider',
  props,
  setup(props) {
    provideConfig(props);

    const renderTNodeJSX = useTNodeJSX();

    return () => <>{renderTNodeJSX('default')}</>;
  },
});
