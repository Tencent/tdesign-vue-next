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
      expect(wrapper.exists()).toBe(true);
    });
    it(':delay', () => {
      const delay = 1000;
      const wrapper = mount({
        render() {
          return <Loading loading={true} delay={delay}></Loading>;
        },
      });
      setTimeout(() => {
        expect(wrapper.exists()).toBe(true);
      }, delay);
    });
    it(':fullscreen', () => {
      const wrapper = mount({
        render() {
          return <Loading loading={true} fullscreen={true}></Loading>;
        },
      });
      expect(wrapper.exists()).toBe(true);
    });
    it(':indicatorFunc', () => {
      const wrapper = mount({
        render() {
          return <Loading loading={true} indicator={() => '加载中...'}></Loading>;
        },
      });
      expect(wrapper.exists()).toBe(true);
    });
    it(':preventScrollThrough', () => {
      const wrapper = mount({
        render() {
          return <Loading loading={true} preventScrollThrough={true} fullscreen={true}></Loading>;
        },
      });
      expect(wrapper.exists()).toBe(true);
    });
    it(':size', () => {
      const wrapper = mount({
        render() {
          return <Loading loading={true} size={'large'}></Loading>;
        },
      });
      expect(wrapper.exists()).toBe(true);
    });
    it(':text', () => {
      const wrapper = mount({
        render() {
          return <Loading loading={true} text={'正在加载...'}></Loading>;
        },
      });
      expect(wrapper.exists()).toBe(true);
    });
    it(':wrap', () => {
      const wrapper = mount({
        render() {
          return <Loading loading={true}><div>this is loading component</div></Loading>;
        },
      });
      expect(wrapper.exists()).toBe(true);
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
          indicator: '<i>加载中</i>',
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
  });
});
