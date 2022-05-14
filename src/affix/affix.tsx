import { ref, watch, nextTick, onMounted, onBeforeUnmount, defineComponent } from 'vue';
import isFunction from 'lodash/isFunction';
import { on, off, getScrollContainer } from '../utils/dom';
import props from './props';
import { ScrollContainerElement } from '../common';
import { renderTNodeJSX } from '../utils/render-tnode';
import { usePrefixClass } from '../hooks/useConfig';

export default defineComponent({
  name: 'TAffix',
  props,
  emits: ['fixedChange'],
  setup(props, context) {
    const COMPONENT_NAME = usePrefixClass('affix');

    const affixWrapRef = ref<HTMLElement>(null);
    const affixRef = ref<HTMLElement>(null);
    const placeholderEL = ref(document.createElement('div')); // 占位节点
    const ticking = ref(false);

    const scrollContainer = ref<ScrollContainerElement>();

    const handleScroll = () => {
      if (!ticking.value) {
        window.requestAnimationFrame(() => {
          const {
            top: wrapToTop,
            width: wrapWidth,
            height: wrapHeight,
          } = affixWrapRef.value.getBoundingClientRect() ?? { top: 0, width: 0, height: 0 }; // top = 节点到页面顶部的距离，包含 scroll 中的高度

          let containerTop = 0; // containerTop = 容器到页面顶部的距离
          if (scrollContainer.value instanceof HTMLElement) {
            containerTop = scrollContainer.value.getBoundingClientRect().top;
          }

          let fixedTop: number | false; // 0 -1 false 都有具体的意义
          const calcTop = wrapToTop - containerTop; // 节点顶部到 container 顶部的距离

          const containerHeight =
            scrollContainer.value[scrollContainer.value instanceof Window ? 'innerHeight' : 'clientHeight'] -
            wrapHeight;
          const calcBottom = containerTop + containerHeight - props.offsetBottom; // 计算 bottom 相对应的 top 值

          if (props.offsetTop !== undefined && calcTop <= props.offsetTop) {
            // top 的触发
            fixedTop = containerTop + props.offsetTop;
          } else if (props.offsetBottom !== undefined && wrapToTop >= calcBottom) {
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
              affixRef.value.style.top = `${fixedTop}px`;
              affixRef.value.style.width = `${wrapWidth}px`;
              affixRef.value.style.height = `${wrapHeight}px`;

              if (props.zIndex) {
                affixRef.value.style.zIndex = `${props.zIndex}`;
              }

              if (!placeholderStatus) {
                placeholderEL.value.style.width = `${wrapWidth}px`;
                placeholderEL.value.style.height = `${wrapHeight}px`;
                affixWrapRef.value.appendChild(placeholderEL.value);
              }
            } else {
              affixRef.value.removeAttribute('class');
              affixRef.value.removeAttribute('style');
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

    onMounted(async () => {
      await nextTick();
      scrollContainer.value = getScrollContainer(props.container);
      on(scrollContainer.value, 'scroll', handleScroll);
      on(window, 'resize', handleScroll);
    });

    onBeforeUnmount(() => {
      if (!scrollContainer.value) return;
      off(scrollContainer.value, 'scroll', handleScroll);
      off(window, 'resize', handleScroll);
    });

    return {
      affixWrapRef,
      affixRef,
      handleScroll,
      scrollContainer,
    };
  },
  render() {
    return (
      <div ref="affixWrapRef">
        <div ref="affixRef">{renderTNodeJSX(this, 'default')}</div>
      </div>
    );
  },
});
