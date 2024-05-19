import { mount } from '@vue/test-utils';
import { HeartFilledIcon } from 'tdesign-icons-vue';
import Rate from '@/src/rate/index.ts';

describe('Rate', () => {
  // test props api
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <Rate></Rate>;
        },
      });
      expect(wrapper.exists()).toBe(true);
    });
    it('custom count', () => {
      const wrapper = mount({
        render() {
          return <Rate count={7} />;
        },
      });
      expect(wrapper.findAll('.t-rate__item').length).toBe(7);
    });
    it('half', () => {
      const wrapper = mount({
        render() {
          return <Rate direction="vertical" value={4.5} allowHalf />;
        },
      });

      expect(wrapper.find('.t-rate__item--half').exists()).toBeTruthy();
    });
    it('custom icon', () => {
      const wrapper = mount({
        render() {
          return <Rate value={4} icon={() => <HeartFilledIcon />} />;
        },
      });

      expect(wrapper.findComponent(HeartFilledIcon).exists()).toBeTruthy();
    });
  });
});
