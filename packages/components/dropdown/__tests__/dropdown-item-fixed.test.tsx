import { mount } from '@vue/test-utils';
import { nextTick, h } from 'vue';
import { vi } from 'vitest';
import DropdownItem from '../dropdown-item';

describe('DropdownItem Fixed', () => {
  // 测试基本渲染
  describe('render', () => {
    it('renders dropdown item with default props', () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
        },
        slots: {
          default: () => 'Option 1',
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.text()).toBe('Option 1');
    });

    it('renders with custom class and style', () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
        },
        attrs: {
          class: 'custom-item',
          style: { color: 'red' },
        },
        slots: {
          default: () => 'Custom Item',
        },
      });

      expect(wrapper.exists()).toBe(true);
    });
  });

  // 测试 value 属性
  describe('value prop', () => {
    it('works with string value', () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: 'string-value',
        },
        slots: {
          default: () => 'String Value',
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('value')).toBe('string-value');
    });

    it('works with number value', () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: 123,
        },
        slots: {
          default: () => 'Number Value',
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('value')).toBe(123);
    });

    it('works with object value', () => {
      const objectValue = { id: 1, name: 'test' };
      const wrapper = mount(DropdownItem, {
        props: {
          value: objectValue,
        },
        slots: {
          default: () => 'Object Value',
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('value')).toEqual(objectValue);
    });
  });

  // 测试 content 属性
  describe('content prop', () => {
    it('works with string content', () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          content: 'String Content',
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('content')).toBe('String Content');
    });

    it('prefers slot content over prop content', () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          content: 'Prop Content',
        },
        slots: {
          default: () => 'Slot Content',
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.text()).toBe('Slot Content');
    });
  });

  // 测试 disabled 属性
  describe('disabled prop', () => {
    it('works with disabled true', () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          disabled: true,
        },
        slots: {
          default: () => 'Disabled Item',
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('disabled')).toBe(true);
    });

    it('works with disabled false', () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          disabled: false,
        },
        slots: {
          default: () => 'Enabled Item',
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('disabled')).toBe(false);
    });
  });

  // 测试 active 属性
  describe('active prop', () => {
    it('works with active true', () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          active: true,
        },
        slots: {
          default: () => 'Active Item',
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('active')).toBe(true);
    });

    it('works with active false', () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          active: false,
        },
        slots: {
          default: () => 'Inactive Item',
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('active')).toBe(false);
    });
  });

  // 测试 theme 属性
  describe('theme prop', () => {
    it('works with default theme', () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          theme: 'default',
        },
        slots: {
          default: () => 'Default Theme',
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('theme')).toBe('default');
    });

    it('works with error theme', () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          theme: 'error',
        },
        slots: {
          default: () => 'Error Theme',
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('theme')).toBe('error');
    });

    it('works with warning theme', () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          theme: 'warning',
        },
        slots: {
          default: () => 'Warning Theme',
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('theme')).toBe('warning');
    });

    it('works with success theme', () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          theme: 'success',
        },
        slots: {
          default: () => 'Success Theme',
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('theme')).toBe('success');
    });
  });

  // 测试 divider 属性
  describe('divider prop', () => {
    it('works with divider true', () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          divider: true,
        },
        slots: {
          default: () => 'Item with Divider',
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('divider')).toBe(true);
    });

    it('works with divider false', () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          divider: false,
        },
        slots: {
          default: () => 'Item without Divider',
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('divider')).toBe(false);
    });
  });

  // 测试 prefixIcon 属性 - 使用正确的函数类型
  describe('prefixIcon prop', () => {
    it('works with function prefixIcon', () => {
      const iconFunction = () => h('span', { class: 'icon' }, 'Icon');
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          prefixIcon: iconFunction,
        },
        slots: {
          default: () => 'Item with Icon',
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(typeof wrapper.props('prefixIcon')).toBe('function');
    });

    it('renders without prefixIcon when not provided', () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
        },
        slots: {
          default: () => 'Item without Icon',
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('prefixIcon')).toBeUndefined();
    });
  });

  // 测试 maxColumnWidth 和 minColumnWidth 属性
  describe('column width props', () => {
    it('works with string maxColumnWidth', () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          maxColumnWidth: '200px',
        },
        slots: {
          default: () => 'Item',
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('maxColumnWidth')).toBe('200px');
    });

    it('works with number maxColumnWidth', () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          maxColumnWidth: 200,
        },
        slots: {
          default: () => 'Item',
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('maxColumnWidth')).toBe(200);
    });

    it('works with string minColumnWidth', () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          minColumnWidth: '50px',
        },
        slots: {
          default: () => 'Item',
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('minColumnWidth')).toBe('50px');
    });

    it('works with number minColumnWidth', () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          minColumnWidth: 50,
        },
        slots: {
          default: () => 'Item',
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('minColumnWidth')).toBe(50);
    });
  });

  // 测试事件
  describe('events', () => {
    it('handles onClick event', async () => {
      const onClickSpy = vi.fn();
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          onClick: onClickSpy,
        },
        slots: {
          default: () => 'Clickable Item',
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(typeof wrapper.props('onClick')).toBe('function');
    });

    it('has onClick prop when provided', () => {
      const onClickSpy = vi.fn();
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          onClick: onClickSpy,
        },
        slots: {
          default: () => 'Clickable Item',
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('onClick')).toBe(onClickSpy);
    });
  });

  // 测试边界情况
  describe('edge cases', () => {
    it('handles missing value', () => {
      const wrapper = mount(DropdownItem, {
        slots: {
          default: () => 'No Value Item',
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('value')).toBeUndefined();
    });

    it('handles empty content', () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          content: '',
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('content')).toBe('');
    });

    it('handles null content', () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          content: null,
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('content')).toBe(null);
    });

    it('handles zero values for width', () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          maxColumnWidth: 0,
          minColumnWidth: 0,
        },
        slots: {
          default: () => 'Zero Width Item',
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('maxColumnWidth')).toBe(0);
      expect(wrapper.props('minColumnWidth')).toBe(0);
    });
  });

  // 测试组件组合
  describe('component composition', () => {
    it('works with all props combined', () => {
      const onClickSpy = vi.fn();
      const iconFunction = () => h('span', { class: 'success-icon' }, 'Success');

      const wrapper = mount(DropdownItem, {
        props: {
          value: { id: 1, name: 'test' },
          content: 'Full Featured Item',
          disabled: false,
          active: true,
          theme: 'success',
          divider: true,
          prefixIcon: iconFunction,
          maxColumnWidth: 200,
          minColumnWidth: 50,
          onClick: onClickSpy,
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('value')).toEqual({ id: 1, name: 'test' });
      expect(wrapper.props('active')).toBe(true);
      expect(wrapper.props('theme')).toBe('success');
      expect(wrapper.props('divider')).toBe(true);
      expect(typeof wrapper.props('prefixIcon')).toBe('function');
    });
  });

  // 测试 props 验证
  describe('props validation', () => {
    it('accepts valid theme values', () => {
      const validThemes = ['default', 'error', 'warning', 'success'] as const;

      validThemes.forEach((theme) => {
        const wrapper = mount(DropdownItem, {
          props: {
            value: '1',
            theme,
          },
          slots: {
            default: () => `${theme} theme`,
          },
        });

        expect(wrapper.exists()).toBe(true);
        expect(wrapper.props('theme')).toBe(theme);
      });
    });

    it('accepts different value types', () => {
      const values = ['string', 123, true, { id: 1 }, [1, 2, 3], null];

      values.forEach((value) => {
        const wrapper = mount(DropdownItem, {
          props: {
            value,
          },
          slots: {
            default: () => `Value: ${JSON.stringify(value)}`,
          },
        });

        expect(wrapper.exists()).toBe(true);
        expect(wrapper.props('value')).toEqual(value);
      });
    });
  });
});
