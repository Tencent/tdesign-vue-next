/* eslint-disable vue/one-component-per-file */
import { defineComponent, nextTick, type VNode } from 'vue';
import { mount, type VueWrapper } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { TimeIcon } from 'tdesign-icons-vue-next';
import { TimeRangePicker } from '@tdesign/components/time-picker';
import rangeInputPopupProps from '@tdesign/components/range-input/range-input-popup-props';
import timeRangePickerProps from '@tdesign/components/time-picker/time-range-picker-props';

type EventHandler = (...args: unknown[]) => unknown;

const RangeInputPopupStub = defineComponent({
  name: 'TRangeInputPopup',
  props: rangeInputPopupProps,
  setup() {
    return () => <div class="range-input-popup-stub" />;
  },
});

const wrappers: VueWrapper[] = [];

const renderTimeRangePicker = (options: Parameters<typeof mount>[1] = {}) => {
  const wrapper = mount(TimeRangePicker, {
    ...options,
    global: {
      ...options.global,
      stubs: {
        ...options.global?.stubs,
        TRangeInputPopup: RangeInputPopupStub,
      },
    },
  });
  wrappers.push(wrapper);
  return wrapper;
};

const getPopup = (wrapper: VueWrapper) => wrapper.findComponent(RangeInputPopupStub);
const getRangeInputProps = (wrapper: VueWrapper) =>
  getPopup(wrapper).props('rangeInputProps') as Record<string, unknown>;
const getPopupProps = (wrapper: VueWrapper) => getPopup(wrapper).props('popupProps') as Record<string, unknown>;
const callHandler = (handler: unknown, ...args: unknown[]) => (handler as EventHandler)(...args);
const getPanelVNode = (wrapper: VueWrapper) =>
  callHandler(getPopup(wrapper).props('panel')) as VNode & { props: Record<string, unknown> };

const setPopupVisible = async (wrapper: VueWrapper, visible: boolean, trigger = 'trigger-element-click') => {
  callHandler(getPopupProps(wrapper).onVisibleChange, visible, { trigger });
  await nextTick();
};

