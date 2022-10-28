import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, ChevronDownIcon } from 'tdesign-icons-vue-next';
import Jumper from '@/src/jumper/index.ts';

describe('Jumper', () => {
  describe(':props', () => {
    it('', () => {
      const wrapper = mount(() => <Jumper />);
      expect(wrapper.find('.t-jumper').exists()).toBeTruthy();
      expect(wrapper.findAll('.t-button').length).toBe(3);
    });

    it(':disabled', () => {
      const wrapper = mount(() => <Jumper disabled />);
      const jumper = wrapper.find('.t-jumper');
      const buttons = jumper.findAll('button');
      buttons.forEach((button) => {
        expect(button.classes()).toContain('t-is-disabled');
      });
    });

    it(':layout', () => {
      const wrapper1 = mount(() => <Jumper />);
      const jumper1 = wrapper1.find('.t-jumper');
      const buttons1 = jumper1.findAll('button');
      expect(buttons1[0].findComponent(ChevronLeftIcon).exists()).toBeTruthy();
      expect(buttons1[2].findComponent(ChevronRightIcon).exists()).toBeTruthy();
      const wrapper2 = mount(() => <Jumper layout="vertical" />);
      const jumper2 = wrapper2.find('.t-jumper');
      const buttons2 = jumper2.findAll('button');
      expect(buttons2[0].findComponent(ChevronUpIcon).exists()).toBeTruthy();
      expect(buttons2[2].findComponent(ChevronDownIcon).exists()).toBeTruthy();
    });

    it(':showCurrent', () => {
      const wrapper = mount(() => <Jumper showCurrent={false} />);
      const jumper = wrapper.find('.t-jumper');
      const buttons = jumper.findAll('button');
      expect(buttons.length).toBe(2);
      expect(jumper.find('.t-jumper__current').exists()).toBeFalsy();
    });

    it(':size', () => {
      const sizeList = ['small', 'medium', 'large'];
      sizeList.forEach((size) => {
        const wrapper = mount(() => <Jumper size={size} />);
        const jumper = wrapper.find('.t-jumper');
        const buttons = jumper.findAll('button');
        buttons.forEach((button) => {
          expect(button.classes()).toContain(`t-size-${size.slice(0, 1)}`);
        });
      });
    });

    it(':variant', () => {
      const variantList = ['text', 'outline'];
      variantList.forEach((variant) => {
        const wrapper = mount(() => <Jumper variant={variant} />);
        const jumper = wrapper.find('.t-jumper');
        const buttons = jumper.findAll('button');
        buttons.forEach((button) => {
          expect(button.classes()).toContain(`t-button--variant-${variant}`);
        });
      });
    });

    it(':tips', () => {
      const tips = { prev: '前尘忆梦', current: '回到现在', next: '展望未来' };
      const wrapper = mount(() => <Jumper tips={tips} />);
      const jumper = wrapper.find('.t-jumper');
      const buttons = jumper.findAll('button');
      expect(buttons[0].element.getAttribute('title')).toBe(tips.prev);
      expect(buttons[1].element.getAttribute('title')).toBe(tips.current);
      expect(buttons[2].element.getAttribute('title')).toBe(tips.next);
    });

    it(':onChange', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <Jumper onChange={fn} />);
      const jumper = wrapper.find('.t-jumper');
      const buttons = jumper.findAll('button');
      await buttons[0].trigger('click');
      expect(fn).toBeCalled();
    });
  });
});
