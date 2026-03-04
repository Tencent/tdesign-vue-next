/**
 * Input 组件 hooks 测试文件
 * 测试 useInput、useInputEventHandler、useInputWidth、useLengthLimit 等 hooks
 */
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { Input } from '@tdesign/components/input';
import { simulateInputChange } from '@tdesign/internal-tests/utils';
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
        const wrapper = mount(Input, { attachTo: document.body });
        const vm = wrapper.vm as any;
        vm.focus();
        await nextTick();
        expect(document.activeElement).eq(wrapper.find('input').element);
        wrapper.unmount();
      });

      it('blur method should blur input and update state', async () => {
        const wrapper = mount(Input, { attachTo: document.body });
        const vm = wrapper.vm as any;
        vm.focus();
        await nextTick();
        vm.blur();
        await nextTick();
        expect(document.activeElement).not.eq(wrapper.find('input').element);
        wrapper.unmount();
      });
    });

    describe('composition input handling', () => {
      it('should handle composition input correctly', async () => {
        const onChangeFn = vi.fn();
        const wrapper = mount(Input, {
          props: { onChange: onChangeFn },
        });
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
        const wrapper = mount(Input, {
          props: { value: 'text', onEnter: onEnterFn },
        });
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
        const wrapper = mount(Input, {
          props: { onBlur: onBlurFn },
        });
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
        const wrapper = mount(Input, {
          props: { value: 'Default Keyword', clearable: true, onClear: onClearFn, onChange: onChangeFn },
        });
        wrapper.find('.t-input').trigger('mouseenter');
        await nextTick();
        expect(wrapper.find('.t-input__suffix-clear').exists()).eq(true);
        wrapper.find('.t-input__suffix-clear').trigger('click');
        await nextTick();
        expect(onClearFn).toHaveBeenCalled();
        expect(onChangeFn).toHaveBeenCalled();
        expect(onChangeFn.mock.calls[0][0]).eq('');
      });

      it('should handle clear icon mousedown event', async () => {
        const wrapper = mount(Input, {
          props: { value: 'test', clearable: true },
        });
        wrapper.find('.t-input').trigger('mouseenter');
        await nextTick();

        const clearIcon = wrapper.find('.t-input__suffix-clear');
        expect(clearIcon.exists()).eq(true);

        // 测试 mousedown 事件
        clearIcon.trigger('mousedown');
        await nextTick();
      });

      it('should return undefined when clearing number type input', async () => {
        const onChangeFn = vi.fn();
        const wrapper = mount(Input, {
          props: { type: 'number', value: 123, clearable: true, onChange: onChangeFn },
        });
        wrapper.find('.t-input').trigger('mouseenter');
        await nextTick();
        wrapper.find('.t-input__suffix-clear').trigger('click');
        await nextTick();
        expect(onChangeFn.mock.calls[0][0]).eq(undefined);
      });
    });

    describe('password toggle handling', () => {
      it('should toggle password visibility', async () => {
        const wrapper = mount(Input, {
          props: { type: 'password' },
        });
        wrapper.find('.t-icon-browse-off').trigger('click');
        await nextTick();
        expect(wrapper.find('.t-icon-browse').exists()).eq(true);
        expect(wrapper.find('input').attributes('type')).eq('text');
        wrapper.find('.t-icon-browse').trigger('click');
        await nextTick();
        expect(wrapper.find('.t-icon-browse-off').exists()).eq(true);
        expect(wrapper.find('input').attributes('type')).eq('password');
      });

      it('should not toggle password when disabled', async () => {
        const wrapper = mount(Input, {
          props: { type: 'password', disabled: true },
        });
        const browseIcon = wrapper.find('.t-icon-browse-off');
        expect(browseIcon.exists()).eq(true);
        await browseIcon.trigger('click');
        await nextTick();
        expect(wrapper.find('.t-icon-browse-off').exists()).eq(true);
        expect(wrapper.find('.t-icon-browse').exists()).eq(false);
      });
    });

    describe('format function handling', () => {
      it('should format value on blur', async () => {
        const wrapper = mount(Input, {
          props: { format: (val) => `${val} 元`, value: '100' },
        });
        wrapper.find('input').trigger('focus');
        await nextTick();
        expect(wrapper.find('input').element.value).eq('100');
        wrapper.find('input').trigger('blur');
        await nextTick();
        expect(wrapper.find('input').element.value).eq('100 元');
      });

      it('should format initial value', async () => {
        const wrapper = mount(Input, {
          props: { format: (val) => `$${val}`, defaultValue: '100' },
        });
        await nextTick();
        expect(wrapper.find('input').element.value).eq('$100');
      });

      it('should handle format function with null/undefined values', async () => {
        const formatFn = vi.fn((val) => (val ? `formatted-${val}` : ''));
        mount(Input, {
          props: { format: formatFn, value: null },
        });
        await nextTick();
        expect(formatFn).toHaveBeenCalledWith(null);
      });
    });

    describe('autofocus handling', () => {
      it('should autofocus when autofocus prop is true', async () => {
        const wrapper = mount(Input, {
          props: { autofocus: true },
          attachTo: document.body,
        });
        await nextTick();
        // autofocus 会在 nextTick 后生效
        expect(document.activeElement).eq(wrapper.find('input').element);
        wrapper.unmount();
      });
    });
  });

  describe('useInputEventHandler hook', () => {
    describe('keyboard events', () => {
      it('should handle keydown event', async () => {
        const onKeydownFn = vi.fn();
        const wrapper = mount(Input, {
          props: { value: 'text', onKeydown: onKeydownFn },
        });
        wrapper.find('input').trigger('keydown');
        await nextTick();
        expect(onKeydownFn).toHaveBeenCalled();
        expect(onKeydownFn.mock.calls[0][0]).eq('text');
        expect(onKeydownFn.mock.calls[0][1].e.type).eq('keydown');
      });

      it('should handle keyup event', async () => {
        const onKeyupFn = vi.fn();
        const wrapper = mount(Input, {
          props: { value: 'text', onKeyup: onKeyupFn },
        });
        wrapper.find('input').trigger('keyup');
        await nextTick();
        expect(onKeyupFn).toHaveBeenCalled();
        expect(onKeyupFn.mock.calls[0][0]).eq('text');
        expect(onKeyupFn.mock.calls[0][1].e.type).eq('keyup');
      });

      it('should handle keypress event', async () => {
        const onKeypressFn = vi.fn();
        const wrapper = mount(Input, {
          props: { value: 'text', onKeypress: onKeypressFn },
        });
        wrapper.find('input').trigger('keypress');
        await nextTick();
        expect(onKeypressFn).toHaveBeenCalled();
        expect(onKeypressFn.mock.calls[0][0]).eq('text');
        expect(onKeypressFn.mock.calls[0][1].e.type).eq('keypress');
      });

      it('should handle enter event', async () => {
        const onEnterFn = vi.fn();
        const wrapper = mount(Input, {
          props: { value: 'text', onEnter: onEnterFn },
        });
        wrapper.find('input').trigger('focus');
        await nextTick();
        wrapper.find('input').trigger('keydown.enter');
        await nextTick();
        expect(onEnterFn).toHaveBeenCalled();
        expect(onEnterFn.mock.calls[0][0]).eq('text');
        expect(onEnterFn.mock.calls[0][1].e.type).eq('keydown');
      });

      it('should not trigger keyboard events when disabled', async () => {
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
    });

    describe('mouse events', () => {
      it('should handle mouseenter event', async () => {
        const onMouseenterFn = vi.fn();
        const wrapper = mount(Input, {
          props: { onMouseenter: onMouseenterFn },
        });
        wrapper.find('.t-input').trigger('mouseenter');
        await nextTick();
        expect(onMouseenterFn).toHaveBeenCalled();
        expect(onMouseenterFn.mock.calls[0][0].e.type).eq('mouseenter');
      });

      it('should handle mouseleave event', async () => {
        const onMouseleaveFn = vi.fn();
        const wrapper = mount(Input, {
          props: { onMouseleave: onMouseleaveFn },
        });
        wrapper.find('.t-input').trigger('mouseleave');
        await nextTick();
        expect(onMouseleaveFn).toHaveBeenCalled();
        expect(onMouseleaveFn.mock.calls[0][0].e.type).eq('mouseleave');
      });

      it('should handle wheel event', async () => {
        const onWheelFn = vi.fn();
        const wrapper = mount(Input, {
          props: { onWheel: onWheelFn },
        });
        wrapper.find('input').trigger('wheel');
        await nextTick();
        expect(onWheelFn).toHaveBeenCalled();
        expect(onWheelFn.mock.calls[0][0].e.type).eq('wheel');
      });
    });

    describe('paste event', () => {
      it('should handle paste event', async () => {
        const onPasteFn = vi.fn();
        const wrapper = mount(Input, {
          props: { onPaste: onPasteFn },
        });
        wrapper.find('input').trigger('paste');
        await nextTick();
        expect(onPasteFn).toHaveBeenCalled();
        expect(onPasteFn.mock.calls[0][0].e.type).eq('paste');
      });
    });
  });

  describe('useInputWidth hook', () => {
    describe('autoWidth functionality', () => {
      it('should apply auto-width class when autoWidth is true', () => {
        const wrapper = mount(Input, {
          props: { autoWidth: true },
        });
        expect(wrapper.find('.t-input--auto-width').exists()).eq(true);
      });

      it('should not apply auto-width class when autoWidth is false', () => {
        const wrapper = mount(Input);
        expect(wrapper.find('.t-input--auto-width').exists()).eq(false);
      });

      it('should render span for width calculation', () => {
        const wrapper = mount(Input, {
          props: { autoWidth: true, value: 'test' },
        });
        expect(wrapper.find('.t-input__input-pre').exists()).eq(true);
      });

      it('should not apply auto-width when keepWrapperWidth is true', () => {
        const wrapper = mount(Input, {
          props: { autoWidth: true, keepWrapperWidth: true },
        });
        expect(wrapper.find('.t-input--auto-width').exists()).eq(false);
      });

      it('should handle autoWidth with composition value', async () => {
        const wrapper = mount(Input, {
          props: { autoWidth: true },
        });
        const input = wrapper.find('input');

        // 开始中文输入
        await input.trigger('compositionstart');
        const inputElement = input.element;
        inputElement.value = '测试';
        await input.trigger('input');
        await nextTick();

        // 检查 input-pre 元素是否存在
        const preElement = wrapper.find('.t-input__input-pre');
        expect(preElement.exists()).eq(true);
      });
    });
  });

  describe('useLengthLimit hook', () => {
    describe('maxlength functionality', () => {
      it('should limit value by maxlength', async () => {
        const onChangeFn = vi.fn();
        mount(Input, {
          props: { value: 'Hello TDesign', maxlength: 5, onChange: onChangeFn },
        });
        await nextTick();
        expect(onChangeFn).toHaveBeenCalled();
        expect(onChangeFn.mock.calls[0][0]).eq('Hello');
        expect(onChangeFn.mock.calls[0][1].trigger).eq('initial');
      });

      it('should display limit number with maxlength', () => {
        const wrapper = mount(Input, {
          props: { showLimitNumber: true, maxlength: 5, value: 'TD' },
        });
        expect(wrapper.find('.t-input__limit-number').text()).eq('2/5');
      });

      it('should handle maxlength as string type', async () => {
        const onChangeFn = vi.fn();
        mount(Input, {
          props: { value: 'Hello TDesign', maxlength: '5', onChange: onChangeFn },
        });
        await nextTick();
        expect(onChangeFn).toHaveBeenCalled();
        expect(onChangeFn.mock.calls[0][0]).eq('Hello');
      });
    });

    describe('maxcharacter functionality', () => {
      it('should limit value by maxcharacter', async () => {
        const onChangeFn = vi.fn();
        mount(Input, {
          props: { value: '你好 TDesign', maxcharacter: 4, onChange: onChangeFn },
        });
        await nextTick();
        expect(onChangeFn).toHaveBeenCalled();
        expect(onChangeFn.mock.calls[0][0]).eq('你好');
        expect(onChangeFn.mock.calls[0][1].trigger).eq('initial');
      });

      it('should count Chinese character as 2', async () => {
        const onChangeFn = vi.fn();
        const wrapper = mount(Input, {
          props: { value: '你好', maxcharacter: 4, onChange: onChangeFn },
        });
        await nextTick();
        expect(onChangeFn).not.toHaveBeenCalled();
        expect(wrapper.find('input').element.value).eq('你好');
      });

      it('should display limit number with maxcharacter', () => {
        const wrapper = mount(Input, {
          props: { showLimitNumber: true, maxcharacter: 10, value: '你好' },
        });
        expect(wrapper.find('.t-input__limit-number').text()).eq('4/10');
      });
    });

    describe('allowInputOverMax functionality', () => {
      it('should allow input over max when allowInputOverMax is true', async () => {
        const wrapper = mount(Input, {
          props: { value: 'Hello', maxlength: 5, allowInputOverMax: true },
        });
        const inputDom = wrapper.find('input').element;
        simulateInputChange(inputDom, 'Hello TDesign');
        await nextTick();
        expect(wrapper.find('input').element.value).eq('Hello');
      });

      it('should work with maxcharacter when allowInputOverMax is true', async () => {
        const onChangeFn = vi.fn();
        const wrapper = mount(Input, {
          props: { value: '测试', maxcharacter: 4, allowInputOverMax: true, onChange: onChangeFn },
        });
        const inputDom = wrapper.find('input').element;
        simulateInputChange(inputDom, '测试文本长度');
        await nextTick();
        expect(inputDom.value).eq('测试');
      });
    });

    describe('onValidate functionality', () => {
      it('should trigger onValidate when value exceeds limit', async () => {
        const onValidateFn = vi.fn();
        mount(Input, {
          props: { value: 'Hello World', maxlength: 5, onValidate: onValidateFn },
        });
        await nextTick();
        expect(onValidateFn).toHaveBeenCalled();
        expect(onValidateFn.mock.calls[0][0].error).eq('exceed-maximum');
      });
    });

    describe('limitNumber computation', () => {
      it('should show 0/n when empty', () => {
        const wrapper = mount(Input, {
          props: { showLimitNumber: true, maxlength: 10 },
        });
        expect(wrapper.find('.t-input__limit-number').text()).eq('0/10');
      });

      it('should have disabled class when input is disabled', () => {
        const wrapper = mount(Input, {
          props: { showLimitNumber: true, maxlength: 5, value: 'TD', disabled: true },
        });
        expect(wrapper.find('.t-input__limit-number').classes('t-is-disabled')).eq(true);
      });
    });

    describe('status handling', () => {
      it('should use custom status over inner status', () => {
        const wrapper = mount(Input, {
          props: { value: 'Hello World', maxlength: 5, status: 'success' },
        });
        expect(wrapper.find('.t-is-success').exists()).eq(true);
      });
    });

    describe('warning for both maxlength and maxcharacter', () => {
      it('should work when both maxlength and maxcharacter are set', async () => {
        const wrapper = mount(Input, {
          props: { maxlength: 10, maxcharacter: 20 },
        });
        await nextTick();
        expect(wrapper.exists()).eq(true);
      });
    });

    describe('useLengthLimit function directly', () => {
      it('should return correct limitNumber', () => {
        // 通过组件测试来验证 useLengthLimit 功能
        const wrapper = mount(Input, {
          props: { showLimitNumber: true, maxlength: 10, value: 'test' },
        });
        expect(wrapper.find('.t-input__limit-number').text()).eq('4/10');
      });

      it('should return empty string when no limit set', () => {
        // 通过组件测试来验证 useLengthLimit 功能
        const wrapper = mount(Input, {
          props: { showLimitNumber: true, value: 'test' },
        });
        expect(wrapper.find('.t-input__limit-number').exists()).eq(false);
      });

      it('should handle number value correctly', () => {
        // 通过组件测试来验证 useLengthLimit 功能
        const wrapper = mount(Input, {
          props: { showLimitNumber: true, maxlength: 10, value: 123, type: 'number' },
        });
        expect(wrapper.find('.t-input__limit-number').text()).eq('3/10');
      });
    });
  });
});