describe('TimeRangePicker', () => {
  afterEach(() => {
    wrappers.splice(0).forEach((wrapper) => wrapper.unmount());
    vi.restoreAllMocks();
  });

  describe('props', () => {
    it(':allowInput[boolean]', () => {
      const readonlyWrapper = renderTimeRangePicker();
      const editableWrapper = renderTimeRangePicker({ props: { allowInput: true } });

      expect(getRangeInputProps(readonlyWrapper).readonly).toBe(true);
      expect(getRangeInputProps(editableWrapper).readonly).toBe(false);
    });

    it(':autoSwap[boolean]', async () => {
      const onChange = vi.fn();
      const wrapper = renderTimeRangePicker({
        props: { autoSwap: false, defaultValue: ['18:00:00', '09:00:00'], onChange },
      });

      await setPopupVisible(wrapper, true);
      callHandler(getPanelVNode(wrapper).props.handleConfirmClick);

      expect(onChange).toHaveBeenCalledWith(['18:00:00', '09:00:00']);
    });

    it(':borderless[boolean]', () => {
      const wrapper = renderTimeRangePicker({ props: { borderless: true } });

      expect(getRangeInputProps(wrapper).borderless).toBe(true);
    });

    it(':clearable[boolean]', () => {
      const wrapper = renderTimeRangePicker({ props: { clearable: true } });

      expect(getRangeInputProps(wrapper).clearable).toBe(true);
    });

    it(':disableTime[function]', () => {
      const disableTime = vi.fn(() => ({ hour: [1] }));
      const wrapper = renderTimeRangePicker({ props: { disableTime } });

      expect(getPanelVNode(wrapper).props.disableTime).toBe(disableTime);
    });

    it(':disabled[boolean/array]', () => {
      const booleanWrapper = renderTimeRangePicker({ props: { disabled: true } });
      const arrayWrapper = renderTimeRangePicker({ props: { disabled: [true, false] } });

      expect(getPopup(booleanWrapper).props('disabled')).toBe(true);
      expect(getPopup(arrayWrapper).props('disabled')).toEqual([true, false]);
    });

    it(':format[string]', () => {
      const wrapper = renderTimeRangePicker({ props: { format: 'HH:mm' } });

      expect(getPanelVNode(wrapper).props.format).toBe('HH:mm');
    });

    it(':hideDisabledTime[boolean]', () => {
      const wrapper = renderTimeRangePicker({ props: { hideDisabledTime: false } });

      expect(getPanelVNode(wrapper).props.hideDisabledTime).toBe(false);
    });

    it(':label[string]', () => {
      const wrapper = renderTimeRangePicker({ props: { label: '工作时间' } });

      expect(getPopup(wrapper).props('label')).toBe('工作时间');
    });

    it(':label[function]', () => {
      const label = () => <span>工作时间</span>;
      const wrapper = renderTimeRangePicker({ props: { label } });

      expect(getPopup(wrapper).props('label')).toBe(label);
    });

    it(':label[slot] currently is not forwarded', () => {
      const wrapper = renderTimeRangePicker({ slots: { label: () => <span>工作时间</span> } });

      // Current behavior: TimeRangePicker passes props.label directly and never consumes the label slot.
      expect(getPopup(wrapper).props('label')).toBeUndefined();
    });

    it(':placeholder[string/array]', () => {
      const stringWrapper = renderTimeRangePicker({ props: { placeholder: '选择时间' } });
      const arrayWrapper = renderTimeRangePicker({ props: { placeholder: ['开始', '结束'] } });

      expect(getRangeInputProps(stringWrapper).placeholder).toBe('选择时间');
      expect(getRangeInputProps(arrayWrapper).placeholder).toEqual(['开始', '结束']);
    });

    it(':popupProps[object]', () => {
      const onVisibleChange = vi.fn();
      const wrapper = renderTimeRangePicker({
        props: { popupProps: { placement: 'top-right', destroyOnClose: true, onVisibleChange } },
      });

      expect(getPopupProps(wrapper)).toMatchObject({ placement: 'top-right', destroyOnClose: true });
      expect(getPopupProps(wrapper).onVisibleChange).not.toBe(onVisibleChange);
    });

    it(':prefixIcon[function]', () => {
      const wrapper = renderTimeRangePicker({ props: { prefixIcon: () => <span class="prefix-function">P</span> } });
      const icon = callHandler(getRangeInputProps(wrapper).prefixIcon) as VNode;

      expect((icon as VNode).type).toBe('span');
      expect((icon as VNode).props?.class).toBe('prefix-function');
    });

    it(':prefixIcon[slot]', () => {
      const wrapper = renderTimeRangePicker({ slots: { prefixIcon: () => <span class="prefix-slot">P</span> } });
      const icon = callHandler(getRangeInputProps(wrapper).prefixIcon) as VNode[];

      expect(icon[0].type).toBe('span');
      expect(icon[0].props?.class).toBe('prefix-slot');
    });

    it(':presets[object]', () => {
      const presets = { 上午: ['09:00:00', '12:00:00'], 动态: () => ['13:00:00', '18:00:00'] };
      const wrapper = renderTimeRangePicker({ props: { presets } });

      expect(getPanelVNode(wrapper).props.presets).toEqual(presets);
    });

    it(':rangeInputProps[object]', () => {
      const wrapper = renderTimeRangePicker({
        props: { rangeInputProps: { separator: '至', align: 'center', readonly: false } },
      });

      expect(getRangeInputProps(wrapper)).toMatchObject({ separator: '至', align: 'center', readonly: false });
    });

    it(':readonly[boolean]', async () => {
      const wrapper = renderTimeRangePicker({ props: { readonly: true } });

      await setPopupVisible(wrapper, true);
      expect(getPopup(wrapper).props('popupVisible')).toBe(false);
      expect(getRangeInputProps(wrapper).readonly).toBe(true);
    });

    it(':size[string]', () => {
      const validator = timeRangePickerProps.size.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator('large')).toBe(true);
      // @ts-expect-error testing unsupported value
      expect(validator('giant')).toBe(false);

      const wrapper = renderTimeRangePicker({ props: { size: 'small' } });
      expect(getRangeInputProps(wrapper).size).toBe('small');
    });

    it(':status[string]', () => {
      const validator = timeRangePickerProps.status.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator('success')).toBe(true);
      // @ts-expect-error testing unsupported value
      expect(validator('info')).toBe(false);

      const wrapper = renderTimeRangePicker({ props: { status: 'error' } });
      expect(getPopup(wrapper).props('status')).toBe('error');
    });

    it(':steps[array]', () => {
      const wrapper = renderTimeRangePicker({ props: { steps: [2, '5', 10] } });

      expect(getPanelVNode(wrapper).props.steps).toEqual([2, '5', 10]);
    });

    it(':suffixIcon[function]', () => {
      const wrapper = renderTimeRangePicker({ props: { suffixIcon: () => <span class="suffix-function">S</span> } });
      const icon = callHandler(getRangeInputProps(wrapper).suffixIcon) as VNode;

      expect(icon.type).toBe('span');
      expect(icon.props?.class).toBe('suffix-function');
    });

    it(':suffixIcon[slot]', () => {
      const wrapper = renderTimeRangePicker({ slots: { suffixIcon: () => <span class="suffix-slot">S</span> } });
      const icon = callHandler(getRangeInputProps(wrapper).suffixIcon) as VNode[];

      expect(icon[0].props?.class).toBe('suffix-slot');
    });

    it(':suffixIcon[default]', () => {
      const wrapper = renderTimeRangePicker();
      const icon = callHandler(getRangeInputProps(wrapper).suffixIcon) as VNode;

      expect(icon.type).toBe(TimeIcon);
    });

    it(':tips[string/function]', () => {
      const tips = () => <span>时间无效</span>;
      const stringWrapper = renderTimeRangePicker({ props: { tips: '时间无效' } });
      const functionWrapper = renderTimeRangePicker({ props: { tips } });

      expect(getPopup(stringWrapper).props('tips')).toBe('时间无效');
      expect(getPopup(functionWrapper).props('tips')).toBe(tips);
    });

    it(':tips[slot] currently is not forwarded', () => {
      const wrapper = renderTimeRangePicker({ slots: { tips: () => <span>时间无效</span> } });

      expect(getPopup(wrapper).props('tips')).toBeUndefined();
    });

    it(':value[array]', () => {
      const wrapper = renderTimeRangePicker({ props: { value: ['09:00:00', '18:00:00'] } });

      expect(getPopup(wrapper).props('inputValue')).toEqual(['09:00:00', '18:00:00']);
    });

    it(':modelValue[array]', () => {
      const wrapper = renderTimeRangePicker({ props: { modelValue: ['10:00:00', '19:00:00'] } });

      expect(getPopup(wrapper).props('inputValue')).toEqual(['10:00:00', '19:00:00']);
    });

    it(':defaultValue[array]', () => {
      const wrapper = renderTimeRangePicker({ props: { defaultValue: ['11:00:00', '20:00:00'] } });

      expect(getPopup(wrapper).props('inputValue')).toEqual(['11:00:00', '20:00:00']);
    });
  });

  describe('events', () => {
    it('popup visible change handles trigger clicks and outside close', async () => {
      const wrapper = renderTimeRangePicker();

      await setPopupVisible(wrapper, false, 'trigger-element-click');
      expect(getPopup(wrapper).props('popupVisible')).toBe(true);
      expect(JSON.stringify(getRangeInputProps(wrapper).class)).toContain('t-is-focused');

      await setPopupVisible(wrapper, false, 'document-click');
      expect(getPopup(wrapper).props('popupVisible')).toBe(false);
    });

    it('clear/change', async () => {
      const onChange = vi.fn();
      const stopPropagation = vi.fn();
      const wrapper = renderTimeRangePicker({ props: { defaultValue: ['09:00:00', '18:00:00'], onChange } });

      callHandler(getRangeInputProps(wrapper).onClear, { e: { stopPropagation } });
      await nextTick();

      expect(stopPropagation).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(null);
      expect(getPopup(wrapper).props('inputValue')).toEqual([undefined, undefined]);
    });

    it('focus reports start/end positions', () => {
      const onFocus = vi.fn();
      const wrapper = renderTimeRangePicker({ props: { onFocus } });
      const event = new FocusEvent('focus');

      callHandler(getRangeInputProps(wrapper).onFocus, ['09:00:00', '18:00:00'], { e: event, position: 'first' });
      callHandler(getRangeInputProps(wrapper).onFocus, ['09:00:00', '18:00:00'], { e: event, position: 'second' });

      expect(onFocus).toHaveBeenNthCalledWith(1, { value: ['09:00:00', '18:00:00'], e: event, position: 'start' });
      expect(onFocus).toHaveBeenNthCalledWith(2, { value: ['09:00:00', '18:00:00'], e: event, position: 'end' });
    });

    it('input reports the effective value and start/end positions', () => {
      const onInput = vi.fn();
      const wrapper = renderTimeRangePicker({ props: { value: ['09:00:00', '18:00:00'], onInput } });
      const event = new InputEvent('input');

      callHandler(getPopup(wrapper).props('onInputChange'), ['10:00:00', '18:00:00'], { e: event, position: 'first' });
      callHandler(getPopup(wrapper).props('onInputChange'), ['10:00:00', '19:00:00'], { e: event, position: 'second' });

      expect(onInput).toHaveBeenNthCalledWith(1, { value: ['09:00:00', '18:00:00'], e: event, position: 'start' });
      expect(onInput).toHaveBeenNthCalledWith(2, { value: ['09:00:00', '18:00:00'], e: event, position: 'end' });
    });

    it('blur accepts valid input on both positions', async () => {
      const onBlur = vi.fn();
      const wrapper = renderTimeRangePicker({
        props: { allowInput: true, defaultValue: ['09:00:00', '18:00:00'], onBlur },
      });
      const event = new FocusEvent('blur');

      await setPopupVisible(wrapper, true);
      callHandler(getRangeInputProps(wrapper).onClick, { position: 'first' });
      callHandler(getPopup(wrapper).props('onInputChange'), ['10:00:00', '18:00:00'], {
        e: new InputEvent('input'),
        position: 'first',
      });
      callHandler(getRangeInputProps(wrapper).onBlur, ['10:00:00', '18:00:00'], { e: event });

      callHandler(getRangeInputProps(wrapper).onClick, { position: 'second' });
      callHandler(getPopup(wrapper).props('onInputChange'), ['10:00:00', '19:00:00'], {
        e: new InputEvent('input'),
        position: 'second',
      });
      callHandler(getRangeInputProps(wrapper).onBlur, ['10:00:00', '19:00:00'], { e: event });
      await nextTick();

      expect(onBlur).toHaveBeenCalledTimes(2);
      expect(getPopup(wrapper).props('inputValue')).toEqual(['10:00:00', '19:00:00']);
    });

    it('blur fills the other empty position for valid input', async () => {
      const firstWrapper = renderTimeRangePicker({ props: { allowInput: true } });
      await setPopupVisible(firstWrapper, true);
      callHandler(getRangeInputProps(firstWrapper).onClick, { position: 'first' });
      callHandler(getPopup(firstWrapper).props('onInputChange'), ['10:00:00', undefined], {
        e: new InputEvent('input'),
        position: 'first',
      });
      callHandler(getRangeInputProps(firstWrapper).onBlur, ['10:00:00', undefined], { e: new FocusEvent('blur') });
      await nextTick();
      expect(getPopup(firstWrapper).props('inputValue')).toEqual(['10:00:00', '10:00:00']);

      const secondWrapper = renderTimeRangePicker({ props: { allowInput: true } });
      await setPopupVisible(secondWrapper, true);
      callHandler(getRangeInputProps(secondWrapper).onClick, { position: 'second' });
      callHandler(getPopup(secondWrapper).props('onInputChange'), [undefined, '18:00:00'], {
        e: new InputEvent('input'),
        position: 'second',
      });
      callHandler(getRangeInputProps(secondWrapper).onBlur, [undefined, '18:00:00'], { e: new FocusEvent('blur') });
      await nextTick();
      expect(getPopup(secondWrapper).props('inputValue')).toEqual(['18:00:00', '18:00:00']);
    });

    it('blur restores invalid input on both positions', async () => {
      const wrapper = renderTimeRangePicker({
        props: { allowInput: true, defaultValue: ['09:00:00', '18:00:00'] },
      });

      await setPopupVisible(wrapper, true);
      callHandler(getRangeInputProps(wrapper).onClick, { position: 'first' });
      callHandler(getPopup(wrapper).props('onInputChange'), ['invalid', '18:00:00'], {
        e: new InputEvent('input'),
        position: 'first',
      });
      callHandler(getRangeInputProps(wrapper).onBlur, ['invalid', '18:00:00'], { e: new FocusEvent('blur') });
      expect(getPopup(wrapper).props('inputValue')).toEqual(['09:00:00', '18:00:00']);

      callHandler(getRangeInputProps(wrapper).onClick, { position: 'second' });
      callHandler(getPopup(wrapper).props('onInputChange'), ['09:00:00', 'invalid'], {
        e: new InputEvent('input'),
        position: 'second',
      });
      callHandler(getRangeInputProps(wrapper).onBlur, ['09:00:00', 'invalid'], { e: new FocusEvent('blur') });
      expect(getPopup(wrapper).props('inputValue')).toEqual(['09:00:00', '18:00:00']);
    });

    it('blur does not validate when allowInput is false', () => {
      const onBlur = vi.fn();
      const wrapper = renderTimeRangePicker({ props: { onBlur } });

      callHandler(getRangeInputProps(wrapper).onBlur, ['invalid', 'invalid'], { e: new FocusEvent('blur') });
      expect(onBlur).toHaveBeenCalledTimes(1);
    });

    it('pick reports a start value', async () => {
      const onPick = vi.fn();
      const wrapper = renderTimeRangePicker({ props: { defaultValue: ['09:00:00', '18:00:00'], onPick } });
      const event = new MouseEvent('click');

      await setPopupVisible(wrapper, true);
      callHandler(getRangeInputProps(wrapper).onClick, { position: 'first' });
      const panel = getPanelVNode(wrapper);
      expect(panel.props.position).toBe('start');
      expect(panel.props.activeIndex).toBe(0);
      callHandler(panel.props.onChange, '10:00:00', event);

      expect(onPick).toHaveBeenCalledWith(['10:00:00', '18:00:00'], { e: event, position: 'start' });
    });

    it('pick fills a missing end from the start value', async () => {
      const onPick = vi.fn();
      const wrapper = renderTimeRangePicker({ props: { onPick } });
      const event = new MouseEvent('click');

      await setPopupVisible(wrapper, true);
      callHandler(getRangeInputProps(wrapper).onClick, { position: 'first' });
      callHandler(getPanelVNode(wrapper).props.onChange, '10:00:00', event);

      expect(onPick).toHaveBeenCalledWith(['10:00:00', '10:00:00'], { e: event, position: 'start' });
    });

    it('pick reports an end value and fills a missing start', async () => {
      const onPick = vi.fn();
      const wrapper = renderTimeRangePicker({ props: { onPick } });
      const event = new MouseEvent('click');

      await setPopupVisible(wrapper, true);
      callHandler(getRangeInputProps(wrapper).onClick, { position: 'second' });
      const panel = getPanelVNode(wrapper);
      expect(panel.props.position).toBe('end');
      expect(panel.props.activeIndex).toBe(1);
      callHandler(panel.props.onChange, '18:00:00', event);

      expect(onPick).toHaveBeenCalledWith(['18:00:00', '18:00:00'], { e: event, position: 'end' });
    });

    it('pick accepts a complete range', async () => {
      const onPick = vi.fn();
      const wrapper = renderTimeRangePicker({ props: { onPick } });
      const event = new MouseEvent('click');

      await setPopupVisible(wrapper, true);
      callHandler(getPanelVNode(wrapper).props.onChange, ['08:00:00', '17:00:00'], event);

      expect(onPick).toHaveBeenCalledWith(['08:00:00', '17:00:00'], { e: event });
    });

    it('confirm commits and swaps a descending range by default', async () => {
      const onChange = vi.fn();
      const wrapper = renderTimeRangePicker({
        props: { defaultValue: ['18:00:00', '09:00:00'], onChange },
      });

      await setPopupVisible(wrapper, true);
      callHandler(getPanelVNode(wrapper).props.handleConfirmClick);
      await nextTick();

      expect(onChange).toHaveBeenCalledWith(['09:00:00', '18:00:00']);
      expect(getPopup(wrapper).props('popupVisible')).toBe(false);
    });

    it('confirm keeps an ascending range', async () => {
      const onChange = vi.fn();
      const wrapper = renderTimeRangePicker({
        props: { defaultValue: ['09:00:00', '18:00:00'], onChange },
      });

      await setPopupVisible(wrapper, true);
      callHandler(getPanelVNode(wrapper).props.handleConfirmClick);

      expect(onChange).toHaveBeenCalledWith(['09:00:00', '18:00:00']);
    });

    it('confirm ignores invalid input when autoSwap is false', async () => {
      const onChange = vi.fn();
      const wrapper = renderTimeRangePicker({ props: { autoSwap: false, onChange } });

      await setPopupVisible(wrapper, true);
      callHandler(getPopup(wrapper).props('onInputChange'), ['invalid', '18:00:00'], {
        e: new InputEvent('input'),
        position: 'first',
      });
      callHandler(getPanelVNode(wrapper).props.handleConfirmClick);

      expect(onChange).not.toHaveBeenCalled();
    });

    it('confirm currently commits invalid input when autoSwap is true', async () => {
      const onChange = vi.fn();
      const wrapper = renderTimeRangePicker({ props: { onChange } });

      await setPopupVisible(wrapper, true);
      callHandler(getPopup(wrapper).props('onInputChange'), ['invalid', '18:00:00'], {
        e: new InputEvent('input'),
        position: 'first',
      });
      callHandler(getPanelVNode(wrapper).props.handleConfirmClick);

      // Current behavior: autoSwapTime runs even after validation fails and commits the invalid range.
      expect(onChange).toHaveBeenCalledWith(['invalid', '18:00:00']);
    });

    it('forwarded range input and popup events run after internal handlers', async () => {
      const order: string[] = [];
      const wrapper = renderTimeRangePicker({
        props: {
          rangeInputProps: { onClick: () => order.push('range') },
          popupProps: { onVisibleChange: () => order.push('popup') },
        },
      });

      callHandler(getRangeInputProps(wrapper).onClick, { position: 'first' });
      expect(getPanelVNode(wrapper).props.activeIndex).toBe(0);
      expect(order).toEqual(['range']);

      await setPopupVisible(wrapper, true);
      expect(order).toEqual(['range', 'popup']);
    });
  });
});
