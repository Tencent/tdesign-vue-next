import { defineComponent, PropType, provide, computed } from 'vue';
import { GlobalConfigProvider } from './type';
import { useTNodeJSX } from '../hooks/tnode';

export default defineComponent({
  name: 'TConfigProvider',

  props: {
    globalConfig: Object as PropType<GlobalConfigProvider>,
  },

  setup(props) {
    provide(
      'globalConfig',
      computed(() => {
        return props.globalConfig;
      }),
    );
    const renderTNodeJSX = useTNodeJSX();

    return () => {
      const defaultNode = renderTNodeJSX('default');
      if (defaultNode.length === 1) {
        return defaultNode[0];
      }
      return <div>{defaultNode}</div>;
    };
  },
});
