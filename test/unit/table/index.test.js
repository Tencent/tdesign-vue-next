import { mount } from '@vue/test-utils';
import Table from '@/src/table/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Table', () => {
  // test props api
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <Table></Table>;
        },
      });
      expect(wrapper.isEmpty()).toBe(false);
    });
  });
});
