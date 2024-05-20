import { mount } from '@vue/test-utils';
import Vue from 'vue';
import Swiper, { SwiperItem } from '@/src/swiper/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Swiper', () => {
  // test props api
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return (
            <Swiper>
              <SwiperItem>1</SwiperItem>
            </Swiper>
          );
        },
      });
      expect(wrapper.exists()).toBe(true);
    });
    it(':animation fade', () => {
      const wrapper = mount({
        render() {
          return (
            <Swiper animation={'fade'}>
              <SwiperItem>1</SwiperItem>
            </Swiper>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':autoplay', () => {
      const wrapper = mount({
        render() {
          return (
            <Swiper autoplay>
              <SwiperItem>1</SwiperItem>
            </Swiper>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':defaultCurrent', () => {
      const wrapper = mount({
        render() {
          return (
            <Swiper defaultCurrent={2}>
              <SwiperItem>1</SwiperItem>
              <SwiperItem>2</SwiperItem>
            </Swiper>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':direction', () => {
      const wrapper = mount({
        render() {
          return (
            <Swiper direction={'vertical'}>
              <SwiperItem>1</SwiperItem>
              <SwiperItem>2</SwiperItem>
            </Swiper>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':duration', () => {
      const wrapper = mount({
        render() {
          return (
            <Swiper duration={3000}>
              <SwiperItem>1</SwiperItem>
              <SwiperItem>2</SwiperItem>
            </Swiper>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':height', () => {
      const wrapper = mount({
        render() {
          return (
            <Swiper height={600}>
              <SwiperItem>1</SwiperItem>
              <SwiperItem>2</SwiperItem>
            </Swiper>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':interval', () => {
      const wrapper = mount({
        render() {
          return (
            <Swiper interval={3000}>
              <SwiperItem>1</SwiperItem>
              <SwiperItem>2</SwiperItem>
            </Swiper>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':loop', () => {
      const wrapper = mount({
        render() {
          return (
            <Swiper loop={true}>
              <SwiperItem>1</SwiperItem>
              <SwiperItem>2</SwiperItem>
            </Swiper>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':navigation', () => {
      const wrapper = mount({
        render() {
          return (
            <Swiper
              navigation={{
                placement: 'outside',
                showSlideBtn: 'hover',
                size: 'large',
                type: 'dots-bar',
              }}
            >
              <SwiperItem>1</SwiperItem>
              <SwiperItem>2</SwiperItem>
            </Swiper>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':theme', () => {
      const wrapper = mount({
        render() {
          return (
            <Swiper theme={'dark'}>
              <SwiperItem>1</SwiperItem>
              <SwiperItem>2</SwiperItem>
            </Swiper>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':type', () => {
      const wrapper = mount({
        render() {
          return (
            <Swiper type={'card'}>
              <SwiperItem>1</SwiperItem>
              <SwiperItem>2</SwiperItem>
            </Swiper>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  // test events
  describe('@event', () => {
    it('@change', async () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return (
            <Swiper onChange={fn}>
              <SwiperItem>1</SwiperItem>
              <SwiperItem>2</SwiperItem>
            </Swiper>
          );
        },
      });
      await Vue.nextTick();
      const swiper = wrapper.findComponent(Swiper);
      swiper.find('.t-swiper__arrow-right').trigger('click');
      await Vue.nextTick();
      // expect(swiper.emitted().change).toBeTruthy();
    });
  });

  // test additional function
  describe('additional function', () => {
    it('navigation: VNode', async () => {
      const wrapper = mount({
        render() {
          const renderNavigation = () => <div>123</div>;
          return (
            <Swiper navigation={renderNavigation()}>
              <SwiperItem>1</SwiperItem>
              <SwiperItem>2</SwiperItem>
            </Swiper>
          );
        },
      });
      await Vue.nextTick();
      expect(wrapper.element).toMatchSnapshot();
    });
    it('no valid panel', async () => {
      const wrapper = mount({
        render() {
          return <Swiper></Swiper>;
        },
      });
      await Vue.nextTick();
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
