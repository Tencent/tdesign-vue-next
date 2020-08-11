import { mount } from '@vue/test-utils';
import Tabs from '@/src/tabs/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Tabs', () => {
  // test props api
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <Tabs />;
        },
      });
      expect(wrapper.isEmpty()).toBe(false);
    });
    it(':theme', () => {
      const wrapper = mount({
        render() {
          return <Tabs theme={'card'} />;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it(':activeName', () => {
      const wrapper = mount({
        render() {
          return <Tabs activeName={1} />;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it(':size', () => {
      const wrapper = mount({
        render() {
          return <Tabs activeName={'large'} />;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it(':tabPosition', () => {
      const wrapper = mount({
        render() {
          return <Tabs tabPosition={'left'} />;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it(':addable', () => {
      const wrapper = mount({
        render() {
          return <Tabs addable={true} />;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
  });

  // test events
  describe('@event', () => {
    it('@add', async () => {
      const wrapper = mount({
        render() {
          return <Tabs theme={'card'} addable={true} />;
        },
      });
      const tabs = wrapper.find(Tabs);
      await tabs.find('.t-tabs__add-btn').trigger('click');
      expect(tabs.emitted().add).toBeTruthy();
    });
  });

  // // test slots
  // describe('<slot>', () => {
  //   it('', () => null);
  // });

  // // test exposure function
  // describe('function', () => {
  //   it('', () => null);
  // });
});
