import { mount } from '@vue/test-utils';
import { Divider } from 'tdesign-vue-next';

// every component needs four parts: props/events/slots/functions.
describe('divider', () => {
  // test props api
  describe(':props', () => {
    it(':layout', () => {
      const wrapper = mount({
        render() {
          return <Divider layout="vertical"></Divider>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':dashed', () => {
      const wrapper = mount({
        render() {
          return <Divider dashed></Divider>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':align', () => {
      const wrapper = mount({
        render() {
          return <Divider align="left">TDesign</Divider>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  // test slots
  describe('<slot>', () => {
    it('default', () => {
      const wrapper = mount({
        render() {
          return <Divider>TDesign</Divider>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
