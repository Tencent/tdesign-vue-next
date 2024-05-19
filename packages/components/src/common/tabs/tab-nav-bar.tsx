import { defineComponent, computed, nextTick, ref, watch, onMounted } from '@td/adapter-vue';
import type { PropType, VNode } from '@td/adapter-vue';

import { usePrefixClass } from '@td/adapter-hooks';
import type { TdTabsProps } from '@td/intel/components/tabs/type';

import { firstUpperCase } from './utils';

export default defineComponent({
  props: {
    navs: {
      type: Array as PropType<VNode[]>,
      default: [],
    },
    placement: {
      type: String as PropType<TdTabsProps['placement']>,
      default: 'top',
    },
    value: {
      type: String as PropType<TdTabsProps['value']>,
    },
  },
  setup(props) {
    const COMPONENT_NAME = usePrefixClass('tabs');
    const classPrefix = usePrefixClass();
    const navBarClass = computed(() => {
      return [`${COMPONENT_NAME.value}__bar`, `${classPrefix.value}-is-${props.placement}`];
    });
    const navBarStyle = ref<Record<string, any> | null>(null);
    const getStyle = () => {
      const isVertical = ['left', 'right'].includes(props.placement!.toLowerCase());
      const [sizePropName, offsetPropName] = isVertical ? ['height', 'top'] : ['width', 'left'];
      let offset = 0;
      let i = 0;
      for (; i < props.navs.length; i++) {
        if (props.navs[i].props?.value === props.value) {
          break;
        }
        offset += props.navs[i]?.el?.[`client${firstUpperCase(sizePropName)}`] || 0;
      }
      if (!props.navs[i]) return {};
      return {
        [offsetPropName]: `${offset}px`,
        [sizePropName]: `${props.navs[i].el?.[`client${firstUpperCase(sizePropName)}`] || 0}px`,
      };
    };

    onMounted(() => {
      nextTick(() => {
        navBarStyle.value = getStyle();
      });
    });

    watch([() => props.navs, () => props.value, () => props.placement], () => {
      nextTick(() => {
        navBarStyle.value = getStyle();
      });
    });

    return () => {
      return <div class={navBarClass.value} style={navBarStyle.value}></div>;
    };
  },
});
