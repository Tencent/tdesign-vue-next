import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { Scrollbar } from '@tdesign/components/scrollbar';
import type { PositionEdge, ScrollbarInstanceFunctions, TdScrollbarProps } from '@tdesign/components/scrollbar';

const WRAP = '.t-scrollbar__wrap';
const VIEW = '.t-scrollbar__view';

interface SizeOptions {
  clientWidth?: number;
  clientHeight?: number;
  scrollWidth?: number;
  scrollHeight?: number;
  scrollLeft?: number;
  scrollTop?: number;
}

// JSDOM 无布局能力，尺寸与滚动位置默认全为 0，需按用例逐项打桩
function mockSize(el: HTMLElement, options: SizeOptions = {}) {
  const {
    clientWidth = 0,
    clientHeight = 0,
    scrollWidth = 0,
    scrollHeight = 0,
    scrollLeft = 0,
    scrollTop = 0,
  } = options;

  Object.defineProperty(el, 'clientWidth', { value: clientWidth, configurable: true });
  Object.defineProperty(el, 'clientHeight', { value: clientHeight, configurable: true });
  Object.defineProperty(el, 'scrollWidth', { value: scrollWidth, configurable: true });
  Object.defineProperty(el, 'scrollHeight', { value: scrollHeight, configurable: true });
  Object.defineProperty(el, 'scrollLeft', { value: scrollLeft, writable: true, configurable: true });
  Object.defineProperty(el, 'scrollTop', { value: scrollTop, writable: true, configurable: true });
}

// JSDOM 未实现 Element.scrollTo / scrollBy
function stubScrollApi(el: HTMLElement) {
  const scrollTo = vi.fn();
  const scrollBy = vi.fn();

  Object.defineProperty(el, 'scrollTo', { value: scrollTo, configurable: true });
  Object.defineProperty(el, 'scrollBy', { value: scrollBy, configurable: true });

  return { scrollTo, scrollBy };
}

function render(props: Partial<TdScrollbarProps> = {}) {
  return mount(Scrollbar, {
    props,
    slots: { default: () => <div class="test-content">content</div> },
  });
}

const getWrap = (wrapper: ReturnType<typeof render>) => wrapper.find(WRAP).element as HTMLElement;

const getExposed = (wrapper: ReturnType<typeof render>) =>
  wrapper.vm.$.exposed as unknown as ScrollbarInstanceFunctions;

const getThumb = (wrapper: ReturnType<typeof render>, axis: 'vertical' | 'horizontal') =>
  wrapper.find(`.t-scrollbar__thumb--${axis}`).element as HTMLElement;

