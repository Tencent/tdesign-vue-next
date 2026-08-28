import { nextTick, ref, type VNode } from 'vue';
import { mount, type VueWrapper } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { TimeIcon } from 'tdesign-icons-vue-next';
import { TimePicker, TimeRangePicker } from '@tdesign/components/time-picker';
import TimePickerPanel from '@tdesign/components/time-picker/panel/time-picker-panel';
import { SelectInput } from '@tdesign/components/select-input';
import timePickerProps from '@tdesign/components/time-picker/props';

type EventHandler = (...args: unknown[]) => unknown;

const wrappers: VueWrapper[] = [];

const renderTimePicker = (options: Parameters<typeof mount>[1] = {}) => {
  const wrapper = mount(TimePicker, options);
  wrappers.push(wrapper);
  return wrapper;
};

const getSelectInput = (wrapper: VueWrapper) => wrapper.findComponent(SelectInput);

const callHandler = (handler: unknown, ...args: unknown[]) => (handler as EventHandler)(...args);

const getPanelVNode = (wrapper: VueWrapper) =>
  callHandler(getSelectInput(wrapper).props('panel')) as VNode & { props: Record<string, unknown> };

const openPicker = async (wrapper: VueWrapper) => {
  const event = new MouseEvent('click');
  callHandler(getSelectInput(wrapper).props('onPopupVisibleChange'), true, { e: event });
  await nextTick();
  return event;
};

