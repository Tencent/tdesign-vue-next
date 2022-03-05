import { ref, watch, nextTick, getCurrentInstance, onMounted, onBeforeUnmount, defineComponent } from 'vue';
import isFunction from 'lodash/isFunction';
import { prefix } from '../config';
import { on, off, getScrollContainer } from '../utils/dom';
import props from './props';
import { ScrollContainerElement } from '../common';
import { renderTNodeJSX } from '../utils/render-tnode';

const name = `${prefix}-affix`;

export default defineComponent({
  name: 'TAffix',
  props,
  emits: ['fixedChange'],
  setup(props, { emit }) {
    const instance = getCurrentInstance() as any;
    const fixedTop = ref<false | number>(false);
    const oldWidthHeight = ref({
      width: '0px',
      height: '0px',
    });
    const scrollContainer = ref<ScrollContainerElement>();
    const containerHeight = ref(0);
    const ticking = ref(false);

    const calcInitValue = () => {
      let _containerHeight = 0; // 获取当前可视的高度
      if (scrollContainer.value instanceof Window) {
        _containerHeight = scrollContainer.value.innerHeight;
      } else {
        _containerHeight = scrollContainer.value.clientHeight;
      }
      if (!instance.ctx || !instance.ctx.$el) {
        return;
      }
      // 需要减掉当前节点的高度，对比的高度应该从 border-top 比对开始
      containerHeight.value = _containerHeight - (instance.ctx.$el?.clientHeight || 0);
      // 被包裹的子节点宽高
      const { clientWidth, clientHeight } = instance.ctx.$el?.querySelector(`.${name}`) || {};
      oldWidthHeight.value = { width: `${clientWidth}px`, height: `${clientHeight}px` };
      handleScroll();
    };

    const handleScroll = () => {
      if (!ticking.value) {
        window.requestAnimationFrame(() => {
          const { top } = instance.ctx.$el.getBoundingClientRect(); // top = 节点到页面顶部的距离，包含 scroll 中的高度
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
          emit('fixedChange', fixedTop.value !== false, { top: fixedTop.value });
          if (isFunction(props.onFixedChange)) props.onFixedChange(fixedTop.value !== false, { top: fixedTop.value });
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
      if (!(scrollContainer.value instanceof Window)) on(window, 'scroll', handleScroll);
    });

    onBeforeUnmount(() => {
      if (!scrollContainer.value) return;
      off(scrollContainer.value, 'scroll', handleScroll);
      off(window, 'resize', calcInitValue);
      if (!(scrollContainer.value instanceof Window)) off(window, 'scroll', handleScroll);
    });

    return {
      fixedTop,
      oldWidthHeight,
      scrollContainer,
    };
  },
  render() {
    const { oldWidthHeight, fixedTop, zIndex } = this;

    if (fixedTop !== false) {
      return (
        <div {...this.$attrs}>
          <div style={oldWidthHeight}></div>
          <div class={name} style={{ zIndex, top: `${fixedTop}px`, width: oldWidthHeight.width }}>
            {renderTNodeJSX(this, 'default')}
          </div>
        </div>
      );
    }

    return <div>{renderTNodeJSX(this, 'default')}</div>;
  },
});
