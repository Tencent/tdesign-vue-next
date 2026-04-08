import { h, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { Swiper, SwiperItem } from '@tdesign/components';
import swiperProps from '@tdesign/components/swiper/props';

const mountSwiper = (props: Record<string, unknown> = {}, itemCount = 3) => {
  return mount(Swiper, {
    props: { autoplay: false, ...props },
    slots: {
      default: () =>
        Array.from({ length: itemCount }, (_, i) => (
          <SwiperItem key={i}>
            <div class={`slide-${i}`}>Slide {i}</div>
          </SwiperItem>
        )),
    },
  }) as VueWrapper<InstanceType<typeof Swiper>>;
};

describe('Swiper', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  describe('props', () => {
    let wrapper!: VueWrapper<InstanceType<typeof Swiper>>;

    beforeEach(async () => {
      wrapper = mountSwiper();
      await nextTick();
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it(':animation validator', () => {
      const validator = swiperProps.animation.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('slide')).toBe(true);
      expect(validator('fade')).toBe(true);
      // @ts-expect-error
      expect(validator('invalid')).toBe(false);
    });

    it(':direction validator', () => {
      const validator = swiperProps.direction.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('horizontal')).toBe(true);
      expect(validator('vertical')).toBe(true);
      // @ts-expect-error
      expect(validator('invalid')).toBe(false);
    });

    it(':trigger validator', () => {
      const validator = swiperProps.trigger.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('hover')).toBe(true);
      expect(validator('click')).toBe(true);
      // @ts-expect-error
      expect(validator('invalid')).toBe(false);
    });

    it(':type validator', () => {
      const validator = swiperProps.type.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('default')).toBe(true);
      expect(validator('card')).toBe(true);
      // @ts-expect-error
      expect(validator('invalid')).toBe(false);
    });

    it(':animation[slide/fade]', async () => {
      // Default: slide — container uses translate3d
      const container = wrapper.find('.t-swiper__container');
      expect((container.element as HTMLElement).style.transform).toContain('translate3d');
      expect(wrapper.find('.t-swiper-fade').exists()).toBe(false);

      // Fade — adds fade class, no transform
      const wrapperFade = mountSwiper({ animation: 'fade' });
      await nextTick();
      expect(wrapperFade.find('.t-swiper-fade').exists()).toBe(true);
      const fadeContainer = wrapperFade.find('.t-swiper__container');
      expect((fadeContainer.element as HTMLElement).style.transform).toBe('');
      wrapperFade.unmount();
    });

    it(':direction[horizontal/vertical]', async () => {
      // Default: horizontal — no vertical class
      expect(wrapper.find('.t-swiper__wrap').classes()).not.toContain('t-swiper--vertical');

      // Vertical
      const wrapperVertical = mountSwiper({ direction: 'vertical', height: 200 });
      await nextTick();
      expect(wrapperVertical.find('.t-swiper__wrap').classes()).toContain('t-swiper--vertical');
      wrapperVertical.unmount();
    });

    it(':type[default/card]', async () => {
      // Default: no card class
      expect(wrapper.find('.t-swiper-card').exists()).toBe(false);

      // Card
      const wrapperCard = mountSwiper({ type: 'card' });
      await nextTick();
      expect(wrapperCard.find('.t-swiper-card').exists()).toBe(true);
      wrapperCard.unmount();
    });

    it(':autoplay[boolean]', async () => {
      // autoplay=false — no timer fires, stays at index 0
      vi.advanceTimersByTime(10000);
      await nextTick();
      const navItems = wrapper.findAll('.t-swiper__navigation-item');
      expect(navItems[0].classes()).toContain('t-is-active');

      // autoplay=true — timer fires and switches
      const wrapperAuto = mountSwiper({ autoplay: true, interval: 1000, duration: 300 });
      await nextTick();
      vi.advanceTimersByTime(1500);
      await nextTick();
      const autoNavItems = wrapperAuto.findAll('.t-swiper__navigation-item');
      expect(autoNavItems[1].classes()).toContain('t-is-active');
      wrapperAuto.unmount();
    });

    it(':loop[boolean]', async () => {
      // loop=false — stops at end
      const wrapperNoLoop = mountSwiper({ loop: false, autoplay: true, interval: 500, duration: 100 });
      await nextTick();

      // Advance past all items — should stop at last (index 1 for 3-item non-loop slide)
      for (let i = 0; i < 5; i++) {
        vi.advanceTimersByTime(600);
        await nextTick();
      }
      // Timer should be cleared (isEnd=true), no further switching
      const navItems = wrapperNoLoop.findAll('.t-swiper__navigation-item');
      const activeCount = navItems.filter((item) => item.classes().includes('t-is-active')).length;
      expect(activeCount).toBe(1);
      wrapperNoLoop.unmount();
    });

    it(':stopOnHover[boolean]', async () => {
      // stopOnHover=true (default) — hovering pauses autoplay
      const wrapperHover = mountSwiper({ autoplay: true, interval: 1000, duration: 300, stopOnHover: true });
      await nextTick();

      await wrapperHover.find('.t-swiper').trigger('mouseenter');
      vi.advanceTimersByTime(5000);
      await nextTick();
      // Should still be at first item since timer was cleared on hover
      const navItems = wrapperHover.findAll('.t-swiper__navigation-item');
      expect(navItems[0].classes()).toContain('t-is-active');

      await wrapperHover.find('.t-swiper').trigger('mouseleave');
      wrapperHover.unmount();

      // stopOnHover=false — hovering does not pause
      const wrapperNoHover = mountSwiper({ autoplay: true, interval: 1000, duration: 300, stopOnHover: false });
      await nextTick();

      await wrapperNoHover.find('.t-swiper').trigger('mouseenter');
      vi.advanceTimersByTime(1500);
      await nextTick();
      const navItems2 = wrapperNoHover.findAll('.t-swiper__navigation-item');
      expect(navItems2[1].classes()).toContain('t-is-active');
      wrapperNoHover.unmount();
    });

    it(':current[number]', async () => {
      const wrapperCurrent = mountSwiper({ current: 1 });
      await nextTick();
      const navItems = wrapperCurrent.findAll('.t-swiper__navigation-item');
      expect(navItems[1].classes()).toContain('t-is-active');
      wrapperCurrent.unmount();
    });

    it(':defaultCurrent[number]', async () => {
      const wrapperDefault = mountSwiper({ defaultCurrent: 2 });
      await nextTick();
      const navItems = wrapperDefault.findAll('.t-swiper__navigation-item');
      expect(navItems[2].classes()).toContain('t-is-active');
      wrapperDefault.unmount();
    });

    it(':height[number]', async () => {
      // height applies to container when animation='fade'
      const wrapperFade = mountSwiper({ animation: 'fade', height: 300 });
      await nextTick();
      const fadeCont = wrapperFade.find('.t-swiper__container');
      expect((fadeCont.element as HTMLElement).style.height).toBe('300px');
      wrapperFade.unmount();

      // height applies to container when direction='vertical' + animation='slide'
      const wrapperVertical = mountSwiper({ direction: 'vertical', height: 400 });
      await nextTick();
      const vertCont = wrapperVertical.find('.t-swiper__container');
      expect((vertCont.element as HTMLElement).style.height).toBe('400px');
      wrapperVertical.unmount();
    });

    it(':duration[number]', async () => {
      // Fade animation shows duration in item transition
      const wrapperFade = mountSwiper({ animation: 'fade', duration: 500 });
      await nextTick();
      const items = wrapperFade.findAll('.t-swiper__container__item');
      const activeItem = items.find((item) => item.classes().includes('t-swiper__fade'));
      expect(activeItem).toBeTruthy();
      wrapperFade.unmount();
    });

    it(':cardScale[number]', async () => {
      // Card mode — non-active items scaled by cardScale
      const wrapperCard = mountSwiper({ type: 'card', cardScale: 0.5 });
      await nextTick();
      const items = wrapperCard.findAll('.t-swiper__card');
      expect(items.length).toBeGreaterThan(0);
      // Active item should not have scale in its transform (scale=1)
      const activeItem = items.find((item) => item.classes().includes('t-is-active'));
      expect(activeItem).toBeTruthy();
      expect((activeItem?.element as HTMLElement).style.transform).toContain('scale(1)');
      wrapperCard.unmount();
    });

    it(':trigger[hover/click]', async () => {
      // Default trigger=hover — hovering navigation item switches
      const navItems = wrapper.findAll('.t-swiper__navigation-item');
      await navItems[1].trigger('mouseenter');
      await nextTick();
      expect(navItems[1].classes()).toContain('t-is-active');

      // trigger=click — clicking navigation item switches
      const wrapperClick = mountSwiper({ trigger: 'click' });
      await nextTick();
      const clickNavItems = wrapperClick.findAll('.t-swiper__navigation-item');
      await clickNavItems[2].trigger('click');
      await nextTick();
      expect(clickNavItems[2].classes()).toContain('t-is-active');

      // Hover should NOT switch when trigger=click
      await clickNavItems[0].trigger('mouseenter');
      await nextTick();
      expect(clickNavItems[2].classes()).toContain('t-is-active');
      wrapperClick.unmount();
    });

    describe('navigation', () => {
      it(':navigation.placement[inside/outside]', async () => {
        // Default: inside
        expect(wrapper.find('.t-swiper__wrap').classes()).toContain('t-swiper--inside');
        expect(wrapper.find('.t-swiper__wrap').classes()).not.toContain('t-swiper--outside');

        // Outside
        const wrapperOutside = mountSwiper({ navigation: { placement: 'outside' } });
        await nextTick();
        expect(wrapperOutside.find('.t-swiper__wrap').classes()).toContain('t-swiper--outside');
        expect(wrapperOutside.find('.t-swiper__wrap').classes()).not.toContain('t-swiper--inside');
        wrapperOutside.unmount();
      });

      it(':navigation.showSlideBtn[always/hover/never]', async () => {
        // Default: always — arrows visible
        expect(wrapper.find('.t-swiper__arrow--default').exists()).toBe(true);

        // hover — arrows hidden initially, visible on mouseenter
        const wrapperHover = mountSwiper({ navigation: { showSlideBtn: 'hover' } });
        await nextTick();
        expect(wrapperHover.find('.t-swiper__arrow--default').exists()).toBe(false);

        await wrapperHover.find('.t-swiper').trigger('mouseenter');
        await nextTick();
        expect(wrapperHover.find('.t-swiper__arrow--default').exists()).toBe(true);

        await wrapperHover.find('.t-swiper').trigger('mouseleave');
        await nextTick();
        expect(wrapperHover.find('.t-swiper__arrow--default').exists()).toBe(false);
        wrapperHover.unmount();

        // never — arrows never visible
        const wrapperNever = mountSwiper({ navigation: { showSlideBtn: 'never' } });
        await nextTick();
        expect(wrapperNever.find('.t-swiper__arrow--default').exists()).toBe(false);

        await wrapperNever.find('.t-swiper').trigger('mouseenter');
        await nextTick();
        expect(wrapperNever.find('.t-swiper__arrow--default').exists()).toBe(false);
        wrapperNever.unmount();
      });

      it(':navigation.size[small/medium/large]', async () => {
        // Default: medium — no size modifier class
        expect(wrapper.find('.t-swiper__wrap').classes()).not.toContain('t-swiper--small');
        expect(wrapper.find('.t-swiper__wrap').classes()).not.toContain('t-swiper--large');

        // Small
        const wrapperSmall = mountSwiper({ navigation: { size: 'small' } });
        await nextTick();
        expect(wrapperSmall.find('.t-swiper__wrap').classes()).toContain('t-swiper--small');
        wrapperSmall.unmount();

        // Large
        const wrapperLarge = mountSwiper({ navigation: { size: 'large' } });
        await nextTick();
        expect(wrapperLarge.find('.t-swiper__wrap').classes()).toContain('t-swiper--large');
        wrapperLarge.unmount();
      });

      it(':navigation.type[dots/dots-bar/bars/fraction]', async () => {
        // Default: bars
        expect(wrapper.find('.t-swiper__navigation-bars').exists()).toBe(true);

        // Dots
        const wrapperDots = mountSwiper({ navigation: { type: 'dots' } });
        await nextTick();
        expect(wrapperDots.find('.t-swiper__navigation-dots').exists()).toBe(true);
        expect(wrapperDots.findAll('.t-swiper__navigation-item').length).toBe(3);
        wrapperDots.unmount();

        // Dots-bar
        const wrapperDotsBar = mountSwiper({ navigation: { type: 'dots-bar' } });
        await nextTick();
        expect(wrapperDotsBar.find('.t-swiper__navigation-dots-bar').exists()).toBe(true);
        wrapperDotsBar.unmount();

        // Fraction
        const wrapperFraction = mountSwiper({ navigation: { type: 'fraction' } });
        await nextTick();
        expect(wrapperFraction.find('.t-swiper__navigation--fraction').exists()).toBe(true);
        expect(wrapperFraction.find('.t-swiper__navigation-text-fraction').text()).toBe('1/3');
        wrapperFraction.unmount();
      });

      it(':navigation[slot/function]', async () => {
        // VNode passed directly as navigation prop
        const wrapperVNode = mount(Swiper, {
          props: { autoplay: false, navigation: h('div', { class: 'custom-nav' }, 'Custom') },
          slots: {
            default: () => [
              <SwiperItem key={0}>
                <div>Slide 0</div>
              </SwiperItem>,
              <SwiperItem key={1}>
                <div>Slide 1</div>
              </SwiperItem>,
            ],
          },
        });
        await nextTick();
        expect(wrapperVNode.find('.custom-nav').exists()).toBe(true);
        expect(wrapperVNode.find('.custom-nav').text()).toBe('Custom');
        wrapperVNode.unmount();

        // Slot
        const wrapperSlot = mount(Swiper, {
          props: { autoplay: false },
          slots: {
            default: () => [
              <SwiperItem key={0}>
                <div>Slide 0</div>
              </SwiperItem>,
              <SwiperItem key={1}>
                <div>Slide 1</div>
              </SwiperItem>,
            ],
            navigation: () => <div class="slot-nav">Slot Nav</div>,
          },
        });
        await nextTick();
        expect(wrapperSlot.find('.slot-nav').exists()).toBe(true);
        expect(wrapperSlot.find('.slot-nav').text()).toBe('Slot Nav');
        wrapperSlot.unmount();
      });
    });
  });

  describe('events', () => {
    it('onChange', async () => {
      const onChange = vi.fn();
      const wrapperEvent = mountSwiper({ onChange });
      await nextTick();

      // Click arrow right to trigger change
      await wrapperEvent.find('.t-swiper__arrow-right').trigger('click');
      await nextTick();
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][0]).toBe(1);
      expect(onChange.mock.calls[0][1]).toEqual({ source: 'click' });
      wrapperEvent.unmount();
    });

    it('onChange via navigation hover', async () => {
      const onChange = vi.fn();
      const wrapperEvent = mountSwiper({ onChange, trigger: 'hover' });
      await nextTick();

      const navItems = wrapperEvent.findAll('.t-swiper__navigation-item');
      await navItems[2].trigger('mouseenter');
      await nextTick();
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][0]).toBe(2);
      expect(onChange.mock.calls[0][1]).toEqual({ source: 'hover' });
      wrapperEvent.unmount();
    });

    it('onChange via navigation click', async () => {
      const onChange = vi.fn();
      const wrapperEvent = mountSwiper({ onChange, trigger: 'click' });
      await nextTick();

      const navItems = wrapperEvent.findAll('.t-swiper__navigation-item');
      await navItems[1].trigger('click');
      await nextTick();
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][0]).toBe(1);
      expect(onChange.mock.calls[0][1]).toEqual({ source: 'click' });
      wrapperEvent.unmount();
    });

    it('onChange via autoplay', async () => {
      const onChange = vi.fn();
      const wrapperEvent = mountSwiper({ autoplay: true, interval: 1000, duration: 300, onChange });
      await nextTick();

      vi.advanceTimersByTime(1500);
      await nextTick();
      expect(onChange).toHaveBeenCalled();
      expect(onChange.mock.calls[0][1]).toEqual({ source: 'autoplay' });
      wrapperEvent.unmount();
    });

    it('update:current', async () => {
      const wrapperEvent = mountSwiper();
      await nextTick();

      // Click arrow to trigger switch
      await wrapperEvent.find('.t-swiper__arrow-right').trigger('click');
      await nextTick();
      const emitted = wrapperEvent.emitted('update:current');
      expect(emitted).toBeTruthy();
      expect(emitted?.[0]).toEqual([1]);
      wrapperEvent.unmount();
    });
  });

  describe('edge cases', () => {
    it('single item — no cloning for slide', async () => {
      const wrapperSingle = mountSwiper({}, 1);
      await nextTick();
      // Only 1 item, no cloned items
      const items = wrapperSingle.findAll('.t-swiper__container__item');
      expect(items.length).toBe(1);
      // Navigation has 1 item
      expect(wrapperSingle.findAll('.t-swiper__navigation-item').length).toBe(1);
      wrapperSingle.unmount();
    });

    it('slide animation clones first and last items', async () => {
      const wrapperSlide = mountSwiper({ animation: 'slide' }, 3);
      await nextTick();
      // 3 items + 2 cloned = 5
      const items = wrapperSlide.findAll('.t-swiper__container__item');
      expect(items.length).toBe(5);
      wrapperSlide.unmount();
    });

    it('fade animation does not clone items', async () => {
      const wrapperFade = mountSwiper({ animation: 'fade' }, 3);
      await nextTick();
      const items = wrapperFade.findAll('.t-swiper__container__item');
      expect(items.length).toBe(3);
      wrapperFade.unmount();
    });

    it('arrow left goes to previous item', async () => {
      const onChange = vi.fn();
      const wrapperArrow = mountSwiper({ defaultCurrent: 1, onChange });
      await nextTick();

      await wrapperArrow.find('.t-swiper__arrow-left').trigger('click');
      await nextTick();
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][0]).toBe(0);
      wrapperArrow.unmount();
    });

    it('arrow left wraps to last item from first', async () => {
      const onChange = vi.fn();
      const wrapperArrow = mountSwiper({ defaultCurrent: 0, onChange });
      await nextTick();

      await wrapperArrow.find('.t-swiper__arrow-left').trigger('click');
      await nextTick();
      expect(onChange).toHaveBeenCalled();
      expect(onChange.mock.calls[0][0]).toBe(2);
      wrapperArrow.unmount();
    });

    it('fraction navigation shows correct text', async () => {
      const wrapperFraction = mountSwiper({ navigation: { type: 'fraction' }, defaultCurrent: 1 });
      await nextTick();
      expect(wrapperFraction.find('.t-swiper__navigation-text-fraction').text()).toBe('2/3');
      wrapperFraction.unmount();
    });

    it('fraction navigation arrow buttons work', async () => {
      const onChange = vi.fn();
      const wrapperFraction = mountSwiper({ navigation: { type: 'fraction' }, onChange });
      await nextTick();

      // Click right arrow in fraction nav
      await wrapperFraction.find('.t-swiper__arrow-right').trigger('click');
      await nextTick();
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][0]).toBe(1);

      // Wait for isSwitching to clear
      vi.advanceTimersByTime(400);
      await nextTick();

      // Click left arrow
      await wrapperFraction.find('.t-swiper__arrow-left').trigger('click');
      await nextTick();
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange.mock.calls[1][0]).toBe(0);
      wrapperFraction.unmount();
    });

    it('mouseenter/mouseleave on swiper', async () => {
      const wrapperMouse = mountSwiper({ autoplay: true, interval: 1000, duration: 300, stopOnHover: true });
      await nextTick();

      // Mouse enter pauses
      await wrapperMouse.find('.t-swiper').trigger('mouseenter');
      vi.advanceTimersByTime(5000);
      await nextTick();
      const navItems = wrapperMouse.findAll('.t-swiper__navigation-item');
      expect(navItems[0].classes()).toContain('t-is-active');

      // Mouse leave resumes
      await wrapperMouse.find('.t-swiper').trigger('mouseleave');
      vi.advanceTimersByTime(1500);
      await nextTick();
      const navItemsAfter = wrapperMouse.findAll('.t-swiper__navigation-item');
      expect(navItemsAfter[1].classes()).toContain('t-is-active');
      wrapperMouse.unmount();
    });

    it('current prop change triggers swiperTo', async () => {
      const onChange = vi.fn();
      const wrapperControlled = mountSwiper({ current: 0, onChange });
      await nextTick();

      await wrapperControlled.setProps({ current: 2 });
      await nextTick();
      expect(onChange).toHaveBeenCalled();
      expect(onChange.mock.calls[0][0]).toBe(2);
      wrapperControlled.unmount();
    });

    it('vertical direction with height sets container style', async () => {
      const wrapperVertical = mountSwiper({ direction: 'vertical', height: 400 });
      await nextTick();
      const container = wrapperVertical.find('.t-swiper__container');
      const style = (container.element as HTMLElement).style;
      expect(style.height).toBe('400px');
      expect(style.transform).toContain('translate3d(0,');
      wrapperVertical.unmount();
    });
  });
});
