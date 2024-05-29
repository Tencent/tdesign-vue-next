import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { AppIcon } from 'tdesign-icons-vue-next';
import { Icon } from 'tdesign-vue-next';

describe('icon', () => {
  describe(':props', () => {
    it('', () => {
      const wrapper = mount(() => <Icon name="app" />);
      expect(wrapper.classes()).toContain('t-icon');
    });

    it(':name', () => {
      const wrapper = mount(() => <Icon name="app" />);
      const use = wrapper.find('use');
      expect(use.exists()).toBeTruthy();
      expect(use.element.getAttribute('href')).toBe('#t-icon-app');
    });

    it(':size', () => {
      const sizeList = ['small', 'medium', 'large'];
      sizeList.forEach((size) => {
        const wrapper = mount(() => <Icon name="app" size={size} />);
        expect(wrapper.classes()).toContain(`t-size-${size.slice(0, 1)}`);
      });
    });

    it(':style', () => {
      const wrapper = mount(() => <Icon name="app" style={{ color: 'red' }} />);
      const svg = wrapper.find('svg');
      expect(getComputedStyle(svg.element, null).color).toBe('red');
    });

    it(':onClick', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <Icon name="app" onClick={fn} />);
      const svg = wrapper.find('svg');
      await svg.trigger('click');
      expect(fn).toBeCalled();
    });
  });
});
