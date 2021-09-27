import { mount } from '@vue/test-utils';
import TreeSelect from '@/src/tree-select/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('TreeSelect', () => {
  // test props api
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <TreeSelect></TreeSelect>;
        },
      });
      expect(wrapper.exists()).toBe(true);
    });
  });

  // test events
  // describe('@event', () => {});

  // test slots
  // describe('<slot>', () => {
  //   it('', () => {});
  // });

  // test exposure function
  // describe('function', () => {
  //   it('', () => {});
  // });
});
