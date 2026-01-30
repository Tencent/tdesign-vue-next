import { mount } from '@vue/test-utils';
import Icon from '@tdesign/components/icon';
import { describe, expect, it, vi } from 'vitest';

describe('IconSVG', () => {
  describe('props', () => {
    it(':loadDefaultIcons[boolean]', async () => {
      const wrapper = mount(() => <Icon name="app" loadDefaultIcons={false} />);
      const use = wrapper.find('use');
      expect(use.exists()).toBeTruthy();
      expect(use.element.getAttribute('href')).toBe('#t-icon-app');
      expect(document.querySelector('script.t-svg-js-stylesheet--unique-class')).toBeNull();
      mount(() => <Icon name="app" loadDefaultIcons={true} />);
      expect(document.querySelector('script.t-svg-js-stylesheet--unique-class')).toBeTruthy();
    });

    it(':name[string]', async () => {
      const wrapper = mount(() => <Icon name="app" />);
      const use = wrapper.find('use');
      expect(use.exists()).toBeTruthy();
      expect(use.element.getAttribute('href')).toBe('#t-icon-app');
    });

    it(':size[string]', async () => {
      const sizeList = ['small', 'medium', 'large'];
      sizeList.forEach((size) => {
        const wrapper = mount(() => <Icon name="app" size={size} />);
        expect(wrapper.classes()).toContain(`t-size-${size.slice(0, 1)}`);
      });
    });

    it(':style[string]', async () => {
      const wrapper = mount(() => <Icon name="app" style={{ color: 'red' }} />);
      const svg = wrapper.find('svg');
      expect(getComputedStyle(svg.element, null).color).toBe('red');
    });

    it(':url[string]', async () => {
      mount(() => <Icon name="app" url="//xxx.com" />);
      expect(document.querySelector('script[src="//xxx.com"]')).toBeTruthy();
    });
  });

  describe('events', () => {
    it('click', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <Icon name="app" onClick={fn} />);
      const svg = wrapper.find('svg');
      await svg.trigger('click');
      expect(fn).toBeCalled();
    });
  });
});
