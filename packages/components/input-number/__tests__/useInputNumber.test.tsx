import { defineComponent, type SetupContext, reactive } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import useInputNumber from '../hooks/useInputNumber';
import type { TdInputNumberProps } from '../type';

// Mock the common-js functions
vi.mock('@tdesign/common-js/input-number/number', () => ({
  canAddNumber: vi.fn((value, max) => value == null || value < max),
  canReduceNumber: vi.fn((value, min) => value == null || value > min),
  canInputNumber: vi.fn(() => true),
  canSetValue: vi.fn(() => true),
  getMaxOrMinValidateResult: vi.fn((params) => {
    const { value, max, min } = params;
    if (max !== undefined && value > max) return 'exceed-maximum';
    if (min !== undefined && value < min) return 'below-minimum';
    return undefined;
  }),
  getStepValue: vi.fn((params) => {
    const { op, step = 1, lastValue = 0 } = params;
    return op === 'add' ? lastValue + step : lastValue - step;
  }),
  formatThousandths: vi.fn((value) => value),
  formatUnCompleteNumber: vi.fn((value) => (value === '' ? undefined : parseFloat(value))),
  largeNumberToFixed: vi.fn((value, decimalPlaces) => {
    if (decimalPlaces === undefined) return value;
    return parseFloat(value).toFixed(decimalPlaces);
  }),
}));

