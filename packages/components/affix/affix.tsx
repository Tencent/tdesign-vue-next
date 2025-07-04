import { ref, watch, nextTick, onMounted, onBeforeUnmount, defineComponent, onActivated, onDeactivated } from 'vue';
import { isFunction, isUndefined } from 'lodash-es';

import { on, off, getScrollContainer } from '@tdesign/shared-utils';
import props from './props';
import { ScrollContainerElement } from '../common';
import { useTNodeJSX, usePrefixClass } from '@tdesign/shared-hooks';

export default defineComponent({
  name: 'TAffix',
  props,
  emits: ['fixedChange'],
  setup(props, context) {
    const COMPONENT_NAME = usePrefixClass('affix');
    const renderTNodeJSX = useTNodeJSX();

    const affixWrapRef = ref<HTMLElement>(null);
    const affixRef = ref<HTMLElement>(null);
    const placeholderEL = ref(document?.createElement('div')); // 占位节点
    const ticking = ref(false);
    const isBind = ref(false);

    const scrollContainer = ref<ScrollContainerElement>();
    const affixStyle = ref<Record<string, any>>();
    let rAFId = 0;

    const handleScroll = () => {
      if (!ticking.value) {
        rAFId = window.requestAnimationFrame(() => {
          rAFId = 0;
          const {
            top: wrapToTop,
            width: wrapWidth,
            height: wrapHeight,
          } = affixWrapRef.value?.getBoundingClientRect() ?? { top: 0, width: 0, height: 0 }; // top = 节点到页面顶部的距离，包含 scroll 中的高度

          let containerTop = 0; // containerTop = 容器到页面顶部的距离
          if (scrollContainer.value instanceof HTMLElement) {
            containerTop = scrollContainer.value.getBoundingClientRect().top;
          }

          let fixedTop: number | false; // 0 -1 false 都有具体的意义
          const calcTop = wrapToTop - containerTop; // 节点顶部到 container 顶部的距离

          const containerHeight =
            // @ts-ignore 这个的源头应该是在这里 type ScrollContainerElement = Window | HTMLElement;
            scrollContainer.value[scrollContainer.value instanceof Window ? 'innerHeight' : 'clientHeight'] -
            wrapHeight;
          const calcBottom = containerTop + containerHeight - props.offsetBottom; // 计算 bottom 相对应的 top 值

          if (!isUndefined(props.offsetTop) && calcTop <= props.offsetTop) {
            // top 的触发
            fixedTop = containerTop + props.offsetTop;
          } else if (!isUndefined(props.offsetBottom) && wrapToTop >= calcBottom) {
            // bottom 的触发
            fixedTop = calcBottom;
          } else {
            fixedTop = false;
          }

          if (affixRef.value) {
            const affixed = fixedTop !== false;
            const placeholderStatus = affixWrapRef.value.contains(placeholderEL.value);

            if (affixed) {
              affixRef.value.className = COMPONENT_NAME.value;
              affixStyle.value = {
                top: `${fixedTop}px`,
                width: `${wrapWidth}px`,
                height: `${wrapHeight}px`,
                zIndex: props.zIndex,
              };

              if (!placeholderStatus) {
                placeholderEL.value.style.width = `${wrapWidth}px`;
                placeholderEL.value.style.height = `${wrapHeight}px`;
                affixWrapRef.value.appendChild(placeholderEL.value);
              }
            } else {
              affixRef.value.removeAttribute('class');
              affixStyle.value = undefined;
              placeholderStatus && placeholderEL.value.remove();
            }

            context.emit('fixedChange', affixed, { top: Number(fixedTop) });
            if (isFunction(props.onFixedChange)) props.onFixedChange(affixed, { top: Number(fixedTop) });
          }

          ticking.value = false;
        });
        ticking.value = true;
      }
    };

    const bindScroll = async () => {
      await nextTick();
      if (isBind.value) return;
      scrollContainer.value = getScrollContainer(props.container);
      on(scrollContainer.value, 'scroll', handleScroll);
      on(window, 'resize', handleScroll);
      isBind.value = true;
    };

    const unbindScroll = () => {
      if (!scrollContainer.value || !isBind.value) return;
      off(scrollContainer.value, 'scroll', handleScroll);
      off(window, 'resize', handleScroll);
      if (rAFId) {
        window.cancelAnimationFrame(rAFId);
      }
      isBind.value = false;
    };

    watch(
      () => props.offsetTop,
      () => {
        handleScroll();
      },
    );

    watch(
      () => props.offsetBottom,
      () => {
        handleScroll();
      },
    );

    watch(
      () => props.zIndex,
      () => {
        handleScroll();
      },
    );

    onMounted(bindScroll);

    onActivated(bindScroll);

    onDeactivated(unbindScroll);

    onBeforeUnmount(unbindScroll);

    context.expose({
      scrollContainer,
      affixWrapRef,
      handleScroll,
    });

    return () => (
      <div ref={affixWrapRef}>
        <div ref={affixRef} style={affixStyle.value}>
          {renderTNodeJSX('default')}
        </div>
      </div>
    );
  },
});
