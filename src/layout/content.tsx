import { defineComponent } from 'vue';
import { renderTNodeJSX } from '../utils/render-tnode';
import { usePrefixClass } from '../hooks/useConfig';

export default defineComponent({
  name: 'TContent',
  setup() {
    const classPrefix = usePrefixClass();
    return {
      classPrefix,
    };
  },
  render() {
    return <main class={`${this.classPrefix}-layout__content`}>{renderTNodeJSX(this, 'default')}</main>;
  },
});
