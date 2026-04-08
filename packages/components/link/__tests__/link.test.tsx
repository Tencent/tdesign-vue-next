import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { Link } from '@tdesign/components';
import linkProps from '@tdesign/components/link/props';
import { JumpIcon } from 'tdesign-icons-vue-next';

describe('Link', () => {
  describe('props', () => {
    let wrapper!: VueWrapper<InstanceType<typeof Link>>;

    beforeEach(() => {
      wrapper = mount(<Link>链接</Link>) as VueWrapper<InstanceType<typeof Link>>;
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it(':content[string]', async () => {
      const wrapperContent = mount(<Link content="内容文本" />);
      expect(wrapperContent.text()).toBe('内容文本');
      wrapperContent.unmount();
    });

    it(':content[slot/function]', () => {
      // Function
      const wrapperFn = mount(<Link content={() => <span class="fn-content">函数内容</span>} />);
      expect(wrapperFn.find('.fn-content').exists()).toBe(true);
      expect(wrapperFn.find('.fn-content').text()).toBe('函数内容');
      wrapperFn.unmount();

      // Slot
      const wrapperSlot = mount(<Link v-slots={{ content: () => <span class="slot-content">插槽</span> }} />);
      expect(wrapperSlot.find('.slot-content').exists()).toBe(true);
      expect(wrapperSlot.find('.slot-content').text()).toBe('插槽');
      wrapperSlot.unmount();
    });

    it(':default[string]', () => {
      // default prop as string
      const wrapperDefault = mount(<Link default="默认内容" />);
      expect(wrapperDefault.text()).toBe('默认内容');
      wrapperDefault.unmount();
    });

    it(':default[slot]', () => {
      expect(wrapper.text()).toBe('链接');
    });

    it(':disabled[boolean]', async () => {
      expect(wrapper.classes()).not.toContain('t-is-disabled');
      expect(wrapper.classes()).toContain('t-link--hover-underline');

      await wrapper.setProps({ disabled: true });
      expect(wrapper.classes()).toContain('t-is-disabled');
      expect(wrapper.classes()).not.toContain('t-link--hover-underline');
      expect(wrapper.classes()).not.toContain('t-link--hover-color');

      await wrapper.setProps({ disabled: true, href: 'https://example.com' });
      expect(wrapper.attributes('href')).toBeUndefined();
    });

    it(':download[string/boolean]', async () => {
      expect(wrapper.attributes('download')).toBeUndefined();

      await wrapper.setProps({ download: true });
      expect(wrapper.attributes('download')).toBe('true');

      await wrapper.setProps({ download: 'file.pdf' });
      expect(wrapper.attributes('download')).toBe('file.pdf');

      await wrapper.setProps({ download: false });
      expect(wrapper.attributes('download')).toBeUndefined();
    });

    it(':hover[color/underline]', async () => {
      expect(wrapper.classes()).toContain('t-link--hover-underline');

      await wrapper.setProps({ hover: 'color' });
      expect(wrapper.classes()).toContain('t-link--hover-color');
      expect(wrapper.classes()).not.toContain('t-link--hover-underline');
    });

    it(':hover validator', () => {
      const validator = linkProps.hover.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('color')).toBe(true);
      expect(validator('underline')).toBe(true);
      // @ts-expect-error
      expect(validator('invalid')).toBe(false);
    });

    it(':href[string]', async () => {
      expect(wrapper.attributes('href')).toBeUndefined();

      await wrapper.setProps({ href: 'https://tdesign.tencent.com' });
      expect(wrapper.attributes('href')).toBe('https://tdesign.tencent.com');
    });

    it(':prefixIcon[function]', () => {
      const wrapperIcon = mount(<Link prefixIcon={() => <JumpIcon />}>链接</Link>);
      expect(wrapperIcon.find('.t-link__prefix-icon').exists()).toBe(true);
      expect(wrapperIcon.findComponent(JumpIcon).exists()).toBe(true);
      wrapperIcon.unmount();
    });

    it(':prefixIcon[slot]', () => {
      const wrapperSlot = mount(<Link v-slots={{ prefixIcon: () => <span class="custom-prefix">P</span> }}>链接</Link>);
      expect(wrapperSlot.find('.t-link__prefix-icon').exists()).toBe(true);
      expect(wrapperSlot.find('.custom-prefix').text()).toBe('P');
      wrapperSlot.unmount();
    });

    it(':size[small/medium/large]', async () => {
      expect(wrapper.classes()).not.toContain('t-size-s');
      expect(wrapper.classes()).not.toContain('t-size-l');

      await wrapper.setProps({ size: 'small' });
      expect(wrapper.classes()).toContain('t-size-s');

      await wrapper.setProps({ size: 'large' });
      expect(wrapper.classes()).toContain('t-size-l');
      expect(wrapper.classes()).not.toContain('t-size-s');
    });

    it(':size validator', () => {
      const validator = linkProps.size.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('small')).toBe(true);
      expect(validator('medium')).toBe(true);
      expect(validator('large')).toBe(true);
      // @ts-expect-error
      expect(validator('invalid')).toBe(false);
    });

    it(':suffixIcon[function]', () => {
      const wrapperIcon = mount(<Link suffixIcon={() => <JumpIcon />}>链接</Link>);
      expect(wrapperIcon.find('.t-link__suffix-icon').exists()).toBe(true);
      expect(wrapperIcon.findComponent(JumpIcon).exists()).toBe(true);
      wrapperIcon.unmount();
    });

    it(':suffixIcon[slot]', () => {
      const wrapperSlot = mount(<Link v-slots={{ suffixIcon: () => <span class="custom-suffix">S</span> }}>链接</Link>);
      expect(wrapperSlot.find('.t-link__suffix-icon').exists()).toBe(true);
      expect(wrapperSlot.find('.custom-suffix').text()).toBe('S');
      wrapperSlot.unmount();
    });

    it(':target[string]', async () => {
      expect(wrapper.attributes('target')).toBeUndefined();

      await wrapper.setProps({ target: '_blank' });
      expect(wrapper.attributes('target')).toBe('_blank');

      await wrapper.setProps({ target: '_self' });
      expect(wrapper.attributes('target')).toBe('_self');
    });

    it(':theme[default/primary/danger/warning/success]', async () => {
      expect(wrapper.classes()).toContain('t-link--theme-default');

      for (const theme of ['primary', 'danger', 'warning', 'success'] as const) {
        await wrapper.setProps({ theme });
        await nextTick();
        expect(wrapper.classes()).toContain(`t-link--theme-${theme}`);
      }
    });

    it(':theme validator', () => {
      const validator = linkProps.theme.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('default')).toBe(true);
      expect(validator('primary')).toBe(true);
      expect(validator('danger')).toBe(true);
      expect(validator('warning')).toBe(true);
      expect(validator('success')).toBe(true);
      // @ts-expect-error
      expect(validator('invalid')).toBe(false);
    });

    it(':underline[boolean]', async () => {
      expect(wrapper.classes()).not.toContain('t-is-underline');

      await wrapper.setProps({ underline: true });
      expect(wrapper.classes()).toContain('t-is-underline');

      await wrapper.setProps({ underline: false });
      expect(wrapper.classes()).not.toContain('t-is-underline');
    });
  });

  describe('events', () => {
    it('onClick', async () => {
      const onClick = vi.fn();
      const wrapperClick = mount(<Link onClick={onClick}>链接</Link>);

      await wrapperClick.trigger('click');
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick.mock.calls[0][0]).toBeInstanceOf(MouseEvent);
      wrapperClick.unmount();
    });

    it('onClick disabled — does not trigger', async () => {
      const onClick = vi.fn();
      const wrapperDisabled = mount(
        <Link disabled onClick={onClick}>
          链接
        </Link>,
      );

      await wrapperDisabled.trigger('click');
      expect(onClick).not.toHaveBeenCalled();
      wrapperDisabled.unmount();
    });
  });

  describe('edge cases', () => {
    it('renders as <a> tag', () => {
      const wrapper = mount(<Link>链接</Link>);
      expect(wrapper.element.tagName).toBe('A');
      wrapper.unmount();
    });

    it('no prefixIcon/suffixIcon by default', () => {
      const wrapper = mount(<Link>链接</Link>);
      expect(wrapper.find('.t-link__prefix-icon').exists()).toBe(false);
      expect(wrapper.find('.t-link__suffix-icon').exists()).toBe(false);
      wrapper.unmount();
    });

    it('both prefixIcon and suffixIcon together', () => {
      const wrapper = mount(
        <Link prefixIcon={() => <span>P</span>} suffixIcon={() => <span>S</span>}>
          链接
        </Link>,
      );
      expect(wrapper.find('.t-link__prefix-icon').exists()).toBe(true);
      expect(wrapper.find('.t-link__suffix-icon').exists()).toBe(true);
      expect(wrapper.text()).toContain('链接');
      wrapper.unmount();
    });

    it('disabled with href does not render href attribute', () => {
      const wrapper = mount(
        <Link disabled href="https://example.com">
          链接
        </Link>,
      );
      expect(wrapper.attributes('href')).toBeUndefined();
      wrapper.unmount();
    });

    it('default slot takes priority over content prop', () => {
      const wrapper = mount(<Link content="content文本" v-slots={{ default: () => '默认插槽' }} />);
      expect(wrapper.text()).toBe('默认插槽');
      wrapper.unmount();
    });
  });
});
