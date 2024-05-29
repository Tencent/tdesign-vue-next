import { nextTick, ref } from '@td/adapter-vue';
import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import Swiper, { SwiperItem } from 'tdesign-vue-next';

describe('swiper', () => {
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
            <Swiper animation="fade">
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
            <Swiper direction="vertical">
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
            <Swiper theme="dark">
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
            <Swiper type="card">
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
      await nextTick();
      const swiper = wrapper.findComponent(Swiper);
      swiper.find('.t-swiper__arrow-right').trigger('click');
      await nextTick();
      expect(fn).toHaveBeenCalled();
    });
  });

  describe('change list', () => {
    it('set item list', async () => {
      const wrapper = mount({
        setup() {
          const list = ref([]);
          const changeList = () => {
            list.value = [1, 2, 3];
          };
          return {
            list,
            changeList,
          };
        },
        render() {
          const { list } = this;
          return (
            <Swiper>
              {list.map((item) => {
                return <SwiperItem>{item}</SwiperItem>;
              })}
            </Swiper>
          );
        },
      });
      await nextTick();
      const { vm } = wrapper;
      const swiper = wrapper.findComponent(Swiper);
      expect(swiper.findAll('.t-swiper__container__item').length).toBe(0);
      vm.changeList();
      await nextTick();
      // slide animation, the item length equal item list length add 2
      expect(swiper.findAll('.t-swiper__container__item').length).toBe(5);
    });
  });
});
