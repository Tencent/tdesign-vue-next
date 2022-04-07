import { defineComponent, onMounted, onUnmounted, inject } from 'vue';
import props from './aside-props';
import { renderTNodeJSX } from '../utils/render-tnode';
import { usePrefixClass } from '../hooks/useConfig';
import { LayoutProvideType } from './layout';

export default defineComponent({
  name: 'TAside',

  props,

  setup() {
    const { hasSide } = inject<LayoutProvideType>('layout', Object.create(null));
    const classPrefix = usePrefixClass();
    if (!hasSide) return;

    onMounted(() => {
      hasSide.value = true;
    });

    onUnmounted(() => {
      hasSide.value = false;
    });
    return {
      classPrefix,
    };
  },

  render() {
    const { classPrefix } = this;
    const styles = this.width ? { width: this.width } : {};
    return (
      <aside class={`${classPrefix}-layout__sider`} style={styles}>
        {renderTNodeJSX(this, 'default')}
      </aside>
    );
  },
});
