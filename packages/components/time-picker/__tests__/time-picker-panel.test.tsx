/* eslint-disable vue/one-component-per-file */
import { defineComponent, nextTick } from 'vue';
import { mount, type VueWrapper } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Button } from '@tdesign/components/button';
import { TimePickerPanel } from '@tdesign/components/time-picker';
import { panelColProps } from '@tdesign/components/time-picker/panel/props';

type EventHandler = (...args: unknown[]) => unknown;

const SinglePanelStub = defineComponent({
  name: 'TTimePickerPanelCol',
  props: {
    ...panelColProps(),
    position: String,
    triggerScroll: Boolean,
    onChange: Function,
    resetTriggerScroll: Function,
    isShowPanel: Boolean,
  },
  setup() {
    return () => <div class="single-panel-stub" />;
  },
});

const wrappers: VueWrapper[] = [];

const renderPanel = (options: Parameters<typeof mount>[1] = {}) => {
  const wrapper = mount(TimePickerPanel, {
    ...options,
    global: {
      ...options.global,
      stubs: { ...options.global?.stubs, TTimePickerPanelCol: SinglePanelStub },
    },
  });
  wrappers.push(wrapper);
  return wrapper;
};

const getSinglePanel = (wrapper: VueWrapper) => wrapper.findComponent(SinglePanelStub);
const callHandler = (handler: unknown, ...args: unknown[]) => (handler as EventHandler)(...args);

