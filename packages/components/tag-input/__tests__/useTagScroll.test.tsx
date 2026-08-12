import { defineComponent, nextTick } from 'vue';
import type { PropType } from 'vue';
import { mount, VueWrapper } from '@vue/test-utils';
import { useTagScroll } from '../hooks/useTagScroll';
import type { TdTagInputProps } from '../type';

let scrollApi: ReturnType<typeof useTagScroll>;

const ScrollHarness = defineComponent({
  name: 'TagInputScrollHarness',
  props: {
    attachElement: {
      type: Boolean,
      default: true,
    },
    disabled: Boolean,
    readonly: Boolean,
    excessTagsDisplayType: {
      type: String as PropType<TdTagInputProps['excessTagsDisplayType']>,
      default: 'break-line',
    },
  },
  setup(props) {
    scrollApi = useTagScroll(props);
    return () => (
      <div
        class="scroll-root"
        ref={(element) => {
          if (props.attachElement && element) scrollApi.tagInputRef.value = { $el: element };
        }}
      >
        <div class="t-input__prefix" />
      </div>
    );
  },
});

describe('useTagScroll', () => {
  const wrappers: VueWrapper[] = [];

  const render = async (props: InstanceType<typeof ScrollHarness>['$props'] = {}) => {
    const wrapper = mount(ScrollHarness, { props });
    wrappers.push(wrapper);
    await nextTick();
    return {
      wrapper,
      api: scrollApi,
      root: wrapper.find<HTMLElement>('.scroll-root').element,
      prefix: wrapper.find<HTMLElement>('.t-input__prefix').element,
    };
  };

  const setMetrics = (element: HTMLElement, scrollWidth: number, clientWidth: number, scrollLeft = 0) => {
    Object.defineProperty(element, 'scrollWidth', { configurable: true, value: scrollWidth });
    Object.defineProperty(element, 'clientWidth', { configurable: true, value: clientWidth });
    Object.defineProperty(element, 'scrollLeft', { configurable: true, writable: true, value: scrollLeft });
  };

  afterEach(() => {
    wrappers.splice(0).forEach((wrapper) => wrapper.unmount());
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe('props', () => {
    it(':disabled[boolean]', async () => {
      const { api, prefix } = await render({ disabled: true });
      const scroll = vi.fn();
      prefix.scroll = scroll;

      api.onWheel({ e: new WheelEvent('wheel', { deltaY: 100 }) });

      expect(scroll).not.toHaveBeenCalled();
    });

    it(':readonly[boolean]', async () => {
      const { api, prefix } = await render({ readonly: true });
      const scroll = vi.fn();
      prefix.scroll = scroll;

      api.onWheel({ e: new WheelEvent('wheel', { deltaY: 100 }) });

      expect(scroll).not.toHaveBeenCalled();
    });

    it(':excessTagsDisplayType[break-line]', async () => {
      vi.useFakeTimers();
      const { api } = await render();

      api.scrollToRightOnEnter();

      expect(vi.getTimerCount()).toBe(0);
    });

    it(':excessTagsDisplayType[scroll]', async () => {
      vi.useFakeTimers();
      const { api, prefix } = await render({ excessTagsDisplayType: 'scroll' });
      const scroll = vi.fn();
      prefix.scroll = scroll;
      setMetrics(prefix, 300, 100);

      api.scrollToRightOnEnter();
      await vi.advanceTimersByTimeAsync(100);
      await vi.runOnlyPendingTimersAsync();

      expect(scroll).toHaveBeenCalledWith({ left: 200, behavior: 'smooth' });
    });
  });

  describe('events', () => {
    it(':updateScrollElement', async () => {
      const { api } = await render({ attachElement: false });
      const root = document.createElement('div');
      const prefix = document.createElement('div');
      prefix.className = 't-input__prefix';
      root.append(prefix);

      api.updateScrollElement(root);

      expect(api.scrollElement.value).toBe(prefix);
    });

    it(':updateScrollDistance', async () => {
      const { api, prefix } = await render();
      setMetrics(prefix, 360, 120);

      api.updateScrollDistance();

      expect(api.scrollDistance.value).toBe(240);
    });

    it(':scrollTo[without native scroll]', async () => {
      const { api, prefix } = await render();
      Object.defineProperty(prefix, 'scroll', { configurable: true, value: undefined });

      expect(() => api.scrollTo(120)).not.toThrow();
    });

    it(':scrollTo[number]', async () => {
      const { api, prefix } = await render();
      const scroll = vi.fn();
      prefix.scroll = scroll;

      api.scrollTo(120);

      expect(scroll).toHaveBeenCalledWith({ left: 120, behavior: 'smooth' });
    });

    it(':scrollToRight[without root]', async () => {
      vi.useFakeTimers();
      const { api } = await render({ attachElement: false });

      api.scrollToRight();

      expect(vi.getTimerCount()).toBe(0);
      expect(api.isScrollable.value).toBe(false);
    });

    it(':scrollToRight[without prefix]', async () => {
      vi.useFakeTimers();
      const { api } = await render({ attachElement: false });
      const root = document.createElement('div');
      api.tagInputRef.value = { $el: root };

      api.scrollToRight();

      expect(vi.getTimerCount()).toBe(0);
      expect(api.isScrollable.value).toBe(false);
    });

    it(':scrollToRight', async () => {
      vi.useFakeTimers();
      const { api, prefix } = await render();
      const scroll = vi.fn();
      prefix.scroll = scroll;
      setMetrics(prefix, 360, 120);

      api.scrollToRight();
      await vi.advanceTimersByTimeAsync(0);
      expect(scroll).toHaveBeenCalledWith({ left: 240, behavior: 'smooth' });
      expect(api.isScrollable.value).toBe(false);

      await vi.advanceTimersByTimeAsync(200);
      expect(api.isScrollable.value).toBe(true);
    });

    it(':scrollToLeft', async () => {
      const { api, prefix } = await render();
      const scroll = vi.fn();
      prefix.scroll = scroll;

      api.scrollToLeft();

      expect(scroll).toHaveBeenCalledWith({ left: 0, behavior: 'smooth' });
    });

    it(':onWheel[without prefix]', async () => {
      const { api } = await render({ attachElement: false });
      expect(() => api.onWheel({ e: new WheelEvent('wheel', { deltaY: 100 }) })).not.toThrow();
    });

    it(':onWheel[positive deltaX]', async () => {
      const { api, prefix } = await render();
      const scroll = vi.fn();
      prefix.scroll = scroll;
      setMetrics(prefix, 300, 100, 20);

      api.onWheel({ e: new WheelEvent('wheel', { deltaX: 80, deltaY: 20 }) });

      expect(scroll).toHaveBeenCalledWith({ left: 140, behavior: 'smooth' });
    });

    it(':onWheel[positive delta capped at maximum]', async () => {
      const { api, prefix } = await render();
      const scroll = vi.fn();
      prefix.scroll = scroll;
      setMetrics(prefix, 300, 100, 180);

      api.onWheel({ e: new WheelEvent('wheel', { deltaY: 80 }) });

      expect(scroll).toHaveBeenCalledWith({ left: 200, behavior: 'smooth' });
    });

    it(':onWheel[negative deltaY]', async () => {
      const { api, prefix } = await render();
      const scroll = vi.fn();
      prefix.scroll = scroll;
      setMetrics(prefix, 300, 100, 150);

      api.onWheel({ e: new WheelEvent('wheel', { deltaX: 5, deltaY: -80 }) });

      expect(scroll).toHaveBeenCalledWith({ left: 30, behavior: 'smooth' });
    });

    it(':onWheel[negative delta capped at zero]', async () => {
      const { api, prefix } = await render();
      const scroll = vi.fn();
      prefix.scroll = scroll;
      setMetrics(prefix, 300, 100, 20);

      api.onWheel({ e: new WheelEvent('wheel', { deltaY: -80 }) });

      expect(scroll).toHaveBeenCalledWith({ left: 0, behavior: 'smooth' });
    });

    it(':onWheel[zero delta]', async () => {
      const { api, prefix } = await render();
      const scroll = vi.fn();
      prefix.scroll = scroll;
      setMetrics(prefix, 300, 100, 20);

      api.onWheel({ e: new WheelEvent('wheel') });

      expect(scroll).not.toHaveBeenCalled();
    });

    it(':scrollToLeftOnLeave', async () => {
      vi.useFakeTimers();
      const { api, prefix } = await render({ excessTagsDisplayType: 'scroll' });
      const scroll = vi.fn();
      prefix.scroll = scroll;
      setMetrics(prefix, 300, 100);

      api.scrollToRight();
      await vi.advanceTimersByTimeAsync(200);
      expect(api.isScrollable.value).toBe(true);

      api.scrollToLeftOnLeave();
      expect(api.isScrollable.value).toBe(false);
      expect(scroll).toHaveBeenLastCalledWith({ left: 0, behavior: 'smooth' });
    });

    it(':scrollToLeftOnLeave[break-line]', async () => {
      const { api, prefix } = await render();
      const scroll = vi.fn();
      prefix.scroll = scroll;

      api.scrollToLeftOnLeave();

      expect(scroll).not.toHaveBeenCalled();
    });
  });

  describe('lifecycle', () => {
    it('initializes the prefix element on mount', async () => {
      const { api, prefix } = await render();
      expect(api.scrollElement.value).toBe(prefix);
    });

    it('allows mounting before a root element exists', async () => {
      const { api } = await render({ attachElement: false });
      expect(api.scrollElement.value).toBeUndefined();
    });

    it('clears the hover timer on unmount', async () => {
      vi.useFakeTimers();
      const { wrapper, api, prefix } = await render({ excessTagsDisplayType: 'scroll' });
      const scroll = vi.fn();
      prefix.scroll = scroll;
      setMetrics(prefix, 300, 100);

      api.scrollToRightOnEnter();
      wrapper.unmount();
      await vi.advanceTimersByTimeAsync(500);

      expect(scroll).not.toHaveBeenCalled();
    });
  });
});
