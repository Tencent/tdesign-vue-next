import { defineComponent, computed, provide, ref } from 'vue';
import { usePrefixClass } from '../hooks/useConfig';
import { useTNodeJSX } from '../hooks/tnode';
import { LayoutInjectionKey } from './consts';

export default defineComponent({
  name: 'TLayout',
  setup() {
    const hasSide = ref(false);
    const renderTNodeJSX = useTNodeJSX();
    const COMPONENT_NAME = usePrefixClass('layout');
    const classes = computed(() => [
      COMPONENT_NAME.value,
      {
        [`${COMPONENT_NAME.value}--with-sider`]: hasSide.value,
      },
    ]);

    const setHasSide = (value: boolean) => {
      hasSide.value = value;
    };
    provide(LayoutInjectionKey, { hasSide, setHasSide });

    return () => <section class={classes.value}>{renderTNodeJSX('default')}</section>;
  },
});
