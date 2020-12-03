import { mount } from '@vue/test-utils';
import Divider from '@/src/divider/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Divider', () => {
  // test props api
  describe(':props', () => {
    it(':type', () => {
      const wrapper = mount({
        render() {
          return <Divider type="vertical"></Divider>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it(':dashed', () => {
      const wrapper = mount({
        render() {
          return <Divider dashed></Divider>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it(':orientation', () => {
      const wrapper = mount({
        render() {
          return <Divider orientation="left">TDesign</Divider>;
        },
      });
      expect(wrapper).toMatchSnapshot();
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
      expect(wrapper).toMatchSnapshot();
    });
  });
});