describe('TimePickerPanel', () => {
  afterEach(() => {
    wrappers.splice(0).forEach((wrapper) => wrapper.unmount());
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe('props', () => {
    it(':base', () => {
      const wrapper = renderPanel();

      expect(wrapper.find('.t-time-picker__panel').exists()).toBe(true);
      expect(wrapper.find('.t-time-picker__panel-section-body').exists()).toBe(true);
      expect(getSinglePanel(wrapper).exists()).toBe(true);
    });

    it(':disabled[boolean]', () => {
      const wrapper = renderPanel({ props: { disabled: true } });

      // Current behavior: SinglePanel has no disabled prop, so the value falls through as an inert DOM attribute.
      expect(Object.prototype.hasOwnProperty.call(getSinglePanel(wrapper).props(), 'disabled')).toBe(false);
      expect(getSinglePanel(wrapper).attributes('disabled')).toBe('true');
    });

    it(':disabled[boolean] currently does not disable time items', async () => {
      const onChange = vi.fn();
      const wrapper = mount(TimePickerPanel, { props: { disabled: true, value: '01:02:03', onChange } });
      wrappers.push(wrapper);
      await nextTick();

      const hourItems = wrapper.findAll('.t-time-picker__panel-body-scroll-item');
      await hourItems.find((item) => item.text() === '05')?.trigger('click');

      // Current behavior: disabled falls through to SinglePanel's root and selection remains interactive.
      expect(onChange).toHaveBeenCalledWith('05:02:03', expect.any(MouseEvent));
    });

    it(':isFocus[boolean]', () => {
      const wrapper = renderPanel({ props: { isFocus: true } });

      expect(Object.prototype.hasOwnProperty.call(getSinglePanel(wrapper).props(), 'isFocus')).toBe(false);
      expect(getSinglePanel(wrapper).attributes('isfocus')).toBe('true');
    });

    it(':value[string] forwards a valid value', () => {
      const wrapper = renderPanel({ props: { value: '12:34:56' } });

      expect(getSinglePanel(wrapper).props('value')).toBe('12:34:56');
      expect(getSinglePanel(wrapper).props('internalValue')).toBe('12:34:56');
    });

    it(':value[string] falls back to midnight for an invalid value', () => {
      const wrapper = renderPanel({ props: { value: 'invalid' } });

      expect(getSinglePanel(wrapper).props('value')).toBe('00:00:00');
      expect(getSinglePanel(wrapper).props('internalValue')).toBe('invalid');
    });

    it(':value[string] falls back to midnight when steps are configured', () => {
      const wrapper = renderPanel({ props: { value: '', steps: [2, 5, 10] } });

      expect(getSinglePanel(wrapper).props('value')).toBe('00:00:00');
    });

    it(':format[string]', () => {
      const wrapper = renderPanel({ props: { value: '12:34', format: 'HH:mm' } });

      expect(getSinglePanel(wrapper).props('format')).toBe('HH:mm');
      expect(getSinglePanel(wrapper).props('value')).toBe('12:34');
    });

    it(':format[string] uses the fallback format for an empty string', () => {
      const wrapper = renderPanel({ props: { format: '' } });

      expect(getSinglePanel(wrapper).props('format')).toBe('HH:mm:ss');
    });

    it(':steps[array]', () => {
      const wrapper = renderPanel({ props: { steps: [2, '5', 10] } });

      expect(getSinglePanel(wrapper).props('steps')).toEqual([2, '5', 10]);
    });

    it(':isShowPanel[boolean]', () => {
      const wrapper = renderPanel({ props: { isShowPanel: false } });

      expect(getSinglePanel(wrapper).props('isShowPanel')).toBe(false);
    });

    it(':activeIndex[number]', () => {
      const wrapper = renderPanel({ props: { activeIndex: 1 } });

      expect(Object.prototype.hasOwnProperty.call(getSinglePanel(wrapper).props(), 'activeIndex')).toBe(false);
      expect(getSinglePanel(wrapper).attributes('activeindex')).toBe('1');
    });

    it(':hideDisabledTime[boolean]', () => {
      const wrapper = renderPanel({ props: { hideDisabledTime: false } });

      expect(getSinglePanel(wrapper).props('hideDisabledTime')).toBe(false);
    });

    it(':disableTime[function]', () => {
      const disableTime = vi.fn(() => ({ hour: [1] }));
      const wrapper = renderPanel({ props: { disableTime } });

      expect(getSinglePanel(wrapper).props('disableTime')).toBe(disableTime);
    });

    it(':isFooterDisplay[boolean]', () => {
      const hiddenWrapper = renderPanel({ props: { isFooterDisplay: false } });
      const visibleWrapper = renderPanel({ props: { isFooterDisplay: true } });

      expect(hiddenWrapper.find('.t-time-picker__panel-section-footer').exists()).toBe(false);
      expect(visibleWrapper.find('.t-time-picker__panel-section-footer').exists()).toBe(true);
    });

    it(':presets[object] renders each preset and hides the now button', () => {
      const wrapper = renderPanel({
        props: { isFooterDisplay: true, presets: { 上午: '09:00:00', 下午: '15:00:00' } },
      });

      expect(wrapper.findAllComponents(Button)).toHaveLength(3);
      expect(wrapper.text()).toContain('上午');
      expect(wrapper.text()).toContain('下午');
      expect(wrapper.text()).not.toContain('此刻');
    });

    it(':presets[object] accepts an empty object without rendering the now button', () => {
      const wrapper = renderPanel({ props: { isFooterDisplay: true, presets: {} } });

      expect(wrapper.findAllComponents(Button)).toHaveLength(1);
    });

    it(':steps[array] hides the now button when a step is greater than one', () => {
      const wrapper = renderPanel({ props: { isFooterDisplay: true, steps: [2, 1, 1] } });

      expect(wrapper.findAllComponents(Button)).toHaveLength(1);
    });
  });

  describe('events', () => {
    it('change is forwarded to SinglePanel', () => {
      const onChange = vi.fn();
      const wrapper = renderPanel({ props: { onChange } });
      const event = new MouseEvent('click');

      callHandler(getSinglePanel(wrapper).props('onChange'), '12:34:56', event);
      expect(onChange).toHaveBeenCalledWith('12:34:56', event);
    });

    it('confirm passes the event and effective value', async () => {
      const handleConfirmClick = vi.fn();
      const wrapper = renderPanel({
        props: { value: '12:34:56', isFooterDisplay: true, handleConfirmClick },
      });

      const confirm = wrapper.findAllComponents(Button)[0];
      expect(confirm.props('disabled')).toBe(false);
      await confirm.trigger('click');

      expect(handleConfirmClick).toHaveBeenCalledWith(expect.any(MouseEvent), '12:34:56');
    });

    it('confirm is disabled for an empty value', () => {
      const wrapper = renderPanel({ props: { isFooterDisplay: true } });

      expect(wrapper.findAllComponents(Button)[0].props('disabled')).toBe(true);
    });

    it('now changes to the current time', async () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2026-08-08T12:34:56'));
      const onChange = vi.fn();
      const wrapper = renderPanel({ props: { isFooterDisplay: true, onChange } });

      await wrapper.findAllComponents(Button)[1].trigger('click');

      expect(onChange).toHaveBeenCalledWith('12:34:56');
    });

    it('preset[string] changes the single value', async () => {
      const onChange = vi.fn();
      const wrapper = renderPanel({
        props: { isFooterDisplay: true, presets: { 上午: '09:00:00' }, onChange },
      });

      await wrapper.findAllComponents(Button)[1].trigger('click');
      expect(onChange).toHaveBeenCalledWith('09:00:00');
    });

    it('preset[function] changes the single value', async () => {
      const onChange = vi.fn();
      const preset = vi.fn(() => '10:00:00');
      const wrapper = renderPanel({
        props: { isFooterDisplay: true, presets: { 动态: preset }, onChange },
      });

      await wrapper.findAllComponents(Button)[1].trigger('click');
      expect(preset).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith('10:00:00');
    });

    it('preset[array] changes a complete range when activeIndex is absent', async () => {
      const onChange = vi.fn();
      const wrapper = renderPanel({
        props: { isFooterDisplay: true, presets: { 工作: ['09:00:00', '18:00:00'] }, onChange },
      });

      await wrapper.findAllComponents(Button)[1].trigger('click');
      expect(onChange).toHaveBeenCalledWith(['09:00:00', '18:00:00']);
    });

    it('preset[array/function] picks the active range value', async () => {
      const onChange = vi.fn();
      const preset = vi.fn(() => ['09:00:00', '18:00:00']);
      const wrapper = renderPanel({
        props: { activeIndex: 1, isFooterDisplay: true, presets: { 工作: preset }, onChange },
      });

      await wrapper.findAllComponents(Button)[1].trigger('click');
      expect(preset).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith('18:00:00');
    });

    it('preset[string] reports an error for range mode', async () => {
      const error = vi.spyOn(console, 'error').mockImplementation(() => undefined);
      const onChange = vi.fn();
      const wrapper = renderPanel({
        props: { activeIndex: 0, isFooterDisplay: true, presets: { 错误: '09:00:00' }, onChange },
      });

      await wrapper.findAllComponents(Button)[1].trigger('click');

      expect(error).toHaveBeenCalledWith(expect.stringContaining('预设值必须是数组'));
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('lifecycle', () => {
    it('mount and isShowPanel changes trigger scroll initialization', async () => {
      const wrapper = renderPanel({ props: { isShowPanel: false } });

      await nextTick();
      await nextTick();
      expect(getSinglePanel(wrapper).props('triggerScroll')).toBe(true);

      callHandler(getSinglePanel(wrapper).props('resetTriggerScroll'));
      await nextTick();
      expect(getSinglePanel(wrapper).props('triggerScroll')).toBe(false);

      await wrapper.setProps({ isShowPanel: true });
      await nextTick();
      await nextTick();
      expect(getSinglePanel(wrapper).props('triggerScroll')).toBe(true);
    });
  });
});
