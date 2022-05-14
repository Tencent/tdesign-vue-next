import { mount } from '@vue/test-utils';
import { Alert } from '@/src/alert/index.ts';

describe('Alert', () => {
  test('_______', () => {
    expect(true).toEqual(true);
  });

  describe(':props', () => {
    it(':default', () => {
      const wrapper = mount({
        render() {
          return <Alert>text</Alert>;
        },
      });
      expect(wrapper.find('.t-alert__description').text()).toBe('text');
    });
  });
});
