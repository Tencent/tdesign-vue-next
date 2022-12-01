import { defineComponent, PropType, ExtractPropTypes } from 'vue';
import { GlobalConfigProvider } from './type';
import { useTNodeJSX } from '../hooks/tnode';
import { provideConfig } from './useConfig';

const configProviderProps = {
  globalConfig: Object as PropType<GlobalConfigProvider>,
} as const;

export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>;

export default defineComponent({
  name: 'TConfigProvider',

  props: configProviderProps,

  setup(props) {
    provideConfig(props);

    const renderTNodeJSX = useTNodeJSX();

    return () => <div>{renderTNodeJSX('default')}</div>;
  },
});
