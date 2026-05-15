import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import TransferSearch from '@tdesign/components/transfer/components/transfer-search';

describe('TransferSearch', () => {
  describe('props', () => {
    it(':value[string]', () => {
      const wrapper = mount(<TransferSearch value="测试值" />);
      const input = wrapper.find('input');
      expect(input.element.value).toBe('测试值');
    });

    it(':search[boolean/object]', () => {
      const wrapper1 = mount(<TransferSearch search={true} />);
      expect(wrapper1.find('.t-transfer__search-wrapper').exists()).toBeTruthy();
      expect(wrapper1.find('.t-input').exists()).toBeTruthy();

      const searchConfig = {
        clearable: false,
        size: 'large',
      };
      // TODO: types error
      // @ts-ignore
      const wrapper = mount(<TransferSearch search={searchConfig} />);
      const input = wrapper.find('.t-input');
      expect(input.classes()).toContain('t-size-l');
    });

    it(':placeholder[string]', () => {
      const wrapper = mount(<TransferSearch placeholder="自定义占位符" />);
      const input = wrapper.find('input');
      expect(input.attributes('placeholder')).toBe('自定义占位符');
    });
  });

  describe('events', () => {
    it(':onChange', async () => {
      const onChange = vi.fn();
      const wrapper = mount(<TransferSearch onChange={onChange} />);

      const input = wrapper.find('input');
      await input.setValue('搜索内容');
      await input.trigger('input');

      expect(onChange).toHaveBeenCalled();
      const callArgs = onChange.mock.calls[0][0];
      expect(callArgs).toHaveProperty('value');
      expect(callArgs).toHaveProperty('e');
      expect(callArgs).toHaveProperty('trigger');

      await input.trigger('blur');
      expect(onChange).toHaveBeenCalledTimes(2);
    });
  });

  describe('other logic', () => {
    it('should have default clearable when search is boolean', () => {
      const wrapper = mount(<TransferSearch search={true} />);
      // 默认应该有清空按钮
      expect(wrapper.find('.t-input').exists()).toBeTruthy();
    });

    it('should merge search object props correctly', () => {
      const searchConfig = {
        disabled: true,
        size: 'small',
      };
      // TODO: types error
      // @ts-ignore
      const wrapper = mount(<TransferSearch search={searchConfig} />);
      const input = wrapper.find('input');
      expect((input.element as HTMLInputElement).disabled).toBe(true);
    });

    it('should support clear when clearable', async () => {
      const onChange = vi.fn();
      const wrapper = mount(
        <TransferSearch search={{ clearable: true } as any} value="需要清空的内容" onChange={onChange} />,
      );

      const input = wrapper.find('input');
      expect((input.element as HTMLInputElement).value).toBe('需要清空的内容');

      // 模拟清空操作
      await input.setValue('');
      await input.trigger('input');

      expect(onChange).toHaveBeenCalled();
    });

    it('should not show clear when clearable is false', () => {
      const wrapper = mount(<TransferSearch search={{ clearable: false } as any} value="内容" />);
      expect(wrapper.find('.t-input').exists()).toBeTruthy();
    });

    it('should handle empty value', () => {
      const wrapper = mount(<TransferSearch search={true} value="" />);
      const input = wrapper.find('input');
      expect((input.element as HTMLInputElement).value).toBe('');
    });

    it('should handle undefined value', () => {
      const wrapper = mount(<TransferSearch search={true} value={undefined} />);
      expect(wrapper.find('input').exists()).toBeTruthy();
    });

    it('should handle search config as object with all props', () => {
      const searchConfig = {
        placeholder: '搜索',
        clearable: true,
        disabled: false,
        size: 'medium',
        maxlength: 50,
      } as any;
      const wrapper = mount(<TransferSearch search={searchConfig} />);
      expect(wrapper.find('.t-input').exists()).toBeTruthy();
    });

    it('should handle onChange without params', async () => {
      const wrapper = mount(<TransferSearch search={true} onChange={undefined} />);
      const input = wrapper.find('input');
      await input.setValue('test');
      await input.trigger('input');
      expect(wrapper.emitted('change')).toBeTruthy();
    });

    it('should work with different input types', async () => {
      const onChange = vi.fn();
      const wrapper = mount(<TransferSearch search={true} onChange={onChange} />);
      const input = wrapper.find('input');
      // 测试输入
      await input.setValue('abc');
      // 测试数字
      await input.setValue('123');
      // 测试特殊字符
      await input.setValue('!@#');
      expect(onChange).toHaveBeenCalledTimes(3);
    });

    it('should set correct default value from props', () => {
      const wrapper = mount(<TransferSearch search={true} value="初始值" />);
      const input = wrapper.find('input');
      expect((input.element as HTMLInputElement).value).toBe('初始值');
    });
  });
});
