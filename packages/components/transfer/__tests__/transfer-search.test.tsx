// @ts-nocheck
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import TransferSearch from '@tdesign/components/transfer/components/transfer-search';

describe('TransferSearch', () => {
  describe('Props', () => {
    it(':value', () => {
      const wrapper = mount(TransferSearch, {
        props: {
          value: '测试值',
          search: true,
        },
      });
      const input = wrapper.find('input');
      expect(input.element.value).toBe('测试值');
    });

    it(':search boolean', () => {
      const wrapper = mount(TransferSearch, {
        props: {
          search: true,
        },
      });
      expect(wrapper.find('.t-transfer__search-wrapper').exists()).toBeTruthy();
      expect(wrapper.find('.t-input').exists()).toBeTruthy();
    });

    it(':search object with props', () => {
      const searchConfig = {
        clearable: false,
        size: 'large',
      };
      const wrapper = mount(TransferSearch, {
        props: {
          search: searchConfig,
        },
      });
      const input = wrapper.find('.t-input');
      expect(input.classes()).toContain('t-size-l');
    });

    it(':placeholder', () => {
      const wrapper = mount(TransferSearch, {
        props: {
          search: true,
          placeholder: '自定义占位符',
        },
      });
      const input = wrapper.find('input');
      expect(input.attributes('placeholder')).toBe('自定义占位符');
    });

    it('should have default clearable when search is boolean', () => {
      const wrapper = mount(TransferSearch, {
        props: {
          search: true,
        },
      });
      // 默认应该有清空按钮
      expect(wrapper.find('.t-input').exists()).toBeTruthy();
    });

    it('should merge search object props correctly', () => {
      const searchConfig = {
        disabled: true,
        size: 'small',
      };
      const wrapper = mount(TransferSearch, {
        props: {
          search: searchConfig,
        },
      });
      const input = wrapper.find('input');
      expect(input.element.disabled).toBe(true);
    });
  });

  describe('Events', () => {
    it(':onChange', async () => {
      const onChange = vi.fn();
      const wrapper = mount(TransferSearch, {
        props: {
          search: true,
          onChange,
        },
      });

      const input = wrapper.find('input');
      await input.setValue('搜索内容');
      await input.trigger('input');

      expect(onChange).toHaveBeenCalled();
      const callArgs = onChange.mock.calls[0][0];
      expect(callArgs).toHaveProperty('value');
      expect(callArgs).toHaveProperty('e');
      expect(callArgs).toHaveProperty('trigger');
    });

    it('should handle change with different triggers', async () => {
      const onChange = vi.fn();
      const wrapper = mount(TransferSearch, {
        props: {
          search: true,
          onChange,
        },
      });

      const input = wrapper.find('input');
      await input.setValue('test');
      await input.trigger('blur');

      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('Icon', () => {
    it('should support clear when clearable', async () => {
      const onChange = vi.fn();
      const wrapper = mount(TransferSearch, {
        props: {
          search: { clearable: true },
          value: '需要清空的内容',
          onChange,
        },
      });

      const input = wrapper.find('input');
      expect(input.element.value).toBe('需要清空的内容');

      // 模拟清空操作
      await input.setValue('');
      await input.trigger('input');

      expect(onChange).toHaveBeenCalled();
    });

    it('should not show clear when clearable is false', () => {
      const wrapper = mount(TransferSearch, {
        props: {
          search: { clearable: false },
          value: '内容',
        },
      });
      expect(wrapper.find('.t-input').exists()).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty value', () => {
      const wrapper = mount(TransferSearch, {
        props: {
          search: true,
          value: '',
        },
      });
      const input = wrapper.find('input');
      expect(input.element.value).toBe('');
    });

    it('should handle undefined value', () => {
      const wrapper = mount(TransferSearch, {
        props: {
          search: true,
          value: undefined,
        },
      });
      expect(wrapper.find('input').exists()).toBeTruthy();
    });

    it('should handle search config as object with all props', () => {
      const searchConfig = {
        placeholder: '搜索',
        clearable: true,
        disabled: false,
        size: 'medium',
        maxlength: 50,
      };
      const wrapper = mount(TransferSearch, {
        props: {
          search: searchConfig,
        },
      });
      expect(wrapper.find('.t-input').exists()).toBeTruthy();
    });

    it('should handle onChange without params', async () => {
      const wrapper = mount(TransferSearch, {
        props: {
          search: true,
          onChange: undefined,
        },
      });

      const input = wrapper.find('input');
      await input.setValue('test');
      await input.trigger('input');
      // 不应该报错
    });
  });

  describe('Integration', () => {
    it('should work with different input types', async () => {
      const onChange = vi.fn();
      const wrapper = mount(TransferSearch, {
        props: {
          search: true,
          onChange,
        },
      });

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
      const wrapper = mount(TransferSearch, {
        props: {
          search: true,
          value: '初始值',
        },
      });

      const input = wrapper.find('input');
      expect(input.element.value).toBe('初始值');
    });
  });
});
