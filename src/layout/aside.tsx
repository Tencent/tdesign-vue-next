import { defineComponent, onMounted, onUnmounted, inject } from 'vue';
import { prefix } from '../config';
import props from './aside-props';
import { renderTNodeJSX } from '../utils/render-tnode';

import { LayoutProvideType } from './layout';

export default defineComponent({
  name: 'TAside',

  props,

  setup() {
    const { hasSide } = inject<LayoutProvideType>('layout', Object.create(null));
    if (!hasSide) return;

    onMounted(() => {
      hasSide.value = true;
    });

    onUnmounted(() => {
      hasSide.value = false;
    });
  },

  render() {
    const styles = this.width ? { width: this.width } : {};
    return (
      <aside class={`${prefix}-layout__sider`} style={styles}>
        {renderTNodeJSX(this, 'default')}
      </aside>
    );
  },
});
