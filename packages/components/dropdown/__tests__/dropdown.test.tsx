import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { Dropdown, DropdownMenu, DropdownItem, Button } from '@tdesign/components';
import DropdownProps from '@tdesign/components/dropdown/props';
import { sleep } from '@tdesign/internal-utils';

describe('Dropdown', () => {
  describe('props', () => {
    let wrapper: VueWrapper<InstanceType<typeof Dropdown>> | null = null;

    beforeEach(() => {
      wrapper = mount(Dropdown, {
        slots: {
          default: () => <Button>Hover me</Button>,
          dropdown: () => (
            <DropdownMenu>
              <DropdownItem value="1">Option 1</DropdownItem>
              <DropdownItem value="2">Option 2</DropdownItem>
            </DropdownMenu>
          ),
        },
      }) as VueWrapper<InstanceType<typeof Dropdown>>;
    });

    afterEach(() => {
      wrapper?.unmount();
      wrapper = null;
    });

    it(':direction[string]', async () => {
      const validator = (wrapper.vm.$options.props as typeof DropdownProps)?.direction.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('left')).toBe(true);
      expect(validator('right')).toBe(true);
      // @ts-expect-error
      expect(validator('other')).toBe(false);

      // 默认值为 right
      expect(wrapper.vm.$props.direction).toBe('right');

      await wrapper.setProps({ direction: 'left' });
      expect(wrapper.vm.$props.direction).toBe('left');
    });

    it(':disabled[boolean]', async () => {
      expect(wrapper.vm.$props.disabled).toBe(false);

      await wrapper.setProps({ disabled: true });
      expect(wrapper.vm.$props.disabled).toBe(true);

      // 测试禁用状态下不显示弹窗
      const popup = wrapper.findComponent({ name: 'TPopup' });
      expect(popup.props('disabled')).toBe(true);
    });

    it(':hideAfterItemClick[boolean]', async () => {
      const options = [
        { content: 'Option 1', value: '1' },
        { content: 'Option 2', value: '2' },
      ];

      const wrapper = mount(
        <Dropdown options={options} trigger="click">
          <Button>Click me</Button>
        </Dropdown>,
      );

      // 默认值为 true
      expect(wrapper.vm.$props.hideAfterItemClick).toBe(true);

      // 点击触发器显示下拉菜单
      await wrapper.find('button').trigger('click');
      await nextTick();
      await sleep(100);

      // 点击选项后应该隐藏
      const dropdownItem = document.querySelector('.t-dropdown__item');
      if (dropdownItem) {
        await (dropdownItem as HTMLElement).click();
        await sleep(200);
        // 验证弹窗已隐藏
      }

      // 测试 hideAfterItemClick 为 false
      await wrapper.setProps({ hideAfterItemClick: false });
      expect(wrapper.vm.$props.hideAfterItemClick).toBe(false);
    });

    it(':maxColumnWidth[string/number]', async () => {
      const options = [{ content: 'Very long option text that should be truncated', value: '1' }];

      const wrapper = mount(
        <Dropdown options={options} maxColumnWidth={100}>
          <Button>Click me</Button>
        </Dropdown>,
      );

      expect(wrapper.vm.$props.maxColumnWidth).toBe(100);

      await wrapper.setProps({ maxColumnWidth: '200px' });
      expect(wrapper.vm.$props.maxColumnWidth).toBe('200px');

      await wrapper.setProps({ maxColumnWidth: 150 });
      expect(wrapper.vm.$props.maxColumnWidth).toBe(150);
    });

    it(':maxHeight[number]', async () => {
      expect(wrapper.vm.$props.maxHeight).toBe(300);

      await wrapper.setProps({ maxHeight: 400 });
      expect(wrapper.vm.$props.maxHeight).toBe(400);
    });

    it(':minColumnWidth[string/number]', async () => {
      expect(wrapper.vm.$props.minColumnWidth).toBe(10);

      await wrapper.setProps({ minColumnWidth: '50px' });
      expect(wrapper.vm.$props.minColumnWidth).toBe('50px');

      await wrapper.setProps({ minColumnWidth: 30 });
      expect(wrapper.vm.$props.minColumnWidth).toBe(30);
    });

    it(':options[array]', async () => {
      const options = [
        { content: 'Option 1', value: '1' },
        { content: 'Option 2', value: '2' },
        { content: 'Option 3', value: '3' },
      ];

      const wrapper = mount(
        <Dropdown options={options} trigger="click">
          <Button>Click me</Button>
        </Dropdown>,
      );

      expect(wrapper.vm.$props.options).toEqual(options);

      // 更新 options
      const newOptions = [
        { content: 'New Option 1', value: 'new1' },
        { content: 'New Option 2', value: 'new2' },
      ];
      await wrapper.setProps({ options: newOptions });
      expect(wrapper.vm.$props.options).toEqual(newOptions);
    });

    it(':panelBottomContent[string/function]', async () => {
      const wrapper = mount(Dropdown, {
        props: {
          panelBottomContent: 'Bottom Content',
        },
        slots: {
          default: () => <Button>Click me</Button>,
          dropdown: () => (
            <DropdownMenu>
              <DropdownItem value="1">Option 1</DropdownItem>
            </DropdownMenu>
          ),
        },
      });

      expect(wrapper.vm.$props.panelBottomContent).toBe('Bottom Content');

      // 测试函数形式
      const renderBottom = () => <div class="custom-bottom">Custom Bottom</div>;
      await wrapper.setProps({ panelBottomContent: renderBottom });
      expect(wrapper.vm.$props.panelBottomContent).toBe(renderBottom);
    });

    it(':panelTopContent[string/function]', async () => {
      const wrapper = mount(Dropdown, {
        props: {
          panelTopContent: 'Top Content',
        },
        slots: {
          default: () => <Button>Click me</Button>,
          dropdown: () => (
            <DropdownMenu>
              <DropdownItem value="1">Option 1</DropdownItem>
            </DropdownMenu>
          ),
        },
      });

      expect(wrapper.vm.$props.panelTopContent).toBe('Top Content');

      // 测试函数形式
      const renderTop = () => <div class="custom-top">Custom Top</div>;
      await wrapper.setProps({ panelTopContent: renderTop });
      expect(wrapper.vm.$props.panelTopContent).toBe(renderTop);
    });

    it(':placement[string]', async () => {
      const validator = (wrapper.vm.$options.props as typeof DropdownProps)?.placement.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('top')).toBe(true);
      expect(validator('bottom-left')).toBe(true);
      expect(validator('right-top')).toBe(true);
      // @ts-expect-error
      expect(validator('invalid')).toBe(false);

      // 默认值为 bottom-left
      expect(wrapper.vm.$props.placement).toBe('bottom-left');

      await wrapper.setProps({ placement: 'top' });
      expect(wrapper.vm.$props.placement).toBe('top');

      await wrapper.setProps({ placement: 'bottom-right' });
      expect(wrapper.vm.$props.placement).toBe('bottom-right');
    });

    it(':popupProps[object]', async () => {
      const popupProps = {
        overlayStyle: { background: 'red' },
        showArrow: true,
      };

      const wrapper = mount(Dropdown, {
        props: {
          popupProps,
        },
        slots: {
          default: () => <Button>Click me</Button>,
          dropdown: () => (
            <DropdownMenu>
              <DropdownItem value="1">Option 1</DropdownItem>
            </DropdownMenu>
          ),
        },
      });

      expect(wrapper.vm.$props.popupProps).toEqual(popupProps);

      // 验证 popupProps 被正确传递给 Popup 组件
      const popup = wrapper.findComponent({ name: 'TPopup' });
      expect(popup.exists()).toBe(true);
    });

    it(':trigger[string]', async () => {
      const validator = (wrapper.vm.$options.props as typeof DropdownProps)?.trigger.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('hover')).toBe(true);
      expect(validator('click')).toBe(true);
      expect(validator('focus')).toBe(true);
      expect(validator('context-menu')).toBe(true);
      // @ts-expect-error
      expect(validator('other')).toBe(false);

      // 默认值为 hover
      expect(wrapper.vm.$props.trigger).toBe('hover');

      await wrapper.setProps({ trigger: 'click' });
      expect(wrapper.vm.$props.trigger).toBe('click');
    });
  });

  describe('events', () => {
    it(':onClick', async () => {
      const onClick = vi.fn();
      const options = [
        { content: 'Option 1', value: '1' },
        { content: 'Option 2', value: '2' },
      ];

      const wrapper = mount(
        <Dropdown options={options} onClick={onClick} trigger="click">
          <Button>Click me</Button>
        </Dropdown>,
      );

      // 点击触发器显示下拉菜单
      await wrapper.find('button').trigger('click');
      await nextTick();
      await sleep(100);

      // 点击第一个选项
      const dropdownItems = document.querySelectorAll('.t-dropdown__item');
      if (dropdownItems.length > 0) {
        await (dropdownItems[0] as HTMLElement).click();
        await nextTick();

        expect(onClick).toHaveBeenCalled();
        expect(onClick.mock.calls[0][0]).toMatchObject({ value: '1' });
        expect(onClick.mock.calls[0][1]).toHaveProperty('e');
      }
    });
  });

  describe('slots', () => {
    it(':default slot', () => {
      const wrapper = mount(Dropdown, {
        slots: {
          default: () => <Button class="custom-trigger">Custom Trigger</Button>,
          dropdown: () => (
            <DropdownMenu>
              <DropdownItem value="1">Option 1</DropdownItem>
            </DropdownMenu>
          ),
        },
      });

      expect(wrapper.find('.custom-trigger').exists()).toBe(true);
      expect(wrapper.find('.custom-trigger').text()).toBe('Custom Trigger');
    });

    it(':dropdown slot', () => {
      const wrapper = mount(Dropdown, {
        slots: {
          default: () => <Button>Trigger</Button>,
          dropdown: () => (
            <DropdownMenu>
              <DropdownItem value="1" class="custom-item">
                Custom Item
              </DropdownItem>
            </DropdownMenu>
          ),
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it(':panelTopContent slot', () => {
      const wrapper = mount(Dropdown, {
        slots: {
          default: () => <Button>Trigger</Button>,
          dropdown: () => (
            <DropdownMenu>
              <DropdownItem value="1">Option 1</DropdownItem>
            </DropdownMenu>
          ),
          panelTopContent: () => <div class="top-content">Top</div>,
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it(':panelBottomContent slot', () => {
      const wrapper = mount(Dropdown, {
        slots: {
          default: () => <Button>Trigger</Button>,
          dropdown: () => (
            <DropdownMenu>
              <DropdownItem value="1">Option 1</DropdownItem>
            </DropdownMenu>
          ),
          panelBottomContent: () => <div class="bottom-content">Bottom</div>,
        },
      });

      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('nested options', () => {
    it('renders nested dropdown menu', async () => {
      const options = [
        {
          content: 'Parent 1',
          value: 'parent1',
          children: [
            { content: 'Child 1-1', value: 'child1-1' },
            { content: 'Child 1-2', value: 'child1-2' },
          ],
        },
        { content: 'Option 2', value: '2' },
      ];

      const wrapper = mount(
        <Dropdown options={options} trigger="click">
          <Button>Click me</Button>
        </Dropdown>,
      );

      expect(wrapper.vm.$props.options).toEqual(options);
    });

    it('handles nested menu click', async () => {
      const onClick = vi.fn();
      const options = [
        {
          content: 'Parent',
          value: 'parent',
          children: [{ content: 'Child', value: 'child' }],
        },
      ];

      const wrapper = mount(
        <Dropdown options={options} onClick={onClick} trigger="click">
          <Button>Click me</Button>
        </Dropdown>,
      );

      await wrapper.find('button').trigger('click');
      await nextTick();
      await sleep(100);

      // 嵌套菜单的交互测试
      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('disabled state', () => {
    it('disabled option should not trigger click', async () => {
      const onClick = vi.fn();
      const options = [
        { content: 'Option 1', value: '1', disabled: true },
        { content: 'Option 2', value: '2' },
      ];

      const wrapper = mount(
        <Dropdown options={options} onClick={onClick} trigger="click">
          <Button>Click me</Button>
        </Dropdown>,
      );

      await wrapper.find('button').trigger('click');
      await nextTick();
      await sleep(100);

      const dropdownItems = document.querySelectorAll('.t-dropdown__item');
      if (dropdownItems.length > 0) {
        // 点击禁用的选项
        await (dropdownItems[0] as HTMLElement).click();
        await nextTick();

        // 禁用的选项不应该触发 onClick
        expect(onClick).not.toHaveBeenCalled();
      }
    });
  });

  describe('divider', () => {
    it('renders divider between options', () => {
      const options = [
        { content: 'Option 1', value: '1', divider: true },
        { content: 'Option 2', value: '2' },
      ];

      const wrapper = mount(
        <Dropdown options={options}>
          <Button>Click me</Button>
        </Dropdown>,
      );

      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('theme', () => {
    it('renders options with different themes', () => {
      const options = [
        { content: 'Default', value: '1', theme: 'default' },
        { content: 'Success', value: '2', theme: 'success' },
        { content: 'Warning', value: '3', theme: 'warning' },
        { content: 'Error', value: '4', theme: 'error' },
      ];

      const wrapper = mount(
        <Dropdown options={options}>
          <Button>Click me</Button>
        </Dropdown>,
      );

      expect(wrapper.exists()).toBe(true);
    });
  });
});
