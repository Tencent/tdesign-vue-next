import { defineComponent, PropType } from 'vue';
import { GlobalConfigProvider } from './type';
import { useTNodeJSX } from '../hooks/tnode';
import { provideConfig } from './useConfig';

export default defineComponent({
  name: 'TConfigProvider',

  props: {
    globalConfig: Object as PropType<GlobalConfigProvider>,
  },

  setup(props) {
    provideConfig(props.globalConfig);

    const renderTNodeJSX = useTNodeJSX();

    return () => <div>{renderTNodeJSX('default')}</div>;
  },
});
