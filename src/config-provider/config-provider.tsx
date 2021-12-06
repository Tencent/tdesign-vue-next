import { defineComponent, PropType } from 'vue';
import { GlobalConfigProvider } from './type';
import { renderTNodeJSX } from '../utils/render-tnode';
import { prefix } from '../config';

const name = `${prefix}-config-provider`;

const ConfigProvider = defineComponent({
  name,

  provide(): { globalConfig: GlobalConfigProvider } {
    return {
      globalConfig: this.globalConfig,
    };
  },
  props: {
    globalConfig: Object as PropType<GlobalConfigProvider>,
  },

  render() {
    const defaultNode = renderTNodeJSX(this, 'default');
    if (defaultNode.length === 1) {
      return defaultNode[0];
    }
    return <div>{defaultNode}</div>;
  },
});

export default ConfigProvider;
