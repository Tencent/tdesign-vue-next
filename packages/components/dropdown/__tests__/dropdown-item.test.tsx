import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { DropdownItem } from '@tdesign/components';
import DropdownItemProps from '@tdesign/components/dropdown/dropdown-item-props';
import { CheckCircleFilledIcon } from 'tdesign-icons-vue-next';

describe('DropdownItem', () => {
  describe('props', () => {
    it(':active[boolean]', () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          active: false,
        },
        slots: {
          default: () => 'Option 1',
        },
      });

      expect(wrapper.find('.t-dropdown__item--active').exists()).toBe(false);

      wrapper.unmount();

      const wrapperActive = mount(DropdownItem, {
        props: {
          value: '1',
          active: true,
        },
        slots: {
          default: () => 'Option 1',
        },
      });

      expect(wrapperActive.find('.t-dropdown__item--active').exists()).toBe(true);
    });

    it(':content[string]', () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          content: 'String Content',
        },
      });

      expect(wrapper.text()).toContain('String Content');
    });

    it(':content[function]', () => {
      const renderContent = () => <span class="custom-content">Custom Content</span>;
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          content: renderContent,
        },
      });

      expect(wrapper.find('.custom-content').exists()).toBe(true);
      expect(wrapper.find('.custom-content').text()).toBe('Custom Content');
    });

    it(':content[slot]', () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
        },
        slots: {
          default: () => 'Slot Content',
        },
      });

      expect(wrapper.text()).toContain('Slot Content');
    });

    it(':disabled[boolean]', async () => {
      const onClick = vi.fn();
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          disabled: false,
          onClick,
        },
        slots: {
          default: () => 'Option 1',
        },
      });

      expect(wrapper.find('.t-dropdown__item--disabled').exists()).toBe(false);

      await wrapper.trigger('click');
      expect(onClick).toHaveBeenCalled();

      wrapper.unmount();

      // 测试禁用状态
      onClick.mockClear();
      const wrapperDisabled = mount(DropdownItem, {
        props: {
          value: '1',
          disabled: true,
          onClick,
        },
        slots: {
          default: () => 'Option 1',
        },
      });

      expect(wrapperDisabled.find('.t-dropdown__item--disabled').exists()).toBe(true);

      await wrapperDisabled.trigger('click');
      expect(onClick).not.toHaveBeenCalled();
    });

    it(':divider[boolean]', () => {
      // divider 属性主要在 DropdownMenu 中处理
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          divider: true,
        },
        slots: {
          default: () => 'Option 1',
        },
      });

      expect(wrapper.props('divider')).toBe(true);
    });

    it(':prefixIcon[function]', () => {
      const renderIcon = () => <CheckCircleFilledIcon />;
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          prefixIcon: renderIcon,
        },
        slots: {
          default: () => 'Option with Icon',
        },
      });

      expect(wrapper.findComponent(CheckCircleFilledIcon).exists()).toBe(true);
    });

    it(':prefixIcon[slot]', () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          prefixIcon: () => <CheckCircleFilledIcon />,
        },
        slots: {
          default: () => 'Option with Icon',
        },
      });

      expect(wrapper.findComponent(CheckCircleFilledIcon).exists()).toBe(true);
    });

    it(':theme[string]', () => {
      const validator = (mount(DropdownItem).vm.$options.props as typeof DropdownItemProps)?.theme.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('default')).toBe(true);
      expect(validator('success')).toBe(true);
      expect(validator('warning')).toBe(true);
      expect(validator('error')).toBe(true);
      // @ts-expect-error
      expect(validator('other')).toBe(false);

      const wrapperDefault = mount(DropdownItem, {
        props: {
          value: '1',
          theme: 'default',
        },
        slots: {
          default: () => 'Default',
        },
      });
      expect(wrapperDefault.find('.t-dropdown__item--theme-default').exists()).toBe(true);

      const wrapperSuccess = mount(DropdownItem, {
        props: {
          value: '2',
          theme: 'success',
        },
        slots: {
          default: () => 'Success',
        },
      });
      expect(wrapperSuccess.find('.t-dropdown__item--theme-success').exists()).toBe(true);

      const wrapperWarning = mount(DropdownItem, {
        props: {
          value: '3',
          theme: 'warning',
        },
        slots: {
          default: () => 'Warning',
        },
      });
      expect(wrapperWarning.find('.t-dropdown__item--theme-warning').exists()).toBe(true);

      const wrapperError = mount(DropdownItem, {
        props: {
          value: '4',
          theme: 'error',
        },
        slots: {
          default: () => 'Error',
        },
      });
      expect(wrapperError.find('.t-dropdown__item--theme-error').exists()).toBe(true);
    });

    it(':value[string]', () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: 'string-value',
        },
        slots: {
          default: () => 'String Value',
        },
      });

      expect(wrapper.props('value')).toBe('string-value');
    });

    it(':value[number]', () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: 123,
        },
        slots: {
          default: () => 'Number Value',
        },
      });

      expect(wrapper.props('value')).toBe(123);
    });

    it(':value[object]', () => {
      const objectValue = { id: 1, name: 'test' };
      const wrapper = mount(DropdownItem, {
        props: {
          value: objectValue,
        },
        slots: {
          default: () => 'Object Value',
        },
      });

      expect(wrapper.props('value')).toEqual(objectValue);
    });

    it(':maxColumnWidth[string/number]', () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          maxColumnWidth: 200,
        },
        slots: {
          default: () => 'Option',
        },
      });

      expect(wrapper.props('maxColumnWidth')).toBe(200);

      wrapper.unmount();

      const wrapperString = mount(DropdownItem, {
        props: {
          value: '1',
          maxColumnWidth: '300px',
        },
        slots: {
          default: () => 'Option',
        },
      });

      expect(wrapperString.props('maxColumnWidth')).toBe('300px');
    });

    it(':minColumnWidth[string/number]', () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          minColumnWidth: 50,
        },
        slots: {
          default: () => 'Option',
        },
      });

      expect(wrapper.props('minColumnWidth')).toBe(50);

      wrapper.unmount();

      const wrapperString = mount(DropdownItem, {
        props: {
          value: '1',
          minColumnWidth: '100px',
        },
        slots: {
          default: () => 'Option',
        },
      });

      expect(wrapperString.props('minColumnWidth')).toBe('100px');
    });
  });

  describe('events', () => {
    it(':onClick', async () => {
      const onClick = vi.fn();
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          onClick,
        },
        slots: {
          default: () => 'Option 1',
        },
      });

      await wrapper.trigger('click');
      expect(onClick).toHaveBeenCalled();
      expect(onClick.mock.calls[0][0]).toBe('1');
      expect(onClick.mock.calls[0][1]).toHaveProperty('e');
    });

    it(':onClick with disabled', async () => {
      const onClick = vi.fn();
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          disabled: true,
          onClick,
        },
        slots: {
          default: () => 'Disabled Option',
        },
      });

      await wrapper.trigger('click');
      expect(onClick).not.toHaveBeenCalled();
    });

    it(':onClick with different value types', async () => {
      const onClick = vi.fn();

      // 测试字符串值
      const wrapperString = mount(DropdownItem, {
        props: {
          value: 'string-value',
          onClick,
        },
        slots: {
          default: () => 'String',
        },
      });
      await wrapperString.trigger('click');
      expect(onClick.mock.calls[0][0]).toBe('string-value');

      onClick.mockClear();

      // 测试数字值
      const wrapperNumber = mount(DropdownItem, {
        props: {
          value: 42,
          onClick,
        },
        slots: {
          default: () => 'Number',
        },
      });
      await wrapperNumber.trigger('click');
      expect(onClick.mock.calls[0][0]).toBe(42);

      onClick.mockClear();

      // 测试对象值
      const objectValue = { id: 1, name: 'test' };
      const wrapperObject = mount(DropdownItem, {
        props: {
          value: objectValue,
          onClick,
        },
        slots: {
          default: () => 'Object',
        },
      });
      await wrapperObject.trigger('click');
      expect(onClick.mock.calls[0][0]).toEqual(objectValue);
    });
  });

  describe('render', () => {
    it('renders correctly with default props', () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
        },
        slots: {
          default: () => 'Option 1',
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.element.tagName).toBe('LI');
      expect(wrapper.find('.t-dropdown__item').exists()).toBe(true);
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

    it('renders content correctly', () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          content: 'Prop Content',
        },
      });

      expect(wrapper.text()).toContain('Prop Content');

      wrapper.unmount();

      const wrapperSlot = mount(DropdownItem, {
        props: {
          value: '1',
        },
        slots: {
          default: () => 'Slot Content',
        },
      });

      expect(wrapperSlot.text()).toContain('Slot Content');
    });

    it('renders with icon', () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          prefixIcon: () => <CheckCircleFilledIcon />,
        },
        slots: {
          default: () => 'Option with Icon',
        },
      });

      expect(wrapper.find('.t-dropdown__item-icon').exists()).toBe(true);
      expect(wrapper.findComponent(CheckCircleFilledIcon).exists()).toBe(true);
    });
  });

  describe('style', () => {
    it('applies maxColumnWidth style', () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          maxColumnWidth: 200,
        },
        slots: {
          default: () => 'Option',
        },
      });

      const element = wrapper.element as HTMLElement;
      expect(element.style.maxWidth).toBe('200px');
    });

    it('applies minColumnWidth style', () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          minColumnWidth: 50,
        },
        slots: {
          default: () => 'Option',
        },
      });

      const element = wrapper.element as HTMLElement;
      expect(element.style.minWidth).toBe('50px');
    });

    it('applies both width constraints', () => {
      const wrapper = mount(DropdownItem, {
        props: {
          value: '1',
          minColumnWidth: 50,
          maxColumnWidth: 200,
        },
        slots: {
          default: () => 'Option',
        },
      });

      const element = wrapper.element as HTMLElement;
      expect(element.style.minWidth).toBe('50px');
      expect(element.style.maxWidth).toBe('200px');
    });
  });
});
