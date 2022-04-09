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

    const affixRef = ref(null);
    const fixedTop = ref<false | number>(false);
    const scrollContainer = ref<ScrollContainerElement>();
    const containerHeight = ref(0);
    const ticking = ref(false);
    const contentStyle = ref({});

    const calcInitValue = () => {
      let _containerHeight = 0; // 获取当前可视的高度
      if (scrollContainer.value instanceof Window) {
        _containerHeight = scrollContainer.value.innerHeight;
      } else {
        _containerHeight = scrollContainer.value.clientHeight;
      }

      // 需要减掉当前节点的高度，对比的高度应该从 border-top 比对开始
      containerHeight.value = _containerHeight - (affixRef.value.clientHeight || 0);
      handleScroll();
    };

    const handleScroll = () => {
      if (!ticking.value) {
        window.requestAnimationFrame(() => {
          const { top } = affixRef.value.getBoundingClientRect(); // top = 节点到页面顶部的距离，包含 scroll 中的高度
          let containerTop = 0; // containerTop = 容器到页面顶部的距离
          if (scrollContainer.value instanceof HTMLElement) {
            containerTop = scrollContainer.value.getBoundingClientRect().top;
          }
          const calcTop = top - containerTop; // 节点顶部到 container 顶部的距离
          const calcBottom = containerTop + containerHeight.value - props.offsetBottom; // 计算 bottom 相对应的 top 值
          if (props.offsetTop !== undefined && calcTop <= props.offsetTop) {
            // top 的触发
            fixedTop.value = containerTop + props.offsetTop;
          } else if (props.offsetBottom !== undefined && top >= calcBottom) {
            // bottom 的触发
            fixedTop.value = calcBottom;
          } else {
            fixedTop.value = false;
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

    watch([fixedTop], ([val]) => {
      context.emit('fixedChange', val !== false, { top: val });
      if (isFunction(props.onFixedChange)) props.onFixedChange(val !== false, { top: Number(val) });
    });

    const getContentStyle = () => {
      const { clientWidth, clientHeight } = affixRef.value;

      contentStyle.value = {
        width: `${clientWidth}px`,
        height: `${clientHeight}px`,
      };
    };

    onMounted(async () => {
      await nextTick();
      scrollContainer.value = getScrollContainer(props.container);
      calcInitValue();
      getContentStyle();
      on(scrollContainer.value, 'scroll', handleScroll);
      on(window, 'resize', calcInitValue);
      if (!(scrollContainer.value instanceof Window)) on(window, 'scroll', handleScroll);
    });

    onBeforeUnmount(() => {
      if (!scrollContainer.value) return;
      off(scrollContainer.value, 'scroll', handleScroll);
      off(window, 'resize', calcInitValue);
      if (!(scrollContainer.value instanceof Window)) off(window, 'scroll', handleScroll);
    });

    return {
      COMPONENT_NAME,
      affixRef,
      fixedTop,
      scrollContainer,
      contentStyle,
    };
  },
  render() {
    const { fixedTop, zIndex, contentStyle } = this;

    return (
      <div style={fixedTop !== false ? contentStyle : {}} ref="affixRef">
        {fixedTop !== false ? (
          <div class={this.COMPONENT_NAME} style={{ zIndex, top: `${fixedTop}px` }}>
            {renderTNodeJSX(this, 'default')}
          </div>
        ) : (
          renderTNodeJSX(this, 'default')
        )}
      </div>
    );
  },
});
