import { computed, defineComponent, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import { isNumber } from 'lodash-es';

import { usePrefixClass, useResizeObserver } from '@tdesign/shared-hooks';
import props from './props';

import type { PositionEdge, PositionValues } from './type';

type Axis = 'vertical' | 'horizontal';

interface BarState {
  visible: boolean;
  size: number;
  offset: number;
}

export default defineComponent({
  name: 'TScrollbar',
  props,
  setup(props, { slots, expose }) {
    const classPrefix = usePrefixClass('scrollbar');

    const wrapRef = ref<HTMLElement>(null);
    const viewRef = ref<HTMLElement>(null);

    const hovered = ref(false);
    const dragging = ref<Axis | null>(null);

    const state = reactive({
      verticalVisible: false,
      verticalSize: 0,
      verticalOffset: 0,
      horizontalVisible: false,
      horizontalSize: 0,
      horizontalOffset: 0,
    });

    // 滑块尺寸与可视区等比，偏移量按剩余可滚动距离等比换算，滑块不小于 thumbMinSize
    const calcBar = (clientSize: number, scrollSize: number, scrollOffset: number): BarState => {
      if (!clientSize || scrollSize <= clientSize) return { visible: false, size: 0, offset: 0 };

      const size = Math.min(clientSize, Math.max(props.thumbMinSize, (clientSize * clientSize) / scrollSize));
      const maxOffset = clientSize - size;
      const maxScroll = scrollSize - clientSize;

      return {
        visible: true,
        size,
        offset: maxScroll > 0 ? (scrollOffset / maxScroll) * maxOffset : 0,
      };
    };

    const update = () => {
      const wrap = wrapRef.value;
      if (!wrap) return;

      const vertical = calcBar(wrap.clientHeight, wrap.scrollHeight, wrap.scrollTop);
      const horizontal = calcBar(wrap.clientWidth, wrap.scrollWidth, wrap.scrollLeft);

      state.verticalVisible = vertical.visible;
      state.verticalSize = vertical.size;
      state.verticalOffset = vertical.offset;
      state.horizontalVisible = horizontal.visible;
      state.horizontalSize = horizontal.size;
      state.horizontalOffset = horizontal.offset;
    };

    const handleScroll = () => {
      const wrap = wrapRef.value;
      if (!wrap) return;

      update();
      props.onScroll?.({ scrollTop: wrap.scrollTop, scrollLeft: wrap.scrollLeft });
    };

    useResizeObserver(wrapRef, update);
    useResizeObserver(viewRef, update);

    const getAxes = (wrap: HTMLElement, axis: Axis) => {
      const isVertical = axis === 'vertical';

      return {
        clientSize: isVertical ? wrap.clientHeight : wrap.clientWidth,
        thumbSize: isVertical ? state.verticalSize : state.horizontalSize,
        thumbOffset: isVertical ? state.verticalOffset : state.horizontalOffset,
      };
    };

    let dragStart = 0;
    let dragScrollStart = 0;
    let dragRatio = 1;

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging.value) return;

      const wrap = wrapRef.value;
      if (!wrap) return;

      const pointer = dragging.value === 'vertical' ? e.clientY : e.clientX;
      const next = dragScrollStart + (pointer - dragStart) * dragRatio;

      if (dragging.value === 'vertical') {
        wrap.scrollTop = next;
      } else {
        wrap.scrollLeft = next;
      }
    };

    const unbindDrag = () => {
      dragging.value = null;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', unbindDrag);
    };

    const handleThumbMousedown = (e: MouseEvent, axis: Axis) => {
      const wrap = wrapRef.value;
      if (props.disabled || !wrap) return;

      e.preventDefault();
      e.stopPropagation();

      const { clientSize, thumbSize } = getAxes(wrap, axis);
      const maxScroll = (axis === 'vertical' ? wrap.scrollHeight : wrap.scrollWidth) - clientSize;
      const maxOffset = clientSize - thumbSize;

      dragging.value = axis;
      dragStart = axis === 'vertical' ? e.clientY : e.clientX;
      dragScrollStart = axis === 'vertical' ? wrap.scrollTop : wrap.scrollLeft;
      dragRatio = maxOffset > 0 && maxScroll > 0 ? maxScroll / maxOffset : 1;

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', unbindDrag);
    };

    const handleBarMousedown = (e: MouseEvent, axis: Axis) => {
      const wrap = wrapRef.value;
      if (props.disabled || !wrap || e.target !== e.currentTarget) return;

      e.preventDefault();

      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const { clientSize, thumbOffset } = getAxes(wrap, axis);
      const pointer = axis === 'vertical' ? e.clientY - rect.top : e.clientX - rect.left;
      const distance = pointer < thumbOffset ? -clientSize : clientSize;

      wrap.scrollBy(axis === 'vertical' ? { top: distance } : { left: distance });
    };

    const handleWheel = (e: WheelEvent) => {
      const wrap = wrapRef.value;
      if (props.disabled || !wrap || !props.step) return;

      const left = isNumber(props.step.x) && e.deltaX ? Math.sign(e.deltaX) * props.step.x : 0;
      const top = isNumber(props.step.y) && e.deltaY ? Math.sign(e.deltaY) * props.step.y : 0;

      if (!left && !top) return;

      e.preventDefault();
      wrap.scrollBy({ left, top });
    };

    const handleKeydown = (e: KeyboardEvent) => {
      const wrap = wrapRef.value;
      if (props.disabled || !wrap || !props.step) return;

      const { x = 0, y = 0 } = props.step;
      const deltas: Record<string, { left?: number; top?: number }> = {
        ArrowLeft: { left: -x },
        ArrowRight: { left: x },
        ArrowUp: { top: -y },
        ArrowDown: { top: y },
      };
      const delta = deltas[e.key];

      if (!delta || (!delta.left && !delta.top)) return;

      e.preventDefault();
      wrap.scrollBy(delta);
    };

    const toSize = (value?: string | number) => (isNumber(value) ? `${value}px` : value);

    const rootStyle = computed(() => {
      const { container } = props;
      if (!container) return undefined;

      const maxHeight = toSize(container.maxHeight);

      return {
        // autoresize 为 true 时容器高度随内容伸缩（由 maxHeight 封顶），关闭后固定为 maxHeight
        height: toSize(container.height) ?? (maxHeight != null ? (props.autoresize ? 'auto' : maxHeight) : undefined),
        maxHeight,
        width: toSize(container.width),
        maxWidth: toSize(container.maxWidth),
      };
    });

    // 高度上限必须同时落到滚动容器上：root 的 max-height 限制不了 height: 100% 的 wrap
    const wrapStyle = computed(() => {
      const { container } = props;
      if (!container) return undefined;

      return {
        maxHeight: toSize(container.maxHeight),
        maxWidth: toSize(container.maxWidth),
      };
    });

    const barsVisible = computed(
      () =>
        !props.disabled &&
        props.visibility !== 'hide' &&
        (props.visibility === 'always' || hovered.value || !!dragging.value),
    );

    const rootClasses = computed(() => [
      classPrefix.value,
      {
        [`${classPrefix.value}--auto-expand`]: props.autoExpand,
        [`${classPrefix.value}--bars-visible`]: barsVisible.value,
        [`${classPrefix.value}--dragging`]: !!dragging.value,
        [`${classPrefix.value}--disabled`]: props.disabled,
      },
    ]);

    const wrapClasses = computed(() => [`${classPrefix.value}__wrap`, props.wrapClassName]);

    const viewClasses = computed(() => [`${classPrefix.value}__view`, props.viewClassName]);

    // 尊重系统的“减弱动态效果”设置，避免无障碍场景下仍强制动画
    const getBehavior = (): ScrollBehavior => {
      if (typeof window === 'undefined') return 'auto';

      return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    };

    function scrollTo(x: number, y: number): void;
    function scrollTo(options: { top?: number; left?: number; behavior?: ScrollBehavior }): void;
    function scrollTo(x: number | { top?: number; left?: number; behavior?: ScrollBehavior }, y?: number) {
      const wrap = wrapRef.value;
      if (!wrap) return;

      if (isNumber(x)) {
        wrap.scrollTo({ left: x, top: y ?? 0, behavior: getBehavior() });
        return;
      }

      wrap.scrollTo({ behavior: getBehavior(), ...x });
    }

    const scrollToEdge = (position: PositionEdge) => {
      const wrap = wrapRef.value;
      if (!wrap) return;

      const edges: Record<PositionEdge, ScrollToOptions> = {
        left: { left: 0 },
        right: { left: wrap.scrollWidth },
        top: { top: 0 },
        bottom: { top: wrap.scrollHeight },
      };

      wrap.scrollTo({ ...edges[position], behavior: getBehavior() });
    };

    const getValues = (): PositionValues => {
      const wrap = wrapRef.value;

      return {
        left: state.horizontalOffset,
        top: state.verticalOffset,
        scrollLeft: wrap?.scrollLeft ?? 0,
        scrollTop: wrap?.scrollTop ?? 0,
        scrollWidth: wrap?.scrollWidth ?? 0,
        scrollHeight: wrap?.scrollHeight ?? 0,
        clientWidth: wrap?.clientWidth ?? 0,
        clientHeight: wrap?.clientHeight ?? 0,
      };
    };

    watch(() => props.thumbMinSize, update);

    // container 与 autoresize 都会改变容器尺寸，等 DOM 更新完成后再测量
    watch(
      [
        () => props.container?.height,
        () => props.container?.maxHeight,
        () => props.container?.width,
        () => props.container?.maxWidth,
        () => props.autoresize,
      ],
      update,
      { flush: 'post' },
    );

    onMounted(update);

    onBeforeUnmount(unbindDrag);

    expose({ getValues, scrollTo, scrollToEdge });

    const renderBar = (axis: Axis) => {
      const vertical = axis === 'vertical';
      const visible = vertical ? state.verticalVisible : state.horizontalVisible;

      if (!visible || props.disabled || props.visibility === 'hide') return null;

      const size = vertical ? state.verticalSize : state.horizontalSize;
      const offset = vertical ? state.verticalOffset : state.horizontalOffset;

      return (
        <div
          class={[`${classPrefix.value}__bar`, `${classPrefix.value}__bar--${axis}`]}
          onMousedown={(e: MouseEvent) => handleBarMousedown(e, axis)}
        >
          <div
            class={[`${classPrefix.value}__thumb`, `${classPrefix.value}__thumb--${axis}`]}
            style={
              vertical
                ? { height: `${size}px`, transform: `translateY(${offset}px)` }
                : { width: `${size}px`, transform: `translateX(${offset}px)` }
            }
            onMousedown={(e: MouseEvent) => handleThumbMousedown(e, axis)}
          />
        </div>
      );
    };

    return () => (
      <div
        class={rootClasses.value}
        style={rootStyle.value}
        onMouseenter={() => {
          hovered.value = true;
        }}
        onMouseleave={() => {
          hovered.value = false;
        }}
      >
        <div
          ref={wrapRef}
          class={wrapClasses.value}
          style={wrapStyle.value}
          tabindex={props.tabindex}
          onScroll={handleScroll}
          onWheel={handleWheel}
          onKeydown={handleKeydown}
        >
          <div
            ref={viewRef}
            id={props.id || undefined}
            role={props.role}
            aria-label={props.ariaLabel || undefined}
            class={viewClasses.value}
          >
            {slots.default?.()}
          </div>
        </div>
        {renderBar('vertical')}
        {renderBar('horizontal')}
      </div>
    );
  },
});
