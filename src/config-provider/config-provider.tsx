import { defineComponent, PropType, provide, computed } from 'vue';
import { GlobalConfigProvider } from './type';
import { renderTNodeJSX } from '../utils/render-tnode';

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
  },

  render() {
    const defaultNode = renderTNodeJSX(this, 'default');
    if (defaultNode.length === 1) {
      return defaultNode[0];
    }
    return <div>{defaultNode}</div>;
  },
});
