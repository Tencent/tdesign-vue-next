import { h, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { Swiper, SwiperItem } from '@tdesign/components';
import swiperProps from '@tdesign/components/swiper/props';

const mocks = vi.hoisted(() => ({
  resizeCallbacks: [] as Array<() => void>,
  nativeResizeCallbacks: [] as Array<() => void>,
}));

vi.mock('@tdesign/shared-hooks', async (importOriginal) => {
  const original = await importOriginal<typeof import('@tdesign/shared-hooks')>();
  return {
    ...original,
    useResizeObserver: (_target: unknown, callback: () => void) => {
      mocks.resizeCallbacks.push(callback);
    },
  };
});

type SwiperWrapper = VueWrapper<InstanceType<typeof Swiper>>;
type SlotRenderer = () => ReturnType<typeof h>;

const originalResizeObserver = window.ResizeObserver;

class ResizeObserverMock {
  constructor(callback: ResizeObserverCallback) {
    mocks.nativeResizeCallbacks.push(() => callback([], this));
  }

  observe() {}

  unobserve() {}

  disconnect() {}
}

const mountSwiper = (
  props: Record<string, unknown> = {},
  itemCount = 3,
  slots: Record<string, SlotRenderer> = {},
  attachTo?: HTMLElement,
) =>
  mount(Swiper, {
    props: { autoplay: false, ...props },
    slots: {
      default: () =>
        Array.from({ length: itemCount }, (_, index) => (
          <SwiperItem key={index}>
            <div class={`slide-${index}`}>Slide {index}</div>
          </SwiperItem>
        )),
      ...slots,
    },
    ...(attachTo ? { attachTo } : {}),
  }) as SwiperWrapper;

const getActiveNavigationIndex = (wrapper: SwiperWrapper) =>
  wrapper.findAll('.t-swiper__navigation-item').findIndex((item) => item.classes().includes('t-is-active'));

const finishSwitching = async (duration = 300) => {
  vi.advanceTimersByTime(duration + 51);
  await nextTick();
};

describe('Swiper', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mocks.resizeCallbacks.length = 0;
    mocks.nativeResizeCallbacks.length = 0;
    Object.defineProperty(window, 'ResizeObserver', {
      configurable: true,
      writable: true,
      value: ResizeObserverMock,
    });
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    Object.defineProperty(window, 'ResizeObserver', {
      configurable: true,
      writable: true,
      value: originalResizeObserver,
    });
  });

  describe('props', () => {
    it(':default[slot]', () => {
      const wrapper = mountSwiper();

      expect(wrapper.classes()).toContain('t-swiper');
      expect(wrapper.findAll('.t-swiper__container__item')).toHaveLength(5);
      expect(wrapper.find('.slide-0').text()).toBe('Slide 0');
      expect(getActiveNavigationIndex(wrapper)).toBe(0);

      wrapper.unmount();
    });

    it(':animation validator', () => {
      const validator = swiperProps.animation.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('slide')).toBe(true);
      expect(validator('fade')).toBe(true);
      // @ts-expect-error -- exercises the generated prop validator
      expect(validator('other')).toBe(false);
    });

    it(':direction validator', () => {
      const validator = swiperProps.direction.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('horizontal')).toBe(true);
      expect(validator('vertical')).toBe(true);
      // @ts-expect-error -- exercises the generated prop validator
      expect(validator('other')).toBe(false);
    });

    it(':trigger validator', () => {
      const validator = swiperProps.trigger.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('hover')).toBe(true);
      expect(validator('click')).toBe(true);
      // @ts-expect-error -- exercises the generated prop validator
      expect(validator('other')).toBe(false);
    });

    it(':type validator', () => {
      const validator = swiperProps.type.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('default')).toBe(true);
      expect(validator('card')).toBe(true);
      // @ts-expect-error -- exercises the generated prop validator
      expect(validator('other')).toBe(false);
    });

    it(':animation[slide/fade]', () => {
      const slide = mountSwiper({ animation: 'slide' });
      const fade = mountSwiper({ animation: 'fade' });

      expect((slide.find('.t-swiper__container').element as HTMLElement).style.transform).toContain('translate3d');
      expect(slide.findAll('.t-swiper__container__item')).toHaveLength(5);
      expect(fade.find('.t-swiper-fade').exists()).toBe(true);
      expect((fade.find('.t-swiper__container').element as HTMLElement).style.transform).toBe('');
      expect(fade.findAll('.t-swiper__container__item')).toHaveLength(3);

      slide.unmount();
      fade.unmount();
    });

    it(':animation[empty]', () => {
      const wrapper = mountSwiper({ animation: '' });

      expect((wrapper.find('.t-swiper__container').element as HTMLElement).style.transform).toBe('');

      wrapper.unmount();
    });

    it(':autoplay[boolean] + :interval[number]', async () => {
      const autoplay = mountSwiper({ autoplay: true, interval: 1000, duration: 100 });
      const stopped = mountSwiper({ autoplay: true, interval: 0 });

      vi.advanceTimersByTime(851);
      await nextTick();
      expect(getActiveNavigationIndex(autoplay)).toBe(1);
      expect(getActiveNavigationIndex(stopped)).toBe(0);

      autoplay.unmount();
      stopped.unmount();
    });

    it(':cardScale[number]', () => {
      const wrapper = mountSwiper({ type: 'card', cardScale: 0.5 });
      const inactive = wrapper.findAll('.t-swiper__card').find((item) => !item.classes().includes('t-is-active'));

      expect((inactive?.element as HTMLElement).style.transform).toContain('scale(0.5)');

      wrapper.unmount();
    });

    it(':current[number]', async () => {
      const wrapper = mountSwiper({ current: 1 });

      expect(getActiveNavigationIndex(wrapper)).toBe(1);
      await wrapper.setProps({ current: 2 });
      expect(getActiveNavigationIndex(wrapper)).toBe(2);

      wrapper.unmount();
    });

    it(':current[number] takes precedence over :defaultCurrent[number] for zero', () => {
      const wrapper = mountSwiper({ current: 0, defaultCurrent: 2 });

      expect(getActiveNavigationIndex(wrapper)).toBe(0);

      wrapper.unmount();
    });

    it(':defaultCurrent[number]', () => {
      const wrapper = mountSwiper({ defaultCurrent: 2 });

      expect(getActiveNavigationIndex(wrapper)).toBe(2);

      wrapper.unmount();
    });

    it(':direction[horizontal/vertical]', () => {
      const horizontal = mountSwiper({ direction: 'horizontal' });
      const vertical = mountSwiper({ direction: 'vertical', height: 320 });

      expect(horizontal.find('.t-swiper__wrap').classes()).not.toContain('t-swiper--vertical');
      expect(vertical.find('.t-swiper__wrap').classes()).toContain('t-swiper--vertical');
      expect((vertical.find('.t-swiper__container').element as HTMLElement).style.transform).toContain(
        'translate3d(0,',
      );

      horizontal.unmount();
      vertical.unmount();
    });

    it(':duration[number]', async () => {
      const wrapper = mountSwiper({ duration: 600 });

      await nextTick();
      await wrapper.find('.t-swiper__arrow-right').trigger('click');
      expect((wrapper.find('.t-swiper__container').element as HTMLElement).style.transition).toBe(
        'transform 0.6s ease',
      );

      wrapper.unmount();
    });

    it(':height[number]', () => {
      const fade = mountSwiper({ animation: 'fade', height: 300 });
      const card = mountSwiper({ type: 'card', height: 240 });
      const vertical = mountSwiper({ direction: 'vertical', height: 400 });

      expect((fade.find('.t-swiper__container').element as HTMLElement).style.height).toBe('300px');
      expect((card.find('.t-swiper__container').element as HTMLElement).style.height).toBe('240px');
      expect((vertical.find('.t-swiper__container').element as HTMLElement).style.height).toBe('400px');

      fade.unmount();
      card.unmount();
      vertical.unmount();
    });

    it(':loop[boolean]', async () => {
      const wrapper = mountSwiper({ autoplay: true, loop: false, interval: 500, duration: 100 });

      vi.advanceTimersByTime(3000);
      await nextTick();
      expect(getActiveNavigationIndex(wrapper)).toBe(1);

      wrapper.unmount();
    });

    it(':navigation[object] placement and size', () => {
      const outside = mountSwiper({ navigation: { placement: 'outside', size: 'large' } });
      const small = mountSwiper({ navigation: { placement: 'inside', size: 'small' } });

      expect(outside.find('.t-swiper__wrap').classes()).toEqual(
        expect.arrayContaining(['t-swiper--outside', 't-swiper--large']),
      );
      expect(small.find('.t-swiper__wrap').classes()).toEqual(
        expect.arrayContaining(['t-swiper--inside', 't-swiper--small']),
      );

      outside.unmount();
      small.unmount();
    });

    it.each([
      ['bars', 't-swiper__navigation-bars'],
      ['dots', 't-swiper__navigation-dots'],
      ['dots-bar', 't-swiper__navigation-dots-bar'],
      ['fraction', 't-swiper__navigation--fraction'],
    ])(':navigation[object] type=%s', (type, className) => {
      const wrapper = mountSwiper({ navigation: { type } });

      expect(wrapper.find(`.${className}`).exists()).toBe(true);

      wrapper.unmount();
    });

    it(':navigation[object] showSlideBtn', async () => {
      const always = mountSwiper({ navigation: { showSlideBtn: 'always' } });
      const hover = mountSwiper({ navigation: { showSlideBtn: 'hover' } });
      const never = mountSwiper({ navigation: { showSlideBtn: 'never' } });

      await nextTick();
      expect(always.find('.t-swiper__arrow--default').exists()).toBe(true);
      expect(hover.find('.t-swiper__arrow--default').exists()).toBe(false);
      await hover.trigger('mouseenter');
      expect(hover.find('.t-swiper__arrow--default').exists()).toBe(true);
      await hover.trigger('mouseleave');
      expect(hover.find('.t-swiper__arrow--default').exists()).toBe(false);
      expect(never.find('.t-swiper__arrow--default').exists()).toBe(false);

      always.unmount();
      hover.unmount();
      never.unmount();
    });

    it(':navigation[vnode]', () => {
      const wrapper = mountSwiper({ navigation: h('div', { class: 'vnode-navigation' }, 'VNode') });

      expect(wrapper.find('.vnode-navigation').text()).toBe('VNode');

      wrapper.unmount();
    });

    it(':navigation[function]', () => {
      const wrapper = mountSwiper({ navigation: () => h('div', { class: 'function-navigation' }, 'Function') });

      expect(wrapper.find('.function-navigation').text()).toBe('Function');
      expect(wrapper.find('.t-swiper__navigation-bars').exists()).toBe(false);

      wrapper.unmount();
    });

    it(':navigation[slot]', () => {
      const wrapper = mountSwiper({}, 3, {
        navigation: () => h('div', { class: 'slot-navigation' }, 'Slot'),
      });

      expect(wrapper.find('.slot-navigation').text()).toBe('Slot');

      wrapper.unmount();
    });

    it(':stopOnHover[boolean]', async () => {
      const stopped = mountSwiper({ autoplay: true, interval: 1000, duration: 100, stopOnHover: true });
      const running = mountSwiper({ autoplay: true, interval: 1000, duration: 100, stopOnHover: false });

      await stopped.trigger('mouseenter');
      await running.trigger('mouseenter');
      vi.advanceTimersByTime(851);
      await nextTick();
      expect(getActiveNavigationIndex(stopped)).toBe(0);
      expect(getActiveNavigationIndex(running)).toBe(1);

      await stopped.trigger('mouseleave');
      vi.advanceTimersByTime(851);
      await nextTick();
      expect(getActiveNavigationIndex(stopped)).toBe(1);

      stopped.unmount();
      running.unmount();
    });

    it(':trigger[hover/click]', async () => {
      const hover = mountSwiper({ trigger: 'hover' });
      const click = mountSwiper({ trigger: 'click' });
      const hoverItems = hover.findAll('.t-swiper__navigation-item');
      const clickItems = click.findAll('.t-swiper__navigation-item');

      await hoverItems[1].trigger('mouseenter');
      await hoverItems[2].trigger('click');
      expect(getActiveNavigationIndex(hover)).toBe(1);
      await clickItems[1].trigger('mouseenter');
      await clickItems[2].trigger('click');
      expect(getActiveNavigationIndex(click)).toBe(2);

      hover.unmount();
      click.unmount();
    });

    it(':type[default/card]', () => {
      const defaultType = mountSwiper({ type: 'default' });
      const card = mountSwiper({ type: 'card' });

      expect(defaultType.find('.t-swiper-card').exists()).toBe(false);
      expect(card.find('.t-swiper-card').exists()).toBe(true);
      expect(card.findAll('.t-swiper__container__item')).toHaveLength(5);

      defaultType.unmount();
      card.unmount();
    });

    it(':default[slot] with one item', () => {
      const wrapper = mountSwiper({}, 1);

      expect(wrapper.findAll('.t-swiper__container__item')).toHaveLength(1);
      expect(wrapper.findAll('.t-swiper__navigation-item')).toHaveLength(1);

      wrapper.unmount();
    });
  });

  describe('events', () => {
    it('onChange[source=click]', async () => {
      const onChange = vi.fn();
      const wrapper = mountSwiper({ onChange });

      await nextTick();
      await wrapper.find('.t-swiper__arrow-right').trigger('click');
      expect(onChange).toHaveBeenCalledWith(1, { source: 'click' });

      wrapper.unmount();
    });

    it('onChange[source=hover]', async () => {
      const onChange = vi.fn();
      const wrapper = mountSwiper({ onChange, trigger: 'hover' });

      await wrapper.findAll('.t-swiper__navigation-item')[2].trigger('mouseenter');
      expect(onChange).toHaveBeenCalledWith(2, { source: 'hover' });

      wrapper.unmount();
    });

    it('onChange[source=click] via navigation', async () => {
      const onChange = vi.fn();
      const wrapper = mountSwiper({ onChange, trigger: 'click' });

      await wrapper.findAll('.t-swiper__navigation-item')[2].trigger('click');
      expect(onChange).toHaveBeenCalledWith(2, { source: 'click' });

      wrapper.unmount();
    });

    it('onChange[source=autoplay]', async () => {
      const onChange = vi.fn();
      const wrapper = mountSwiper({ onChange, autoplay: true, interval: 1000, duration: 100 });

      vi.advanceTimersByTime(851);
      await nextTick();
      expect(onChange).toHaveBeenCalledWith(1, { source: 'autoplay' });

      wrapper.unmount();
    });

    it('update:current', async () => {
      const wrapper = mountSwiper();

      await nextTick();
      await wrapper.find('.t-swiper__arrow-right').trigger('click');
      expect(wrapper.emitted('update:current')).toEqual([[1]]);

      wrapper.unmount();
    });

    it('ignores arrow clicks while switching', async () => {
      const onChange = vi.fn();
      const wrapper = mountSwiper({ onChange });

      await nextTick();
      await wrapper.find('.t-swiper__arrow-right').trigger('click');
      await wrapper.find('.t-swiper__arrow-right').trigger('click');
      await wrapper.find('.t-swiper__arrow-left').trigger('click');
      expect(onChange).toHaveBeenCalledTimes(1);

      wrapper.unmount();
    });

    it('wraps slide items in both directions', async () => {
      const onNext = vi.fn();
      const next = mountSwiper({ defaultCurrent: 2, duration: 100, onChange: onNext });

      await nextTick();
      await next.find('.t-swiper__arrow-right').trigger('click');
      expect(onNext).toHaveBeenCalledWith(0, { source: 'click' });
      vi.advanceTimersByTime(100);
      await nextTick();
      expect((next.find('.t-swiper__container').element as HTMLElement).style.transform).toContain('-100%');

      const onPrevious = vi.fn();
      const previous = mountSwiper({ defaultCurrent: 0, duration: 100, onChange: onPrevious });
      await nextTick();
      await previous.find('.t-swiper__arrow-left').trigger('click');
      expect(onPrevious).toHaveBeenCalledWith(2, { source: 'click' });
      vi.advanceTimersByTime(100);
      await nextTick();
      expect((previous.find('.t-swiper__container').element as HTMLElement).style.transform).toContain('-300%');

      next.unmount();
      previous.unmount();
    });

    it('wraps card items and advances regular card items', async () => {
      const regular = mountSwiper({ type: 'card', defaultCurrent: 0, duration: 100 });
      const wrapped = mountSwiper({ type: 'card', defaultCurrent: 2, duration: 100 });

      await nextTick();
      await regular.find('.t-swiper__arrow-right').trigger('click');
      await wrapped.find('.t-swiper__arrow-right').trigger('click');
      expect(getActiveNavigationIndex(regular)).toBe(1);
      expect(getActiveNavigationIndex(wrapped)).toBe(0);

      regular.unmount();
      wrapped.unmount();
    });

    it('renders the wrapped fraction index', async () => {
      const wrapper = mountSwiper({ navigation: { type: 'fraction' }, defaultCurrent: 2, duration: 100 });

      expect(wrapper.find('.t-swiper__navigation-text-fraction').text()).toBe('3/3');
      await wrapper.find('.t-swiper__arrow-right').trigger('click');
      expect(wrapper.find('.t-swiper__navigation-text-fraction').text()).toBe('1/3');
      await finishSwitching(100);
      await wrapper.find('.t-swiper__arrow-left').trigger('click');

      wrapper.unmount();
    });

    it(':current change reports the current source', async () => {
      const onChange = vi.fn();
      const wrapper = mountSwiper({ current: 0, onChange });

      await wrapper.setProps({ current: 2 });
      expect(onChange).toHaveBeenCalledWith(2, { source: 'autoplay' });

      wrapper.unmount();
    });
  });

  describe('lifecycle', () => {
    it(':loop[false] clears autoplay after switching to the end', async () => {
      const wrapper = mountSwiper({ autoplay: true, loop: false, interval: 5000, duration: 100 });

      await nextTick();
      await wrapper.find('.t-swiper__arrow-right').trigger('click');
      await nextTick();
      vi.advanceTimersByTime(151);
      await nextTick();

      expect(getActiveNavigationIndex(wrapper)).toBe(1);
      expect(vi.getTimerCount()).toBe(0);

      wrapper.unmount();
    });

    it('updates dimensions with ResizeObserver', async () => {
      const host = document.createElement('div');
      Object.defineProperties(host, {
        offsetWidth: { configurable: true, value: 800 },
        offsetHeight: { configurable: true, value: 240 },
      });
      document.body.appendChild(host);
      const wrapper = mountSwiper({ type: 'card' }, 3, {}, host);
      const parent = wrapper.element.parentNode as HTMLElement;
      Object.defineProperties(parent, {
        offsetWidth: { configurable: true, value: 800 },
        offsetHeight: { configurable: true, value: 240 },
      });
      await nextTick();
      const callback = mocks.resizeCallbacks.at(-1) ?? mocks.nativeResizeCallbacks.at(-1);

      expect(callback).toBeDefined();
      callback?.();
      await nextTick();
      expect((wrapper.find('.t-swiper__container').element as HTMLElement).style.height).toBe('240px');
      expect((wrapper.find('.t-swiper__card').element as HTMLElement).style.transform).not.toContain('translateX(0px)');

      Object.defineProperties(parent, {
        offsetWidth: { configurable: true, value: 0 },
        offsetHeight: { configurable: true, value: 0 },
      });
      callback?.();
      await nextTick();
      expect((wrapper.find('.t-swiper__container').element as HTMLElement).style.height).toBe('0px');

      wrapper.unmount();
      expect(() => callback?.()).not.toThrow();
      host.remove();
    });

    it(':loop[false] does not restart autoplay from the end', async () => {
      const onChange = vi.fn();
      const wrapper = mountSwiper({
        type: 'card',
        loop: false,
        defaultCurrent: 2,
        autoplay: true,
        interval: 1000,
        duration: 100,
        onChange,
      });

      await wrapper.trigger('mouseenter');
      await wrapper.trigger('mouseleave');
      vi.advanceTimersByTime(2000);
      await nextTick();
      expect(onChange).not.toHaveBeenCalled();

      wrapper.unmount();
    });

    it(':autoplay[true] clears its timer after unmount', () => {
      const onChange = vi.fn();
      const wrapper = mountSwiper({ autoplay: true, interval: 1000, duration: 100, onChange });

      expect(vi.getTimerCount()).toBeGreaterThan(0);
      wrapper.unmount();
      expect(vi.getTimerCount()).toBe(0);
      vi.advanceTimersByTime(1000);
      expect(onChange).not.toHaveBeenCalled();
    });

    it('clears its switching timer after unmount', async () => {
      const wrapper = mountSwiper({ duration: 100 });

      await nextTick();
      await wrapper.find('.t-swiper__arrow-right').trigger('click');
      expect(vi.getTimerCount()).toBeGreaterThan(0);

      wrapper.unmount();
      expect(vi.getTimerCount()).toBe(0);
    });
  });
});
