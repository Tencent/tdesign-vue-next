import { mount } from '@vue/test-utils';
import { nextTick, h } from 'vue';
import { vi } from 'vitest';
import DropdownItem from '../dropdown-item';

describe('DropdownItem Coverage Tests', () => {
  // 测试 dropdown-item.tsx 中未覆盖的代码行 (33-36)
  describe('edge cases and uncovered paths', () => {
    it('handles click event with disabled state', async () => {
      const onClickSpy = vi.fn();
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          disabled: true,
          onClick: onClickSpy,
        },
        slots: {
          default: () => 'Disabled Item',
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('disabled')).toBe(true);

      // 尝试点击被禁用的项目
      await wrapper.trigger('click');
      
      // 被禁用的项目不应该触发点击事件
      expect(onClickSpy).not.toHaveBeenCalled();
    });

    it('handles click event with enabled state', async () => {
      const onClickSpy = vi.fn();
      const wrapper = mount(DropdownItem, {
        props: {
          value: 'test-value',
          disabled: false,
          onClick: onClickSpy,
        },
        slots: {
          default: () => 'Enabled Item',
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('disabled')).toBe(false);

      // 点击启用的项目
      await wrapper.trigger('click');
      
      // 应该触发点击事件
      expect(onClickSpy).toHaveBeenCalledWith('test-value', expect.objectContaining({
        e: expect.any(Object),
      }));
    });

    it('handles click event without onClick handler', async () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          disabled: false,
          // 没有 onClick 处理器
        },
        slots: {
          default: () => 'Item without handler',
        },
      });

      expect(wrapper.exists()).toBe(true);

      // 点击没有处理器的项目，不应该报错
      await wrapper.trigger('click');
      
      expect(wrapper.exists()).toBe(true);
    });

    it('handles different event types', async () => {
      const onClickSpy = vi.fn();
      const wrapper = mount(DropdownItem, {
        props: {
          value: 'event-test',
          onClick: onClickSpy,
        },
        slots: {
          default: () => 'Event Test Item',
        },
      });

      // 测试不同类型的事件
      await wrapper.trigger('mouseenter');
      await wrapper.trigger('mouseleave');
      await wrapper.trigger('focus');
      await wrapper.trigger('blur');
      
      // 只有 click 事件应该触发处理器
      await wrapper.trigger('click');
      expect(onClickSpy).toHaveBeenCalledTimes(1);
    });

    it('handles complex value types in click event', async () => {
      const onClickSpy = vi.fn();
      const complexValue = {
        id: 123,
        name: 'Complex Item',
        metadata: { type: 'test', active: true },
      };

      const wrapper = mount(DropdownItem, {
        props: {
          value: complexValue,
          onClick: onClickSpy,
        },
        slots: {
          default: () => 'Complex Value Item',
        },
      });

      await wrapper.trigger('click');
      
      expect(onClickSpy).toHaveBeenCalledWith(complexValue, expect.objectContaining({
        e: expect.any(Object),
      }));
    });

    it('handles null and undefined values', async () => {
      const onClickSpy = vi.fn();
      
      // 测试 null 值
      const wrapperNull = mount(DropdownItem, {
        props: {
          value: null,
          onClick: onClickSpy,
        },
        slots: {
          default: () => 'Null Value Item',
        },
      });

      await wrapperNull.trigger('click');
      expect(onClickSpy).toHaveBeenCalledWith(null, expect.objectContaining({
        e: expect.any(Object),
      }));

      onClickSpy.mockClear();

      // 测试 undefined 值
      const wrapperUndefined = mount(DropdownItem, {
        props: {
          value: undefined,
          onClick: onClickSpy,
        },
        slots: {
          default: () => 'Undefined Value Item',
        },
      });

      await wrapperUndefined.trigger('click');
      expect(onClickSpy).toHaveBeenCalledWith(undefined, expect.objectContaining({
        e: expect.any(Object),
      }));
    });

    it('handles prefixIcon with different render functions', () => {
      const iconRenderFn = (h: any) => h('i', { class: 'custom-icon' }, '★');
      
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          prefixIcon: iconRenderFn,
        },
        slots: {
          default: () => 'Item with Icon',
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(typeof wrapper.props('prefixIcon')).toBe('function');
    });

    it('handles all theme variations', () => {
      const themes = ['default', 'error', 'warning', 'success'] as const;
      
      themes.forEach(theme => {
        const wrapper = mount(DropdownItem, {
          props: {
            value: `${theme}-item`,
            theme,
          },
          slots: {
            default: () => `${theme} Theme Item`,
          },
        });

        expect(wrapper.exists()).toBe(true);
        expect(wrapper.props('theme')).toBe(theme);
      });
    });

    it('handles style and class combinations', () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          style: { color: 'red', fontSize: '14px' },
        },
        attrs: {
          class: 'custom-dropdown-item extra-class',
        },
        slots: {
          default: () => 'Styled Item',
        },
      });

      expect(wrapper.exists()).toBe(true);
      const li = wrapper.find('li');
      const styleAttr = li.attributes('style') || '';
      expect(styleAttr).toContain('color: red');
      expect(styleAttr).toContain('font-size: 14px');
    });

    it('handles content prop vs slot priority', () => {
      // 当同时有 content prop 和 slot 时，slot 应该优先
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          content: 'Prop Content',
        },
        slots: {
          default: () => 'Slot Content',
        },
      });

      expect(wrapper.text()).toBe('Slot Content');
      expect(wrapper.props('content')).toBe('Prop Content');
    });

    it('handles only content prop without slot', () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          content: 'Only Prop Content',
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('content')).toBe('Only Prop Content');
    });

    it('handles width constraints edge cases', () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          maxColumnWidth: '100%',
          minColumnWidth: '0px',
        },
        slots: {
          default: () => 'Width Constrained Item',
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('maxColumnWidth')).toBe('100%');
      expect(wrapper.props('minColumnWidth')).toBe('0px');
    });
  });

  // 测试组件状态组合
  describe('component state combinations', () => {
    it('handles active + disabled combination', () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          active: true,
          disabled: true,
        },
        slots: {
          default: () => 'Active but Disabled',
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('active')).toBe(true);
      expect(wrapper.props('disabled')).toBe(true);
    });

    it('handles divider + theme combination', () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          divider: true,
          theme: 'error',
        },
        slots: {
          default: () => 'Error with Divider',
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('divider')).toBe(true);
      expect(wrapper.props('theme')).toBe('error');
    });

    it('handles all props combined with edge values', async () => {
      const iconFn = () => h('span', '🔥');
      const onClickSpy = vi.fn();

      const wrapper = mount(DropdownItem, {
        props: {
          value: { complex: true, id: 999 },
          content: '',
          disabled: false,
          active: false,
          theme: 'warning',
          divider: false,
          prefixIcon: iconFn,
          maxColumnWidth: 1,
          minColumnWidth: 0,
          onClick: onClickSpy,
        },
        slots: {
          default: () => 'All Props Combined',
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('maxColumnWidth')).toBe(1);
      expect(wrapper.props('minColumnWidth')).toBe(0);
      
      // 测试点击
      await wrapper.trigger('click');
      expect(onClickSpy).toHaveBeenCalled();
    });
  });
});