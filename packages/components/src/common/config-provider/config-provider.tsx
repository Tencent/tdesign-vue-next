import { defineComponent, isVue3 } from '@td/adapter-vue';
import type { PropType } from '@td/adapter-vue';
import { useProvideConfig, useTNodeJSX } from '@td/adapter-hooks';

import type { GlobalConfigProvider } from '@td/intel/components/config-provider/type';

export const configProviderProps = {
  globalConfig: Object as PropType<GlobalConfigProvider>,
};

export interface ConfigProviderProps {
  globalConfig: GlobalConfigProvider;
}

export default defineComponent({
  name: 'TConfigProvider',

  props: configProviderProps,

  setup(props) {
    useProvideConfig(props);
    const renderTNodeJSX = useTNodeJSX();

    return () => {
      const defaultNode = renderTNodeJSX('default');

      if (isVue3) {
        return defaultNode;
      }

      // vue23:! 感觉可以暴露一下 vue23： 然后用 vue23 来判断是否多单根
      if (defaultNode.length === 1) {
        return defaultNode[0];
      }
      return <div>{defaultNode}</div>;
    };
  },
});