describe('Scrollbar', () => {
  describe('props', () => {
    it(':ariaLabel[string]', () => {
      const wrapper = render({ ariaLabel: 'scrollable content' });
      expect(wrapper.find(VIEW).attributes('aria-label')).toBe('scrollable content');
    });

    it(':autoExpand[boolean]', () => {
      expect(render().classes()).toContain('t-scrollbar--auto-expand');
      expect(render({ autoExpand: false }).classes()).not.toContain('t-scrollbar--auto-expand');
    });

    it(':autoresize[boolean]', () => {
      const autoresize = render({ container: { maxHeight: 200 } });
      expect((autoresize.element as HTMLElement).style.height).toBe('auto');

      const fixed = render({ container: { maxHeight: 200 }, autoresize: false });
      expect((fixed.element as HTMLElement).style.height).toBe('200px');
    });

    it(':container[object]', () => {
      const wrapper = render({ container: { height: 120, width: 240, maxWidth: 320 } });
      const root = wrapper.element as HTMLElement;

      expect(root.style.height).toBe('120px');
      expect(root.style.width).toBe('240px');
      expect(root.style.maxWidth).toBe('320px');

      const maxHeightWrapper = render({ container: { maxHeight: 200 } });
      expect((maxHeightWrapper.element as HTMLElement).style.maxHeight).toBe('200px');
      expect(getWrap(maxHeightWrapper).style.maxHeight).toBe('200px');
    });

    it(':disabled[boolean]', async () => {
      const wrapper = render({ disabled: true, container: { height: 100 } });
      const wrap = getWrap(wrapper);

      expect(wrapper.classes()).toContain('t-scrollbar--disabled');

      mockSize(wrap, { clientHeight: 100, scrollHeight: 400 });
      await wrapper.find(WRAP).trigger('scroll');
      expect(wrapper.find('.t-scrollbar__bar').exists()).toBeFalsy();
    });

    it(':id[string]', () => {
      expect(render({ id: 'view-id' }).find(VIEW).attributes('id')).toBe('view-id');
    });

    it(':role[string]', () => {
      expect(render().find(VIEW).attributes('role')).toBe('scrollbar');
      expect(render({ role: 'region' }).find(VIEW).attributes('role')).toBe('region');
    });

    it.each([['0'], [0]] as [string | number][])(':tabindex[%s]', (tabindex) => {
      expect(render({ tabindex }).find(WRAP).attributes('tabindex')).toBe(String(tabindex));
    });

    it(':thumbMinSize[number]', async () => {
      const wrapper = render({ container: { height: 100 } });
      const wrap = getWrap(wrapper);

      mockSize(wrap, { clientHeight: 100, scrollHeight: 5000 });
      await wrapper.find(WRAP).trigger('scroll');
      expect(getThumb(wrapper, 'vertical').style.height).toBe('20px');

      const largeWrapper = render({ container: { height: 100 }, thumbMinSize: 40 });
      const largeWrap = getWrap(largeWrapper);

      mockSize(largeWrap, { clientHeight: 100, scrollHeight: 5000 });
      await largeWrapper.find(WRAP).trigger('scroll');
      expect(getThumb(largeWrapper, 'vertical').style.height).toBe('40px');
    });

    it(':viewClassName[string]', () => {
      expect(render({ viewClassName: 'custom-view' }).find(`${VIEW}.custom-view`).exists()).toBeTruthy();
    });

    it.each([
      ['always', true],
      ['hover', false],
      ['hide', false],
    ] as [TdScrollbarProps['visibility'], boolean][])(':visibility[%s]', (visibility, barsVisible) => {
      const wrapper = render({ visibility });
      expect(wrapper.classes().includes('t-scrollbar--bars-visible')).toBe(barsVisible);
    });

    it(':wrapClassName[string]', () => {
      expect(render({ wrapClassName: 'custom-wrap' }).find(`${WRAP}.custom-wrap`).exists()).toBeTruthy();
    });
  });

  describe('events', () => {
    it('scroll', async () => {
      const onScroll = vi.fn();
      const wrapper = render({ onScroll });
      const wrap = getWrap(wrapper);

      mockSize(wrap, { clientHeight: 100, scrollHeight: 400, scrollTop: 40 });
      await wrapper.find(WRAP).trigger('scroll');

      expect(onScroll).toHaveBeenCalledTimes(1);
      expect(onScroll).toHaveBeenCalledWith({ scrollTop: 40, scrollLeft: 0 });
    });
  });

  describe('slots', () => {
    it('default', () => {
      expect(render().find(`${VIEW} .test-content`).exists()).toBeTruthy();
    });
  });

  describe('instanceFunctions', () => {
    it('getValues()', async () => {
      const wrapper = render({ container: { height: 100, width: 100 } });
      const wrap = getWrap(wrapper);

      mockSize(wrap, {
        clientWidth: 100,
        clientHeight: 100,
        scrollWidth: 400,
        scrollHeight: 400,
        scrollLeft: 150,
        scrollTop: 150,
      });
      await wrapper.find(WRAP).trigger('scroll');

      expect(getExposed(wrapper).getValues()).toEqual({
        left: 37.5,
        top: 37.5,
        scrollLeft: 150,
        scrollTop: 150,
        scrollWidth: 400,
        scrollHeight: 400,
        clientWidth: 100,
        clientHeight: 100,
      });
    });

    it('scrollTo(x, y)', () => {
      const wrapper = render();
      const { scrollTo } = stubScrollApi(getWrap(wrapper));

      getExposed(wrapper).scrollTo(0, 120);
      expect(scrollTo).toHaveBeenCalledWith({ left: 0, top: 120, behavior: 'smooth' });
    });

    it('scrollTo(options)', () => {
      const wrapper = render();
      const { scrollTo } = stubScrollApi(getWrap(wrapper));

      getExposed(wrapper).scrollTo({ top: 50 });
      expect(scrollTo).toHaveBeenCalledWith({ behavior: 'smooth', top: 50 });

      getExposed(wrapper).scrollTo({ top: 50, behavior: 'auto' });
      expect(scrollTo).toHaveBeenLastCalledWith({ behavior: 'auto', top: 50 });
    });

    it.each([
      ['left', { left: 0, behavior: 'smooth' }],
      ['right', { left: 300, behavior: 'smooth' }],
      ['top', { top: 0, behavior: 'smooth' }],
      ['bottom', { top: 400, behavior: 'smooth' }],
    ] as [PositionEdge, ScrollToOptions][])('scrollToEdge(%s)', (position, expected) => {
      const wrapper = render();
      const wrap = getWrap(wrapper);
      const { scrollTo } = stubScrollApi(wrap);

      mockSize(wrap, { clientWidth: 100, clientHeight: 100, scrollWidth: 300, scrollHeight: 400 });
      getExposed(wrapper).scrollToEdge(position);

      expect(scrollTo).toHaveBeenCalledWith(expected);
    });
  });
});
