import { computed, defineComponent, onBeforeUnmount, onMounted, ref } from '@td/adapter-vue';
import { BacktopIcon as TdBackTopIcon } from 'tdesign-icons-vue-next';

import { useGlobalIcon } from '@td/adapter-hooks';
import props from '@td/intel/back-top/props';

import type { TdBackTopProps } from '@td/intel/back-top/type';
import { useChildSlots, useConfig, useContent, usePrefixClass } from '../hooks';
import { scrollTo } from '../utils/dom';

export default defineComponent({
  name: 'TBackTop',
  props,
  setup(props: TdBackTopProps) {
    const visible = ref(false);
    const containerRef = ref(null);
    const componentName = usePrefixClass('back-top');
    const { classPrefix } = useConfig('alert');

    const { BacktopIcon } = useGlobalIcon({
      BacktopIcon: TdBackTopIcon,
    });
    const renderContent = useContent();
    const getContainer = (container: TdBackTopProps['container']) => {
      if (typeof container === 'string' && typeof document !== undefined) {
        if (container === 'body') {
          return document;
        }
        return document.querySelector(container);
      }
      if (typeof container === 'function') {
        return container();
      }
      return null;
    };
    onMounted(() => {
      containerRef.value = getContainer(props.container) as HTMLElement;
      let visibleHeight: number;
      if (typeof props.visibleHeight === 'string') {
        visibleHeight = Number(props.visibleHeight.replace('px', ''));
      } else {
        visibleHeight = props.visibleHeight;
      }
      if (visibleHeight === 0) {
        visible.value = true;
        return;
      }
      let scrollDOM: HTMLElement;
      if (containerRef.value.scrollTop === undefined) {
        scrollDOM = document.documentElement;
      } else {
        scrollDOM = containerRef.value;
      }
      containerRef.value.onscroll = () => {
        const scrollTop = scrollDOM?.scrollTop;
        if (scrollTop >= visibleHeight) {
          visible.value = true;
        }
        if (scrollTop < visibleHeight && visible.value) {
          visible.value = false;
        }
      };
    });

    onBeforeUnmount(() => {
      containerRef.value.onscroll = null;
    });

    return () => {
      const { theme, shape, size, target, duration, offset, container } = props;
      const getChild = useChildSlots();
      let children = getChild();
      if (children.length < 1) {
        children = null;
      }
      const cls = computed(() => {
        return {
          [componentName.value]: true,
          [`${componentName.value}--theme-${theme}`]: true,
          [`${componentName.value}--${shape}`]: true,
          [`${componentName.value}--show`]: visible.value,
          [`${classPrefix.value}-size-s`]: size === 'small',
          [`${classPrefix.value}-size-m`]: size === 'medium',
        };
      });
      const defaultContent = (
        <>
          <BacktopIcon class={`${componentName.value}__icon`} size="24" />
          <span class={`${componentName.value}__text`}>TOP</span>
        </>
      );
      const getBackTo = () => {
        if (target === container) {
          return 0;
        }
        if (target === 'body') {
          return 0;
        }
        if (!target) {
          return 0;
        }
        const targetNode = getContainer(target);
        if (!targetNode) {
          return 0;
        }
        const y = (targetNode as HTMLElement).getBoundingClientRect().y;
        return y;
      };
      const handleClick = (e: MouseEvent) => {
        const y = getBackTo();
        scrollTo(y, { container: containerRef.value, duration });
        props.onClick?.({ e });
      };
      const positionStyle = computed(() => {
        return {
          insetInlineEnd: offset[0],
          insetBlockEnd: offset[1],
        };
      });
      return (
        <button type="button" class={cls.value} style={positionStyle.value} onClick={handleClick}>
          {renderContent('content', 'default', defaultContent)}
        </button>
      );
    };
  },
});
