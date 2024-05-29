import { nextTick, ref } from '@td/adapter-vue';
import { mount } from '@vue/test-utils';
import { expect, it, vi } from 'vitest';
import { AppIcon, CloseCircleFilledIcon, ScanIcon } from 'tdesign-icons-vue-next';
import { Input } from 'tdesign-vue-next';

const alignList = ['left', 'center', 'right'];
const sizeList = ['small', 'large'];
const statusList = ['success', 'warning', 'error'];

describe('input', () => {
  describe(':props', () => {
    it('', () => {
      const wrapper = mount(() => <Input />);
      expect(wrapper.find('.t-input').exists()).toBeTruthy();
      expect(wrapper.find('.t-input input').exists()).toBeTruthy();
    });
    it(':align', () => {
      alignList.forEach(async (align) => {
        const wrapper = mount(() => <Input align={align} />);
        await nextTick();
        expect(wrapper.find(`t-align-${align}`)).toBeTruthy();
      });
    });
    it(':autofocus', async () => {
      const wrapper = mount(() => <Input autofocus />);
      const input = wrapper.find('.t-input input');
      await nextTick();
      expect(input.element.focus).toBeTruthy();
    });
    it(':autocomplete', async () => {
      const wrapper = mount(() => <Input autocomplete="On" />);
      const input = wrapper.find('.t-input input');
      expect(input.element.getAttribute('autocomplete')).toBe('On');
    });
    it(':autoWidth', async () => {
      const wrapper = mount(() => <Input autoWidth />);
      expect(wrapper.classes()).toContain('t-input--auto-width');
    });
    it(':placeholder', async () => {
      const wrapper = mount(() => <Input placeholder="请输入" />);
      const input = wrapper.find('.t-input input');
      expect(input.element.getAttribute('placeholder')).toBe('请输入');
    });
    it(':disabled', async () => {
      const wrapper = mount(() => <Input disabled />);
      const input = wrapper.find('.t-input');
      expect(input.classes()).toContain('t-is-disabled');
    });
    it(':inputClass', async () => {
      const wrapper = mount(() => <Input inputClass="inputClass" />);
      const input = wrapper.find('.t-input');
      expect(input.classes()).toContain('inputClass');
    });
    it(':label', async () => {
      const wrapper = mount(() => <Input label="label" />);
      const label = wrapper.find('.t-input__prefix');
      expect(label.exists()).toBeTruthy();
      expect(label.text()).toBe('label');
    });
    it(':value', async () => {
      const value = '123';
      const wrapper = mount(() => <Input v-model={value} />);
      const input = wrapper.find('.t-input input');
      expect(input.element.value).toBe('123');
    });
    it(':defaultValue', async () => {
      const wrapper = mount(() => <Input defaultValue="123" />);
      const input = wrapper.find('.t-input input');
      expect(input.element.value).toBe('123');
    });
    it(':clearable', async () => {
      const wrapper = mount(() => <Input defaultValue="123" clearable />);
      const input = wrapper.find('.t-input');
      input.trigger('mouseenter');
      await nextTick();
      const closeIcon = wrapper.findComponent(CloseCircleFilledIcon);
      expect(closeIcon.exists()).toBeTruthy();
    });
    it(':maxlength', async () => {
      const wrapper = mount(() => <Input label="标题" maxlength={10} />);
      const input = wrapper.find('.t-input input');
      expect(input.element.getAttribute('maxlength')).toBe('10');
    });
    it(':maxcharacter', async () => {
      const value = ref('12345');
      const wrapper = mount(() => <Input label="标题" v-model={value.value} maxcharacter={5} />);
      const input = wrapper.find('.t-input input');
      value.value = '123456';
      expect(input.element.value).toBe('12345');
    });
    it(':readonly', async () => {
      const value = ref('123');
      const wrapper = mount(() => <Input readonly v-model={value.value} />);
      const input = wrapper.find('.t-input input');
      value.value = '123123';
      expect(input.element.value).toBe('123');
    });
    it(':showClearIconOnEmpty', async () => {
      const wrapper = mount(() => <Input showClearIconOnEmpty />);
      const input = wrapper.find('.t-input');
      input.trigger('mouseenter');
      await nextTick();
      const closeIcon = wrapper.findComponent(CloseCircleFilledIcon);
      expect(closeIcon.exists()).toBeTruthy();
    });
    it(':showLimitNumber', async () => {
      const wrapper = mount(() => <Input showLimitNumber maxlength={10} />);
      const number = wrapper.find('.t-input__limit-number');
      expect(number.exists()).toBeTruthy();
      expect(number.text()).toBe('0/10');
    });
    it(':size', async () => {
      sizeList.forEach((size) => {
        const wrapper = mount(() => <Input size={size} />);
        const input = wrapper.find('.t-input');
        expect(input.classes()).toContain(`t-size-${size.slice(0, 1)}`);
      });
    });
    it(':status', async () => {
      statusList.forEach((status) => {
        const wrapper = mount(() => <Input status={status} />);
        const input = wrapper.find('.t-input');
        expect(input.classes()).toContain(`t-is-${status}`);
      });
    });
    it(':tips', async () => {
      const wrapper = mount(() => <Input tips="tips" />);
      const tips = wrapper.find('.t-input__tips');
      expect(tips.exists()).toBeTruthy();
      expect(tips.text()).toBe('tips');
    });
    it(':type', async () => {
      const wrapper = mount(() => <Input type="url" />);
      const input = wrapper.find('.t-input input');
      expect(input.element.getAttribute('type')).toBe('url');
    });
    it(':name', async () => {
      const wrapper = mount(() => <Input name="name" />);
      const input = wrapper.find('.t-input input');
      expect(input.element.getAttribute('name')).toBe('name');
    });
    it(':suffix', async () => {
      const wrapper = mount(() => <Input suffix="suffix" />);
      const suffix = wrapper.find('.t-input__suffix');
      expect(suffix.exists()).toBeTruthy();
      expect(suffix.text()).toBe('suffix');
    });
  });

  describe(':slots', () => {
    it(':icon', () => {
      const slots = {
        suffixIcon: () => <AppIcon />,
        prefixIcon: () => <ScanIcon />,
      };
      const wrapper = mount(() => <Input v-slots={slots} />);
      const suffix = wrapper.find('.t-input__suffix');
      expect(suffix.exists()).toBeTruthy();
      expect(suffix.findComponent(AppIcon)).toBeTruthy();
      const prefix = wrapper.find('.t-input__prefix');
      expect(prefix.exists()).toBeTruthy();
      expect(prefix.findComponent(ScanIcon)).toBeTruthy();
    });
  });

  describe(':event', () => {
    it(':onBlur', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <Input onBlur={fn} />);
      const input = wrapper.find('.t-input input');
      await input.trigger('blur');
      expect(fn).toBeCalled();
    });

    it(':onFocus', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <Input onFocus={fn} />);
      const input = wrapper.find('.t-input input');
      await input.trigger('focus');
      expect(fn).toBeCalled();
    });

    it(':onEnter', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <Input onEnter={fn} />);
      const input = wrapper.find('.t-input input');
      await input.trigger('keydown', { code: 'Enter' });
      await nextTick();
      expect(fn).toBeCalled();
    });
    it(':onKeydown', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <Input onKeydown={fn} />);
      const input = wrapper.find('.t-input input');
      await input.trigger('keydown');
      expect(fn).toBeCalled();
    });
    it(':onPaste', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <Input onPaste={fn} />);
      const input = wrapper.find('.t-input input');
      await input.trigger('paste');
      expect(fn).toBeCalled();
    });
    it(':onKeypress', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <Input onKeypress={fn} />);
      const input = wrapper.find('.t-input input');
      await input.trigger('keypress');
      expect(fn).toBeCalled();
    });
    it(':onKeyup', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <Input onKeyup={fn} />);
      const input = wrapper.find('.t-input input');
      await input.trigger('keyup');
      expect(fn).toBeCalled();
    });
    it(':onMouseenter', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <Input onMouseenter={fn} />);
      const input = wrapper.find('.t-input');
      await input.trigger('mouseenter');
      await nextTick();
      expect(fn).toBeCalled();
    });
    it(':onMouseleave', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <Input onMouseleave={fn} />);
      const input = wrapper.find('.t-input');
      await input.trigger('mouseleave');
      await nextTick();
      expect(fn).toBeCalled();
    });
    it(':onWheel', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <Input onWheel={fn} />);
      const input = wrapper.find('.t-input');
      await input.trigger('wheel');
      await nextTick();
      expect(fn).toBeCalled();
    });
    it(':onCompositionstart', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <Input onCompositionstart={fn} />);
      const input = wrapper.find('.t-input input');
      await input.trigger('compositionstart');
      expect(fn).toBeCalled();
    });
    it(':onCompositionend', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <Input onCompositionend={fn} />);
      const input = wrapper.find('.t-input input');
      await input.trigger('compositionend');
      expect(fn).toBeCalled();
    });
    it(':onValidate', async () => {
      const fn = vi.fn();
      const value = '123';
      mount(() => <Input v-model={value} maxlength={2} allowInputOverMax={true} onValidate={fn} />);
      expect(fn).toBeCalled();
    });
    it(':onClear', async () => {
      const fn = vi.fn();
      const value = ref('123');
      const wrapper = mount(() => <Input v-model={value.value} clearable onClear={fn} />);
      const input = wrapper.find('.t-input');
      input.trigger('mouseenter');
      await nextTick();
      const closeIcon = wrapper.findComponent(CloseCircleFilledIcon);
      await closeIcon.trigger('click');
      expect(fn).toBeCalled();
      expect(value.value).toBe('');
    });
    it(':onChange', async () => {
      const data = ref('');
      const value = ref('');
      const handleChange = (val) => {
        value.value = val;
      };
      const wrapper = mount(<Input v-model={data.value} onChange={handleChange} />);
      const el = wrapper.find('.t-input__wrap input').element;
      await nextTick();
      const simulateEvent = (text, event) => {
        el.value = text;
        el.dispatchEvent(new Event(event));
      };
      simulateEvent('2', 'input');
      await nextTick();
      expect(value.value).toBe('2');
    });
  });
});
