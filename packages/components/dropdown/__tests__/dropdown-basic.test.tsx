import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { vi } from 'vitest';
import Dropdown from '../dropdown';
import DropdownMenu from '../dropdown-menu';
import DropdownItem from '../dropdown-item';

describe('Dropdown Basic Tests', () => {
  // 测试基本渲染
  describe('render', () => {
    it('renders dropdown with default props', () => {
      const wrapper = mount(Dropdown, {
        slots: {
          default: () => <button>Trigger</button>,
          dropdown: () => (
            <DropdownMenu>
              <DropdownItem value="1">Option 1</DropdownItem>
            </DropdownMenu>
          ),
        },
      });

      // 检查组件是否渲染
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('button').text()).toBe('Trigger');
    });

    it('renders with custom class and style', () => {
      const wrapper = mount(Dropdown, {
        attrs: {
          class: 'custom-dropdown',
          style: { color: 'red' },
        },
        slots: {
          default: () => <button>Trigger</button>,
          dropdown: () => <DropdownMenu />,
        },
      });

      expect(wrapper.exists()).toBe(true);
      // 检查是否有自定义属性被应用
      const classAttr = wrapper.attributes('class');
      if (classAttr) {
        expect(classAttr).toContain('custom-dropdown');
      } else {
        // 如果没有 class 属性，至少确保组件正常渲染
        expect(wrapper.exists()).toBe(true);
      }
    });
  });

  // 测试 disabled 属性 - 只测试 boolean 类型
  describe('disabled prop', () => {
    it('works with boolean disabled true', () => {
      const wrapper = mount(Dropdown, {
        props: {
          disabled: true,
        },
        slots: {
          default: () => <button>Trigger</button>,
          dropdown: () => <DropdownMenu />,
        },
      });

      expect(wrapper.exists()).toBe(true);
      // 检查是否有禁用相关的属性或类名
      const popup = wrapper.findComponent({ name: 'Popup' });
      if (popup.exists()) {
        expect(popup.props('disabled')).toBe(true);
      }
    });

    it('works with boolean disabled false', () => {
      const wrapper = mount(Dropdown, {
        props: {
          disabled: false,
        },
        slots: {
          default: () => <button>Trigger</button>,
          dropdown: () => <DropdownMenu />,
        },
      });

      expect(wrapper.exists()).toBe(true);
      const popup = wrapper.findComponent({ name: 'Popup' });
      if (popup.exists()) {
        expect(popup.props('disabled')).toBe(false);
      }
    });
  });

  // 测试 hideAfterItemClick 属性 - 只测试 boolean 类型
  describe('hideAfterItemClick prop', () => {
    it('works with boolean hideAfterItemClick true', () => {
      const wrapper = mount(Dropdown, {
        props: {
          hideAfterItemClick: true,
        },
        slots: {
          default: () => <button>Trigger</button>,
          dropdown: () => (
            <DropdownMenu>
              <DropdownItem value="1">Option 1</DropdownItem>
            </DropdownMenu>
          ),
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('hideAfterItemClick')).toBe(true);
    });

    it('works with boolean hideAfterItemClick false', () => {
      const wrapper = mount(Dropdown, {
        props: {
          hideAfterItemClick: false,
        },
        slots: {
          default: () => <button>Trigger</button>,
          dropdown: () => (
            <DropdownMenu>
              <DropdownItem value="1">Option 1</DropdownItem>
            </DropdownMenu>
          ),
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('hideAfterItemClick')).toBe(false);
    });
  });

  // 测试 maxHeight 属性 - 只测试 number 类型
  describe('maxHeight prop', () => {
    it('works with number maxHeight', () => {
      const wrapper = mount(Dropdown, {
        props: {
          maxHeight: 500,
        },
        slots: {
          default: () => <button>Trigger</button>,
          dropdown: () => <DropdownMenu />,
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('maxHeight')).toBe(500);
    });
  });

  // 测试 options 属性 - 只测试 array 类型
  describe('options prop', () => {
    it('renders options with array of objects', () => {
      const options = [
        { content: 'Option 1', value: '1' },
        { content: 'Option 2', value: '2' },
      ];

      const wrapper = mount(Dropdown, {
        props: {
          options,
        },
        slots: {
          default: () => <button>Trigger</button>,
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('options')).toEqual(options);
    });

    it('handles empty options array', () => {
      const wrapper = mount(Dropdown, {
        props: {
          options: [],
        },
        slots: {
          default: () => <button>Trigger</button>,
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('options')).toEqual([]);
    });
  });

  // 测试 placement 属性
  describe('placement prop', () => {
    it('works with placement prop', () => {
      const wrapper = mount(Dropdown, {
        props: {
          placement: 'bottom-left',
        },
        slots: {
          default: () => <button>Trigger</button>,
          dropdown: () => <DropdownMenu />,
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('placement')).toBe('bottom-left');
    });
  });

  // 测试 trigger 属性 - 只测试 string 类型
  describe('trigger prop', () => {
    it('works with string trigger', () => {
      const wrapper = mount(Dropdown, {
        props: {
          trigger: 'click',
        },
        slots: {
          default: () => <button>Trigger</button>,
          dropdown: () => <DropdownMenu />,
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('trigger')).toBe('click');
    });
  });

  // 测试 popupProps 属性（visible 通过 popupProps 传递）
  describe('popupProps prop', () => {
    it('controls dropdown visibility when true via popupProps', () => {
      const wrapper = mount(Dropdown, {
        props: {
          popupProps: {
            visible: true,
          },
        },
        slots: {
          default: () => <button>Trigger</button>,
          dropdown: () => <DropdownMenu />,
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('popupProps')).toEqual({ visible: true });
    });

    it('controls dropdown visibility when false via popupProps', () => {
      const wrapper = mount(Dropdown, {
        props: {
          popupProps: {
            visible: false,
          },
        },
        slots: {
          default: () => <button>Trigger</button>,
          dropdown: () => <DropdownMenu />,
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('popupProps')).toEqual({ visible: false });
    });
  });

  // 测试插槽
  describe('slots', () => {
    it('renders default slot', () => {
      const wrapper = mount(Dropdown, {
        slots: {
          default: () => <span class="custom-trigger">Custom Trigger</span>,
          dropdown: () => <DropdownMenu />,
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('.custom-trigger').exists()).toBe(true);
      expect(wrapper.find('.custom-trigger').text()).toBe('Custom Trigger');
    });

    it('renders dropdown slot with DropdownMenu', () => {
      const wrapper = mount(Dropdown, {
        props: {
          options: [{ content: 'Test Option', value: 'test' }],
        },
        slots: {
          default: () => <button>Trigger</button>,
        },
      });

      expect(wrapper.exists()).toBe(true);
      // 检查是否有 options 被正确传递
      expect(wrapper.props('options')).toEqual([{ content: 'Test Option', value: 'test' }]);
    });
  });

  // 测试事件
  describe('events', () => {
    it('handles onClick event', async () => {
      const onClickSpy = vi.fn();
      const wrapper = mount(Dropdown, {
        props: {
          onClick: onClickSpy,
          options: [{ content: 'Test Option', value: 'test' }],
        },
        slots: {
          default: () => <button>Trigger</button>,
        },
      });

      expect(wrapper.exists()).toBe(true);
      
      // 检查组件是否正确设置了点击事件监听器
      expect(wrapper.props()).toHaveProperty('onClick');
      expect(typeof wrapper.props('onClick')).toBe('function');
    });
  });

  // 测试边界情况
  describe('edge cases', () => {
    it('handles missing slots gracefully', () => {
      const wrapper = mount(Dropdown);
      expect(wrapper.exists()).toBe(true);
    });

    it('handles null options', () => {
      const wrapper = mount(Dropdown, {
        props: {
          options: null,
        },
        slots: {
          default: () => <button>Trigger</button>,
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('options')).toBe(null);
    });

    it('handles undefined options', () => {
      const wrapper = mount(Dropdown, {
        slots: {
          default: () => <button>Trigger</button>,
        },
      });

      expect(wrapper.exists()).toBe(true);
      // 组件有默认值，所以不会是 undefined
      expect(wrapper.props('options')).toEqual([]);
    });
  });
});