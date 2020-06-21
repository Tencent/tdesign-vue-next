import { mount } from '@vue/test-utils';
import BreadcrumbItem from '@/src/breadcrumbItem/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Breadcrumb-item', () => {
  // test props api
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <Breadcrumb-item></Breadcrumb-item>;
        },
      });
      expect(wrapper.isEmpty()).toBe(false);
    });
  });

  // test events
  describe('@event', () => {});

  // test slots
  describe('<slot>', () => {
    it('', () => {});
  });

  // test exposure function
  describe('function', () => {
    it('', () => {});
  });
});