describe('useInputNumber', () => {
  const createTestComponent = (props: Partial<TdInputNumberProps> = {}) => {
    const mergedProps = {
      defaultValue: 0,
      step: 1,
      max: 100,
      min: 0,
      size: 'medium' as const,
      theme: 'row' as const,
      autoWidth: false,
      largeNumber: false,
      allowInputOverLimit: false,
      ...props,
    };

    return defineComponent({
      props: {
        readonly: Boolean,
        disabled: Boolean,
      },
      setup(props, { expose }: SetupContext) {
        // 使用 reactive 来创建响应式对象，但通过类型断言避免复杂类型推断
        const reactiveProps = reactive({
          ...mergedProps,
          ...props,
        } as TdInputNumberProps);

        const hook = useInputNumber(reactiveProps as any);
        expose({ hook });
        return () => <div></div>;
      },
    });
  };

  describe('initialization', () => {
    it('should initialize with default values', () => {
      const TestComponent = createTestComponent({ defaultValue: 5 });
      const wrapper = mount(TestComponent);
      const hook = wrapper.vm.hook;

      expect(hook.tValue.value).toBe(5);
      expect(hook.userInput.value).toBe('5');
      expect(hook.isError.value).toBeUndefined();
    });

    it('should initialize with undefined value', () => {
      const TestComponent = createTestComponent({ defaultValue: undefined });
      const wrapper = mount(TestComponent);
      const hook = wrapper.vm.hook;

      expect(hook.tValue.value).toBeUndefined();
      expect(hook.userInput.value).toBe('');
    });
  });

  describe('computed properties', () => {
    it('should compute disabled states correctly', () => {
      const TestComponent = createTestComponent({ defaultValue: 5, min: 0, max: 10 });
      const wrapper = mount(TestComponent);
      const hook = wrapper.vm.hook;

      expect(hook.tDisabled.value).toBe(false);
    });

    it('should compute wrap classes correctly', () => {
      const TestComponent = createTestComponent({ theme: 'column', size: 'large', autoWidth: true });
      const wrapper = mount(TestComponent);
      const hook = wrapper.vm.hook;

      const classes = hook.wrapClasses.value;
      expect(classes).toContain('t-input-number');
      expect(classes).toContain('t-size-l');
      // 检查对象形式的类名条件
      expect(classes[2]).toHaveProperty('t-is-controls-right', true);
      expect(classes[2]).toHaveProperty('t-input-number--column', 'column');
      expect(classes[2]).toHaveProperty('t-input-number--auto-width', true);
    });

    it('should compute reduce and add classes correctly', () => {
      const TestComponent = createTestComponent({ defaultValue: 5, min: 0, max: 10 });
      const wrapper = mount(TestComponent);
      const hook = wrapper.vm.hook;

      expect(hook.reduceClasses.value).toContain('t-input-number__decrease');
      expect(hook.addClasses.value).toContain('t-input-number__increase');
    });
  });

  describe('value handling', () => {
    it('should handle value changes correctly', async () => {
      const onChange = vi.fn();
      const TestComponent = createTestComponent({ defaultValue: 5, onChange });
      const wrapper = mount(TestComponent);
      const hook = wrapper.vm.hook;

      hook.onInnerInputChange('10', { e: new Event('input') as InputEvent });
      await nextTick();

      expect(hook.tValue.value).toBe(10);
      expect(hook.userInput.value).toBe('10');
    });

    it('should handle empty input correctly', async () => {
      const TestComponent = createTestComponent({ defaultValue: 5 });
      const wrapper = mount(TestComponent);
      const hook = wrapper.vm.hook;

      hook.onInnerInputChange('', { e: new Event('input') as InputEvent });
      await nextTick();

      expect(hook.tValue.value).toBeUndefined();
      expect(hook.userInput.value).toBe('');
    });

    it('should handle decimal places correctly', async () => {
      const TestComponent = createTestComponent({ defaultValue: 5, decimalPlaces: 2 });
      const wrapper = mount(TestComponent);
      const hook = wrapper.vm.hook;

      hook.onInnerInputChange('5.123', { e: new Event('input') as InputEvent });
      await nextTick();

      expect(hook.userInput.value).toBe('5.12');
    });

    it('should handle decimal places with largeNumber mode', async () => {
      const TestComponent = createTestComponent({
        defaultValue: '999999999999',
        decimalPlaces: 3,
        largeNumber: true,
      });
      const wrapper = mount(TestComponent);
      const hook = wrapper.vm.hook;

      hook.onInnerInputChange('999999999999.123456789', { e: new Event('input') as InputEvent });
      await nextTick();

      expect(hook.userInput.value).toBe('999999999999.123');
    });

    it('should handle decimal places truncation during input', async () => {
      const TestComponent = createTestComponent({ defaultValue: 0, decimalPlaces: 2 });
      const wrapper = mount(TestComponent);
      const hook = wrapper.vm.hook;

      // 测试逐步输入过程中的截断
      hook.onInnerInputChange('12.3456', { e: new Event('input') as InputEvent });
      await nextTick();

      expect(hook.userInput.value).toBe('12.34');
      expect(hook.tValue.value).toBe(12.34);
    });

    it('should not truncate when no decimal places limit', async () => {
      const TestComponent = createTestComponent({ defaultValue: 0 });
      const wrapper = mount(TestComponent);
      const hook = wrapper.vm.hook;

      hook.onInnerInputChange('12.3456789', { e: new Event('input') as InputEvent });
      await nextTick();

      expect(hook.userInput.value).toBe('12.3456789');
      expect(hook.tValue.value).toBe(12.3456789);
    });

    it('should handle decimal places boundary cases with rounding digits', async () => {
      // 测试小数位数限制的边界情况：输入6/7/8/9时应该被截断而不是四舍五入
      const TestComponent = createTestComponent({ defaultValue: 0, decimalPlaces: 2 });
      const wrapper = mount(TestComponent);
      const hook = wrapper.vm.hook;

      // 测试输入包含6/7/8/9的小数，应该被截断而不是四舍五入
      hook.onInnerInputChange('1.116', { e: new Event('input') as InputEvent });
      await nextTick();
      expect(hook.userInput.value).toBe('1.11');

      hook.onInnerInputChange('1.117', { e: new Event('input') as InputEvent });
      await nextTick();
      expect(hook.userInput.value).toBe('1.11');

      hook.onInnerInputChange('1.118', { e: new Event('input') as InputEvent });
      await nextTick();
      expect(hook.userInput.value).toBe('1.11');

      hook.onInnerInputChange('1.119', { e: new Event('input') as InputEvent });
      await nextTick();
      expect(hook.userInput.value).toBe('1.11');

      // 测试另一个场景
      hook.onInnerInputChange('2.346', { e: new Event('input') as InputEvent });
      await nextTick();
      expect(hook.userInput.value).toBe('2.34');

      hook.onInnerInputChange('2.347', { e: new Event('input') as InputEvent });
      await nextTick();
      expect(hook.userInput.value).toBe('2.34');

      hook.onInnerInputChange('2.348', { e: new Event('input') as InputEvent });
      await nextTick();
      expect(hook.userInput.value).toBe('2.34');

      hook.onInnerInputChange('2.349', { e: new Event('input') as InputEvent });
      await nextTick();
      expect(hook.userInput.value).toBe('2.34');
    });
  });

  describe('step operations', () => {
    it('should handle reduce operation correctly', () => {
      const TestComponent = createTestComponent({ defaultValue: 5, step: 1, min: 0 });
      const wrapper = mount(TestComponent);
      const hook = wrapper.vm.hook;

      hook.handleReduce(new MouseEvent('click'));
      expect(hook.tValue.value).toBe(4);
    });

    it('should handle add operation correctly', () => {
      const TestComponent = createTestComponent({ defaultValue: 5, step: 1, max: 10 });
      const wrapper = mount(TestComponent);
      const hook = wrapper.vm.hook;

      hook.handleAdd(new MouseEvent('click'));
      expect(hook.tValue.value).toBe(6);
    });

    it('should not reduce below minimum', () => {
      const TestComponent = createTestComponent({ defaultValue: 0, step: 1, min: 0 });
      const wrapper = mount(TestComponent);
      const hook = wrapper.vm.hook;

      hook.handleReduce(new MouseEvent('click'));
      expect(hook.tValue.value).toBe(0);
    });

    it('should not add above maximum', () => {
      const TestComponent = createTestComponent({ defaultValue: 10, step: 1, max: 10 });
      const wrapper = mount(TestComponent);
      const hook = wrapper.vm.hook;

      hook.handleAdd(new MouseEvent('click'));
      expect(hook.tValue.value).toBe(10);
    });
  });

  describe('event handlers', () => {
    it('should handle focus correctly', () => {
      const onFocus = vi.fn();
      const TestComponent = createTestComponent({ defaultValue: 5, onFocus });
      const wrapper = mount(TestComponent);
      const hook = wrapper.vm.hook;

      hook.listeners.onFocus('5', { e: new FocusEvent('focus') });

      expect(hook.userInput.value).toBe('5');
      expect(onFocus).toHaveBeenCalledWith('5', { e: expect.any(FocusEvent) });
    });

    it('should handle blur correctly', () => {
      const onBlur = vi.fn();
      const TestComponent = createTestComponent({ defaultValue: 5, onBlur });
      const wrapper = mount(TestComponent);
      const hook = wrapper.vm.hook;

      hook.listeners.onBlur('5', { e: new FocusEvent('blur') });

      expect(onBlur).toHaveBeenCalledWith(5, { e: expect.any(FocusEvent) });
    });

    it('should handle keydown with arrow keys', () => {
      const onKeydown = vi.fn();
      const TestComponent = createTestComponent({ defaultValue: 5, onKeydown });
      const wrapper = mount(TestComponent);
      const hook = wrapper.vm.hook;

      const upEvent = new KeyboardEvent('keydown', { code: 'ArrowUp' });
      hook.listeners.onKeydown('5', { e: upEvent });

      expect(hook.tValue.value).toBe(6);
      expect(onKeydown).toHaveBeenCalledWith('5', { e: upEvent });
    });

    it('should handle enter key', () => {
      const onEnter = vi.fn();
      const TestComponent = createTestComponent({ defaultValue: 5, onEnter });
      const wrapper = mount(TestComponent);
      const hook = wrapper.vm.hook;

      const enterEvent = new KeyboardEvent('keydown', { code: 'Enter' });
      hook.listeners.onEnter('5', { e: enterEvent });

      expect(onEnter).toHaveBeenCalledWith(5, { e: enterEvent });
    });
  });

  describe('validation', () => {
    it('should trigger validation on value change', async () => {
      const onValidate = vi.fn();
      const TestComponent = createTestComponent({ defaultValue: 5, min: 0, max: 10, onValidate });
      const wrapper = mount(TestComponent);
      const hook = wrapper.vm.hook;

      hook.onInnerInputChange('15', { e: new Event('input') as InputEvent });
      await nextTick();

      expect(hook.isError.value).toBe('exceed-maximum');
      expect(onValidate).toHaveBeenCalledWith({ error: 'exceed-maximum' });
    });

    it('should trigger validation for below minimum', async () => {
      const onValidate = vi.fn();
      const TestComponent = createTestComponent({ defaultValue: 5, min: 0, max: 10, onValidate });
      const wrapper = mount(TestComponent);
      const hook = wrapper.vm.hook;

      hook.onInnerInputChange('-5', { e: new Event('input') as InputEvent });
      await nextTick();

      expect(hook.isError.value).toBe('below-minimum');
      expect(onValidate).toHaveBeenCalledWith({ error: 'below-minimum' });
    });

    it('should not validate empty or null values', async () => {
      const onValidate = vi.fn();
      const TestComponent = createTestComponent({ defaultValue: 5, min: 0, max: 10, onValidate });
      const wrapper = mount(TestComponent);
      const hook = wrapper.vm.hook;

      hook.onInnerInputChange('', { e: new Event('input') as InputEvent });
      await nextTick();

      expect(hook.isError.value).toBeUndefined();
    });
  });

  describe('large number support', () => {
    it('should handle large numbers correctly', () => {
      const TestComponent = createTestComponent({ defaultValue: '123456789012345678901234567890', largeNumber: true });
      const wrapper = mount(TestComponent);
      const hook = wrapper.vm.hook;

      hook.onInnerInputChange('123456789012345678901234567890', { e: new Event('input') as InputEvent });

      expect(hook.tValue.value).toBe('123456789012345678901234567890');
    });
  });

  describe('focus and blur methods', () => {
    it('should provide focus method', () => {
      const TestComponent = createTestComponent({ defaultValue: 5 });
      const wrapper = mount(TestComponent);
      const hook = wrapper.vm.hook;

      expect(typeof hook.focus).toBe('function');
    });

    it('should provide blur method', () => {
      const TestComponent = createTestComponent({ defaultValue: 5 });
      const wrapper = mount(TestComponent);
      const hook = wrapper.vm.hook;

      expect(typeof hook.blur).toBe('function');
    });
  });

  describe('readonly state', () => {
    it('should respect readonly state', () => {
      const TestComponent = createTestComponent();
      const wrapper = mount(TestComponent, {
        props: { readonly: true },
      });
      const hook = wrapper.vm.hook;

      expect(hook.isReadonly.value).toBe(true);
    });
  });

  describe('disabled state', () => {
    it('should not allow operations when disabled', () => {
      const TestComponent = createTestComponent({ defaultValue: 5 });
      const wrapper = mount(TestComponent, {
        props: { disabled: true },
      });
      const hook = wrapper.vm.hook;

      const originalValue = hook.tValue.value;
      hook.handleAdd(new MouseEvent('click'));
      hook.handleReduce(new MouseEvent('click'));

      expect(hook.tValue.value).toBe(originalValue);
    });
  });
});
