import { defineComponent, onMounted, onUnmounted, inject } from '@td/adapter-vue';
import props from '@td/intel/layout/aside-props';
import { LayoutProvideType } from './layout';
import { usePrefixClass } from '@td/adapter-hooks';
import { useTNodeJSX } from '@td/adapter-hooks';

export default defineComponent({
  name: 'TAside',

  props,

  setup(props) {
    const { hasSide } = inject<LayoutProvideType>('layout', Object.create(null));
    const COMPONENT_NAME = usePrefixClass('layout__sider');
    const renderTNodeJSX = useTNodeJSX();
    if (!hasSide) return;

    onMounted(() => {
      hasSide.value = true;
    });

    onUnmounted(() => {
      hasSide.value = false;
    });

    return () => {
      const styles = props.width ? { width: props.width } : {};
      return (
        <aside class={COMPONENT_NAME.value} style={styles}>
          {renderTNodeJSX('default')}
        </aside>
      );
    };
  },
});
