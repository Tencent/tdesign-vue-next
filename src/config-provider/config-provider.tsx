import { defineComponent, PropType, provide, computed } from 'vue';
import cloneDeep from 'lodash/cloneDeep';
import { GlobalConfigProvider } from './type';
import { useTNodeJSX } from '../hooks/tnode';
import { configProviderInjectKey, defaultGlobalConfig, mergeWith } from './context';

export default defineComponent({
  name: 'TConfigProvider',

  props: {
    globalConfig: Object as PropType<GlobalConfigProvider>,
  },

  setup(props) {
    const defaultData = cloneDeep(defaultGlobalConfig);
    provide(
      configProviderInjectKey,
      computed(() => mergeWith(defaultData, props.globalConfig)),
    );

    const renderTNodeJSX = useTNodeJSX();

    return () => <div>{renderTNodeJSX('default')}</div>;
  },
});
