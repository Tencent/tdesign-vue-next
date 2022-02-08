import { defineComponent, computed, provide, ref, Ref } from 'vue';
import { prefix } from '../config';
import { renderTNodeJSX } from '../utils/render-tnode';

const name = `${prefix}-layout`;

export type LayoutProvideType = {
  hasSide: Ref<boolean>;
};

export default defineComponent({
  name: 'TLayout',

  setup() {
    const hasSide = ref(false);

    const classes = computed(() => [
      name,
      {
        [`${name}--with-sider`]: hasSide.value,
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
