import {
  CSSProperties,
  VNode,
  cloneVNode,
  computed,
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  ref,
  watch,
} from 'vue';
import { useChildComponentSlots, usePrefixClass, useResizeObserver, useTNodeJSX } from '@tdesign/shared-hooks';
import props from './props';

type PanelSize = number | string | 'auto';

const getEventPoint = (event: MouseEvent | TouchEvent, vertical: boolean) => {
  const point = 'touches' in event ? event.touches[0] || event.changedTouches[0] : event;
  return vertical ? point?.clientY ?? 0 : point?.clientX ?? 0;
};

export default defineComponent({
  name: 'TSplit',
  props,
  setup(props, { expose }) {
    const componentName = usePrefixClass('split');
    const renderTNodeJSX = useTNodeJSX();
    const getChildComponentByName = useChildComponentSlots();
    const splitRef = ref<HTMLElement>();
    const sizes = ref<number[]>([]);
    const previewSizes = ref<number[]>([]);
    const draggingIndex = ref(-1);
    const lastAvailableSize = ref(0);
    let panelCount = 0;
    let dragStartPoint = 0;
    let dragStartSizes: number[] = [];
    let resizeObserverReady = false;
    let renderedPanels: VNode[] = [];
    let bodyCursor = '';
    let bodyUserSelect = '';
    let hasDragListeners = false;

    const isVertical = computed(() => props.direction === 'vertical');

    const getPanels = () => renderedPanels;

    const getContainerSize = () => {
      const container = splitRef.value;
      if (!container) return 0;
      const clientSize = isVertical.value ? container.clientHeight : container.clientWidth;
      if (clientSize) return clientSize;
      const rect = container.getBoundingClientRect();
      return isVertical.value ? rect.height : rect.width;
    };

    const getAvailableSize = (count = getPanels().length) =>
      Math.max(0, getContainerSize() - Math.max(0, count - 1) * Math.max(0, props.gap));

    const parseSize = (value: PanelSize | undefined, total: number): number | undefined => {
      if (value === undefined || value === 'auto' || value === '') return undefined;
      if (typeof value === 'number') return value;
      const normalized = value.trim();
      if (normalized.endsWith('%')) {
        const percent = Number.parseFloat(normalized);
        return Number.isFinite(percent) ? (percent / 100) * total : undefined;
      }
      const result = Number.parseFloat(normalized);
      return Number.isFinite(result) ? result : undefined;
    };

    const getPanelProps = (panel: VNode) => (panel.props || {}) as Record<string, unknown>;

    const getPanelBounds = (panel: VNode, total: number) => {
      const panelProps = getPanelProps(panel);
      const min = parseSize((panelProps.min ?? props.panelSize?.min) as PanelSize | undefined, total) ?? 0;
      const max =
        parseSize((panelProps.max ?? props.panelSize?.max) as PanelSize | undefined, total) ?? Number.POSITIVE_INFINITY;
      return { min: Math.max(0, min), max: Math.max(min, max) };
    };

    const fitSizes = (requestedSizes: PanelSize[], panels = getPanels()) => {
      const total = getAvailableSize(panels.length);
      if (!panels.length) return [];

      const parsedSizes = requestedSizes.map((size) => parseSize(size, total));
      const specifiedTotal = parsedSizes.reduce((sum, size) => sum + (size ?? 0), 0);
      const autoCount = parsedSizes.filter((size) => size === undefined).length;
      const autoSize = autoCount ? Math.max(0, total - specifiedTotal) / autoCount : 0;
      const nextSizes = parsedSizes.map((size) => size ?? autoSize);

      if (!autoCount && specifiedTotal !== total && nextSizes.length) {
        nextSizes[nextSizes.length - 1] += total - specifiedTotal;
      }

      const bounds = panels.map((panel) => getPanelBounds(panel, total));
      nextSizes.forEach((size, index) => {
        nextSizes[index] = Math.min(bounds[index].max, Math.max(bounds[index].min, size));
      });

      let difference = total - nextSizes.reduce((sum, size) => sum + size, 0);
      for (let pass = 0; pass < nextSizes.length && Math.abs(difference) > 0.01; pass += 1) {
        const candidates = nextSizes
          .map((size, index) => ({ size, index }))
          .filter(({ size, index }) => (difference > 0 ? size < bounds[index].max : size > bounds[index].min));
        if (!candidates.length) break;
        const share = difference / candidates.length;
        candidates.forEach(({ index }) => {
          const before = nextSizes[index];
          nextSizes[index] = Math.min(bounds[index].max, Math.max(bounds[index].min, nextSizes[index] + share));
          difference -= nextSizes[index] - before;
        });
      }

      return nextSizes.map((size) => Math.max(0, size));
    };

    const getDefaultSizes = (panels = getPanels()): PanelSize[] =>
      panels.map((panel) => (getPanelProps(panel).defaultSize as PanelSize | undefined) ?? 'auto');

    const initializeSizes = () => {
      const panels = getPanels();
      panelCount = panels.length;
      const nextSizes = fitSizes(getDefaultSizes(panels), panels);
      sizes.value = nextSizes;
      lastAvailableSize.value = getAvailableSize(panels.length);
      resizeObserverReady = Boolean(lastAvailableSize.value);
    };

    const setSizes = (newSizes: PanelSize[]) => {
      const panels = getPanels();
      const normalizedSizes = panels.map((_, index) => newSizes[index] ?? 'auto');
      sizes.value = fitSizes(normalizedSizes, panels);
      lastAvailableSize.value = getAvailableSize(panels.length);
    };

    const reset = () => {
      sizes.value = fitSizes(getDefaultSizes());
    };

    const getSizes = () => [...sizes.value];

    const isDividerResizable = (index: number, panels = getPanels()) => {
      const previous = getPanelProps(panels[index]);
      const next = getPanelProps(panels[index + 1]);
      return previous.resizable !== false && next.resizable !== false;
    };

    const getResizedSizes = (index: number, offset: number, sourceSizes: number[]) => {
      const panels = getPanels();
      const total = getAvailableSize(panels.length);
      const previousBounds = getPanelBounds(panels[index], total);
      const nextBounds = getPanelBounds(panels[index + 1], total);
      const previousSize = sourceSizes[index];
      const nextSize = sourceSizes[index + 1];
      const minOffset = Math.max(previousBounds.min - previousSize, nextSize - nextBounds.max);
      const maxOffset = Math.min(previousBounds.max - previousSize, nextSize - nextBounds.min);
      const normalizedOffset = Math.min(maxOffset, Math.max(minOffset, offset));
      const nextSizes = [...sourceSizes];
      nextSizes[index] = previousSize + normalizedOffset;
      nextSizes[index + 1] = nextSize - normalizedOffset;
      return nextSizes;
    };

    const removeDragListeners = () => {
      if (!hasDragListeners) return;
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchmove', handleDragMove);
      document.removeEventListener('touchend', handleDragEnd);
      document.removeEventListener('touchcancel', handleDragEnd);
      document.body.style.cursor = bodyCursor;
      document.body.style.userSelect = bodyUserSelect;
      hasDragListeners = false;
    };

    const handleDragMove = (event: MouseEvent | TouchEvent) => {
      if (draggingIndex.value < 0) return;
      if ('cancelable' in event && event.cancelable) event.preventDefault();
      const offset = getEventPoint(event, isVertical.value) - dragStartPoint;
      const nextSizes = getResizedSizes(draggingIndex.value, offset, dragStartSizes);
      if (props.lazy) {
        previewSizes.value = nextSizes;
      } else {
        sizes.value = nextSizes;
      }
      props.onResize?.([...nextSizes]);
    };

    const handleDragEnd = () => {
      if (draggingIndex.value < 0) return;
      const finalSizes = props.lazy ? previewSizes.value : sizes.value;
      if (props.lazy) sizes.value = [...finalSizes];
      draggingIndex.value = -1;
      previewSizes.value = [];
      removeDragListeners();
      props.onResizeEnd?.([...finalSizes]);
    };

    const handleDragStart = (index: number, event: MouseEvent | TouchEvent) => {
      if (!isDividerResizable(index) || draggingIndex.value >= 0 || ('button' in event && event.button !== 0)) return;
      event.preventDefault();
      draggingIndex.value = index;
      dragStartPoint = getEventPoint(event, isVertical.value);
      dragStartSizes = [...sizes.value];
      previewSizes.value = [...sizes.value];
      props.onResizeStart?.([...sizes.value]);
      document.addEventListener('mousemove', handleDragMove);
      document.addEventListener('mouseup', handleDragEnd);
      document.addEventListener('touchmove', handleDragMove, { passive: false });
      document.addEventListener('touchend', handleDragEnd);
      document.addEventListener('touchcancel', handleDragEnd);
      hasDragListeners = true;
      bodyCursor = document.body.style.cursor;
      bodyUserSelect = document.body.style.userSelect;
      document.body.style.cursor = isVertical.value ? 'row-resize' : 'col-resize';
      document.body.style.userSelect = 'none';
    };

    const handleKeydown = (index: number, event: KeyboardEvent) => {
      const decreaseKey = isVertical.value ? 'ArrowUp' : 'ArrowLeft';
      const increaseKey = isVertical.value ? 'ArrowDown' : 'ArrowRight';
      if (![decreaseKey, increaseKey].includes(event.key) || !isDividerResizable(index)) return;
      event.preventDefault();
      const offset = event.key === increaseKey ? 10 : -10;
      props.onResizeStart?.([...sizes.value]);
      const nextSizes = getResizedSizes(index, offset, sizes.value);
      sizes.value = nextSizes;
      props.onResize?.([...nextSizes]);
      props.onResizeEnd?.([...nextSizes]);
    };

    const handleContainerResize = () => {
      const panels = getPanels();
      const availableSize = getAvailableSize(panels.length);
      if (!panels.length || !availableSize) return;
      if (!resizeObserverReady || sizes.value.length !== panels.length || !lastAvailableSize.value) {
        resizeObserverReady = true;
        initializeSizes();
        return;
      }
      if (Math.abs(availableSize - lastAvailableSize.value) < 0.5) return;
      const ratio = availableSize / lastAvailableSize.value;
      sizes.value = fitSizes(
        sizes.value.map((size) => size * ratio),
        panels,
      );
      lastAvailableSize.value = availableSize;
    };

    useResizeObserver(splitRef, handleContainerResize);

    watch(
      () => [props.direction, props.gap],
      () => {
        nextTick(() => initializeSizes());
      },
    );

    onMounted(() => {
      initializeSizes();
    });
    onUpdated(() => {
      const nextPanelCount = getPanels().length;
      if (nextPanelCount !== panelCount) nextTick(() => initializeSizes());
    });
    onBeforeUnmount(removeDragListeners);

    expose({ getSizes, reset, setSizes });

    const renderDragger = () =>
      renderTNodeJSX('draggerIcon', {
        defaultNode: <span class={`${componentName.value}__dragger-default`} />,
      });

    const renderDivider = (index: number, panels: VNode[]) => {
      const resizable = isDividerResizable(index, panels);
      const isDragging = draggingIndex.value === index;
      const offset =
        props.lazy && isDragging && previewSizes.value.length ? previewSizes.value[index] - dragStartSizes[index] : 0;
      const barStyle: CSSProperties = {
        ...(props.splitStyle as CSSProperties),
        ...(isVertical.value ? { height: `${Math.max(0, props.gap)}px` } : { width: `${Math.max(0, props.gap)}px` }),
        ...(offset
          ? { transform: isVertical.value ? `translateY(${offset}px)` : `translateX(${offset}px)` }
          : undefined),
      };
      const interactiveStyle: CSSProperties = isVertical.value
        ? { height: `${Math.max(0, props.splitSize)}px` }
        : { width: `${Math.max(0, props.splitSize)}px` };

      return (
        <div
          key={`split-bar-${index}`}
          class={[
            `${componentName.value}__bar`,
            props.splitClassName,
            { [`${componentName.value}__bar--disabled`]: !resizable },
          ]}
          style={barStyle}
        >
          <div
            class={`${componentName.value}__bar-inner`}
            style={interactiveStyle}
            role="separator"
            aria-orientation={isVertical.value ? 'horizontal' : 'vertical'}
            aria-valuenow={Math.round(sizes.value[index] || 0)}
            tabindex={resizable ? 0 : -1}
            onMousedown={(event: MouseEvent) => handleDragStart(index, event)}
            onTouchstart={(event: TouchEvent) => handleDragStart(index, event)}
            onKeydown={(event: KeyboardEvent) => handleKeydown(index, event)}
          >
            <span class={`${componentName.value}__dragger`}>{renderDragger()}</span>
          </div>
        </div>
      );
    };

    return () => {
      const panels = getChildComponentByName('SplitPanel');
      renderedPanels = panels;
      const children = panels.flatMap((panel, index) => {
        const size = sizes.value[index];
        const panelStyle: CSSProperties = size === undefined ? { flex: '1 1 0' } : { flex: `0 0 ${size}px` };
        const nodes = [cloneVNode(panel, { key: panel.key ?? `split-panel-${index}`, style: panelStyle })];
        if (index < panels.length - 1) nodes.push(renderDivider(index, panels));
        return nodes;
      });

      return (
        <div
          ref={splitRef}
          class={[componentName.value, `${componentName.value}--${props.direction}`]}
          data-dragging={draggingIndex.value >= 0 ? '' : undefined}
        >
          {children}
        </div>
      );
    };
  },
});
