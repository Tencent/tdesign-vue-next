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
    const containerHeight = ref<number>(0);

    const calcInitValue = () => {
      // 获取当前可视的高度
      const _containerHeight =
        scrollContainer.value[scrollContainer.value instanceof Window ? 'innerHeight' : 'clientHeight'] || 0;
      // 需要减掉当前节点的高度，对比的高度应该从 border-top 比对开始
      containerHeight.value = _containerHeight - (affixWrapRef.value.clientHeight || 0);
      // 被包裹的子节点宽高
      const { clientWidth, clientHeight } = affixRef.value;
      // 给占位节点设置宽高
      placeholderEL.value.style.width = `${clientWidth}px`;
      placeholderEL.value.style.height = `${clientHeight}px`;

      handleScroll();
    };

    const handleScroll = () => {
      if (!ticking.value) {
        window.requestAnimationFrame(() => {
          const { top = 0 } = affixWrapRef.value.getBoundingClientRect(); // top = 节点到页面顶部的距离，包含 scroll 中的高度
          let containerTop = 0; // containerTop = 容器到页面顶部的距离
          if (scrollContainer.value instanceof HTMLElement) {
            containerTop = scrollContainer.value.getBoundingClientRect().top;
          }

          let fixedTop: number | false; // 0 -1 false 都有具体的意义
          const calcTop = top - containerTop; // 节点顶部到 container 顶部的距离
          const calcBottom = containerTop + containerHeight.value - props.offsetBottom; // 计算 bottom 相对应的 top 值

          if (props.offsetTop !== undefined && calcTop <= props.offsetTop) {
            // top 的触发
            fixedTop = containerTop + props.offsetTop;
          } else if (props.offsetBottom !== undefined && top >= calcBottom) {
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
              affixRef.value.style.width = `${placeholderEL.value.clientWidth}px`;
              affixRef.value.style.zIndex = `${props.zIndex}`;

              !placeholderStatus && affixWrapRef.value.appendChild(placeholderEL.value);
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
        calcInitValue();
      },
    );

    watch(
      () => props.offsetBottom,
      () => {
        calcInitValue();
      },
    );

    onMounted(async () => {
      await nextTick();
      scrollContainer.value = getScrollContainer(props.container);
      calcInitValue();
      on(scrollContainer.value, 'scroll', handleScroll);
      on(window, 'resize', calcInitValue);
    });

    onBeforeUnmount(() => {
      if (!scrollContainer.value) return;
      off(scrollContainer.value, 'scroll', handleScroll);
      off(window, 'resize', calcInitValue);
    });

    return {
      affixWrapRef,
      affixRef,
      handleScroll,
    };
  },
  render() {
    // console.log('render');
    return (
      <div ref="affixWrapRef">
        <div ref="affixRef">{renderTNodeJSX(this, 'default')}</div>
      </div>
    );
  },
});
