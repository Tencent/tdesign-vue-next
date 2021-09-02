import { mount } from '@vue/test-utils';
import Badge from '@/src/badge/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Badge', () => {
  // test props api
  describe(':props', () => {
    it(':color', () => {
      const wrapper = mount({
        render() {
          return <Badge color="green">Tdesign</Badge>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it(':count', () => {
      const wrapper = mount({
        render() {
          return <Badge count={2}>Tdesign</Badge>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it(':dot', () => {
      const wrapper = mount({
        render() {
          return <Badge dot={true} count={2}>Tdesign</Badge>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it(':maxCount', () => {
      const wrapper = mount({
        render() {
          return <Badge maxCount={33} count={2}>Tdesign</Badge>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it(':count', () => {
      const wrapper = mount({
        render() {
          return <Badge count="new" count={2}>Tdesign</Badge>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it(':size', () => {
      const wrapper = mount({
        render() {
          return <Badge size = "small" count={2}>Tdesign</Badge>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it(':shape', () => {
      const wrapper = mount({
        render() {
          return <Badge shape = "round" count={2}>Tdesign</Badge>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it(':showZero', () => {
      const wrapper = mount({
        render() {
          return <Badge showZero={true} count={2}>Tdesign</Badge>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it(':offset', () => {
      const wrapper = mount({
        render() {
          return <Badge offset={[10, 10]} count={2}>Tdesign</Badge>;
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
          return <Badge count={2}>Tdesign</Badge>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
  });
});
