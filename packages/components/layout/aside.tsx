import { defineComponent, onMounted, onUnmounted, inject } from 'vue';
import props from './aside-props';
import { usePrefixClass } from '../hooks/useConfig';
import { useTNodeJSX } from '../hooks/tnode';
import { LayoutInjectionKey } from './consts';

export default defineComponent({
  name: 'TAside',
  props,
  setup(props) {
    const { hasSide, setHasSide } = inject(LayoutInjectionKey, undefined);
    const COMPONENT_NAME = usePrefixClass('layout__sider');
    const renderTNodeJSX = useTNodeJSX();
    if (!hasSide) return;

    onMounted(() => {
      setHasSide(true);
    });

    onUnmounted(() => {
      setHasSide(false);
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
