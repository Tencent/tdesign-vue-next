import { mount } from '@vue/test-utils';
import Popconfirm from '@src/popconfirm/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Popconfirm', () => {
  // test props api
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <Popconfirm>button</Popconfirm>;
        },
      });
      expect(wrapper.exists()).toBe(true);
    });
  });
});
