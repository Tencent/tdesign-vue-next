import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import TransferOperations from '@tdesign/components/transfer/components/transfer-operations';

describe('TransferOperations', () => {
  describe('props', () => {
    it(':leftDisabled[boolean]', () => {
      const wrapper = mount(<TransferOperations leftDisabled={true} rightDisabled={false} />);
      const buttons = wrapper.findAll('button');
      expect(buttons[1].classes()).toContain('t-is-disabled');
    });

    it(':rightDisabled[boolean]', () => {
      const wrapper = mount(<TransferOperations leftDisabled={false} rightDisabled={true} />);
      const buttons = wrapper.findAll('button');
      expect(buttons[0].classes()).toContain('t-is-disabled');
    });

    it(':operation[]', () => {
      const wrapper1 = mount(<TransferOperations leftDisabled={false} rightDisabled={false} />);
      const buttons1 = wrapper1.findAll('button');
      expect(buttons1[0].find('.t-icon').exists()).toBeTruthy();
      expect(buttons1[1].find('.t-icon').exists()).toBeTruthy();

      const wrapper2 = mount(
        <TransferOperations leftDisabled={false} rightDisabled={false} operation={['向左', '向右']} />,
      );
      const buttons2 = wrapper2.findAll('button');
      expect(buttons2[0].text()).toBe('向右');
      expect(buttons2[1].text()).toBe('向左');
    });

    it(':operation[function/function[]]', () => {
      const operationFn = (h: any, { direction }: { direction: string }) => (direction === 'left' ? '《' : '》');
      const wrapper1 = mount(<TransferOperations leftDisabled={false} rightDisabled={false} operation={operationFn} />);
      expect(wrapper1.find('.t-transfer__operations').exists()).toBeTruthy();

      const leftFn = () => '自定义左';
      const rightFn = () => '自定义右';
      const wrapper2 = mount(
        <TransferOperations leftDisabled={false} rightDisabled={false} operation={[leftFn, rightFn]} />,
      );
      expect(wrapper2.find('.t-transfer__operations').exists()).toBeTruthy();
    });
  });

  describe('events', () => {
    it('moveToRight', async () => {
      const wrapper = mount(<TransferOperations leftDisabled={false} rightDisabled={false} />);
      const rightButton = wrapper.findAll('button')[0];
      await rightButton.trigger('click');
      expect(wrapper.emitted('moveToRight')).toBeTruthy();
    });

    it('moveToLeft', async () => {
      const wrapper = mount(<TransferOperations leftDisabled={false} rightDisabled={false} />);
      const leftButton = wrapper.findAll('button')[1];
      await leftButton.trigger('click');
      expect(wrapper.emitted('moveToLeft')).toBeTruthy();
    });

    it('should not emit when button is disabled', async () => {
      const wrapper = mount(<TransferOperations leftDisabled={true} rightDisabled={true} />);
      const buttons = wrapper.findAll('button');
      await buttons[0].trigger('click');
      await buttons[1].trigger('click');
      expect(wrapper.emitted('moveToRight')).toBeFalsy();
      expect(wrapper.emitted('moveToLeft')).toBeFalsy();
    });
  });

  describe('slots', () => {
    it('should render operation slot correctly', () => {
      const wrapper = mount(TransferOperations, {
        props: {
          leftDisabled: false,
          rightDisabled: false,
        },
        slots: {
          operation: ({ direction }: { direction: string }) => <span class="custom-operation">{direction}</span>,
        },
      });
      expect(wrapper.findAll('.custom-operation').length).toBe(2);
    });
  });

  describe('other logic', () => {
    it('should render correct button shapes for string operations', () => {
      const wrapper = mount(
        <TransferOperations leftDisabled={false} rightDisabled={false} operation={['向左', '向右']} />,
      );
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
      const wrapper = mount(<TransferOperations leftDisabled={false} rightDisabled={false} />);
      const buttons = wrapper.findAll('button');
      buttons.forEach((button) => {
        expect(button.classes()).toContain('t-button--shape-square');
      });
    });

    it('should render operation as function', () => {
      const operationFn = vi.fn((h: any, { direction }: { direction: string }) => (direction === 'left' ? '《' : '》'));
      const wrapper = mount(<TransferOperations leftDisabled={false} rightDisabled={false} operation={operationFn} />);
      // 右按钮
      expect(wrapper.text()).toContain('》');
      // 左按钮
      expect(wrapper.text()).toContain('《');
      expect(operationFn).toHaveBeenCalled();
    });

    it('should render empty string when operation is not array or function', () => {
      const wrapper = mount(<TransferOperations leftDisabled={false} rightDisabled={false} operation={123 as any} />);
      // 按钮内容应为空
      const buttons = wrapper.findAll('button');
      expect(buttons[0].text()).toBe('');
      expect(buttons[1].text()).toBe('');
    });

    it('should not show icon when operation is function', () => {
      const operationFn = () => '自定义';
      const wrapper = mount(<TransferOperations leftDisabled={false} rightDisabled={false} operation={operationFn} />);
      const buttons = wrapper.findAll('button');
      expect(buttons[0].find('.t-icon').exists()).toBeFalsy();
      expect(buttons[1].find('.t-icon').exists()).toBeFalsy();
    });

    it('should not show icon when operation array has functions', () => {
      const leftFn = () => '左';
      const rightFn = () => '右';
      const wrapper = mount(
        <TransferOperations leftDisabled={false} rightDisabled={false} operation={[leftFn, rightFn]} />,
      );
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

    it('should have correct classes based on disabled state', () => {
      const wrapper = mount(<TransferOperations leftDisabled={true} rightDisabled={false} />);
      const buttons = wrapper.findAll('button');
      expect(buttons[0].classes()).not.toContain('t-is-disabled');
      expect(buttons[1].classes()).toContain('t-is-disabled');
    });

    it('should have correct variant and size', () => {
      const wrapper = mount(<TransferOperations leftDisabled={false} rightDisabled={false} />);
      const buttons = wrapper.findAll('button');
      buttons.forEach((button) => {
        expect(button.classes()).toContain('t-button--variant-outline');
        expect(button.classes()).toContain('t-size-s');
      });
    });
  });
});
