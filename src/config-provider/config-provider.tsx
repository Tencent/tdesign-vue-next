import { defineComponent, PropType } from 'vue';

import { useTNodeJSX } from '../hooks/tnode';

import { GlobalConfigProvider } from './type';
import { provideConfig } from './useConfig';

export const configProviderProps = {
  globalConfig: Object as PropType<GlobalConfigProvider>,
};

export type ConfigProviderProps = {
  globalConfig: GlobalConfigProvider;
};

export default defineComponent({
  name: 'TConfigProvider',

  props: configProviderProps,

  setup(props) {
    provideConfig(props);

    const renderTNodeJSX = useTNodeJSX();

    return () => <>{renderTNodeJSX('default')}</>;
  },
});
