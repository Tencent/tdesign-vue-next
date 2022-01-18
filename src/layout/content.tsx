import { defineComponent } from 'vue';
import { renderTNodeJSX } from '../utils/render-tnode';
import { useTNodeJSX } from '../hooks/tnode';
import { prefix } from '../config';

export default defineComponent({
  name: 'TContent',

  setup() {
    const defaultNode = useTNodeJSX('default');

    return {
      defaultNode,
    };
  },

  render() {
    return <main class={`${prefix}-layout__content`}>{this.defaultNode}</main>;
  },
});
