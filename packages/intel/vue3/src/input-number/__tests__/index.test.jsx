import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { nextTick, ref } from '@td/adapter-vue';
import { InputNumber } from 'tdesign-vue-next';

describe('inputNumber', () => {
  describe(':props', () => {
    it(':align', () => {
      const alignList = ['center', 'right'];
      alignList.forEach((align) => {
        const wrapper = mount(() => <InputNumber align={align} />);
        const input = wrapper.find('.t-input');
        expect(input.classes()).toContain(`t-align-${align}`);
      });
    });

    it(':autoWidth', () => {
      const wrapper = mount(() => <InputNumber autoWidth />);
      const input = wrapper.find('.t-input__wrap');
      expect(input.classes()).toContain('t-input--auto-width');
    });

    it(':decimalPlaces', () => {
      const value = ref('100');
      const wrapper = mount(() => <InputNumber v-model={value.value} decimalPlaces={2} />);
      const input = wrapper.find('.t-input input');
      expect(input.element.value).toBe('100.00');
    });

    it(':disabled', () => {
      const wrapper = mount(() => <InputNumber disabled />);
      const container = wrapper.find('.t-input-number');
      const input = wrapper.find('.t-input');
      const btns = wrapper.findAll('button');
      expect(input.classes()).toContain('t-is-disabled');
      expect(container.classes()).toContain('t-is-disabled');
      expect(btns[0].classes()).toContain('t-is-disabled');
      expect(btns[1].classes()).toContain('t-is-disabled');
    });

    it(':label', () => {
      const wrapper = mount(() => <InputNumber label="label" />);
      const label = wrapper.find('.t-input .t-input__prefix');
      expect(label.exists()).toBeTruthy();
      expect(label.text()).toBe('label');
    });

    it(':largeNumber', () => {
      const value = ref('19999999999999999');
      const wrapper = mount(() => <InputNumber v-model={value.value} largeNumber />);
      const input = wrapper.find('.t-input input');
      expect(input.element.value).toBe('19999999999999999');
    });

    it(':max', () => {
      const value1 = ref(99);
      const wrapper1 = mount(() => <InputNumber v-model={value1.value} max={99} />);
      const [, btn1] = wrapper1.findAll('button');
      expect(btn1.classes()).toContain('t-is-disabled');
      const value2 = ref(100);
      const wrapper2 = mount(() => <InputNumber v-model={value2.value} max={99} />);
      const [, btn2] = wrapper1.findAll('button');
      expect(wrapper2.find('.t-input').classes()).toContain('t-is-error');
      expect(btn2.classes()).toContain('t-is-disabled');
    });

    it(':min', () => {
      const value1 = ref(98);
      const wrapper1 = mount(() => <InputNumber v-model={value1.value} min={99} />);
      const [btn1] = wrapper1.findAll('button');
      expect(btn1.classes()).toContain('t-is-disabled');
      const value2 = ref(100);
      const wrapper2 = mount(() => <InputNumber v-model={value2.value} max={99} />);
      const [btn2] = wrapper1.findAll('button');
      expect(wrapper2.find('.t-input').classes()).toContain('t-is-error');
      expect(btn2.classes()).toContain('t-is-disabled');
    });

    it(':placeholder', () => {
      const wrapper = mount(() => <InputNumber placeholder="请输入" />);
      const input = wrapper.find('.t-input input');
      expect(input.element.getAttribute('placeholder')).toBe('请输入');
    });

    it(':readonly', async () => {
      const value = ref(100);
      const wrapper = mount(() => <InputNumber v-model={value.value} readonly />);
      const [btn1, btn2] = wrapper.findAll('button');
      await btn1.trigger('click');
      expect(value.value).toBe(100);
      await btn2.trigger('click');
      expect(value.value).toBe(100);
    });

    it(':placeholder', () => {
      const wrapper = mount(() => <InputNumber placeholder="请输入" />);
      const input = wrapper.find('.t-input input');
      expect(input.element.getAttribute('placeholder')).toBe('请输入');
    });

    it(':size', () => {
      const sizeList = ['small', 'medium', 'large'];
      sizeList.forEach((size) => {
        const wrapper = mount(() => <InputNumber size={size} />);
        const container = wrapper.find('.t-input-number');
        expect(container.classes()).toContain(`t-size-${size.slice(0, 1)}`);
      });
    });

    it(':status', () => {
      const statusList = ['success', 'warning', 'error'];
      statusList.forEach((status) => {
        const wrapper = mount(() => <InputNumber status={status} />);
        const input = wrapper.find('.t-input');
        expect(input.classes()).toContain(`t-is-${status}`);
      });
    });

    it(':step', async () => {
      const value = ref(100);
      const wrapper = mount(() => <InputNumber v-model={value.value} step={2} />);
      const [btn1, btn2] = wrapper.findAll('button');
      await btn1.trigger('click');
      expect(value.value).toBe(98);
      await btn2.trigger('click');
      expect(value.value).toBe(100);
    });

    it(':theme', () => {
      const themeList = ['column', 'row', 'normal'];
      themeList.forEach((theme) => {
        const wrapper = mount(() => <InputNumber theme={theme} />);
        const container = wrapper.find('.t-input-number');
        expect(container.classes()).toContain(`t-input-number--${theme}`);
      });
    });

    it(':tips', () => {
      const wrapper = mount(() => <InputNumber tips="tips" />);
      const tips = wrapper.find('.t-input__tips');
      expect(tips.exists).toBeTruthy();
      expect(tips.text()).toBe('tips');
    });

    it(':value', () => {
      const value = ref(100);
      const wrapper = mount(() => <InputNumber value={value.value} />);
      const input = wrapper.find('.t-input input');
      expect(input.element.value).toBe('100');
    });

    it(':defaultValue', () => {
      const value = ref(100);
      const wrapper = mount(() => <InputNumber defaultValue={value.value} />);
      const input = wrapper.find('.t-input input');
      expect(input.element.value).toBe('100');
    });
  });

  describe(':events', () => {
    it(':onBlur', async () => {
      const value = ref(100);
      const fn = vi.fn();
      const wrapper = mount(() => <InputNumber v-model={value.value} onBlur={fn} />);
      const input = wrapper.find('.t-input input');
      await input.trigger('blur');
      expect(fn).toBeCalled();
    });

    it(':onChange', async () => {
      const data = ref('');
      const value = ref('');
      const handleChange = (val) => {
        value.value = val;
      };
      const wrapper = mount(<InputNumber v-model={data.value} onChange={handleChange} />);
      const el = wrapper.find('.t-input input').element;
      await nextTick();
      const simulateEvent = (text, event) => {
        el.value = text;
        el.dispatchEvent(new Event(event));
      };
      simulateEvent('2', 'input');
      await nextTick();
      expect(value.value).toBe(2);
    });

    it(':onEnter', async () => {
      const value = ref(100);
      const fn = vi.fn();
      const wrapper = mount(() => <InputNumber v-model={value.value} onEnter={fn} />);
      const input = wrapper.find('.t-input input');
      await input.trigger('keydown', { code: 'Enter' });
      await nextTick();
      expect(fn).toBeCalled();
    });

    it(':onFocus', async () => {
      const value = ref(100);
      const fn = vi.fn();
      const wrapper = mount(() => <InputNumber v-model={value.value} onFocus={fn} />);
      const input = wrapper.find('.t-input input');
      await input.trigger('focus');
      expect(fn).toBeCalled();
    });

    it(':onKeydown', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <InputNumber onKeydown={fn} />);
      const input = wrapper.find('.t-input input');
      await input.trigger('keydown');
      expect(fn).toBeCalled();
    });

    it(':onKeypress', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <InputNumber onKeypress={fn} />);
      const input = wrapper.find('.t-input input');
      await input.trigger('keypress');
      expect(fn).toBeCalled();
    });

    it(':onKeyup', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <InputNumber onKeyup={fn} />);
      const input = wrapper.find('.t-input input');
      await input.trigger('keyup');
      expect(fn).toBeCalled();
    });

    it(':onKeyup', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <InputNumber onKeyup={fn} />);
      const input = wrapper.find('.t-input input');
      await input.trigger('keyup');
      expect(fn).toBeCalled();
    });

    it(':onValidate', async () => {
      const value = ref(100);
      const fn = vi.fn();
      const wrapper = mount(() => <InputNumber v-model={value.value} max={101} onValidate={fn} />);
      const [btn] = wrapper.findAll('button');
      await btn.trigger('click');
      expect(fn).toBeCalled();
    });
  });
});
