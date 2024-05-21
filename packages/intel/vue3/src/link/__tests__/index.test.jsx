import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import Link from 'tdesign-vue-next'

// every component needs four parts: props/events/slots/functions.
describe('Link', () => {
  // test props api
  describe(':props', () => {
    it(':size', () => {
      const wrapper = mount({
        render() {
          return <Link size={'large'}>text</Link>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':theme', () => {
      const wrapper = mount({
        render() {
          return <Link theme={'primary'}>text</Link>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':hover', () => {
      const wrapper = mount({
        render() {
          return <Link hover={'color'}>text</Link>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':underline', () => {
      const wrapper = mount({
        render() {
          return <Link underline={true}>text</Link>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':disabled', () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return (
            <Link disabled={true} onClick={fn}>
              text
            </Link>
          );
        },
      });
      wrapper.trigger('click');
      expect(fn).not.toHaveBeenCalled();
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':content', () => {
      const renderContent = function () {
        return 'foo';
      };
      const wrapper = mount({
        render() {
          return (
            <div>
              <Link content="foo">bar</Link>
              <Link content={renderContent}>bar</Link>
              <Link default="foo">bar</Link>
              <Link default={renderContent}>bar</Link>
              <Link content={'0'}>bar</Link>
            </div>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  // test events
  describe('@event', () => {
    it('Event passthrough ', () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return <Link onClick={fn}>text</Link>;
        },
      });
      wrapper.findComponent(Link).trigger('click');
      expect(fn).toHaveBeenCalled();
    });
  });

  // test slots
  describe('<slot>', () => {
    it('<icon>', () => {
      const wrapper = mount(Link, {
        slots: {
          icon: '<div></div>',
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
