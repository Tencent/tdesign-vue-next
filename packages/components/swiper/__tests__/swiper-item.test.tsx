import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { SwiperItem } from '@tdesign/components';

const mountSwiperItem = (props: Record<string, unknown> = {}, renderSlot = true) =>
  mount(SwiperItem, {
    props,
    slots: renderSlot ? { default: () => <div class="swiper-item-content">content</div> } : {},
  }) as VueWrapper<InstanceType<typeof SwiperItem>>;

const getStyle = (wrapper: VueWrapper<InstanceType<typeof SwiperItem>>) => (wrapper.element as HTMLElement).style;

const getTranslateX = (wrapper: VueWrapper<InstanceType<typeof SwiperItem>>) => {
  const result = getStyle(wrapper).transform.match(/translateX\(([-\d.]+)px\)/);
  return Number(result?.[1]);
};

describe('SwiperItem', () => {
  describe('props', () => {
    it(':default[slot]', () => {
      const wrapper = mountSwiperItem();

      expect(wrapper.classes()).toContain('t-swiper__container__item');
      expect(wrapper.find('.swiper-item-content').text()).toBe('content');

      wrapper.unmount();
    });

    it(':default[empty]', () => {
      const wrapper = mountSwiperItem({}, false);

      expect(wrapper.text()).toBe('');

      wrapper.unmount();
    });

    it(':animation[fade]', () => {
      const active = mountSwiperItem({
        animation: 'fade',
        index: 1,
        currentIndex: 1,
        isSwitching: true,
        duration: 500,
      });
      const inactive = mountSwiperItem({
        animation: 'fade',
        index: 0,
        currentIndex: 1,
        isSwitching: false,
        duration: 500,
      });

      expect(active.classes()).toContain('t-swiper__fade');
      expect(getStyle(active).opacity).toBe('1');
      expect(getStyle(active).transition).toBe('opacity 0.5s');
      expect(getStyle(active).zIndex).toBe('1');
      expect(getStyle(inactive).opacity).toBe('0');
      expect(getStyle(inactive).transition).toBe('');
      expect(getStyle(inactive).zIndex).toBe('0');

      active.unmount();
      inactive.unmount();
    });

    it(':type[default]', () => {
      const wrapper = mountSwiperItem({ type: 'default', index: 0, currentIndex: 0 });

      expect(wrapper.classes()).not.toContain('t-swiper__card');
      expect(wrapper.classes()).not.toContain('t-is-active');
      expect(getStyle(wrapper).transform).toBe('');

      wrapper.unmount();
    });

    it(':type[card]', () => {
      const active = mountSwiperItem({
        type: 'card',
        index: 2,
        currentIndex: 2,
        swiperItemLength: 5,
        swiperWidth: 1000,
      });
      const inactive = mountSwiperItem({
        type: 'card',
        index: 3,
        currentIndex: 2,
        swiperItemLength: 5,
        swiperWidth: 1000,
      });

      expect(active.classes()).toEqual(expect.arrayContaining(['t-swiper__card', 't-is-active']));
      expect(getStyle(active).transform).toContain('scale(1)');
      expect(getStyle(active).zIndex).toBe('2');
      expect(inactive.classes()).toContain('t-swiper__card');
      expect(inactive.classes()).not.toContain('t-is-active');
      expect(getStyle(inactive).transform).toContain('scale(0.6325301204819277)');
      expect(getStyle(inactive).zIndex).toBe('1');

      active.unmount();
      inactive.unmount();
    });

    it(':cardScale[number]', () => {
      const wrapper = mountSwiperItem({
        type: 'card',
        index: 2,
        currentIndex: 1,
        swiperItemLength: 4,
        swiperWidth: 1000,
        cardScale: 0.5,
      });

      expect(getStyle(wrapper).transform).toContain('scale(0.5)');
      expect(getTranslateX(wrapper)).toBeCloseTo(688.75);

      wrapper.unmount();
    });

    it(':duration[number]', () => {
      const wrapper = mountSwiperItem({
        type: 'card',
        index: 0,
        currentIndex: 0,
        swiperItemLength: 3,
        duration: 600,
      });

      expect(getStyle(wrapper).transition).toBe('transform 0.6s ease');

      wrapper.unmount();
    });

    it.each([
      {
        name: 'places the last item before the first item',
        props: { index: 4, currentIndex: 0, swiperItemLength: 5 },
        translateX: -76.25,
        zIndex: '1',
      },
      {
        name: 'places the first item after the last item',
        props: { index: 0, currentIndex: 4, swiperItemLength: 5 },
        translateX: 661.25,
        zIndex: '1',
      },
      {
        name: 'moves a distant previous item to the right',
        props: { index: 0, currentIndex: 3, swiperItemLength: 5 },
        translateX: 923.75,
        zIndex: '0',
      },
      {
        name: 'moves a distant next item to the left',
        props: { index: 4, currentIndex: 1, swiperItemLength: 5 },
        translateX: -338.75,
        zIndex: '0',
      },
      {
        name: 'keeps a non-wrapped item outside the left stage',
        props: { index: 1, currentIndex: 3, swiperItemLength: 6 },
        translateX: -338.75,
        zIndex: '0',
      },
      {
        name: 'keeps a non-wrapped item outside the right stage',
        props: { index: 3, currentIndex: 1, swiperItemLength: 6 },
        translateX: 923.75,
        zIndex: '0',
      },
    ])(':type[card] $name', ({ props, translateX, zIndex }) => {
      const wrapper = mountSwiperItem({ type: 'card', swiperWidth: 1000, ...props });

      expect(getTranslateX(wrapper)).toBeCloseTo(translateX);
      expect(getStyle(wrapper).zIndex).toBe(zIndex);

      wrapper.unmount();
    });
  });
});
