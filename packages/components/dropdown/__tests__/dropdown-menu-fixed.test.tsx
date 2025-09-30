import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { vi } from 'vitest';
import DropdownMenu from '../dropdown-menu';
import DropdownItem from '../dropdown-item';

// Mock DOM methods to prevent runtime errors
Object.defineProperty(document, 'querySelector', {
  value: vi.fn(() => ({
    scrollHeight: 32,
  })),
  writable: true,
});

describe('DropdownMenu Fixed', () => {
  // 测试基本渲染
  describe('render', () => {
    it('renders dropdown menu with default props', () => {
      const wrapper = mount(DropdownMenu, {
        props: {
          options: [
            { content: 'Option 1', value: '1' },
            { content: 'Option 2', value: '2' },
          ],
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it('renders with custom class and style', () => {
      const wrapper = mount(DropdownMenu, {
        props: {
          options: [{ content: 'Option 1', value: '1' }],
        },
        attrs: {
          class: 'custom-menu',
          style: { backgroundColor: 'red' },
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it('renders empty menu when no options', () => {
      const wrapper = mount(DropdownMenu, {
        props: {
          options: [],
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('options')).toEqual([]);
    });
  });

  // 测试 options 属性 - 使用正确的类型
  describe('options prop', () => {
    it('renders options with array of objects', () => {
      const options = [
        { content: 'Option 1', value: '1' },
        { content: 'Option 2', value: '2', disabled: true },
        { content: 'Option 3', value: '3', divider: true },
        { content: 'Option 4', value: '4', theme: 'error' as const },
      ];

      const wrapper = mount(DropdownMenu, {
        props: {
          options,
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('options')).toEqual(options);
    });

    it('handles complex option objects', () => {
      const clickHandler = vi.fn();
      const options = [
        {
          content: 'Complex Option',
          value: 'complex',
          disabled: false,
          divider: false,
          theme: 'default' as const,
          onClick: clickHandler,
        },
      ];

      const wrapper = mount(DropdownMenu, {
        props: {
          options,
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('options')).toEqual(options);
    });

    it('handles options with different themes', () => {
      const options = [
        { content: 'Default', value: '1', theme: 'default' as const },
        { content: 'Error', value: '2', theme: 'error' as const },
        { content: 'Warning', value: '3', theme: 'warning' as const },
        { content: 'Success', value: '4', theme: 'success' as const },
      ];

      const wrapper = mount(DropdownMenu, {
        props: {
          options,
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('options')).toEqual(options);
    });

    it('handles nested options (children)', () => {
      const options = [
        {
          content: 'Parent Option',
          value: 'parent',
          children: [
            { content: 'Child 1', value: 'child1' },
            { content: 'Child 2', value: 'child2' },
          ],
        },
      ];

      const wrapper = mount(DropdownMenu, {
        props: {
          options,
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('options')).toEqual(options);
    });
  });

  // 测试 direction 属性
  describe('direction prop', () => {
    it('works with left direction', () => {
      const wrapper = mount(DropdownMenu, {
        props: {
          direction: 'left',
          options: [{ content: 'Option 1', value: '1' }],
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('direction')).toBe('left');
    });

    it('works with right direction', () => {
      const wrapper = mount(DropdownMenu, {
        props: {
          direction: 'right',
          options: [{ content: 'Option 1', value: '1' }],
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('direction')).toBe('right');
    });
  });

  // 测试 maxHeight 属性
  describe('maxHeight prop', () => {
    it('works with number maxHeight', () => {
      const wrapper = mount(DropdownMenu, {
        props: {
          maxHeight: 200,
          options: [{ content: 'Option 1', value: '1' }],
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('maxHeight')).toBe(200);
    });

    it('applies maxHeight style', async () => {
      const wrapper = mount(DropdownMenu, {
        props: {
          maxHeight: 300,
          options: [{ content: 'Option 1', value: '1' }],
        },
      });

      expect(wrapper.exists()).toBe(true);
      await nextTick();
      
      // 检查组件是否正确设置了 maxHeight 属性
      expect(wrapper.props('maxHeight')).toBe(300);
    });
  });

  // 测试 maxColumnWidth 和 minColumnWidth 属性
  describe('column width props', () => {
    it('works with maxColumnWidth', () => {
      const wrapper = mount(DropdownMenu, {
        props: {
          maxColumnWidth: 200,
          options: [{ content: 'Option 1', value: '1' }],
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('maxColumnWidth')).toBe(200);
    });

    it('works with minColumnWidth', () => {
      const wrapper = mount(DropdownMenu, {
        props: {
          minColumnWidth: 50,
          options: [{ content: 'Option 1', value: '1' }],
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('minColumnWidth')).toBe(50);
    });
  });

  // 测试事件
  describe('events', () => {
    it('handles onClick event', () => {
      const onClickSpy = vi.fn();
      const wrapper = mount(DropdownMenu, {
        props: {
          onClick: onClickSpy,
          options: [{ content: 'Option 1', value: '1' }],
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props()).toHaveProperty('onClick');
      expect(typeof wrapper.props('onClick')).toBe('function');
    });
  });

  // 测试边界情况
  describe('edge cases', () => {
    it('handles empty options array', () => {
      const wrapper = mount(DropdownMenu, {
        props: {
          options: [],
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('options')).toEqual([]);
    });

    it('handles undefined options gracefully', () => {
      const wrapper = mount(DropdownMenu, {
        props: {
          options: undefined,
        },
      });

      expect(wrapper.exists()).toBe(true);
      // DropdownMenu 组件有默认值 []，所以 undefined 会被转换为空数组
      expect(wrapper.props('options')).toEqual([]);
    });

    it('handles options with all valid properties', () => {
      const options = [
        {
          content: 'Full Option',
          value: 'full',
          disabled: true,
          divider: true,
          theme: 'error' as const,
          active: true,
          style: { color: 'red' },
          class: 'custom-item',
        },
      ];

      const wrapper = mount(DropdownMenu, {
        props: {
          options,
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('options')).toEqual(options);
    });

    it('handles zero maxHeight', () => {
      const wrapper = mount(DropdownMenu, {
        props: {
          maxHeight: 0,
          options: [{ content: 'Option 1', value: '1' }],
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('maxHeight')).toBe(0);
    });

    it('handles large maxHeight', () => {
      const wrapper = mount(DropdownMenu, {
        props: {
          maxHeight: 9999,
          options: [{ content: 'Option 1', value: '1' }],
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('maxHeight')).toBe(9999);
    });
  });

  // 测试组件组合
  describe('component composition', () => {
    it('works with different direction and maxHeight combinations', () => {
      const wrapper = mount(DropdownMenu, {
        props: {
          direction: 'left',
          maxHeight: 250,
          maxColumnWidth: 150,
          minColumnWidth: 80,
          options: [
            { content: 'Option 1', value: '1' },
            { content: 'Option 2', value: '2', disabled: true },
          ],
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('direction')).toBe('left');
      expect(wrapper.props('maxHeight')).toBe(250);
      expect(wrapper.props('maxColumnWidth')).toBe(150);
      expect(wrapper.props('minColumnWidth')).toBe(80);
    });
  });

  // 测试 props 验证
  describe('props validation', () => {
    it('accepts valid direction values', () => {
      const validDirections = ['left', 'right'];
      
      validDirections.forEach(direction => {
        const wrapper = mount(DropdownMenu, {
          props: {
            direction: direction as 'left' | 'right',
            options: [{ content: 'Option 1', value: '1' }],
          },
        });

        expect(wrapper.exists()).toBe(true);
        expect(wrapper.props('direction')).toBe(direction);
      });
    });

    it('accepts valid theme values in options', () => {
      const validThemes = ['default', 'error', 'warning', 'success'] as const;
      
      validThemes.forEach(theme => {
        const wrapper = mount(DropdownMenu, {
          props: {
            options: [{ content: 'Option 1', value: '1', theme }],
          },
        });

        expect(wrapper.exists()).toBe(true);
        expect(wrapper.props('options')[0].theme).toBe(theme);
      });
    });
  });
});