import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import { InputNumber } from '@tdesign/components/input-number';
import InputNumberProps from '@tdesign/components/input-number/props';
import { TdInputNumberProps } from '@tdesign/components/input-number/type';

describe('InputNumber', () => {
  describe(':props', () => {
    it(':align', () => {
      const alignList: TdInputNumberProps['align'][] = ['center', 'right', 'left'];
      alignList.forEach((align) => {
        const wrapper = mount(() => <InputNumber align={align} />);
        const input = wrapper.find('.t-input');
        if (align === 'left') {
          return expect(input.classes()).toEqual(['t-input']);
        }
        expect(input.classes()).toEqual([`t-input`, `t-align-${align}`]);
      });
    });

    it(':align validator', () => {
      const validator = InputNumberProps.align.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('left')).toBe(true);
      expect(validator('center')).toBe(true);
      expect(validator('right')).toBe(true);
      // @ts-expect-error
      expect(validator('invalid')).toBe(false);
    });

    it(':allowInputOverLimit', async () => {
      const value = ref(90);
      const wrapper = mount(() => <InputNumber v-model={value.value} max={100} allowInputOverLimit={true} />);
      const input = wrapper.find('.t-input input');

      // 模拟用户输入超出范围的值
      await input.setValue('110');
      await input.trigger('input');
      await nextTick();
      expect(wrapper.find('.t-input').classes()).toContain('t-is-error');

      // 测试不允许超出范围
      const wrapper2 = mount(() => <InputNumber v-model={value.value} max={100} allowInputOverLimit={false} />);
      const input2 = wrapper2.find('.t-input input');
      await input2.setValue('110');
      await input2.trigger('blur');
      await nextTick();
      expect(value.value).toBe(100);
    });

    it(':autoWidth', () => {
      const wrapper = mount(() => <InputNumber autoWidth />);
      const input = wrapper.find('.t-input__wrap');
      expect(input.classes()).toContain('t-input--auto-width');
    });

    it(':decimalPlaces[number]', () => {
      const value = ref('100');
      const wrapper = mount(() => <InputNumber v-model={value.value} decimalPlaces={2} />);
      const input = wrapper.find('.t-input input');
      expect((input.element as HTMLInputElement).value).toBe('100.00');
    });

    it(':decimalPlaces[object]', () => {
      const value1 = ref('1');
      const wrapper1 = mount(() => (
        <InputNumber v-model={value1.value} decimalPlaces={{ enableRound: true, places: 0 }} largeNumber={true} />
      ));
      const input1 = wrapper1.find('.t-input input');
      expect((input1.element as HTMLInputElement).value).toBe('1');

      const value2 = ref('1');
      const wrapper2 = mount(() => (
        <InputNumber v-model={value2.value} decimalPlaces={{ enableRound: true, places: 0 }} />
      ));
      const input2 = wrapper2.find('.t-input input');
      expect((input2.element as HTMLInputElement).value).toBe('1');

      const value3 = ref('1.356');
      const wrapper3 = mount(() => (
        <InputNumber v-model={value3.value} decimalPlaces={{ enableRound: true, places: 2 }} largeNumber={true} />
      ));
      const input3 = wrapper3.find('.t-input input');
      expect((input3.element as HTMLInputElement).value).toBe('1.36');

      const value4 = ref('1.356');
      const wrapper4 = mount(() => (
        <InputNumber v-model={value4.value} decimalPlaces={{ enableRound: false, places: 2 }} />
      ));
      const input4 = wrapper4.find('.t-input input');
      expect((input4.element as HTMLInputElement).value).toBe('1.35');
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

    it(':format', () => {
      const value = ref(1234);
      const format = (val: any) => `${val}元`;
      const wrapper = mount(() => <InputNumber v-model={value.value} format={format} />);
      const input = wrapper.find('.t-input input');
      expect((input.element as HTMLInputElement).value).toBe('1234元');
    });

    it(':inputProps', async () => {
      // 按照 input props.ts 顺序测试所有透传属性
      const inputProps = {
        // align - 文本内容位置
        align: 'center' as const,
        // allowInputOverMax - 超出限制后是否允许继续输入
        allowInputOverMax: true,
        // autoWidth - 宽度随内容自适应
        autoWidth: true,
        // autocomplete - HTML5 原生属性
        autocomplete: 'off',
        // autofocus - 自动聚焦
        autofocus: true,
        // borderless - 无边框模式
        borderless: true,
        // clearable - 是否可清空
        clearable: true,
        // disabled - 是否禁用
        disabled: true,
        // format - 格式化显示值
        format: (val: any) => `${val}%`,
        // inputClass - input 同级类名
        inputClass: 'custom-input-class',
        // label - 左侧文本
        label: 'Label Text',
        // maxcharacter - 最多字符个数
        maxcharacter: 20,
        // maxlength - 最多文本长度
        maxlength: 10,
        // name - 名称
        name: 'test-input',
        // placeholder - 占位符
        placeholder: '请输入数字',
        // prefixIcon - 前置图标
        prefixIcon: () => <span class="test-prefix-icon">前置图标</span>,
        // readonly - 只读状态
        readonly: true,
        // showClearIconOnEmpty - 空值时悬浮显示清空按钮
        showClearIconOnEmpty: true,
        // showLimitNumber - 显示字数统计
        showLimitNumber: true,
        // size - 输入框尺寸
        size: 'large' as const,
        // spellCheck - 拼写检查
        spellCheck: false,
        // status - 输入框状态
        status: 'warning' as const,
        // suffix - 后置内容
        suffix: 'Suffix Text',
        // suffixIcon - 后置图标
        suffixIcon: () => <span class="test-suffix-icon">后缀图标</span>,
        // tips - 提示文本
        tips: 'This is tips text',
        // type - 输入框类型
        type: 'text' as const,
      };

      const wrapper = mount(() => <InputNumber inputProps={inputProps} value={100} />);
      const inputContainer = wrapper.find('.t-input');
      const inputElement = wrapper.find('.t-input input');
      const inputWrap = wrapper.find('.t-input__wrap');

      // 测试 align - 文本内容位置
      expect(inputContainer.classes()).toContain('t-align-center');

      // 测试 autoWidth - 宽度随内容自适应
      expect(inputWrap.classes()).toContain('t-input--auto-width');

      // 测试 autocomplete - HTML5 原生属性
      expect(inputElement.attributes('autocomplete')).toBe('off');

      // 测试 autofocus - 自动聚焦
      expect(inputElement.attributes('autofocus')).toBeDefined();

      // 测试 borderless - 无边框模式
      expect(inputContainer.classes()).toContain('t-input--borderless');

      // 测试 clearable - 是否可清空
      inputContainer.trigger('mouseenter');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-input__suffix-clear').exists()).toBeTruthy();
      // 取消 trigger
      inputContainer.trigger('mouseleave');
      await wrapper.vm.$nextTick();

      // 测试 disabled - 是否禁用
      expect(inputElement.attributes('disabled')).toBeDefined();
      expect(inputContainer.classes()).toContain('t-is-disabled');

      // 测试 format - 格式化显示值
      expect((inputElement.element as HTMLInputElement).value).toBe('100%');

      // 测试 inputClass - input 同级类名
      expect(inputContainer.classes('custom-input-class')).toBeTruthy();

      // 测试 label - 左侧文本
      // 查找所有 .t-input__prefix 元素，找到包含 Label Text 的那个
      const prefixElements = inputContainer.findAll('.t-input__prefix');
      const labelElement = prefixElements.find((el) => el.text() === 'Label Text');
      expect(labelElement?.exists()).toBe(true);

      // 测试 name - 名称
      expect(inputElement.attributes('name')).toBe('test-input');

      // 测试 placeholder - 占位符
      expect(inputElement.attributes('placeholder')).toBe('请输入数字');

      // 测试 prefixIcon - 前置图标
      const prefixIconElement = inputContainer.find('.test-prefix-icon');
      expect(prefixIconElement.exists()).toBe(true);
      expect(prefixIconElement.text()).toBe('前置图标');

      // 测试 readonly - 只读状态
      expect(inputElement.attributes('readonly')).toBeDefined();
      expect(inputContainer.classes()).toContain('t-is-readonly');

      // 测试 showLimitNumber - 显示字数统计
      expect(inputContainer.find('.t-input__limit-number').exists()).toBe(true);

      // 测试 size - 输入框尺寸
      expect(inputContainer.classes()).toContain('t-size-l');

      // 测试 spellCheck - 拼写检查
      expect(inputElement.attributes('spellcheck')).toBe('false');

      // 测试 status - 输入框状态
      expect(inputContainer.classes()).toContain('t-is-warning');

      // 测试 suffix - 后置内容
      expect(inputContainer.find('.t-input__suffix').text()).toContain('Suffix Text');

      // 测试 suffixIcon - 后置图标
      const suffixIconElement = inputContainer.find('.test-suffix-icon');
      expect(suffixIconElement.exists()).toBe(true);
      expect(suffixIconElement.text()).toBe('后缀图标');

      // 测试 tips - 提示文本
      expect(wrapper.find('.t-input__tips').text()).toBe('This is tips text');

      // 测试 type - 输入框类型
      expect(inputElement.attributes('type')).toBe('text');
    });

    it(':label[string]', () => {
      const wrapper = mount(() => <InputNumber label="标签" />);
      const label = wrapper.find('.t-input .t-input__prefix');
      expect(label.exists()).toBeTruthy();
      expect(label.text()).toBe('标签');
    });

    it(':label[slot]', () => {
      const wrapper = mount(() => (
        <InputNumber v-slots={{ label: () => <span class="custom-label">自定义标签</span> }} />
      ));
      const label = wrapper.find('.custom-label');
      expect(label.exists()).toBeTruthy();
      expect(label.text()).toBe('自定义标签');
    });

    it(':largeNumber', () => {
      const value = ref('19999999999999999');
      const wrapper = mount(() => <InputNumber v-model={value.value} largeNumber />);
      const input = wrapper.find('.t-input input');
      expect((input.element as HTMLInputElement).value).toBe('19999999999999999');
    });

    it(':max', () => {
      const value1 = ref(99);
      const wrapper1 = mount(() => <InputNumber v-model={value1.value} max={99} />);
      const [, btn1] = wrapper1.findAll('button');
      expect(btn1.classes()).toContain('t-is-disabled');

      const value2 = ref(100);
      const wrapper2 = mount(() => <InputNumber v-model={value2.value} max={99} />);
      const [, btn2] = wrapper2.findAll('button');
      expect(wrapper2.find('.t-input').classes()).toContain('t-is-error');
      expect(btn2.classes()).toContain('t-is-disabled');
    });

    it(':min', () => {
      const value1 = ref(98);
      const wrapper1 = mount(() => <InputNumber v-model={value1.value} min={99} />);
      const [btn1] = wrapper1.findAll('button');
      expect(btn1.classes()).toContain('t-is-disabled');

      const value2 = ref(98);
      const wrapper2 = mount(() => <InputNumber v-model={value2.value} min={99} />);
      const [btn2] = wrapper2.findAll('button');
      expect(wrapper2.find('.t-input').classes()).toContain('t-is-error');
      expect(btn2.classes()).toContain('t-is-disabled');
    });

    it(':placeholder', () => {
      const wrapper = mount(() => <InputNumber placeholder="请输入数字" />);
      const input = wrapper.find('.t-input input');
      expect(input.element.getAttribute('placeholder')).toBe('请输入数字');
    });

    it(':readonly', async () => {
      const value = ref(100);
      const wrapper = mount(() => <InputNumber v-model={value.value} readonly />);
      const [btn1, btn2] = wrapper.findAll('button');
      await btn1.trigger('click');
      expect(value.value).toBe(100);
      await btn2.trigger('click');
      expect(value.value).toBe(100);

      const input = wrapper.find('.t-input');
      expect(input.classes()).toContain('t-is-readonly');
    });

    it(':size', () => {
      const sizeList: Array<'small' | 'medium' | 'large'> = ['small', 'medium', 'large'];
      sizeList.forEach((size) => {
        const wrapper = mount(() => <InputNumber size={size} />);
        const container = wrapper.find('.t-input-number');
        expect(container.classes()).toContain(`t-size-${size.slice(0, 1)}`);
      });
    });

    it(':size validator', () => {
      const validator = InputNumberProps.size.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('small')).toBe(true);
      expect(validator('medium')).toBe(true);
      expect(validator('large')).toBe(true);
      // @ts-expect-error
      expect(validator('invalid')).toBe(false);
    });

    it(':status', () => {
      const statusList: Array<'success' | 'warning' | 'error'> = ['success', 'warning', 'error'];
      statusList.forEach((status) => {
        const wrapper = mount(() => <InputNumber status={status} />);
        const input = wrapper.find('.t-input');
        expect(input.classes()).toContain(`t-is-${status}`);
      });
    });

    it(':status validator', () => {
      const validator = InputNumberProps.status.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('default')).toBe(true);
      expect(validator('success')).toBe(true);
      expect(validator('warning')).toBe(true);
      expect(validator('error')).toBe(true);
      // @ts-expect-error
      expect(validator('invalid')).toBe(false);
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

    it(':step with decimal', async () => {
      const value = ref(1);
      const wrapper = mount(() => <InputNumber v-model={value.value} step={0.1} />);
      const [btn1, btn2] = wrapper.findAll('button');
      await btn2.trigger('click');
      expect(value.value).toBe(1.1);
      await btn1.trigger('click');
      expect(value.value).toBe(1);
    });

    it(':suffix[string]', () => {
      const wrapper = mount(() => <InputNumber suffix="个" />);
      const suffix = wrapper.find('.t-input .t-input__suffix');
      expect(suffix.exists()).toBeTruthy();
      expect(suffix.text()).toBe('个');
    });

    it(':suffix[slot]', () => {
      const wrapper = mount(() => <InputNumber v-slots={{ suffix: () => <span class="custom-suffix">单位</span> }} />);
      const suffix = wrapper.find('.custom-suffix');
      expect(suffix.exists()).toBeTruthy();
      expect(suffix.text()).toBe('单位');
    });

    it(':theme', () => {
      const themeList: Array<'column' | 'row' | 'normal'> = ['column', 'row', 'normal'];
      themeList.forEach((theme) => {
        const wrapper = mount(() => <InputNumber theme={theme} />);
        const container = wrapper.find('.t-input-number');
        expect(container.classes()).toContain(`t-input-number--${theme}`);
      });
    });

    it(':theme validator', () => {
      const validator = InputNumberProps.theme.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('column')).toBe(true);
      expect(validator('row')).toBe(true);
      expect(validator('normal')).toBe(true);
      // @ts-expect-error
      expect(validator('invalid')).toBe(false);
    });

    it(':tips[string]', () => {
      const wrapper = mount(() => <InputNumber tips="这是提示信息" />);
      const tips = wrapper.find('.t-input__tips');
      expect(tips.exists()).toBeTruthy();
      expect(tips.text()).toBe('这是提示信息');
    });

    it(':tips[slot]', () => {
      const wrapper = mount(() => <InputNumber v-slots={{ tips: () => <>这是自定义提示</> }}></InputNumber>);
      const tips = wrapper.find('.t-input__tips');
      expect(tips.exists()).toBeTruthy();
      expect(tips.text()).toBe('这是自定义提示');
    });

    it(':value', () => {
      const value = ref(100);
      const wrapper = mount(() => <InputNumber value={value.value} />);
      const input = wrapper.find('.t-input input');
      expect((input.element as HTMLInputElement).value).toBe('100');
    });

    it(':defaultValue', () => {
      const value = ref(100);
      const wrapper = mount(() => <InputNumber defaultValue={value.value} />);
      const input = wrapper.find('.t-input input');
      expect((input.element as HTMLInputElement).value).toBe('100');
    });

    it(':v-model', async () => {
      const value = ref(50);
      const wrapper = mount(() => <InputNumber v-model={value.value} />);
      const input = wrapper.find('.t-input input');

      // 初始值检查
      expect((input.element as HTMLInputElement).value).toBe('50');

      // 更改 value 触发视图更新
      value.value = 100;
      await nextTick();
      expect((input.element as HTMLInputElement).value).toBe('100');
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
      const handleChange = (val: any) => {
        value.value = val;
      };
      const wrapper = mount(<InputNumber v-model={data.value} onChange={handleChange} />);
      const el = wrapper.find('.t-input input').element as HTMLInputElement;
      await nextTick();
      const simulateEvent = (text: string, event: string) => {
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

    it(':onValidate', async () => {
      const value = ref(100);
      const fn = vi.fn();
      const wrapper = mount(() => <InputNumber v-model={value.value} max={99} onValidate={fn} />);
      await wrapper.find('.t-input input').trigger('blur');
      await nextTick();
      expect(fn).toBeCalled();
      // Check the actual structure of the validation object
      const validationResult = fn.mock.calls[0][0];
      expect(validationResult).toBeDefined();
    });

    it(':onValidate with min limit', async () => {
      const value = ref(5);
      const fn = vi.fn();
      const wrapper = mount(() => <InputNumber v-model={value.value} min={10} onValidate={fn} />);
      await wrapper.find('.t-input input').trigger('blur');
      await nextTick();
      expect(fn).toBeCalled();
      // Check the actual structure of the validation object
      const validationResult = fn.mock.calls[0][0];
      expect(validationResult).toBeDefined();
    });
  });

  describe('buttons interaction', () => {
    it('increase button click', async () => {
      const value = ref(10);
      const wrapper = mount(() => <InputNumber v-model={value.value} />);
      const [, increaseBtn] = wrapper.findAll('button');

      await increaseBtn.trigger('click');
      expect(value.value).toBe(11);
    });

    it('decrease button click', async () => {
      const value = ref(10);
      const wrapper = mount(() => <InputNumber v-model={value.value} />);
      const [decreaseBtn] = wrapper.findAll('button');

      await decreaseBtn.trigger('click');
      expect(value.value).toBe(9);
    });

    it('button disabled when at max', async () => {
      const value = ref(10);
      const wrapper = mount(() => <InputNumber v-model={value.value} max={10} />);
      const [, increaseBtn] = wrapper.findAll('button');

      expect(increaseBtn.classes()).toContain('t-is-disabled');
    });

    it('button disabled when at min', async () => {
      const value = ref(0);
      const wrapper = mount(() => <InputNumber v-model={value.value} min={0} />);
      const [decreaseBtn] = wrapper.findAll('button');

      expect(decreaseBtn.classes()).toContain('t-is-disabled');
    });
  });

  describe('keyboard interaction', () => {
    it('ArrowUp increases value', async () => {
      const value = ref(5);
      const wrapper = mount(() => <InputNumber v-model={value.value} />);
      const input = wrapper.find('.t-input input');

      await input.trigger('keydown', { key: 'ArrowUp' });
      await nextTick();
      expect(value.value).toBe(6);
    });

    it('ArrowDown decreases value', async () => {
      const value = ref(5);
      const wrapper = mount(() => <InputNumber v-model={value.value} />);
      const input = wrapper.find('.t-input input');

      await input.trigger('keydown', { key: 'ArrowDown' });
      await nextTick();
      expect(value.value).toBe(4);
    });
  });

  describe('edge cases', () => {
    it('handles empty value', () => {
      const value = ref('');
      const wrapper = mount(() => <InputNumber v-model={value.value} />);
      const input = wrapper.find('.t-input input');
      expect((input.element as HTMLInputElement).value).toBe('');
    });

    it('handles null value', () => {
      const value = ref(null);
      const wrapper = mount(() => <InputNumber v-model={value.value} />);
      const input = wrapper.find('.t-input input');
      expect((input.element as HTMLInputElement).value).toBe('');
    });

    it('handles undefined value', () => {
      const value = ref(undefined);
      const wrapper = mount(() => <InputNumber v-model={value.value} />);
      const input = wrapper.find('.t-input input');
      expect((input.element as HTMLInputElement).value).toBe('');
    });

    it('handles string number value', () => {
      const value = ref('123');
      const wrapper = mount(() => <InputNumber v-model={value.value} />);
      const input = wrapper.find('.t-input input');
      expect((input.element as HTMLInputElement).value).toBe('123');
    });

    it('handles float value', () => {
      const value = ref(123.45);
      const wrapper = mount(() => <InputNumber v-model={value.value} />);
      const input = wrapper.find('.t-input input');
      expect((input.element as HTMLInputElement).value).toBe('123.45');
    });

    it('handles negative value', () => {
      const value = ref(-100);
      const wrapper = mount(() => <InputNumber v-model={value.value} />);
      const input = wrapper.find('.t-input input');
      expect((input.element as HTMLInputElement).value).toBe('-100');
    });

    it('handles zero value', () => {
      const value = ref(0);
      const wrapper = mount(() => <InputNumber v-model={value.value} />);
      const input = wrapper.find('.t-input input');
      expect((input.element as HTMLInputElement).value).toBe('0');
    });
  });

  describe('large number support', () => {
    it('handles large string numbers correctly', () => {
      const value = ref('99999999999999999999');
      const wrapper = mount(() => <InputNumber v-model={value.value} largeNumber />);
      const input = wrapper.find('.t-input input');
      expect((input.element as HTMLInputElement).value).toBe('99999999999999999999');
    });

    it('preserves precision for large numbers', async () => {
      const value = ref('123456789012345678901234567890');
      const wrapper = mount(() => <InputNumber v-model={value.value} largeNumber />);
      const [, increaseBtn] = wrapper.findAll('button');

      await increaseBtn.trigger('click');
      expect(value.value).toBe('123456789012345678901234567891');
    });
  });
});
