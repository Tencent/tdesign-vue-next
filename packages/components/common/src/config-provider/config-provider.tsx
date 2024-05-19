import type { PropType } from '@td/adapter-vue';
import { defineComponent } from '@td/adapter-vue';
import type { GlobalConfigProvider } from '@td/intel/config-provider/type';
import { useTNodeJSX } from '@td/adapter-hooks';
import { provideConfig } from './useConfig';

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
    provideConfig(props);

    const renderTNodeJSX = useTNodeJSX();

    return () => <>{renderTNodeJSX('default')}</>;
  },
});
