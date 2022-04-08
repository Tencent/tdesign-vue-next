import { defineComponent, computed, provide, ref, Ref } from 'vue';
import { renderTNodeJSX } from '../utils/render-tnode';
import { usePrefixClass } from '../hooks/useConfig';

export type LayoutProvideType = {
  hasSide: Ref<boolean>;
};

export default defineComponent({
  name: 'TLayout',

  setup() {
    const hasSide = ref(false);

    const COMPONENT_NAME = usePrefixClass('layout');
    const classes = computed(() => [
      COMPONENT_NAME.value,
      {
        [`${COMPONENT_NAME.value}--with-sider`]: hasSide.value,
      },
    ]);

    provide('layout', { hasSide });

    return {
      classes,
    };
  },

  render() {
    return <section class={this.classes}>{renderTNodeJSX(this, 'default')}</section>;
  },
});
