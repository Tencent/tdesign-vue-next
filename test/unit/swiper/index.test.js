import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import Swiper, { SwiperItem } from '@/src/swiper/index.ts';

describe('Swiper', () => {
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
      expect(wrapper).toMatchSnapshot();
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
      expect(wrapper).toMatchSnapshot();
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
      expect(wrapper).toMatchSnapshot();
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
      expect(wrapper).toMatchSnapshot();
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
      expect(wrapper).toMatchSnapshot();
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
      expect(wrapper).toMatchSnapshot();
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
      expect(wrapper).toMatchSnapshot();
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
      expect(wrapper).toMatchSnapshot();
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
      expect(wrapper).toMatchSnapshot();
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
      expect(wrapper).toMatchSnapshot();
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
      expect(wrapper).toMatchSnapshot();
    });
  });
  // test events
  describe('@event', () => {
    it('@change', async () => {
      const fn = jest.fn();
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
      await nextTick();
      const swiper = wrapper.findComponent(Swiper);
      swiper.find('.t-swiper__arrow-right').trigger('click');
      await nextTick();
      expect(fn).toHaveBeenCalled();
    });
  });
});
