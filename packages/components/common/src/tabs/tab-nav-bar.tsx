import type { PropType, VNode } from '@td/adapter-vue';
import { computed, defineComponent, nextTick, onMounted, ref, watch } from '@td/adapter-vue';
import tabProps from '@td/intel/tabs/props';

// hooks
import { usePrefixClass } from '@td/adapter-hooks';
import { firstUpperCase } from '../utils/helper';

export default defineComponent({
  props: {
    navs: {
      type: Array as PropType<VNode[]>,
    },
    placement: tabProps.placement,
    value: tabProps.value,
  },
  setup(props) {
    const COMPONENT_NAME = usePrefixClass('tabs');
    const classPrefix = usePrefixClass();
    const navBarClass = computed(() => {
      return [`${COMPONENT_NAME.value}__bar`, `${classPrefix.value}-is-${props.placement}`];
    });
    const navBarStyle = ref(null);
    const getStyle = () => {
      const isVertical = ['left', 'right'].includes(props.placement.toLowerCase());
      const [sizePropName, offsetPropName] = isVertical ? ['height', 'top'] : ['width', 'left'];
      let offset = 0;
      let i = 0;
      for (; i < props.navs.length; i++) {
        if (props.navs[i].props.value === props.value) {
          break;
        }
        offset += props.navs[i]?.el?.[`client${firstUpperCase(sizePropName)}`] || 0;
      }
      if (!props.navs[i]) {
        return {};
      }
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
