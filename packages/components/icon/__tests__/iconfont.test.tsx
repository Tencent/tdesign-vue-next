import { mount } from '@vue/test-utils';
import { IconFont } from 'tdesign-icons-vue-next';
import { describe, expect, it, vi } from 'vitest';

describe('IconFont', () => {
  describe('props', () => {
    it(':loadDefaultIcons[boolean]', async () => {
      const wrapper = mount(() => <IconFont name="excited" loadDefaultIcons={false} />);
      expect(wrapper.find('i').exists()).toBeTruthy();
      expect(document.querySelector('link.t-iconfont-stylesheet--unique-class')).toBeNull();
      mount(() => <IconFont name="excited" loadDefaultIcons={true} />);
      expect(document.querySelector('link.t-iconfont-stylesheet--unique-class')).toBeTruthy();
    });

    it(':name[string]', async () => {
      const wrapper = mount(() => <IconFont name="excited" />);
      expect(wrapper.find('i').exists()).toBeTruthy();
      expect(wrapper.classes()).toContain('t-icon-excited');
    });

    it(':size[string]', async () => {
      const sizeList = ['small', 'medium', 'large'];
      sizeList.forEach((size) => {
        const wrapper = mount(() => <IconFont name="excited" size={size} />);
        expect(wrapper.classes()).toContain(`t-size-${size.slice(0, 1)}`);
      });
    });

    it(':style[string]', async () => {
      const wrapper = mount(() => <IconFont name="excited" style={{ color: 'red' }} />);
      const i = wrapper.find('i');
      expect(getComputedStyle(i.element, null).color).toBe('red');
    });

    it(':tag[string]', async () => {
      const wrapper = mount(() => <IconFont name="excited" tag="span" />);
      expect(wrapper.find('span').exists()).toBeTruthy();
    });

    it(':url[string]', async () => {
      mount(() => <IconFont name="excited" url="//xxx.com" />);
      expect(document.querySelector('link[href="//xxx.com"]')).toBeTruthy();
    });
  });

  describe('events', () => {
    it('click', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <IconFont name="excited" onClick={fn} />);
      const i = wrapper.find('i');
      await i.trigger('click');
      expect(fn).toBeCalled();
    });
  });
});
