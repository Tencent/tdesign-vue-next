import { defineComponent, PropType, computed, VNode, nextTick, ref, watch, onMounted } from 'vue';
import tabProps from './props';

// hooks
import { usePrefixClass } from '../hooks/useConfig';
import useResizeObserver from '../hooks/useResizeObserver';
import debounce from 'lodash/debounce';

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
    const barRef = ref<HTMLElement>();
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
        if (props.navs[i]?.el) {
          const sizeWithUnit = getComputedStyle(props.navs[i].el as Element)[sizePropName as 'width' | 'left'];
          const size = parseFloat(sizeWithUnit);
          offset += size;
        }
      }
      if (!props.navs[i]) return {};
      return {
        [offsetPropName]: `${offset}px`,
        [sizePropName]: props.navs[i].el
          ? getComputedStyle(props.navs[i].el as Element)[sizePropName as 'width' | 'left']
          : '0px',
      };
    };
    const update = () => (navBarStyle.value = getStyle());

    onMounted(() => {
      nextTick(() => {
        update();
      });
    });

    watch([() => props.navs, () => props.value, () => props.placement], () => {
      nextTick(() => {
        update();
      });
    });

    useResizeObserver(
      barRef,
      debounce(() => {
        update();
        // 数值大了动画不流畅，小了会频繁触发，所以在合适区间里选择一个值
      }, 35),
    );
    return () => {
      return <div class={navBarClass.value} style={navBarStyle.value} ref={barRef}></div>;
    };
  },
});