describe('TimePicker', () => {
  afterEach(() => {
    wrappers.splice(0).forEach((wrapper) => wrapper.unmount());
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  describe('props', () => {
    it(':allowInput[boolean]', () => {
      const readonlyWrapper = renderTimePicker();
      const editableWrapper = renderTimePicker({ props: { allowInput: true } });

      expect(getSelectInput(readonlyWrapper).props('allowInput')).toBe(false);
      expect(readonlyWrapper.find('input').attributes('readonly')).toBe('');
      expect(getSelectInput(editableWrapper).props('allowInput')).toBe(true);
      expect(editableWrapper.find('input').attributes('readonly')).toBeUndefined();
    });

    it(':borderless[boolean]', () => {
      const wrapper = renderTimePicker({ props: { borderless: true } });

      expect(getSelectInput(wrapper).props('borderless')).toBe(true);
    });

    it(':clearable[boolean]', () => {
      const wrapper = renderTimePicker({ props: { clearable: true, value: '10:20:30' } });

      expect(getSelectInput(wrapper).props('clearable')).toBe(true);
    });

    it(':disableTime[function]', () => {
      const disableTime = vi.fn(() => ({ hour: [1] }));
      const wrapper = renderTimePicker({ props: { disableTime } });
      const panel = getPanelVNode(wrapper);

      expect(panel.type).toBe(TimePickerPanel);
      expect(panel.props.disableTime).toBe(disableTime);
    });

    it(':disabled[boolean]', () => {
      const wrapper = renderTimePicker({ props: { disabled: true } });

      expect(getSelectInput(wrapper).props('disabled')).toBe(true);
      expect(wrapper.find('.t-is-disabled').exists()).toBe(true);
    });

    it(':format[string]', () => {
      const wrapper = renderTimePicker({ props: { format: 'HH:mm' } });

      expect(getPanelVNode(wrapper).props.format).toBe('HH:mm');
    });

    it(':hideDisabledTime[boolean]', () => {
      const wrapper = renderTimePicker({ props: { hideDisabledTime: false } });

      expect(getPanelVNode(wrapper).props.hideDisabledTime).toBe(false);
    });

    it(':inputProps[object]', () => {
      const wrapper = renderTimePicker({
        props: { inputProps: { autocomplete: 'off', maxlength: 8 }, size: 'large' },
      });

      expect(getSelectInput(wrapper).props('inputProps')).toMatchObject({
        autocomplete: 'off',
        maxlength: 8,
        size: 'large',
      });
    });

    it(':label[string]', () => {
      const wrapper = renderTimePicker({ props: { label: '开始时间' } });

      expect(getSelectInput(wrapper).props('label')).toBe('开始时间');
      expect(wrapper.find('.t-input__prefix').text()).toBe('开始时间');
    });

    it(':label[function]', () => {
      const wrapper = renderTimePicker({ props: { label: () => <span class="label-function">函数标签</span> } });

      expect(wrapper.find('.label-function').text()).toBe('函数标签');
    });

    it(':label[slot] currently is not rendered', () => {
      const wrapper = renderTimePicker({ slots: { label: () => <span class="label-slot">插槽标签</span> } });

      // Current behavior: TimePicker forwards only the label prop and does not consume the documented label slot.
      expect(wrapper.find('.label-slot').exists()).toBe(false);
    });

    it(':placeholder[string]', () => {
      const wrapper = renderTimePicker({ props: { placeholder: '请选择时间' } });

      expect(getSelectInput(wrapper).props('placeholder')).toBe('请选择时间');
      expect(wrapper.find('input').attributes('placeholder')).toBe('请选择时间');
    });

    it(':placeholder[string] is hidden when a value exists', () => {
      const wrapper = renderTimePicker({ props: { placeholder: '请选择时间', value: '10:20:30' } });

      expect(getSelectInput(wrapper).props('placeholder')).toBe('');
    });

    it(':popupProps[object]', () => {
      const onVisibleChange = vi.fn();
      const wrapper = renderTimePicker({
        props: { popupProps: { placement: 'top', overlayInnerStyle: { color: 'red' }, onVisibleChange } },
      });

      expect(getSelectInput(wrapper).props('popupProps')).toMatchObject({
        placement: 'top',
        overlayInnerStyle: { color: 'red' },
        onVisibleChange,
      });
    });

    it(':prefixIcon[function]', () => {
      const wrapper = renderTimePicker({ props: { prefixIcon: () => <span class="prefix-function">P</span> } });

      expect(wrapper.find('.prefix-function').text()).toBe('P');
    });

    it(':prefixIcon[slot]', () => {
      const wrapper = renderTimePicker({ slots: { prefixIcon: () => <span class="prefix-slot">P</span> } });

      expect(wrapper.find('.prefix-slot').text()).toBe('P');
    });

    it(':presets[object]', () => {
      const presets = { 上午: '09:00:00', 当前: () => '12:00:00' };
      const wrapper = renderTimePicker({ props: { presets } });

      expect(getPanelVNode(wrapper).props.presets).toEqual(presets);
    });

    it(':readonly[boolean]', async () => {
      const wrapper = renderTimePicker({ props: { readonly: true } });

      await openPicker(wrapper);
      expect(getSelectInput(wrapper).props('popupVisible')).toBe(false);
    });

    it(':selectInputProps[object]', () => {
      const onEnter = vi.fn();
      const wrapper = renderTimePicker({
        props: { selectInputProps: { autofocus: true, autoWidth: true, onEnter } },
      });

      expect(getSelectInput(wrapper).props()).toMatchObject({ autofocus: true, autoWidth: true, onEnter });
    });

    it(':size[string]', () => {
      const validator = timePickerProps.size.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator('small')).toBe(true);
      // @ts-expect-error testing unsupported value
      expect(validator('giant')).toBe(false);

      (['small', 'medium', 'large'] as const).forEach((size) => {
        const wrapper = renderTimePicker({ props: { size } });
        expect(getSelectInput(wrapper).props('inputProps')).toMatchObject({ size });
      });
    });

    it(':status[string]', () => {
      const validator = timePickerProps.status.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator('error')).toBe(true);
      // @ts-expect-error testing unsupported value
      expect(validator('info')).toBe(false);

      const wrapper = renderTimePicker({ props: { status: 'warning' } });
      expect(getSelectInput(wrapper).props('status')).toBe('warning');
    });

    it(':steps[array]', () => {
      const wrapper = renderTimePicker({ props: { steps: [2, '5', 10] } });

      expect(getPanelVNode(wrapper).props.steps).toEqual([2, '5', 10]);
    });

    it(':suffixIcon[function]', () => {
      const wrapper = renderTimePicker({ props: { suffixIcon: () => <span class="suffix-function">S</span> } });

      expect(wrapper.find('.suffix-function').text()).toBe('S');
      expect(wrapper.findComponent(TimeIcon).exists()).toBe(false);
    });

    it(':suffixIcon[slot]', () => {
      const wrapper = renderTimePicker({ slots: { suffixIcon: () => <span class="suffix-slot">S</span> } });

      expect(wrapper.find('.suffix-slot').text()).toBe('S');
      expect(wrapper.findComponent(TimeIcon).exists()).toBe(false);
    });

    it(':suffixIcon[default]', () => {
      const wrapper = renderTimePicker();

      expect(wrapper.findComponent(TimeIcon).exists()).toBe(true);
    });

    it(':tips[string]', () => {
      const wrapper = renderTimePicker({ props: { tips: '请选择有效时间' } });

      expect(getSelectInput(wrapper).props('tips')).toBe('请选择有效时间');
      expect(wrapper.text()).toContain('请选择有效时间');
    });

    it(':tips[function]', () => {
      const wrapper = renderTimePicker({ props: { tips: () => <span class="tips-function">函数提示</span> } });

      expect(wrapper.find('.tips-function').text()).toBe('函数提示');
    });

    it(':tips[slot] currently is not rendered', () => {
      const wrapper = renderTimePicker({ slots: { tips: () => <span class="tips-slot">插槽提示</span> } });

      // Current behavior mirrors label: the slot is not forwarded to SelectInput.
      expect(wrapper.find('.tips-slot').exists()).toBe(false);
    });

    it(':value[string]', () => {
      const wrapper = renderTimePicker({ props: { value: '10:20:30' } });

      expect(getSelectInput(wrapper).props('value')).toBe('10:20:30');
      expect(wrapper.find('input').element.value).toBe('10:20:30');
    });

    it(':modelValue[string]', () => {
      const wrapper = renderTimePicker({ props: { modelValue: '11:22:33' } });

      expect(getSelectInput(wrapper).props('value')).toBe('11:22:33');
    });

    it(':defaultValue[string]', async () => {
      const onChange = vi.fn();
      const wrapper = renderTimePicker({ props: { defaultValue: '01:02:03', onChange } });

      await openPicker(wrapper);
      callHandler(getPanelVNode(wrapper).props.onChange, '04:05:06', new MouseEvent('click'));
      callHandler(getPanelVNode(wrapper).props.handleConfirmClick, new MouseEvent('click'));
      await nextTick();

      expect(onChange).toHaveBeenCalledWith('04:05:06');
      expect(getSelectInput(wrapper).props('value')).toBe('04:05:06');
    });

    it(':valueDisplay[string]', () => {
      const wrapper = renderTimePicker({ props: { value: '10:20:30', valueDisplay: '自定义值' } });

      expect(wrapper.text()).toContain('自定义值');
    });

    it(':valueDisplay[function]', async () => {
      const valueDisplay = vi.fn((_h, { value }) => <span class="value-function">{value}</span>);
      const wrapper = renderTimePicker({ props: { value: '10:20:30', valueDisplay } });

      expect(wrapper.find('.value-function').text()).toBe('10:20:30');
      await openPicker(wrapper);
      expect(valueDisplay).toHaveBeenLastCalledWith(
        expect.any(Function),
        expect.objectContaining({ value: '10:20:30' }),
      );
    });

    it(':valueDisplay[slot]', () => {
      const wrapper = renderTimePicker({
        props: { value: '10:20:30' },
        slots: { valueDisplay: ({ value }: { value: string }) => <span class="value-slot">{value}</span> },
      });

      expect(wrapper.find('.value-slot').text()).toBe('10:20:30');
    });
  });

  describe('events', () => {
    it('open/close', async () => {
      const onOpen = vi.fn();
      const onClose = vi.fn();
      const wrapper = renderTimePicker({ props: { onOpen, onClose } });
      const openEvent = new MouseEvent('click');
      const closeEvent = new MouseEvent('click');

      callHandler(getSelectInput(wrapper).props('onPopupVisibleChange'), true, { e: openEvent });
      await nextTick();
      expect(onOpen).toHaveBeenCalledWith({ e: openEvent });

      callHandler(getSelectInput(wrapper).props('onPopupVisibleChange'), false, { e: closeEvent });
      await nextTick();
      expect(onClose).toHaveBeenCalledWith({ e: closeEvent });
      expect(getSelectInput(wrapper).props('popupVisible')).toBe(false);
    });

    it('clear/change', async () => {
      const onClear = vi.fn();
      const onChange = vi.fn();
      const stopPropagation = vi.fn();
      const wrapper = renderTimePicker({ props: { defaultValue: '10:20:30', onClear, onChange } });
      const event = { stopPropagation };

      callHandler(getSelectInput(wrapper).props('onClear'), { e: event });
      await nextTick();

      expect(stopPropagation).toHaveBeenCalledTimes(1);
      expect(onClear).toHaveBeenCalledWith({ e: event });
      expect(onChange).toHaveBeenCalledWith(null);
      expect(getSelectInput(wrapper).props('value')).toBeUndefined();
    });

    it('input/blur accepts and formats a valid input', async () => {
      const onBlur = vi.fn();
      const onChange = vi.fn();
      const wrapper = renderTimePicker({ props: { allowInput: true, defaultValue: '10:20:30', onBlur, onChange } });
      const event = new FocusEvent('blur');

      await openPicker(wrapper);
      callHandler(getSelectInput(wrapper).props('onInputChange'), '01:02:03');
      callHandler(getSelectInput(wrapper).props('onBlur'), '01:02:03', { inputValue: '01:02:03', e: event });
      await nextTick();

      expect(onChange).toHaveBeenCalledWith('01:02:03');
      expect(onBlur).toHaveBeenCalledWith({
        value: '01:02:03',
        inputValue: '01:02:03',
        e: event,
      });
    });

    it('input/blur keeps the value for invalid or non-editable input', async () => {
      const onChange = vi.fn();
      const editableWrapper = renderTimePicker({ props: { allowInput: true, defaultValue: '10:20:30', onChange } });
      await openPicker(editableWrapper);
      callHandler(getSelectInput(editableWrapper).props('onInputChange'), 'invalid');
      callHandler(getSelectInput(editableWrapper).props('onBlur'), 'invalid', {
        inputValue: 'invalid',
        e: new FocusEvent('blur'),
      });

      const readonlyWrapper = renderTimePicker({ props: { defaultValue: '10:20:30', onChange } });
      callHandler(getSelectInput(readonlyWrapper).props('onInputChange'), '01:02:03');
      callHandler(getSelectInput(readonlyWrapper).props('onBlur'), '01:02:03', {
        inputValue: '01:02:03',
        e: new FocusEvent('blur'),
      });

      expect(onChange).not.toHaveBeenCalled();
    });

    it('input currently does not call the public onInput callback', () => {
      const onInput = vi.fn();
      const wrapper = renderTimePicker({ props: { onInput } });

      callHandler(getSelectInput(wrapper).props('onInputChange'), '10:20:30');

      // Current behavior: handleInputChange updates only internal currentValue and never invokes props.onInput.
      expect(onInput).not.toHaveBeenCalled();
    });

    it('focus', () => {
      const onFocus = vi.fn();
      const wrapper = renderTimePicker({ props: { onFocus } });
      const context = { value: '10:20:30', e: new FocusEvent('focus') };

      callHandler(getSelectInput(wrapper).props('onFocus'), context);
      expect(onFocus).toHaveBeenCalledWith(context);
    });

    it('pick', async () => {
      const onPick = vi.fn();
      const wrapper = renderTimePicker({ props: { onPick } });
      const event = new MouseEvent('click');

      await openPicker(wrapper);
      callHandler(getPanelVNode(wrapper).props.onChange, '13:14:15', event);

      expect(onPick).toHaveBeenCalledWith('13:14:15', { e: event });
    });

    it('confirm commits valid input and closes the panel', async () => {
      const onConfirm = vi.fn();
      const onChange = vi.fn();
      const wrapper = renderTimePicker({ props: { defaultValue: '10:20:30', onConfirm, onChange } });
      const event = new MouseEvent('click');

      await openPicker(wrapper);
      callHandler(getPanelVNode(wrapper).props.onChange, '11:22:33', event);
      callHandler(getPanelVNode(wrapper).props.handleConfirmClick, event);
      await nextTick();

      expect(onConfirm).toHaveBeenCalledWith({ e: event });
      expect(onChange).toHaveBeenCalledWith('11:22:33');
      expect(getSelectInput(wrapper).props('popupVisible')).toBe(false);
    });

    it('confirm ignores invalid input but still closes the panel', async () => {
      const onChange = vi.fn();
      const wrapper = renderTimePicker({ props: { defaultValue: '10:20:30', onChange } });

      await openPicker(wrapper);
      callHandler(getSelectInput(wrapper).props('onInputChange'), 'invalid');
      callHandler(getPanelVNode(wrapper).props.handleConfirmClick, new MouseEvent('click'));
      await nextTick();

      expect(onChange).not.toHaveBeenCalled();
      expect(getSelectInput(wrapper).props('popupVisible')).toBe(false);
    });

    it('selectInputProps event runs after the internal event', async () => {
      const order: string[] = [];
      const wrapper = renderTimePicker({
        props: {
          onOpen: () => order.push('internal'),
          selectInputProps: { onPopupVisibleChange: () => order.push('forwarded') },
        },
      });

      await openPicker(wrapper);
      expect(order[0]).toBe('internal');
      expect(order.slice(1)).toContain('forwarded');
    });
  });

  describe(':events', () => {
    it(':onChange', async () => {
      const initialOnChange = vi.fn();
      const latestOnChange = vi.fn();
      const onChange = ref(initialOnChange);
      const wrapper = mount({
        setup: () => () => <TimePicker clearable value="10:00:00" onChange={onChange.value} />,
      });
      const selectInput = wrapper.findComponent({ name: 'TSelectInput' });

      onChange.value = latestOnChange;
      await nextTick();
      selectInput.props('onClear')({ e: new MouseEvent('click') });

      expect(initialOnChange).not.toHaveBeenCalled();
      expect(latestOnChange).toHaveBeenCalledWith(null);

      const initialRangeOnChange = vi.fn();
      const latestRangeOnChange = vi.fn();
      const rangeOnChange = ref(initialRangeOnChange);
      const rangeWrapper = mount({
        setup: () => () =>
          <TimeRangePicker clearable value={['10:00:00', '11:00:00']} onChange={rangeOnChange.value} />,
      });
      const rangeInput = rangeWrapper.findComponent({ name: 'TRangeInput' });

      rangeOnChange.value = latestRangeOnChange;
      await nextTick();
      rangeInput.props('onClear')({ e: new MouseEvent('click') });

      expect(initialRangeOnChange).not.toHaveBeenCalled();
      expect(latestRangeOnChange).toHaveBeenCalledWith(null);
    });
  });
});
