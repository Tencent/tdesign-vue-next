import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { vi } from 'vitest';
import Dropdown from '../dropdown';
import DropdownMenu from '../dropdown-menu';

describe('Dropdown Hooks Tests', () => {
  // 测试 useDropdownOptions hook 的未覆盖分支
  describe('useDropdownOptions hook', () => {
    it('handles options with function type', async () => {
      const contentFn1 = vi.fn((hArg) => hArg('span', 'Dynamic Option 1'));
      const contentFn2 = vi.fn((hArg) => hArg('span', 'Dynamic Option 2'));
      const querySpy = vi.spyOn(document, 'querySelector').mockReturnValue({ scrollHeight: 100 } as any);

      const wrapper = mount(DropdownMenu, {
        props: {
          options: [
            { content: contentFn1, value: '1' },
            { content: contentFn2, value: '2' },
          ],
        },
      });

      expect(wrapper.exists()).toBe(true);
      await nextTick();
      expect(contentFn1).toHaveBeenCalled();
      expect(contentFn2).toHaveBeenCalled();

      querySpy.mockRestore();
    });

    it('handles options change reactively', async () => {
      const initialOptions = [{ content: 'Option 1', value: '1' }];
      const newOptions = [
        { content: 'Option 1', value: '1' },
        { content: 'Option 2', value: '2' },
      ];

      const wrapper = mount(Dropdown, {
        props: {
          options: initialOptions,
        },
        slots: {
          default: () => <button>Trigger</button>,
        },
      });

      expect(wrapper.props('options')).toEqual(initialOptions);

      // 更新 options
      await wrapper.setProps({ options: newOptions });
      
      expect(wrapper.props('options')).toEqual(newOptions);
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

    it('handles options with complex nested structure', () => {
      const complexOptions = [
        {
          content: 'Parent 1',
          value: 'parent1',
          children: [
            {
              content: 'Child 1.1',
              value: 'child1.1',
              children: [{ content: 'Grandchild 1.1.1', value: 'grandchild1.1.1' }],
            },
          ],
        },
      ];

      const wrapper = mount(Dropdown, {
        props: {
          options: complexOptions,
        },
        slots: {
          default: () => <button>Trigger</button>,
        },
      });
  
  describe('boolean attribute mapping in getOptionsFromChildren', () => {
    it('maps empty-string boolean attributes to true', async () => {
      const { default: Dropdown } = await import('../dropdown');
      const { default: DropdownItem } = await import('../dropdown-item');
      const { default: DropdownMenu } = await import('../dropdown-menu');
      const querySpy = vi.spyOn(document, 'querySelector').mockReturnValue({ scrollHeight: 20 } as any);

      const wrapper = mount(Dropdown, {
        slots: {
          default: () => <button>Trigger</button>,
          dropdown: () => (
            <DropdownMenu
              options={
                [
                  // simulate boolean attribute from template via empty-string
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  h(DropdownItem, { content: 'X', value: 'x', disabled: '' }),
                  // @ts-ignore
                  h(DropdownItem, { content: 'Y', value: 'y', active: '' }),
                  // @ts-ignore
                  h(DropdownItem, { content: 'Z', value: 'z', divider: '' }),
                ] as any
              }
            />
          ),
        },
      });

      await nextTick();
      expect(wrapper.exists()).toBe(true);
      querySpy.mockRestore();
    });
  });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('options')[0].children[0].children).toHaveLength(1);
    });
  });

  // 测试 dropdown.tsx 中未覆盖的代码路径
  describe('dropdown component edge cases', () => {
    it('handles component without slots', () => {
      const wrapper = mount(Dropdown, {
        props: {
          options: [{ content: 'Option 1', value: '1' }],
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it('handles component with only default slot', () => {
      const wrapper = mount(Dropdown, {
        props: {
          options: [{ content: 'Option 1', value: '1' }],
        },
        slots: {
          default: () => <button>Only Trigger</button>,
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('button').text()).toBe('Only Trigger');
    });

    it('handles component with both slots', () => {
      const wrapper = mount(Dropdown, {
        props: {
          options: [{ content: 'Option 1', value: '1' }],
        },
        slots: {
          default: () => <button>Trigger</button>,
          dropdown: () => <DropdownMenu options={[{ content: 'Custom Option', value: 'custom' }]} />,
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('button').text()).toBe('Trigger');
    });

    it('handles disabled state', () => {
      const wrapper = mount(Dropdown, {
        props: {
          disabled: true,
          options: [{ content: 'Option 1', value: '1' }],
        },
        slots: {
          default: () => <button>Disabled Trigger</button>,
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('disabled')).toBe(true);
    });

    it('handles different trigger types', () => {
      const triggers = ['hover', 'click', 'focus', 'context-menu'] as const;
      
      triggers.forEach(trigger => {
        const wrapper = mount(Dropdown, {
          props: {
            trigger,
            options: [{ content: 'Option 1', value: '1' }],
          },
          slots: {
            default: () => <button>Trigger</button>,
          },
        });

        expect(wrapper.exists()).toBe(true);
        expect(wrapper.props('trigger')).toBe(trigger);
      });
    });

    it('handles different placement options', () => {
      const placements = [
        'top',
        'top-left',
        'top-right',
        'bottom',
        'bottom-left',
        'bottom-right',
        'left',
        'left-top',
        'left-bottom',
        'right',
        'right-top',
        'right-bottom',
      ] as const;
      
      placements.forEach(placement => {
        const wrapper = mount(Dropdown, {
          props: {
            placement,
            options: [{ content: 'Option 1', value: '1' }],
          },
          slots: {
            default: () => <button>Trigger</button>,
          },
        });

        expect(wrapper.exists()).toBe(true);
        expect(wrapper.props('placement')).toBe(placement);
      });
    });
  });

  // 测试 dropdown-menu.tsx 中未覆盖的代码路径
  describe('dropdown menu edge cases', () => {
    it('handles menu without maxHeight constraint', async () => {
      const querySpy = vi.spyOn(document, 'querySelector').mockReturnValue({ scrollHeight: 100 } as any);

      const wrapper = mount(DropdownMenu, {
        props: {
          options: [
            { content: 'Option 1', value: '1' },
            { content: 'Option 2', value: '2' },
          ],
          // 不设置 maxHeight
        },
      });

      expect(wrapper.exists()).toBe(true);
      await nextTick();
      // 默认值应为 300
      expect(wrapper.props('maxHeight')).toBe(300);

      querySpy.mockRestore();
    });

    it('handles menu with zero maxHeight', async () => {
      const querySpy = vi.spyOn(document, 'querySelector').mockReturnValue({ scrollHeight: 100 } as any);

      const wrapper = mount(DropdownMenu, {
        props: {
          options: [{ content: 'Option 1', value: '1' }],
          maxHeight: 0,
        },
      });

      expect(wrapper.exists()).toBe(true);
      await nextTick();
      expect(wrapper.props('maxHeight')).toBe(0);

      querySpy.mockRestore();
    });

    it('handles menu direction changes', async () => {
      const querySpy = vi.spyOn(document, 'querySelector').mockReturnValue({ scrollHeight: 100 } as any);

      const wrapper = mount(DropdownMenu, {
        props: {
          options: [{ content: 'Option 1', value: '1' }],
          direction: 'left',
        },
      });

      await nextTick();
      expect(wrapper.props('direction')).toBe('left');

      // 改变方向
      await wrapper.setProps({ direction: 'right' });
      expect(wrapper.props('direction')).toBe('right');

      querySpy.mockRestore();
    });

    it('handles column width constraints', async () => {
      const querySpy = vi.spyOn(document, 'querySelector').mockReturnValue({ scrollHeight: 100 } as any);

      const wrapper = mount(DropdownMenu, {
        props: {
          options: [{ content: 'Very Long Option Text That Might Need Width Constraints', value: '1' }],
          maxColumnWidth: 150,
          minColumnWidth: 80,
        },
      });

      expect(wrapper.exists()).toBe(true);
      await nextTick();
      expect(wrapper.props('maxColumnWidth')).toBe(150);
      expect(wrapper.props('minColumnWidth')).toBe(80);

      querySpy.mockRestore();
    });
  });

  // 测试事件处理的边界情况
  describe('event handling edge cases', () => {
    it('handles onClick without event handler', async () => {
      const wrapper = mount(Dropdown, {
        props: {
          options: [{ content: 'Option 1', value: '1' }],
        },
        slots: {
          default: () => <button>Trigger</button>,
        },
      });

      expect(wrapper.exists()).toBe(true);
      
      // 触发点击事件，即使没有处理器也不应该报错
      const button = wrapper.find('button');
      await button.trigger('click');
      
      expect(wrapper.exists()).toBe(true);
    });

    it('handles multiple event handlers', async () => {
      const onClickSpy = vi.fn();
      const onVisibleChangeSpy = vi.fn();

      const wrapper = mount(Dropdown, {
        props: {
          options: [{ content: 'Option 1', value: '1' }],
          onClick: onClickSpy,
          'onVisible-change': onVisibleChangeSpy,
        },
        slots: {
          default: () => <button>Trigger</button>,
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(typeof wrapper.props('onClick')).toBe('function');
    });
  });

  // 测试组件生命周期相关
  describe('component lifecycle', () => {
    it('handles component mount and unmount', async () => {
      const wrapper = mount(Dropdown, {
        props: {
          options: [{ content: 'Option 1', value: '1' }],
        },
        slots: {
          default: () => <button>Trigger</button>,
        },
      });

      expect(wrapper.exists()).toBe(true);
      
      // 卸载组件
      wrapper.unmount();
      
      // 验证组件已卸载
      expect(wrapper.exists()).toBe(false);
    });

    it('handles props updates during lifecycle', async () => {
      const wrapper = mount(Dropdown, {
        props: {
          options: [{ content: 'Option 1', value: '1' }],
          disabled: false,
        },
        slots: {
          default: () => <button>Trigger</button>,
        },
      });

      expect(wrapper.props('disabled')).toBe(false);

      // 更新 props
      await wrapper.setProps({ disabled: true });
      expect(wrapper.props('disabled')).toBe(true);

      // 再次更新 options
      await wrapper.setProps({
        options: [
          { content: 'Option 1', value: '1' },
          { content: 'Option 2', value: '2' },
        ],
      });
      
      expect(wrapper.props('options')).toHaveLength(2);
    });
  });
});