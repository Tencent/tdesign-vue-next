import { defineComponent, PropType } from '@td/adapter-vue';
import { GlobalConfigProvider } from '@td/intel/config-provider/type';
import { useTNodeJSX } from '@td/adapter-hooks';
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
