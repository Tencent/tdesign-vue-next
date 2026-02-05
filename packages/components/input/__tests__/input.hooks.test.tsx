// @ts-nocheck
/**
 * Input 组件 hooks 测试文件
 * 测试 useInput、useInputEventHandler、useInputWidth、useLengthLimit 等 hooks
 */
import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { Input } from '@tdesign/components/input';
import { simulateInputChange } from '@tdesign/internal-tests/utils';
import { nextTick, ref, computed } from 'vue';
import { useLengthLimit } from '../hooks/useLengthLimit';
import { getOutputValue } from '../hooks/useInput';

describe('Input Hooks', () => {
  describe('useInput hook', () => {
    describe('getOutputValue function', () => {
      it('should return number for type=number with valid value', () => {
        expect(getOutputValue('123', 'number')).toBe(123);
      });

      it('should return undefined for type=number with empty value', () => {
        expect(getOutputValue('', 'number')).toBe(undefined);
      });

      it('should return 0 for type=number with value 0', () => {
        expect(getOutputValue(0, 'number')).toBe(0);
      });

      it('should return string for non-number type', () => {
        expect(getOutputValue('test', 'text')).toBe('test');
      });

      it('should return undefined for type=number with null value', () => {
        expect(getOutputValue(null, 'number')).toBe(undefined);
      });

      it('should return undefined for type=number with undefined value', () => {
        expect(getOutputValue(undefined, 'number')).toBe(undefined);
      });
    });

    describe('focus/blur methods', () => {
      it('focus method should focus input and update state', async () => {
        const wrapper = mount(<Input></Input>, { attachTo: document.body });
        const vm = wrapper.vm as any;
        vm.focus();
        await nextTick();
        expect(document.activeElement).toBe(wrapper.find('input').element);
        wrapper.unmount();
      });

      it('blur method should blur input and update state', async () => {
        const wrapper = mount(<Input></Input>, { attachTo: document.body });
        const vm = wrapper.vm as any;
        vm.focus();
        await nextTick();
        vm.blur();
        await nextTick();
        expect(document.activeElement).not.toBe(wrapper.find('input').element);
        wrapper.unmount();
      });
    });

    describe('composition input handling', () => {
      it('should handle composition input correctly', async () => {
        const onChangeFn = vi.fn();
        const wrapper = mount(<Input onChange={onChangeFn}></Input>);
        const input = wrapper.find('input');

        // 开始中文输入
        await input.trigger('compositionstart');
        // 模拟输入
        const inputElement = input.element;
        inputElement.value = '中文';
        await input.trigger('input', { inputType: 'insertCompositionText' });
        // 在 composition 期间不应触发 onChange
        expect(onChangeFn).not.toHaveBeenCalled();

        // 结束中文输入
        await input.trigger('compositionend');
        // compositionend 后应触发 onChange
        expect(onChangeFn).toHaveBeenCalled();
      });

      it('should not trigger onEnter during composition', async () => {
        const onEnterFn = vi.fn();
        const wrapper = mount(<Input value="text" onEnter={onEnterFn}></Input>);
        const input = wrapper.find('input');

        // 模拟中文输入法开始
        input.trigger('compositionstart');
        await nextTick();

        // 在输入法激活状态下按回车键，不应该触发 onEnter 事件
        input.trigger('keydown.enter');
        await nextTick();
        expect(onEnterFn).not.toHaveBeenCalled();

        // 模拟中文输入法结束
        input.trigger('compositionend');
        await nextTick();

        // 输入法结束后按回车键，应该正常触发 onEnter 事件
        input.trigger('keydown.enter');
        await nextTick();
        expect(onEnterFn).toHaveBeenCalled();
      });

      it('should handle composition during blur', async () => {
        const onBlurFn = vi.fn();
        const wrapper = mount(<Input onBlur={onBlurFn}></Input>);
        const input = wrapper.find('input');

        // 开始输入法输入
        await input.trigger('compositionstart');
        await input.trigger('focus');
        await nextTick();

        // 在输入法激活状态下失去焦点
        await input.trigger('blur');
        await nextTick();

        expect(onBlurFn).toHaveBeenCalled();
      });
    });

    describe('clear icon handling', () => {
      it('should handle clear icon click', async () => {
        const onClearFn = vi.fn();
        const onChangeFn = vi.fn();
        const wrapper = mount(
          <Input value="Default Keyword" clearable={true} onClear={onClearFn} onChange={onChangeFn}></Input>,
        );
        wrapper.find('.t-input').trigger('mouseenter');
        await nextTick();
        expect(wrapper.find('.t-input__suffix-clear').exists()).toBeTruthy();
        wrapper.find('.t-input__suffix-clear').trigger('click');
        await nextTick();
        expect(onClearFn).toHaveBeenCalled();
        expect(onChangeFn).toHaveBeenCalled();
        expect(onChangeFn.mock.calls[0][0]).toBe('');
      });

      it('should handle clear icon mousedown event', async () => {
        const wrapper = mount(<Input value="test" clearable></Input>);
        wrapper.find('.t-input').trigger('mouseenter');
        await nextTick();

        const clearIcon = wrapper.find('.t-input__suffix-clear');
        expect(clearIcon.exists()).toBeTruthy();

        // 测试 mousedown 事件
        clearIcon.trigger('mousedown');
        await nextTick();
      });

      it('should return undefined when clearing number type input', async () => {
        const onChangeFn = vi.fn();
        const wrapper = mount(<Input type="number" value={123} clearable={true} onChange={onChangeFn}></Input>);
        wrapper.find('.t-input').trigger('mouseenter');
        await nextTick();
        wrapper.find('.t-input__suffix-clear').trigger('click');
        await nextTick();
        expect(onChangeFn.mock.calls[0][0]).toBe(undefined);
      });
    });

    describe('password toggle handling', () => {
      it('should toggle password visibility', async () => {
        const wrapper = mount(<Input type="password"></Input>);
        wrapper.find('.t-icon-browse-off').trigger('click');
        await nextTick();
        expect(wrapper.find('.t-icon-browse').exists()).toBeTruthy();
        expect(wrapper.find('input').attributes('type')).toBe('text');
        wrapper.find('.t-icon-browse').trigger('click');
        await nextTick();
        expect(wrapper.find('.t-icon-browse-off').exists()).toBeTruthy();
        expect(wrapper.find('input').attributes('type')).toBe('password');
      });

      it('should not toggle password when disabled', async () => {
        const wrapper = mount(<Input type="password" disabled={true}></Input>);
        const browseIcon = wrapper.find('.t-icon-browse-off');
        expect(browseIcon.exists()).toBeTruthy();
        await browseIcon.trigger('click');
        await nextTick();
        expect(wrapper.find('.t-icon-browse-off').exists()).toBeTruthy();
        expect(wrapper.find('.t-icon-browse').exists()).toBeFalsy();
      });
    });

    describe('format function handling', () => {
      it('should format value on blur', async () => {
        const wrapper = mount(<Input format={(val) => `${val} 元`} value="100"></Input>);
        wrapper.find('input').trigger('focus');
        await nextTick();
        expect(wrapper.find('input').element.value).toBe('100');
        wrapper.find('input').trigger('blur');
        await nextTick();
        expect(wrapper.find('input').element.value).toBe('100 元');
      });

      it('should format initial value', async () => {
        const wrapper = mount(<Input format={(val) => `$${val}`} defaultValue="100"></Input>);
        await nextTick();
        expect(wrapper.find('input').element.value).toBe('$100');
      });

      it('should handle format function with null/undefined values', async () => {
        const formatFn = vi.fn((val) => (val ? `formatted-${val}` : ''));
        const wrapper = mount(<Input format={formatFn} value={null}></Input>);
        await nextTick();
        expect(formatFn).toHaveBeenCalledWith(null);
      });
    });

    describe('autofocus handling', () => {
      it('should autofocus when autofocus prop is true', async () => {
        const wrapper = mount(<Input autofocus={true}></Input>, { attachTo: document.body });
        await nextTick();
        // autofocus 会在 nextTick 后生效
        expect(document.activeElement).toBe(wrapper.find('input').element);
        wrapper.unmount();
      });
    });
  });

  describe('useInputEventHandler hook', () => {
    describe('keyboard events', () => {
      it('should handle keydown event', async () => {
        const onKeydownFn = vi.fn();
        const wrapper = mount(<Input value="text" onKeydown={onKeydownFn}></Input>);
        wrapper.find('input').trigger('keydown');
        await nextTick();
        expect(onKeydownFn).toHaveBeenCalled();
        expect(onKeydownFn.mock.calls[0][0]).toBe('text');
        expect(onKeydownFn.mock.calls[0][1].e.type).toBe('keydown');
      });

      it('should handle keyup event', async () => {
        const onKeyupFn = vi.fn();
        const wrapper = mount(<Input value="text" onKeyup={onKeyupFn}></Input>);
        wrapper.find('input').trigger('keyup');
        await nextTick();
        expect(onKeyupFn).toHaveBeenCalled();
        expect(onKeyupFn.mock.calls[0][0]).toBe('text');
        expect(onKeyupFn.mock.calls[0][1].e.type).toBe('keyup');
      });

      it('should handle keypress event', async () => {
        const onKeypressFn = vi.fn();
        const wrapper = mount(<Input value="text" onKeypress={onKeypressFn}></Input>);
        wrapper.find('input').trigger('keypress');
        await nextTick();
        expect(onKeypressFn).toHaveBeenCalled();
        expect(onKeypressFn.mock.calls[0][0]).toBe('text');
        expect(onKeypressFn.mock.calls[0][1].e.type).toBe('keypress');
      });

      it('should handle enter event', async () => {
        const onEnterFn = vi.fn();
        const wrapper = mount(<Input value="text" onEnter={onEnterFn}></Input>);
        wrapper.find('input').trigger('focus');
        await nextTick();
        wrapper.find('input').trigger('keydown.enter');
        await nextTick();
        expect(onEnterFn).toHaveBeenCalled();
        expect(onEnterFn.mock.calls[0][0]).toBe('text');
        expect(onEnterFn.mock.calls[0][1].e.type).toBe('keydown');
      });

      it('should not trigger keyboard events when disabled', async () => {
        const onKeydownFn = vi.fn();
        const onKeyupFn = vi.fn();
        const onKeypressFn = vi.fn();
        const wrapper = mount(
          <Input disabled={true} onKeydown={onKeydownFn} onKeyup={onKeyupFn} onKeypress={onKeypressFn}></Input>,
        );
        await wrapper.find('input').trigger('keydown');
        await wrapper.find('input').trigger('keyup');
        await wrapper.find('input').trigger('keypress');
        expect(onKeydownFn).not.toHaveBeenCalled();
        expect(onKeyupFn).not.toHaveBeenCalled();
        expect(onKeypressFn).not.toHaveBeenCalled();
      });
    });

    describe('mouse events', () => {
      it('should handle mouseenter event', async () => {
        const onMouseenterFn = vi.fn();
        const wrapper = mount(<Input onMouseenter={onMouseenterFn}></Input>);
        wrapper.find('.t-input').trigger('mouseenter');
        await nextTick();
        expect(onMouseenterFn).toHaveBeenCalled();
        expect(onMouseenterFn.mock.calls[0][0].e.type).toBe('mouseenter');
      });

      it('should handle mouseleave event', async () => {
        const onMouseleaveFn = vi.fn();
        const wrapper = mount(<Input onMouseleave={onMouseleaveFn}></Input>);
        wrapper.find('.t-input').trigger('mouseleave');
        await nextTick();
        expect(onMouseleaveFn).toHaveBeenCalled();
        expect(onMouseleaveFn.mock.calls[0][0].e.type).toBe('mouseleave');
      });

      it('should handle wheel event', async () => {
        const onWheelFn = vi.fn();
        const wrapper = mount(<Input onWheel={onWheelFn}></Input>);
        wrapper.find('input').trigger('wheel');
        await nextTick();
        expect(onWheelFn).toHaveBeenCalled();
        expect(onWheelFn.mock.calls[0][0].e.type).toBe('wheel');
      });
    });

    describe('paste event', () => {
      it('should handle paste event', async () => {
        const onPasteFn = vi.fn();
        const wrapper = mount(<Input onPaste={onPasteFn}></Input>);
        wrapper.find('input').trigger('paste');
        await nextTick();
        expect(onPasteFn).toHaveBeenCalled();
        expect(onPasteFn.mock.calls[0][0].e.type).toBe('paste');
      });
    });
  });

  describe('useInputWidth hook', () => {
    describe('autoWidth functionality', () => {
      it('should apply auto-width class when autoWidth is true', () => {
        const wrapper = mount(<Input autoWidth></Input>);
        expect(wrapper.find('.t-input--auto-width').exists()).toBeTruthy();
      });

      it('should not apply auto-width class when autoWidth is false', () => {
        const wrapper = mount(<Input></Input>);
        expect(wrapper.find('.t-input--auto-width').exists()).toBeFalsy();
      });

      it('should render span for width calculation', () => {
        const wrapper = mount(<Input autoWidth value="test"></Input>);
        expect(wrapper.find('.t-input__input-pre').exists()).toBeTruthy();
      });

      it('should not apply auto-width when keepWrapperWidth is true', () => {
        const wrapper = mount(<Input autoWidth keepWrapperWidth={true}></Input>);
        expect(wrapper.find('.t-input--auto-width').exists()).toBeFalsy();
      });

      it('should handle autoWidth with composition value', async () => {
        const wrapper = mount(<Input autoWidth></Input>);
        const input = wrapper.find('input');

        // 开始中文输入
        await input.trigger('compositionstart');
        const inputElement = input.element;
        inputElement.value = '测试';
        await input.trigger('input');
        await nextTick();

        // 检查 input-pre 元素是否存在
        const preElement = wrapper.find('.t-input__input-pre');
        expect(preElement.exists()).toBeTruthy();
      });
    });
  });

  describe('useLengthLimit hook', () => {
    describe('maxlength functionality', () => {
      it('should limit value by maxlength', async () => {
        const onChangeFn = vi.fn();
        const wrapper = mount(<Input value="Hello TDesign" maxlength={5} onChange={onChangeFn}></Input>);
        await nextTick();
        expect(onChangeFn).toHaveBeenCalled();
        expect(onChangeFn.mock.calls[0][0]).toBe('Hello');
        expect(onChangeFn.mock.calls[0][1].trigger).toBe('initial');
      });

      it('should display limit number with maxlength', () => {
        const wrapper = mount(<Input showLimitNumber={true} maxlength={5} value="TD"></Input>);
        expect(wrapper.find('.t-input__limit-number').text()).toBe('2/5');
      });

      it('should handle maxlength as string type', async () => {
        const onChangeFn = vi.fn();
        const wrapper = mount(<Input value="Hello TDesign" maxlength="5" onChange={onChangeFn}></Input>);
        await nextTick();
        expect(onChangeFn).toHaveBeenCalled();
        expect(onChangeFn.mock.calls[0][0]).toBe('Hello');
      });
    });

    describe('maxcharacter functionality', () => {
      it('should limit value by maxcharacter', async () => {
        const onChangeFn = vi.fn();
        const wrapper = mount(<Input value="你好 TDesign" maxcharacter={4} onChange={onChangeFn}></Input>);
        await nextTick();
        expect(onChangeFn).toHaveBeenCalled();
        expect(onChangeFn.mock.calls[0][0]).toBe('你好');
        expect(onChangeFn.mock.calls[0][1].trigger).toBe('initial');
      });

      it('should count Chinese character as 2', async () => {
        const onChangeFn = vi.fn();
        const wrapper = mount(<Input value="你好" maxcharacter={4} onChange={onChangeFn}></Input>);
        await nextTick();
        expect(onChangeFn).not.toHaveBeenCalled();
        expect(wrapper.find('input').element.value).toBe('你好');
      });

      it('should display limit number with maxcharacter', () => {
        const wrapper = mount(<Input showLimitNumber={true} maxcharacter={10} value="你好"></Input>);
        expect(wrapper.find('.t-input__limit-number').text()).toBe('4/10');
      });
    });

    describe('allowInputOverMax functionality', () => {
      it('should allow input over max when allowInputOverMax is true', async () => {
        const wrapper = mount(<Input value="Hello" maxlength={5} allowInputOverMax={true}></Input>);
        const inputDom = wrapper.find('input').element;
        simulateInputChange(inputDom, 'Hello TDesign');
        await nextTick();
        expect(wrapper.find('input').element.value).toBe('Hello');
      });

      it('should work with maxcharacter when allowInputOverMax is true', async () => {
        const onChangeFn = vi.fn();
        const wrapper = mount(
          <Input value="测试" maxcharacter={4} allowInputOverMax={true} onChange={onChangeFn}></Input>,
        );
        const inputDom = wrapper.find('input').element;
        simulateInputChange(inputDom, '测试文本长度');
        await nextTick();
        expect(inputDom.value).toBe('测试');
      });
    });

    describe('onValidate functionality', () => {
      it('should trigger onValidate when value exceeds limit', async () => {
        const onValidateFn = vi.fn();
        const wrapper = mount(<Input value="Hello World" maxlength={5} onValidate={onValidateFn}></Input>);
        await nextTick();
        expect(onValidateFn).toHaveBeenCalled();
        expect(onValidateFn.mock.calls[0][0].error).toBe('exceed-maximum');
      });
    });

    describe('limitNumber computation', () => {
      it('should show 0/n when empty', () => {
        const wrapper = mount(<Input showLimitNumber={true} maxlength={10}></Input>);
        expect(wrapper.find('.t-input__limit-number').text()).toBe('0/10');
      });

      it('should have disabled class when input is disabled', () => {
        const wrapper = mount(<Input showLimitNumber={true} maxlength={5} value="TD" disabled></Input>);
        expect(wrapper.find('.t-input__limit-number').classes('t-is-disabled')).toBeTruthy();
      });
    });

    describe('status handling', () => {
      it('should use custom status over inner status', () => {
        const wrapper = mount(<Input value="Hello World" maxlength={5} status="success"></Input>);
        expect(wrapper.find('.t-is-success').exists()).toBeTruthy();
      });
    });

    describe('warning for both maxlength and maxcharacter', () => {
      it('should work when both maxlength and maxcharacter are set', async () => {
        const wrapper = mount(<Input maxlength={10} maxcharacter={20}></Input>);
        await nextTick();
        expect(wrapper.exists()).toBeTruthy();
      });
    });

    describe('useLengthLimit function directly', () => {
      it('should return correct limitNumber', () => {
        const params = computed(() => ({
          value: 'test',
          status: undefined as any,
          maxlength: 10,
          maxcharacter: undefined as number,
          allowInputOverMax: false,
          onValidate: undefined as any,
        }));

        const { limitNumber } = useLengthLimit(params);
        expect(limitNumber.value).toBe('4/10');
      });

      it('should return empty string when no limit set', () => {
        const params = computed(() => ({
          value: 'test',
          status: undefined as any,
          maxlength: undefined as number,
          maxcharacter: undefined as number,
          allowInputOverMax: false,
          onValidate: undefined as any,
        }));

        const { limitNumber } = useLengthLimit(params);
        expect(limitNumber.value).toBe('');
      });

      it('should handle number value correctly', () => {
        const params = computed(() => ({
          value: '123' as any,
          status: undefined as any,
          maxlength: 10,
          maxcharacter: undefined as number,
          allowInputOverMax: false,
          onValidate: undefined as any,
        }));

        const { limitNumber } = useLengthLimit(params);
        expect(limitNumber.value).toBe('3/10');
      });
    });
  });
});
