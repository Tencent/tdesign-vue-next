// @ts-nocheck
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import TransferOperations from '@tdesign/components/transfer/components/transfer-operations';

describe('TransferOperations', () => {
  describe('Props', () => {
    it(':leftDisabled', () => {
      const wrapper = mount(TransferOperations, {
        props: {
          leftDisabled: true,
          rightDisabled: false,
        },
      });
      const buttons = wrapper.findAll('button');
      expect(buttons[1].classes()).toContain('t-is-disabled');
    });

    it(':rightDisabled', () => {
      const wrapper = mount(TransferOperations, {
        props: {
          leftDisabled: false,
          rightDisabled: true,
        },
      });
      const buttons = wrapper.findAll('button');
      expect(buttons[0].classes()).toContain('t-is-disabled');
    });

    it(':operation array with strings', () => {
      const wrapper = mount(TransferOperations, {
        props: {
          leftDisabled: false,
          rightDisabled: false,
          operation: ['向左', '向右'],
        },
      });
      const buttons = wrapper.findAll('button');
      expect(buttons[0].text()).toBe('向右');
      expect(buttons[1].text()).toBe('向左');
    });

    it(':operation function', () => {
      const operationFn = (h, { direction }) => {
        return direction === 'left' ? '《' : '》';
      };
      const wrapper = mount(TransferOperations, {
        props: {
          leftDisabled: false,
          rightDisabled: false,
          operation: operationFn,
        },
      });
      expect(wrapper.find('.t-transfer__operations').exists()).toBeTruthy();
    });

    it(':operation array with functions', () => {
      const leftFn = () => '自定义左';
      const rightFn = () => '自定义右';
      const wrapper = mount(TransferOperations, {
        props: {
          leftDisabled: false,
          rightDisabled: false,
          operation: [leftFn, rightFn],
        },
      });
      expect(wrapper.find('.t-transfer__operations').exists()).toBeTruthy();
    });

    it('should show default icons when no operation provided', () => {
      const wrapper = mount(TransferOperations, {
        props: {
          leftDisabled: false,
          rightDisabled: false,
        },
      });
      const buttons = wrapper.findAll('button');
      expect(buttons[0].find('.t-icon').exists()).toBeTruthy();
      expect(buttons[1].find('.t-icon').exists()).toBeTruthy();
    });

    it('should render correct button shapes for string operations', () => {
      const wrapper = mount(TransferOperations, {
        props: {
          leftDisabled: false,
          rightDisabled: false,
          operation: ['向左', '向右'],
        },
      });
      const buttons = wrapper.findAll('button');
      const rightButton = buttons[0];
      const leftButton = buttons[1];
      expect(rightButton.find('.t-button__text').text()).toBe('向右');
      expect(leftButton.find('.t-button__text').text()).toBe('向左');
      buttons.forEach((button) => {
        expect(button.classes()).toContain('t-button');
      });
    });

    it('should render square buttons for icon operations', () => {
      const wrapper = mount(TransferOperations, {
        props: {
          leftDisabled: false,
          rightDisabled: false,
        },
      });
      const buttons = wrapper.findAll('button');
      buttons.forEach((button) => {
        expect(button.classes()).toContain('t-button--shape-square');
      });
    });

    it('should render operation as function', () => {
      const operationFn = vi.fn((h, { direction }) => (direction === 'left' ? '《' : '》'));
      const wrapper = mount(TransferOperations, {
        props: {
          leftDisabled: false,
          rightDisabled: false,
          operation: operationFn,
        },
      });
      // 右按钮
      expect(wrapper.text()).toContain('》');
      // 左按钮
      expect(wrapper.text()).toContain('《');
      expect(operationFn).toHaveBeenCalled();
    });

    it('should render empty string when operation is not array or function', () => {
      const wrapper = mount(TransferOperations, {
        props: {
          leftDisabled: false,
          rightDisabled: false,
          operation: 123, // 非数组、非函数
        },
      });
      // 按钮内容应为空
      const buttons = wrapper.findAll('button');
      expect(buttons[0].text()).toBe('');
      expect(buttons[1].text()).toBe('');
    });
  });

  describe('Events', () => {
    it('should emit moveToRight when right button clicked', async () => {
      const wrapper = mount(TransferOperations, {
        props: {
          leftDisabled: false,
          rightDisabled: false,
        },
      });
      const rightButton = wrapper.findAll('button')[0];
      await rightButton.trigger('click');
      expect(wrapper.emitted('moveToRight')).toBeTruthy();
    });

    it('should emit moveToLeft when left button clicked', async () => {
      const wrapper = mount(TransferOperations, {
        props: {
          leftDisabled: false,
          rightDisabled: false,
        },
      });
      const leftButton = wrapper.findAll('button')[1];
      await leftButton.trigger('click');
      expect(wrapper.emitted('moveToLeft')).toBeTruthy();
    });

    it('should not emit when button is disabled', async () => {
      const wrapper = mount(TransferOperations, {
        props: {
          leftDisabled: true,
          rightDisabled: true,
        },
      });
      const buttons = wrapper.findAll('button');
      await buttons[0].trigger('click');
      await buttons[1].trigger('click');
      expect(wrapper.emitted('moveToRight')).toBeFalsy();
      expect(wrapper.emitted('moveToLeft')).toBeFalsy();
    });
  });

  describe('Slots', () => {
    it('should render operation slot correctly', () => {
      const wrapper = mount(TransferOperations, {
        props: {
          leftDisabled: false,
          rightDisabled: false,
        },
        slots: {
          operation: ({ direction }) => <span class="custom-operation">{direction}</span>,
        },
      });
      expect(wrapper.findAll('.custom-operation').length).toBe(2);
    });
  });

  describe('Icon Rendering', () => {
    it('should not show icon when operation is function', () => {
      const operationFn = () => '自定义';
      const wrapper = mount(TransferOperations, {
        props: {
          leftDisabled: false,
          rightDisabled: false,
          operation: operationFn,
        },
      });
      const buttons = wrapper.findAll('button');
      expect(buttons[0].find('.t-icon').exists()).toBeFalsy();
      expect(buttons[1].find('.t-icon').exists()).toBeFalsy();
    });

    it('should not show icon when operation array has functions', () => {
      const leftFn = () => '左';
      const rightFn = () => '右';
      const wrapper = mount(TransferOperations, {
        props: {
          leftDisabled: false,
          rightDisabled: false,
          operation: [leftFn, rightFn],
        },
      });
      const buttons = wrapper.findAll('button');
      expect(buttons[0].find('.t-icon').exists()).toBeFalsy();
      expect(buttons[1].find('.t-icon').exists()).toBeFalsy();
    });

    it('should not show icon when operation slot provided', () => {
      const wrapper = mount(TransferOperations, {
        props: {
          leftDisabled: false,
          rightDisabled: false,
        },
        slots: {
          operation: () => '自定义操作',
        },
      });
      const buttons = wrapper.findAll('button');
      expect(buttons[0].find('.t-icon').exists()).toBeFalsy();
      expect(buttons[1].find('.t-icon').exists()).toBeFalsy();
    });
  });

  describe('Button States', () => {
    it('should have correct classes based on disabled state', () => {
      const wrapper = mount(TransferOperations, {
        props: {
          leftDisabled: true,
          rightDisabled: false,
        },
      });
      const buttons = wrapper.findAll('button');
      expect(buttons[0].classes()).not.toContain('t-is-disabled');
      expect(buttons[1].classes()).toContain('t-is-disabled');
    });

    it('should have correct variant and size', () => {
      const wrapper = mount(TransferOperations, {
        props: {
          leftDisabled: false,
          rightDisabled: false,
        },
      });
      const buttons = wrapper.findAll('button');
      buttons.forEach((button) => {
        expect(button.classes()).toContain('t-button--variant-outline');
        expect(button.classes()).toContain('t-size-s');
      });
    });
  });
});
