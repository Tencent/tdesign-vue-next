import { mount } from '@vue/test-utils';
import { Popconfirm } from 'tdesign-vue-next';

// every component needs four parts: props/events/slots/functions.
describe('popconfirm', () => {
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
