import { mount } from '@vue/test-utils';
import Loading from '@/src/loading/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Loading', () => {
  // test props api
  describe(':props', () => {
    it(':default', () => {
      const wrapper = mount({
        render() {
          return <Loading loading={true}></Loading>;
        },
      });
      expect(wrapper.isEmpty()).toBe(false);
    });
    it(':delay', () => {
      const delay = 1000;
      const wrapper = mount({
        render() {
          return <Loading loading={true} delay={delay}></Loading>;
        },
      });
      setTimeout(() => {
        expect(wrapper.isEmpty()).toBe(false);
      }, delay);
    });
    it(':fullscreen', () => {
      const wrapper = mount({
        render() {
          return <Loading loading={true} fullscreen={true}></Loading>;
        },
      });
      expect(wrapper.isEmpty()).toBe(false);
    });
    it(':indicatorFunc', () => {
      const wrapper = mount({
        render() {
          return <Loading loading={true} indicator={() => '加载中...'}></Loading>;
        },
      });
      expect(wrapper.isEmpty()).toBe(false);
    });
    it(':preventScrollThrough', () => {
      const wrapper = mount({
        render() {
          return <Loading loading={true} preventScrollThrough={true} fullscreen={true}></Loading>;
        },
      });
      expect(wrapper.isEmpty()).toBe(false);
    });
    it(':size', () => {
      const wrapper = mount({
        render() {
          return <Loading loading={true} size={'large'}></Loading>;
        },
      });
      expect(wrapper.isEmpty()).toBe(false);
    });
    it(':text', () => {
      const wrapper = mount({
        render() {
          return <Loading loading={true} text={'正在加载...'}></Loading>;
        },
      });
      expect(wrapper.isEmpty()).toBe(false);
    });
    it(':wrap', () => {
      const wrapper = mount({
        render() {
          return <Loading loading={true}><div>this is loading component</div></Loading>;
        },
      });
      expect(wrapper.isEmpty()).toBe(false);
    });
  });
  // test slots
  describe('<slot>', () => {
    it('<indicator>', () => {
      const wrapper = mount(Loading, {
        render() {
          return <Loading loading={true}></Loading>;
        },
        scopedSlots: {
          indicator: '<i class="t-icon t-icon-loading"></i>',
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
  });
});
