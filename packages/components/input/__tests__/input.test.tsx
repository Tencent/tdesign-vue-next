import { nextTick } from 'vue';
import type { VueWrapper } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { Input } from '@tdesign/components/input';
import InputProps from '@tdesign/components/input/props';
import { simulateInputChange } from '@tdesign/internal-tests/utils';

describe('Input', () => {
  describe('props', () => {
    let wrapper: VueWrapper<InstanceType<typeof Input>> | null = null;

    beforeEach(() => {
      wrapper = mount(Input, {
        props: {},
      }) as VueWrapper<InstanceType<typeof Input>>;
    });

    it(':align[string]', async () => {
      const validator = InputProps.align.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      // @ts-expect-error
      expect(validator('other')).toBe(false);

      // default: left
      expect(wrapper.find('.t-input').classes('t-align-center')).eq(false);
      expect(wrapper.find('.t-input').classes('t-align-right')).eq(false);

      await wrapper.setProps({ align: 'center' });
      expect(wrapper.find('.t-input').classes('t-align-center')).eq(true);

      await wrapper.setProps({ align: 'right' });
      expect(wrapper.find('.t-input').classes('t-align-right')).eq(true);

      expect(wrapper.find('.t-input').element).toMatchSnapshot();
    });

    it(':allowInputOverMax[boolean]', async () => {
      const onChangeFn = vi.fn();

      // default: false, should truncate to maxlength
      const wrapper1 = mount(Input, {
        props: { defaultValue: '', maxlength: 5, onChange: onChangeFn },
      });
      simulateInputChange(wrapper1.find('input').element, 'Hello TDesign');
      await wrapper1.vm.$nextTick();
      expect(onChangeFn).toHaveBeenCalled();
      expect(onChangeFn.mock.calls[0][0]).eq('Hello');

      // allowInputOverMax = true, value should not change
      const wrapper2 = mount(Input, {
        props: { value: 'Hello', maxlength: 5, allowInputOverMax: true },
      });
      simulateInputChange(wrapper2.find('input').element, 'Hello TDesign');
      await wrapper2.vm.$nextTick();
      expect(wrapper2.find('input').element.value).eq('Hello');

      // allowInputOverMax with maxcharacter
      const onChangeFn2 = vi.fn();
      const wrapper3 = mount(Input, {
        props: { value: '测试', maxcharacter: 4, allowInputOverMax: true, onChange: onChangeFn2 },
      });
      simulateInputChange(wrapper3.find('input').element, '测试文本长度');
      await wrapper3.vm.$nextTick();
      expect(wrapper3.find('input').element.value).eq('测试');
    });

    it(':autoWidth[boolean]', async () => {
      expect(wrapper.find('.t-input--auto-width').exists()).eq(false);

      await wrapper.setProps({ autoWidth: true });
      expect(wrapper.find('.t-input--auto-width').exists()).eq(true);

      await wrapper.setProps({ value: 'test' });
      expect(wrapper.find('.t-input__input-pre').exists()).eq(true);
    });

    it(':autocomplete[string]', async () => {
      await wrapper.setProps({ autocomplete: 'https://tdesign.tencent.com/' });
      expect(wrapper.find('input').attributes('autocomplete')).eq('https://tdesign.tencent.com/');

      const values = ['on', 'off', 'name', 'email'] as const;
      for (const val of values) {
        await wrapper.setProps({ autocomplete: val });
        expect(wrapper.find('input').attributes('autocomplete')).eq(val);
      }
    });

    it(':autofocus[boolean]', async () => {
      expect(wrapper.find('input').attributes('autofocus')).eq(undefined);

      await wrapper.setProps({ autofocus: true });
      expect(wrapper.find('input').attributes('autofocus')).toBeDefined();

      await wrapper.setProps({ autofocus: false });
      expect(wrapper.find('input').attributes('autofocus')).eq(undefined);
    });

    it(':borderless[boolean]', async () => {
      expect(wrapper.find('.t-input--borderless').exists()).eq(false);

      await wrapper.setProps({ borderless: true });
      expect(wrapper.find('.t-input--borderless').exists()).eq(true);
    });

    it(':clearable[boolean]', async () => {
      // default: false
      const wrapper = mount(Input, {
        props: { value: 'Default Keyword' },
      });
      wrapper.find('.t-input').trigger('mouseenter');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-input__suffix-clear').exists()).eq(false);

      // clearable = true
      await wrapper.setProps({ clearable: true });
      wrapper.find('.t-input').trigger('mouseenter');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-input__suffix-clear').exists()).eq(true);
    });

    it(':clearable click clear icon', async () => {
      const onClearFn = vi.fn();
      const onChangeFn = vi.fn();
      const wrapper = mount(Input, {
        props: { value: 'Default Keyword', clearable: true, onClear: onClearFn, onChange: onChangeFn },
      });
      wrapper.find('.t-input').trigger('mouseenter');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-input__suffix-clear').exists()).eq(true);

      wrapper.find('.t-input__suffix-clear').trigger('click');
      await wrapper.vm.$nextTick();
      expect(onClearFn).toHaveBeenCalledTimes(1);
      expect(onClearFn.mock.calls[0][0].e.stopPropagation).toBeTruthy();
      expect(onClearFn.mock.calls[0][0].e.type).eq('click');
      expect(onChangeFn).toHaveBeenCalledTimes(1);
      expect(onChangeFn.mock.calls[0][0]).eq('');
      expect(onChangeFn.mock.calls[0][1].e.type).eq('click');
    });

    it(':clearable with type=password', async () => {
      const wrapper = mount(Input, {
        props: { type: 'password', value: 'this is my password', clearable: true },
      });
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-icon-browse-off').exists()).eq(true);
      wrapper.find('.t-input').trigger('mouseenter');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-input__suffix-clear').exists()).eq(true);
    });

    it(':clearable should not show when disabled or readonly', async () => {
      // disabled
      const wrapper1 = mount(Input, {
        props: { value: 'Default Keyword', clearable: true, disabled: true },
      });
      wrapper1.find('.t-input').trigger('mouseenter');
      await wrapper1.vm.$nextTick();
      expect(wrapper1.find('.t-input__suffix-clear').exists()).eq(false);

      // readonly
      const wrapper2 = mount(Input, {
        props: { value: 'Default Keyword', clearable: true, readonly: true },
      });
      wrapper2.find('.t-input').trigger('mouseenter');
      await wrapper2.vm.$nextTick();
      expect(wrapper2.find('.t-input__suffix-clear').exists()).eq(false);
    });

    it(':clearable type=number should return undefined when cleared', async () => {
      const onChangeFn = vi.fn();
      const wrapper = mount(Input, {
        props: { type: 'number', value: 123, clearable: true, onChange: onChangeFn },
      });
      wrapper.find('.t-input').trigger('mouseenter');
      await wrapper.vm.$nextTick();
      wrapper.find('.t-input__suffix-clear').trigger('click');
      await wrapper.vm.$nextTick();
      expect(onChangeFn.mock.calls[0][0]).eq(undefined);
    });

    it(':disabled[boolean]', async () => {
      expect(wrapper.find('.t-input').classes('t-is-disabled')).eq(false);

      await wrapper.setProps({ disabled: true });
      expect(wrapper.find('.t-input').classes('t-is-disabled')).eq(true);
      expect(wrapper.find('input').attributes('disabled')).toBeDefined();

      await wrapper.setProps({ disabled: false });
      expect(wrapper.find('.t-input').classes('t-is-disabled')).eq(false);
    });

    it(':disabled password toggle should not work', async () => {
      const wrapper = mount(Input, {
        props: { type: 'password', disabled: true },
      });
      expect(wrapper.find('.t-icon-browse-off').exists()).eq(true);
      await wrapper.find('.t-icon-browse-off').trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-icon-browse-off').exists()).eq(true);
      expect(wrapper.find('.t-icon-browse').exists()).eq(false);
    });

    it(':disabled events should not trigger', async () => {
      const onKeydownFn = vi.fn();
      const onKeyupFn = vi.fn();
      const onKeypressFn = vi.fn();
      const wrapper = mount(Input, {
        props: { disabled: true, onKeydown: onKeydownFn, onKeyup: onKeyupFn, onKeypress: onKeypressFn },
      });
      await wrapper.find('input').trigger('keydown');
      await wrapper.find('input').trigger('keyup');
      await wrapper.find('input').trigger('keypress');
      expect(onKeydownFn).not.toHaveBeenCalled();
      expect(onKeyupFn).not.toHaveBeenCalled();
      expect(onKeypressFn).not.toHaveBeenCalled();
    });

    it(':format[function]', async () => {
      const wrapper = mount(Input, {
        props: { format: (val) => `${val} 元`, value: '100' },
      });
      wrapper.find('input').trigger('focus');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('input').element.value).eq('100');

      wrapper.find('input').trigger('blur');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('input').element.value).eq('100 元');
    });

    it(':format initial value should be formatted', async () => {
      const wrapper = mount(Input, {
        props: { format: (val) => `$${val}`, defaultValue: '100' },
      });
      await wrapper.vm.$nextTick();
      expect(wrapper.find('input').element.value).eq('$100');
    });

    it(':format should work with defaultValue', async () => {
      const wrapper = mount(Input, {
        props: { format: (val) => val?.toUpperCase(), defaultValue: 'hello' },
      });
      await wrapper.vm.$nextTick();
      expect(wrapper.find('input').element.value).eq('HELLO');
    });

    it(':inputClass[string/array/object]', async () => {
      // string
      await wrapper.setProps({ inputClass: 'name1 name2' });
      expect(wrapper.find('.t-input').classes('name1')).eq(true);
      expect(wrapper.find('.t-input').classes('name2')).eq(true);

      // array
      await wrapper.setProps({ inputClass: ['name3', 'name4'] });
      expect(wrapper.find('.t-input').classes('name3')).eq(true);
      expect(wrapper.find('.t-input').classes('name4')).eq(true);

      // object
      await wrapper.setProps({ inputClass: { name5: true, name6: false } });
      expect(wrapper.find('.t-input').classes('name5')).eq(true);
      expect(wrapper.find('.t-input').classes('name6')).eq(false);
    });

    it(':label[string/TNode]', async () => {
      await wrapper.setProps({ label: 'Label:' });
      expect(wrapper.find('.t-input__prefix').exists()).eq(true);
      expect(wrapper.find('.t-input__prefix').text()).eq('Label:');
    });

    it(':label[TNode]', () => {
      const wrapper = mount(Input, {
        props: { label: () => <span class="custom-node">TNode</span> },
      });
      expect(wrapper.find('.custom-node').exists()).eq(true);
      expect(wrapper.find('.t-input__prefix').exists()).eq(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':label[slot]', () => {
      const wrapper = mount(Input, {
        slots: { label: () => <span class="custom-node">TNode</span> },
      });
      expect(wrapper.find('.custom-node').exists()).eq(true);
      expect(wrapper.find('.t-input__prefix').exists()).eq(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':maxcharacter[number]', async () => {
      const onChangeFn = vi.fn();
      mount(Input, {
        props: { value: '你好 TDesign', maxcharacter: 4, onChange: onChangeFn },
      });
      await nextTick();
      expect(onChangeFn).toHaveBeenCalledTimes(1);
      expect(onChangeFn.mock.calls[0][0]).eq('你好');
      expect(onChangeFn.mock.calls[0][1].trigger).eq('initial');
    });

    it(':maxcharacter Chinese character counts as 2', async () => {
      const onChangeFn = vi.fn();
      const wrapper = mount(Input, {
        props: { value: '你好', maxcharacter: 4, onChange: onChangeFn },
      });
      await wrapper.vm.$nextTick();
      expect(onChangeFn).not.toHaveBeenCalled();
      expect(wrapper.find('input').element.value).eq('你好');
    });

    it(':maxcharacter mixed Chinese and English', async () => {
      const onChangeFn = vi.fn();
      // 你(2) + 好(2) + a(1) = 5 > 4
      mount(Input, {
        props: { value: '你好a', maxcharacter: 4, onChange: onChangeFn },
      });
      await nextTick();
      expect(onChangeFn).toHaveBeenCalled();
      expect(onChangeFn.mock.calls[0][0]).eq('你好');
    });

    it(':maxlength[number]', async () => {
      const onChangeFn = vi.fn();
      mount(Input, {
        props: { value: 'Hello TDesign', maxlength: 5, onChange: onChangeFn },
      });
      await nextTick();
      expect(onChangeFn).toHaveBeenCalledTimes(1);
      expect(onChangeFn.mock.calls[0][0]).eq('Hello');
      expect(onChangeFn.mock.calls[0][1].trigger).eq('initial');
    });

    it(':maxlength should not set native maxlength attribute', () => {
      const wrapper = mount(Input, {
        props: { maxlength: 10 },
      });
      expect(wrapper.find('input').attributes('maxlength')).eq(undefined);
    });

    it(':maxlength[string]', async () => {
      const onChangeFn = vi.fn();
      mount(Input, {
        props: { value: 'Hello TDesign', maxlength: '5', onChange: onChangeFn },
      });
      await nextTick();
      expect(onChangeFn).toHaveBeenCalled();
      expect(onChangeFn.mock.calls[0][0]).eq('Hello');
    });

    it(':name[string]', async () => {
      expect(wrapper.find('input').attributes('name')).eq(undefined);

      await wrapper.setProps({ name: 'input-name' });
      expect(wrapper.find('input').attributes('name')).eq('input-name');
    });

    it(':placeholder[string]', async () => {
      await wrapper.setProps({ placeholder: 'this is input placeholder' });
      expect(wrapper.find('input').attributes('placeholder')).eq('this is input placeholder');

      await wrapper.setProps({ placeholder: '请输入内容' });
      expect(wrapper.find('input').attributes('placeholder')).eq('请输入内容');
    });

    it(':prefixIcon[TNode]', () => {
      const wrapper = mount(Input, {
        props: { prefixIcon: () => <span class="custom-node">TNode</span> },
      });
      expect(wrapper.find('.custom-node').exists()).eq(true);
      expect(wrapper.find('.t-input__prefix-icon').exists()).eq(true);
    });

    it(':prefixIcon[slot]', () => {
      const wrapper = mount(Input, {
        slots: { prefixIcon: () => <span class="custom-node">TNode</span> },
      });
      expect(wrapper.find('.custom-node').exists()).eq(true);
      expect(wrapper.find('.t-input__prefix-icon').exists()).eq(true);
    });

    it(':prefixIcon[slot prefix-icon]', () => {
      const wrapper = mount(Input, {
        slots: { 'prefix-icon': () => <span class="custom-node">TNode</span> },
      });
      expect(wrapper.find('.custom-node').exists()).eq(true);
      expect(wrapper.find('.t-input__prefix-icon').exists()).eq(true);
    });

    it(':readonly[boolean]', async () => {
      expect(wrapper.find('.t-input').classes('t-is-readonly')).eq(false);

      await wrapper.setProps({ readonly: true });
      expect(wrapper.find('.t-input').classes('t-is-readonly')).eq(true);
      expect(wrapper.find('input').attributes('readonly')).toBeDefined();
      expect(wrapper.find('input').attributes('unselectable')).eq('on');

      await wrapper.setProps({ readonly: false });
      expect(wrapper.find('.t-input').classes('t-is-readonly')).eq(false);
    });

    it(':showClearIconOnEmpty[boolean]', async () => {
      // default: false
      wrapper.find('.t-input').trigger('mouseenter');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-input__suffix-clear').exists()).eq(false);

      await wrapper.setProps({ showClearIconOnEmpty: true });
      wrapper.find('.t-input').trigger('mouseenter');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-input__suffix-clear').exists()).eq(true);

      // should show even when value is empty
      await wrapper.setProps({ value: '' });
      wrapper.find('.t-input').trigger('mouseenter');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-input__suffix-clear').exists()).eq(true);
    });

    it(':showLimitNumber[boolean]', async () => {
      // default: false
      const wrapper = mount(Input, {
        props: { maxlength: 5, value: 'TD' },
      });
      expect(wrapper.find('.t-input__limit-number').exists()).eq(false);

      await wrapper.setProps({ showLimitNumber: true });
      expect(wrapper.find('.t-input__limit-number').text()).eq('2/5');
    });

    it(':showLimitNumber with maxcharacter', () => {
      const wrapper = mount(Input, {
        props: { showLimitNumber: true, maxcharacter: 10, value: '你好' },
      });
      expect(wrapper.find('.t-input__limit-number').text()).eq('4/10');
    });

    it(':showLimitNumber shows 0/n when empty', () => {
      const wrapper = mount(Input, {
        props: { showLimitNumber: true, maxlength: 10 },
      });
      expect(wrapper.find('.t-input__limit-number').text()).eq('0/10');
    });

    it(':showLimitNumber disabled state', () => {
      const wrapper = mount(Input, {
        props: { showLimitNumber: true, maxlength: 5, value: 'TD', disabled: true },
      });
      expect(wrapper.find('.t-input__limit-number').classes('t-is-disabled')).eq(true);
    });

    it(':size[string]', async () => {
      const validator = InputProps.size.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      // @ts-expect-error
      expect(validator('other')).toBe(false);

      // default: medium
      expect(wrapper.find('.t-input').classes('t-size-s')).eq(false);
      expect(wrapper.find('.t-input').classes('t-size-l')).eq(false);

      await wrapper.setProps({ size: 'small' });
      expect(wrapper.find('.t-input').classes('t-size-s')).eq(true);

      await wrapper.setProps({ size: 'large' });
      expect(wrapper.find('.t-input').classes('t-size-l')).eq(true);
    });

    it(':spellCheck[boolean]', async () => {
      await wrapper.setProps({ spellCheck: true });
      expect(wrapper.find('input').attributes('spellcheck')).eq('true');

      await wrapper.setProps({ spellCheck: false });
      expect(wrapper.find('input').attributes('spellcheck')).eq('false');
    });

    it(':status[string]', async () => {
      const validator = InputProps.status.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      // @ts-expect-error
      expect(validator('other')).toBe(false);

      // default
      expect(wrapper.find('.t-input').classes('t-is-success')).eq(false);
      expect(wrapper.find('.t-input').classes('t-is-warning')).eq(false);
      expect(wrapper.find('.t-input').classes('t-is-error')).eq(false);

      await wrapper.setProps({ status: 'success' });
      expect(wrapper.find('.t-input').classes('t-is-success')).eq(true);

      await wrapper.setProps({ status: 'warning' });
      expect(wrapper.find('.t-input').classes('t-is-warning')).eq(true);

      await wrapper.setProps({ status: 'error' });
      expect(wrapper.find('.t-input').classes('t-is-error')).eq(true);

      expect(wrapper.find('.t-input').element).toMatchSnapshot();
    });

    it(':suffix[string/TNode]', async () => {
      await wrapper.setProps({ suffix: 'suffix' });
      expect(wrapper.find('.t-input__suffix').exists()).eq(true);
      expect(wrapper.find('.t-input__suffix').text()).eq('suffix');
    });

    it(':suffix[TNode]', () => {
      const wrapper = mount(Input, {
        props: { suffix: () => <span class="custom-node">TNode</span> },
      });
      expect(wrapper.find('.custom-node').exists()).eq(true);
      expect(wrapper.find('.t-input__suffix').exists()).eq(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':suffix[slot]', () => {
      const wrapper = mount(Input, {
        slots: { suffix: () => <span class="custom-node">TNode</span> },
      });
      expect(wrapper.find('.custom-node').exists()).eq(true);
      expect(wrapper.find('.t-input__suffix').exists()).eq(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':suffixIcon[TNode]', () => {
      const wrapper = mount(Input, {
        props: { suffixIcon: () => <span class="custom-node">TNode</span> },
      });
      expect(wrapper.find('.custom-node').exists()).eq(true);
      expect(wrapper.find('.t-input__suffix-icon').exists()).eq(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':suffixIcon[slot]', () => {
      const wrapper = mount(Input, {
        slots: { suffixIcon: () => <span class="custom-node">TNode</span> },
      });
      expect(wrapper.find('.custom-node').exists()).eq(true);
      expect(wrapper.find('.t-input__suffix-icon').exists()).eq(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':suffixIcon[slot suffix-icon]', () => {
      const wrapper = mount(Input, {
        slots: { 'suffix-icon': () => <span class="custom-node">TNode</span> },
      });
      expect(wrapper.find('.custom-node').exists()).eq(true);
      expect(wrapper.find('.t-input__suffix-icon').exists()).eq(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':tips[string/TNode]', async () => {
      await wrapper.setProps({ tips: 'this is a tip' });
      expect(wrapper.findAll('.t-input__tips')).toHaveLength(1);
      expect(wrapper.find('.t-input__tips').text()).eq('this is a tip');
    });

    it(':tips[TNode]', () => {
      const wrapper = mount(Input, {
        props: { tips: () => <span class="custom-tips">Custom Tips</span> },
      });
      expect(wrapper.find('.custom-tips').exists()).eq(true);
    });

    it(':tips style changes with status', () => {
      (['default', 'success', 'warning', 'error'] as const).forEach((status) => {
        const wrapper = mount(Input, {
          props: { tips: 'tip', status },
        });
        expect(wrapper.find('.t-input__tips').classes(`t-is-${status}`)).eq(true);
      });
    });

    it(':type[string]', async () => {
      const validator = InputProps.type.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      // @ts-expect-error
      expect(validator('other')).toBe(false);

      // default: text
      expect(wrapper.find('input').attributes('type')).eq('text');

      const types = ['text', 'number', 'url', 'tel', 'password', 'search', 'submit', 'hidden'] as const;
      for (const type of types) {
        await wrapper.setProps({ type });
        expect(wrapper.find('input').attributes('type')).eq(type);
      }
    });

    it(':type=password toggle visibility', async () => {
      const wrapper = mount(Input, {
        props: { type: 'password' },
      });
      expect(wrapper.findAll('.t-icon-browse-off')).toHaveLength(1);

      wrapper.find('.t-icon-browse-off').trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-icon-browse').exists()).eq(true);
      expect(wrapper.find('input').attributes('type')).eq('text');

      wrapper.find('.t-icon-browse').trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-icon-browse-off').exists()).eq(true);
      expect(wrapper.find('input').attributes('type')).eq('password');
    });

    it(':type=hidden should hide the input wrapper', () => {
      const wrapper = mount(Input, {
        props: { type: 'hidden' },
      });
      expect(wrapper.find('.t-input__wrap').isVisible()).eq(false);
    });

    it(':type=number should return number value', async () => {
      const onChangeFn = vi.fn();
      const wrapper = mount(Input, {
        props: { type: 'number', onChange: onChangeFn },
      });
      simulateInputChange(wrapper.find('input').element, '123');
      await wrapper.vm.$nextTick();
      expect(onChangeFn).toHaveBeenCalled();
      expect(onChangeFn.mock.calls[0][0]).eq(123);
    });

    it(':value[string]', () => {
      const wrapper = mount(Input, {
        props: { value: 'test value' },
      });
      expect(wrapper.find('input').element.value).eq('test value');
    });

    it(':defaultValue[string]', () => {
      const wrapper = mount(Input, {
        props: { defaultValue: 'default value' },
      });
      expect(wrapper.find('input').element.value).eq('default value');
    });

    it(':value controlled mode', async () => {
      const onChangeFn = vi.fn();
      const wrapper = mount(Input, {
        props: { value: 'controlled', onChange: onChangeFn },
      });
      simulateInputChange(wrapper.find('input').element, 'new value');
      await wrapper.vm.$nextTick();
      // 受控模式下，值不会改变
      expect(wrapper.find('input').element.value).eq('controlled');
      expect(onChangeFn).toHaveBeenCalled();
    });

    it(':defaultValue uncontrolled mode', async () => {
      const onChangeFn = vi.fn();
      const wrapper = mount(Input, {
        props: { defaultValue: 'uncontrolled', onChange: onChangeFn },
      });
      simulateInputChange(wrapper.find('input').element, 'new value');
      await wrapper.vm.$nextTick();
      // 非受控模式下，值会改变
      expect(wrapper.find('input').element.value).eq('new value');
      expect(onChangeFn).toHaveBeenCalled();
    });

    it(':value[number]', () => {
      const wrapper = mount(Input, {
        props: { value: 123, type: 'number' },
      });
      expect(wrapper.find('input').element.value).eq('123');
    });

    it(':value with 0', () => {
      const wrapper = mount(Input, {
        props: { type: 'number', value: 0 },
      });
      expect(wrapper.find('input').element.value).eq('0');
    });

    it(':showInput[boolean]', () => {
      const wrapper = mount(Input, {
        props: { showInput: false },
      });
      expect(wrapper.find('input').classes()).toContain('t-input--soft-hidden');
    });

    it(':keepWrapperWidth[boolean]', async () => {
      await wrapper.setProps({ autoWidth: true, keepWrapperWidth: true });
      expect(wrapper.find('.t-input--auto-width').exists()).eq(false);
    });

    it(':label not provided', async () => {
      await wrapper.setProps({ label: undefined });
      expect(wrapper.find('.t-input__prefix').exists()).eq(false);
    });

    it(':prefixIcon not provided', () => {
      const wrapper = mount(Input, {
        props: { prefixIcon: undefined },
      });
      expect(wrapper.find('.t-input__prefix-icon').exists()).eq(false);
    });

    it(':suffix not provided', async () => {
      await wrapper.setProps({ suffix: undefined });
      expect(wrapper.find('.t-input__suffix').exists()).eq(false);
    });

    it(':suffixIcon not provided', () => {
      const wrapper = mount(Input, {
        props: { suffixIcon: undefined },
      });
      expect(wrapper.find('.t-input__suffix-icon').exists()).eq(false);
    });

    it(':tips not provided', async () => {
      await wrapper.setProps({ tips: undefined });
      expect(wrapper.find('.t-input__tips').exists()).eq(false);
    });
  });

  describe('events', () => {
    it('blur', async () => {
      const onFocusFn = vi.fn();
      const onBlurFn = vi.fn();
      const wrapper = mount(Input, {
        props: { value: 'initial-input-value', onFocus: onFocusFn, onBlur: onBlurFn },
      });

      wrapper.find('input').trigger('focus');
      await wrapper.vm.$nextTick();
      expect(onFocusFn).toHaveBeenCalledTimes(1);
      expect(onFocusFn.mock.calls[0][0]).eq('initial-input-value');
      expect(onFocusFn.mock.calls[0][1].e.type).eq('focus');

      wrapper.find('input').trigger('blur');
      await wrapper.vm.$nextTick();
      expect(onBlurFn).toHaveBeenCalledTimes(1);
      expect(onBlurFn.mock.calls[0][0]).eq('initial-input-value');
      expect(onBlurFn.mock.calls[0][1].e.type).eq('blur');
    });

    it('change: empty value could trigger change event', async () => {
      const onChangeFn = vi.fn();
      const wrapper = mount(Input, {
        props: { onChange: onChangeFn },
      });
      simulateInputChange(wrapper.find('input').element, 'initial value');
      await wrapper.vm.$nextTick();
      expect(onChangeFn).toHaveBeenCalledTimes(1);
      expect(onChangeFn.mock.calls[0][0]).eq('initial value');
      expect(onChangeFn.mock.calls[0][1].e.type).eq('input');
    });

    it('change: controlled value test', async () => {
      const onChangeFn = vi.fn();
      const wrapper = mount(Input, {
        props: { value: 'TDesign', onChange: onChangeFn },
      });
      simulateInputChange(wrapper.find('input').element, 'Hello TDesign');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('input').element.value).eq('TDesign');
      expect(onChangeFn).toHaveBeenCalledTimes(1);
      expect(onChangeFn.mock.calls[0][0]).eq('Hello TDesign');
      expect(onChangeFn.mock.calls[0][1].e.type).eq('input');
    });

    it('change: uncontrolled value test', async () => {
      const onChangeFn = vi.fn();
      const wrapper = mount(Input, {
        props: { defaultValue: 'Hello', onChange: onChangeFn },
      });
      simulateInputChange(wrapper.find('input').element, 'Hello TDesign');
      await wrapper.vm.$nextTick();
      expect(onChangeFn).toHaveBeenCalledTimes(1);
      expect(onChangeFn.mock.calls[0][0]).eq('Hello TDesign');
      expect(onChangeFn.mock.calls[0][1].e.type).eq('input');
    });

    it('change: trigger=initial when value exceeds limit', async () => {
      const onChangeFn = vi.fn();
      mount(Input, {
        props: { value: 'Hello World', maxlength: 5, onChange: onChangeFn },
      });
      await nextTick();
      expect(onChangeFn).toHaveBeenCalled();
      expect(onChangeFn.mock.calls[0][1].trigger).eq('initial');
    });

    it('change: trigger=clear when cleared', async () => {
      const onChangeFn = vi.fn();
      const wrapper = mount(Input, {
        props: { value: 'test', clearable: true, onChange: onChangeFn },
      });
      wrapper.find('.t-input').trigger('mouseenter');
      await wrapper.vm.$nextTick();
      wrapper.find('.t-input__suffix-clear').trigger('click');
      await wrapper.vm.$nextTick();
      expect(onChangeFn.mock.calls[0][1].trigger).eq('clear');
    });

    it('clear', async () => {
      const onClearFn = vi.fn();
      const wrapper = mount(Input, {
        props: { value: 'test', clearable: true, onClear: onClearFn },
      });
      wrapper.find('.t-input').trigger('mouseenter');
      await wrapper.vm.$nextTick();
      wrapper.find('.t-input__suffix-clear').trigger('click');
      await wrapper.vm.$nextTick();
      expect(onClearFn).toHaveBeenCalled();
      expect(onClearFn.mock.calls[0][0].e.type).eq('click');
    });

    it('click', async () => {
      const fn = vi.fn();
      const wrapper = mount(Input, {
        props: { onClick: fn },
      });
      wrapper.find('.t-input').trigger('click');
      await wrapper.vm.$nextTick();
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn.mock.calls[0][0].e.type).eq('click');
    });

    it('compositionend', async () => {
      const onCompositionendFn = vi.fn();
      const wrapper = mount(Input, {
        props: { value: '输入结束', onCompositionend: onCompositionendFn },
      });
      wrapper.find('input').trigger('compositionend');
      await wrapper.vm.$nextTick();
      expect(onCompositionendFn).toHaveBeenCalledTimes(1);
      expect(onCompositionendFn.mock.calls[0][0]).eq('输入结束');
      expect(onCompositionendFn.mock.calls[0][1].e.type).eq('compositionend');
    });

    it('compositionstart', async () => {
      const onCompositionstartFn = vi.fn();
      const wrapper = mount(Input, {
        props: { value: '输入开始', onCompositionstart: onCompositionstartFn },
      });
      wrapper.find('input').trigger('compositionstart');
      await wrapper.vm.$nextTick();
      expect(onCompositionstartFn).toHaveBeenCalledTimes(1);
      expect(onCompositionstartFn.mock.calls[0][0]).eq('输入开始');
      expect(onCompositionstartFn.mock.calls[0][1].e.type).eq('compositionstart');
    });

    it('enter', async () => {
      const onEnterFn = vi.fn();
      const wrapper = mount(Input, {
        props: { value: 'text', onEnter: onEnterFn },
      });
      wrapper.find('input').trigger('focus');
      await wrapper.vm.$nextTick();
      wrapper.find('input').trigger('keydown.enter');
      await wrapper.vm.$nextTick();
      expect(onEnterFn).toHaveBeenCalledTimes(1);
      expect(onEnterFn.mock.calls[0][0]).eq('text');
      expect(onEnterFn.mock.calls[0][1].e.type).eq('keydown');
    });

    it('enter should not trigger during IME composition', async () => {
      const onEnterFn = vi.fn();
      const wrapper = mount(Input, {
        props: { value: 'text', onEnter: onEnterFn },
      });
      const input = wrapper.find('input');

      // 模拟中文输入法开始
      input.trigger('compositionstart');
      await wrapper.vm.$nextTick();

      // 在输入法激活状态下按回车键，不应该触发 onEnter 事件
      input.trigger('keydown.enter');
      await wrapper.vm.$nextTick();
      expect(onEnterFn).not.toHaveBeenCalled();

      // 模拟中文输入法结束
      input.trigger('compositionend');
      await wrapper.vm.$nextTick();

      // 输入法结束后按回车键，应该正常触发 onEnter 事件
      input.trigger('keydown.enter');
      await wrapper.vm.$nextTick();
      expect(onEnterFn).toHaveBeenCalledTimes(1);
      expect(onEnterFn.mock.calls[0][0]).eq('text');
      expect(onEnterFn.mock.calls[0][1].e.type).eq('keydown');
    });

    it('focus', async () => {
      const onFocusFn = vi.fn();
      const wrapper = mount(Input, {
        props: { onFocus: onFocusFn },
      });
      wrapper.find('input').trigger('focus');
      await wrapper.vm.$nextTick();
      expect(onFocusFn).toHaveBeenCalledTimes(1);
      expect(onFocusFn.mock.calls[0][0]).eq(undefined);
      expect(onFocusFn.mock.calls[0][1].e.type).eq('focus');
    });

    it('keydown', async () => {
      const onKeydownFn = vi.fn();
      const wrapper = mount(Input, {
        props: { value: 'text', onKeydown: onKeydownFn },
      });
      wrapper.find('input').trigger('keydown');
      await wrapper.vm.$nextTick();
      expect(onKeydownFn).toHaveBeenCalledTimes(1);
      expect(onKeydownFn.mock.calls[0][0]).eq('text');
      expect(onKeydownFn.mock.calls[0][1].e.type).eq('keydown');
    });

    it('keypress', async () => {
      const onKeypressFn = vi.fn();
      const wrapper = mount(Input, {
        props: { value: 'text', onKeypress: onKeypressFn },
      });
      wrapper.find('input').trigger('keypress');
      await wrapper.vm.$nextTick();
      expect(onKeypressFn).toHaveBeenCalledTimes(1);
      expect(onKeypressFn.mock.calls[0][0]).eq('text');
      expect(onKeypressFn.mock.calls[0][1].e.type).eq('keypress');
    });

    it('keyup', async () => {
      const onKeyupFn = vi.fn();
      const wrapper = mount(Input, {
        props: { value: 'text', onKeyup: onKeyupFn },
      });
      wrapper.find('input').trigger('keyup');
      await wrapper.vm.$nextTick();
      expect(onKeyupFn).toHaveBeenCalledTimes(1);
      expect(onKeyupFn.mock.calls[0][0]).eq('text');
      expect(onKeyupFn.mock.calls[0][1].e.type).eq('keyup');
    });

    it('mouseenter', async () => {
      const onMouseenterFn = vi.fn();
      const wrapper = mount(Input, {
        props: { onMouseenter: onMouseenterFn },
      });
      wrapper.find('.t-input').trigger('mouseenter');
      await wrapper.vm.$nextTick();
      expect(onMouseenterFn).toHaveBeenCalledTimes(1);
      expect(onMouseenterFn.mock.calls[0][0].e.type).eq('mouseenter');
    });

    it('mouseleave', async () => {
      const onMouseleaveFn = vi.fn();
      const wrapper = mount(Input, {
        props: { onMouseleave: onMouseleaveFn },
      });
      wrapper.find('.t-input').trigger('mouseleave');
      await wrapper.vm.$nextTick();
      expect(onMouseleaveFn).toHaveBeenCalledTimes(1);
      expect(onMouseleaveFn.mock.calls[0][0].e.type).eq('mouseleave');
    });

    it('paste', async () => {
      const onPasteFn = vi.fn();
      const wrapper = mount(Input, {
        props: { onPaste: onPasteFn },
      });
      wrapper.find('input').trigger('paste');
      await wrapper.vm.$nextTick();
      expect(onPasteFn).toHaveBeenCalledTimes(1);
      expect(onPasteFn.mock.calls[0][0].e.type).eq('paste');
    });

    it('validate', async () => {
      const onValidateFn = vi.fn();
      mount(Input, {
        props: { value: 'Hello World', maxlength: 5, onValidate: onValidateFn },
      });
      await nextTick();
      expect(onValidateFn).toHaveBeenCalledTimes(1);
      expect(onValidateFn.mock.calls[0][0].error).eq('exceed-maximum');
    });

    it('wheel', async () => {
      const onWheelFn = vi.fn();
      const wrapper = mount(Input, {
        props: { onWheel: onWheelFn },
      });
      wrapper.find('input').trigger('wheel');
      await wrapper.vm.$nextTick();
      expect(onWheelFn).toHaveBeenCalledTimes(1);
      expect(onWheelFn.mock.calls[0][0].e.type).eq('wheel');
    });
  });

  describe('instanceFunctions', () => {
    let wrapper: VueWrapper<InstanceType<typeof Input>>;

    beforeEach(() => {
      wrapper = mount(Input, {
        attachTo: document.body,
        props: { value: 'test' },
      }) as VueWrapper<InstanceType<typeof Input>>;
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it('focus method', async () => {
      const component = wrapper.findComponent(Input);
      await component.vm.$.exposed!.focus();
      expect(document.activeElement).eq(wrapper.find('input').element);
    });

    it('blur method', async () => {
      const component = wrapper.findComponent(Input);
      await component.vm.$.exposed!.focus();
      await nextTick();
      await component.vm.$.exposed!.blur();
      expect(document.activeElement).not.eq(wrapper.find('input').element);
    });
  });

  // 注意：exposed methods、focus state、composition input 等 hooks 相关测试已移至 input.hooks.test.tsx

  describe('edge cases', () => {
    it('passwordIcon when type=password and clearable', async () => {
      const wrapper = mount(Input, {
        props: { type: 'password', value: 'password', clearable: true },
      });
      wrapper.find('.t-input').trigger('mouseenter');
      await wrapper.vm.$nextTick();
      // 应该同时显示密码图标和清除图标
      expect(wrapper.find('.t-icon-browse-off').exists()).eq(true);
      expect(wrapper.find('.t-input__clear').exists()).eq(true);
    });

    it('validator edge cases for props', () => {
      // 测试 align 验证器
      expect(mount(Input, { props: { align: null as any } }).exists()).eq(true);
      // 测试 size 验证器
      expect(mount(Input, { props: { size: null as any } }).exists()).eq(true);
      // 测试 status 验证器
      expect(mount(Input, { props: { status: null as any } }).exists()).eq(true);
      // 测试 type 验证器
      expect(mount(Input, { props: { type: null as any } }).exists()).eq(true);
    });

    it('onRootClick when input is not the target', async () => {
      const wrapper = mount(Input);
      const rootElement = wrapper.find('.t-input');
      const clickEvent = new MouseEvent('click', {
        target: rootElement.element,
      } as any);
      rootElement.element.dispatchEvent(clickEvent);
      await wrapper.vm.$nextTick();
    });

    it('globalConfig placeholder', () => {
      const wrapper = mount(Input);
      // 由于没有设置 placeholder，应该使用全局配置的默认值
      expect(wrapper.find('input').attributes('placeholder')).toBeDefined();
    });
  });
});
