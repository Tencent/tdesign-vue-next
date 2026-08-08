import { nextTick } from 'vue';
import { mount, type DOMWrapper, type VueWrapper } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { EPickerCols } from '@tdesign/common-js/time-picker/const';
import SinglePanel from '@tdesign/components/time-picker/panel/single-panel';

type SinglePanelProps = Partial<InstanceType<typeof SinglePanel>['$props']>;

const wrappers: VueWrapper[] = [];
const originalScrollTo = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollTo');

const renderSinglePanel = (props: SinglePanelProps = {}) => {
  const wrapper = mount(SinglePanel, {
    props: { resetTriggerScroll: vi.fn(), ...props },
  });
  wrappers.push(wrapper);
  return wrapper;
};

const installScrollTo = () => {
  const scrollTo = vi.fn();
  Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
    configurable: true,
    writable: true,
    value: scrollTo,
  });
  return scrollTo;
};

const getColumns = (wrapper: VueWrapper) => wrapper.findAll('.t-time-picker__panel-body-scroll');
const getItems = (column: DOMWrapper<Element>) => column.findAll('.t-time-picker__panel-body-scroll-item');
const findItem = (column: DOMWrapper<Element>, text: string) => getItems(column).find((item) => item.text() === text);

const setItemMetrics = (wrapper: VueWrapper, height = '20px', marginTop = '2px') => {
  const maskItem = wrapper.find('.t-time-picker__panel-body-active-mask div').element as HTMLElement;
  maskItem.style.height = height;
  maskItem.style.marginTop = marginTop;
};

describe('SinglePanel', () => {
  afterEach(() => {
    wrappers.splice(0).forEach((wrapper) => wrapper.unmount());
    vi.restoreAllMocks();
    vi.useRealTimers();
    if (originalScrollTo) Object.defineProperty(HTMLElement.prototype, 'scrollTo', originalScrollTo);
    else delete HTMLElement.prototype.scrollTo;
  });

  describe('props', () => {
    it(':format[HH:mm:ss]', async () => {
      const wrapper = renderSinglePanel({ value: '01:02:03' });
      await nextTick();
      const columns = getColumns(wrapper);

      expect(columns).toHaveLength(3);
      expect(getItems(columns[0])).toHaveLength(24);
      expect(getItems(columns[1])).toHaveLength(60);
      expect(getItems(columns[2])).toHaveLength(60);
      expect(findItem(columns[0], '01')?.classes('t-is-current')).toBe(true);
      expect(findItem(columns[1], '02')?.classes('t-is-current')).toBe(true);
      expect(findItem(columns[2], '03')?.classes('t-is-current')).toBe(true);
    });

    it(':format[HH:mm]', async () => {
      const wrapper = renderSinglePanel({ format: 'HH:mm', value: '12:34' });
      await nextTick();

      expect(getColumns(wrapper)).toHaveLength(2);
    });

    it(':format[HH:mm:ss.SSS]', async () => {
      const wrapper = renderSinglePanel({ format: 'HH:mm:ss.SSS', value: '01:02:03.004' });
      await nextTick();
      const columns = getColumns(wrapper);

      expect(columns).toHaveLength(4);
      expect(getItems(columns[3])).toHaveLength(1000);
      expect(findItem(columns[3], '04')?.classes('t-is-current')).toBe(true);
    });

    it(':format[hh:mm:ss a]', async () => {
      const wrapper = renderSinglePanel({ format: 'hh:mm:ss a', value: '01:02:03 pm' });
      await nextTick();
      const columns = getColumns(wrapper);

      expect(columns).toHaveLength(4);
      expect(getItems(columns[0])).toHaveLength(12);
      expect(getItems(columns[0])[0].text()).toBe('12');
      expect(getItems(columns[3])).toHaveLength(2);
      expect(getItems(columns[3])[1].classes('t-is-current')).toBe(true);
    });

    it(':steps[array<string/number>]', async () => {
      const wrapper = renderSinglePanel({ steps: [2, '15', 30], value: '02:15:30' });
      await nextTick();
      const columns = getColumns(wrapper);

      expect(getItems(columns[0])).toHaveLength(12);
      expect(getItems(columns[1])).toHaveLength(4);
      expect(getItems(columns[2])).toHaveLength(2);
    });

    it(':steps[array] starts from midnight without a value', async () => {
      const wrapper = renderSinglePanel({ steps: [2, 5, 10] });
      await nextTick();
      const columns = getColumns(wrapper);

      columns.forEach((column) => expect(getItems(column)[0].classes('t-is-current')).toBe(true));
    });

    it(':value[string] uses the current time when empty and steps are default', async () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2026-08-08T12:34:56'));
      const wrapper = renderSinglePanel();
      await nextTick();
      const columns = getColumns(wrapper);

      expect(findItem(columns[0], '12')?.classes('t-is-current')).toBe(true);
      expect(findItem(columns[1], '34')?.classes('t-is-current')).toBe(true);
      expect(findItem(columns[2], '56')?.classes('t-is-current')).toBe(true);
    });

    it(':disableTime[function] and :hideDisabledTime[true]', async () => {
      const disableTime = vi.fn(() => ({ hour: [1, 2], minute: [3] }));
      const wrapper = renderSinglePanel({ value: '00:00:00', disableTime, hideDisabledTime: true });
      await nextTick();
      const columns = getColumns(wrapper);

      expect(getItems(columns[0])).toHaveLength(22);
      expect(findItem(columns[0], '01')).toBeUndefined();
      expect(getItems(columns[1])).toHaveLength(59);
      expect(disableTime).toHaveBeenCalledWith(1, 0, 0, 0, { partial: 'start' });
    });

    it(':disableTime[function] and :hideDisabledTime[false]', async () => {
      const disableTime = vi.fn(() => ({ hour: [1] }));
      const wrapper = renderSinglePanel({ value: '00:00:00', disableTime, hideDisabledTime: false });
      await nextTick();
      const hourItems = getItems(getColumns(wrapper)[0]);

      expect(hourItems).toHaveLength(24);
      expect(findItem(getColumns(wrapper)[0], '01')?.classes('t-is-disabled')).toBe(true);
    });

    it(':position[string] is passed to disableTime', async () => {
      const disableTime = vi.fn(() => ({ hour: [] }));
      renderSinglePanel({ value: '00:00:00', position: 'end', disableTime });
      await nextTick();

      expect(disableTime).toHaveBeenCalledWith(expect.any(Number), expect.any(Number), expect.any(Number), 0, {
        partial: 'end',
      });
    });

    it(':cols[array] currently does not control rendered columns', async () => {
      const wrapper = renderSinglePanel({ cols: [EPickerCols.hour], format: 'HH:mm:ss' });
      await nextTick();

      // Current behavior: the component always recomputes columns from format and ignores props.cols.
      expect(getColumns(wrapper)).toHaveLength(3);
    });

    it(':localeMeridiems[array] currently is not used', async () => {
      const wrapper = renderSinglePanel({
        format: 'hh:mm:ss a',
        value: '01:00:00 am',
        localeMeridiems: ['Morning', 'Evening'],
      });
      await nextTick();
      const meridiemText = getItems(getColumns(wrapper)[3]).map((item) => item.text());

      expect(meridiemText).not.toEqual(['Morning', 'Evening']);
    });
  });

  describe('events', () => {
    it('clicking a time item changes the value', async () => {
      const onChange = vi.fn();
      const wrapper = renderSinglePanel({ value: '01:02:03', onChange });
      await nextTick();

      await findItem(getColumns(wrapper)[0], '05')?.trigger('click');

      expect(onChange).toHaveBeenCalledWith('05:02:03', expect.any(MouseEvent));
    });

    it('clicking the effective internal value does not emit change', async () => {
      const onChange = vi.fn();
      const wrapper = renderSinglePanel({ value: '01:02:03', internalValue: '05:02:03', onChange });
      await nextTick();

      await findItem(getColumns(wrapper)[0], '05')?.trigger('click');

      expect(onChange).not.toHaveBeenCalled();
    });

    it('clicking a disabled time item does nothing', async () => {
      const onChange = vi.fn();
      const wrapper = renderSinglePanel({
        value: '01:02:03',
        hideDisabledTime: false,
        disableTime: () => ({ hour: [5] }),
        onChange,
      });
      await nextTick();

      await findItem(getColumns(wrapper)[0], '05')?.trigger('click');
      expect(onChange).not.toHaveBeenCalled();
    });

    it('clicking an hour in PM preserves the meridiem', async () => {
      const onChange = vi.fn();
      const wrapper = renderSinglePanel({ format: 'hh:mm:ss a', value: '01:02:03 pm', onChange });
      await nextTick();

      await findItem(getColumns(wrapper)[0], '02')?.trigger('click');
      expect(onChange).toHaveBeenCalledWith('02:02:03 pm', expect.any(MouseEvent));
    });

    it('clicking AM converts a PM value', async () => {
      const onChange = vi.fn();
      const wrapper = renderSinglePanel({ format: 'hh:mm:ss a', value: '01:02:03 pm', onChange });
      await nextTick();

      await getItems(getColumns(wrapper)[3])[0].trigger('click');
      expect(onChange).toHaveBeenCalledWith('01:02:03 am', expect.any(MouseEvent));
    });

    it('clicking PM converts an AM value', async () => {
      const onChange = vi.fn();
      const wrapper = renderSinglePanel({ format: 'hh:mm:ss a', value: '01:02:03 am', onChange });
      await nextTick();

      await getItems(getColumns(wrapper)[3])[1].trigger('click');
      expect(onChange).toHaveBeenCalledWith('01:02:03 pm', expect.any(MouseEvent));
    });

    it('clicking the current meridiem does not emit', async () => {
      const onChange = vi.fn();
      const wrapper = renderSinglePanel({ format: 'hh:mm:ss a', value: '01:02:03 am', onChange });
      await nextTick();

      await getItems(getColumns(wrapper)[3])[0].trigger('click');
      expect(onChange).not.toHaveBeenCalled();
    });

    it('clicking an item scrolls when scrollTo is available', async () => {
      const scrollTo = installScrollTo();
      const onChange = vi.fn();
      const wrapper = renderSinglePanel({ value: '01:02:03', onChange });
      await nextTick();
      setItemMetrics(wrapper);

      await findItem(getColumns(wrapper)[0], '05')?.trigger('click');

      expect(scrollTo).toHaveBeenCalledWith({ top: 110, behavior: 'smooth' });
      expect(onChange).not.toHaveBeenCalled();
    });

    it('clicking still changes value when the active mask cannot be measured', async () => {
      const onChange = vi.fn();
      const wrapper = renderSinglePanel({ value: '01:02:03', onChange });
      await nextTick();
      const mask = wrapper.find('.t-time-picker__panel-body-active-mask').element;
      vi.spyOn(mask, 'querySelector').mockReturnValue(null);

      await findItem(getColumns(wrapper)[0], '05')?.trigger('click');

      expect(onChange).toHaveBeenCalledWith('05:02:03', expect.any(MouseEvent));
    });

    it('scroll does nothing while the panel is hidden', async () => {
      vi.useFakeTimers();
      const onChange = vi.fn();
      const wrapper = renderSinglePanel({ value: '01:02:03', isShowPanel: false, onChange });
      await nextTick();

      await getColumns(wrapper)[0].trigger('scroll');
      vi.advanceTimersByTime(60);

      expect(onChange).not.toHaveBeenCalled();
    });

    it('scrolling a numeric column changes the value', async () => {
      vi.useFakeTimers();
      const scrollTo = installScrollTo();
      const onChange = vi.fn();
      const wrapper = renderSinglePanel({ value: '01:02:03', isShowPanel: true, onChange });
      await nextTick();
      setItemMetrics(wrapper);
      const hourColumn = getColumns(wrapper)[0];
      hourColumn.element.scrollTop = 29;

      await hourColumn.trigger('scroll');
      vi.advanceTimersByTime(60);

      expect(onChange).toHaveBeenCalledWith('02:02:03', expect.any(Event));
      expect(scrollTo).not.toHaveBeenCalled();
    });

    it('scrolling corrects a column that stops between items', async () => {
      vi.useFakeTimers();
      const scrollTo = installScrollTo();
      const wrapper = renderSinglePanel({ value: '01:02:03', isShowPanel: true });
      await nextTick();
      setItemMetrics(wrapper);
      const hourColumn = getColumns(wrapper)[0];
      hourColumn.element.scrollTop = 20;

      await hourColumn.trigger('scroll');
      vi.advanceTimersByTime(60);

      expect(scrollTo).toHaveBeenCalledWith({ top: 22, behavior: 'smooth' });
    });

    it('scrolling to a disabled item preserves the current value', async () => {
      vi.useFakeTimers();
      const onChange = vi.fn();
      const wrapper = renderSinglePanel({
        value: '01:02:03',
        isShowPanel: true,
        hideDisabledTime: false,
        disableTime: () => ({ hour: [2] }),
        onChange,
      });
      await nextTick();
      setItemMetrics(wrapper);
      const hourColumn = getColumns(wrapper)[0];
      hourColumn.element.scrollTop = 29;

      await hourColumn.trigger('scroll');
      vi.advanceTimersByTime(60);

      expect(onChange).not.toHaveBeenCalled();
    });

    it('scrolling an hour preserves PM in twelve-hour format', async () => {
      vi.useFakeTimers();
      const onChange = vi.fn();
      const wrapper = renderSinglePanel({
        format: 'hh:mm:ss a',
        value: '01:02:03 pm',
        isShowPanel: true,
        onChange,
      });
      await nextTick();
      setItemMetrics(wrapper);
      const hourColumn = getColumns(wrapper)[0];
      hourColumn.element.scrollTop = 29;

      await hourColumn.trigger('scroll');
      vi.advanceTimersByTime(60);

      expect(onChange).toHaveBeenCalledWith('02:02:03 pm', expect.any(Event));
    });

    it('scrolling invalid strict input does not emit', async () => {
      vi.useFakeTimers();
      const onChange = vi.fn();
      const wrapper = renderSinglePanel({ value: 'invalid', isShowPanel: true, onChange });
      await nextTick();
      setItemMetrics(wrapper);

      await getColumns(wrapper)[0].trigger('scroll');
      vi.advanceTimersByTime(60);

      expect(onChange).not.toHaveBeenCalled();
    });

    it('scrolling from AM to PM changes the meridiem', async () => {
      vi.useFakeTimers();
      const onChange = vi.fn();
      const wrapper = renderSinglePanel({ format: 'hh:mm:ss a', value: '01:02:03 am', isShowPanel: true, onChange });
      await nextTick();
      setItemMetrics(wrapper);
      const meridiemColumn = getColumns(wrapper)[3];
      meridiemColumn.element.scrollTop = 18;

      await meridiemColumn.trigger('scroll');
      vi.advanceTimersByTime(60);

      expect(onChange).toHaveBeenCalledWith('01:02:03 pm', expect.any(Event));
    });

    it('scrolling from PM to AM changes the meridiem', async () => {
      vi.useFakeTimers();
      const onChange = vi.fn();
      const wrapper = renderSinglePanel({ format: 'hh:mm:ss a', value: '01:02:03 pm', isShowPanel: true, onChange });
      await nextTick();
      setItemMetrics(wrapper);
      const meridiemColumn = getColumns(wrapper)[3];
      meridiemColumn.element.scrollTop = 0;

      await meridiemColumn.trigger('scroll');
      vi.advanceTimersByTime(60);

      expect(onChange).toHaveBeenCalledWith('01:02:03 am', expect.any(Event));
    });

    it('scrolling within the same meridiem emits the formatted value', async () => {
      vi.useFakeTimers();
      const onChange = vi.fn();
      const wrapper = renderSinglePanel({
        format: 'hh:mm:ss a',
        value: '01:02:03 am',
        internalValue: '02:02:03 am',
        isShowPanel: true,
        onChange,
      });
      await nextTick();
      setItemMetrics(wrapper);

      await getColumns(wrapper)[3].trigger('scroll');
      vi.advanceTimersByTime(60);

      expect(onChange).toHaveBeenCalledWith('01:02:03 am', expect.any(Event));
    });
  });

  describe('lifecycle', () => {
    it('a value change updates every column scroll position', async () => {
      const scrollTo = installScrollTo();
      const resetTriggerScroll = vi.fn();
      const wrapper = renderSinglePanel({ value: '01:02:03', resetTriggerScroll });
      await nextTick();
      setItemMetrics(wrapper);

      await wrapper.setProps({ value: '04:05:06' });
      await nextTick();

      expect(scrollTo).toHaveBeenCalled();
      expect(resetTriggerScroll).toHaveBeenCalled();
    });

    it('triggerScroll initializes a stepped panel without a value', async () => {
      const scrollTo = installScrollTo();
      const resetTriggerScroll = vi.fn();
      const wrapper = renderSinglePanel({ steps: [2, 5, 10], triggerScroll: false, resetTriggerScroll });
      await nextTick();
      setItemMetrics(wrapper);

      await wrapper.setProps({ triggerScroll: true });
      await nextTick();

      expect(scrollTo).not.toHaveBeenCalled();
      expect(resetTriggerScroll).toHaveBeenCalledTimes(1);
    });

    it('triggerScroll initializes a panel with default steps', async () => {
      const scrollTo = installScrollTo();
      const resetTriggerScroll = vi.fn();
      const wrapper = renderSinglePanel({ value: '01:02:03', triggerScroll: false, resetTriggerScroll });
      await nextTick();
      setItemMetrics(wrapper);

      await wrapper.setProps({ triggerScroll: true });
      await nextTick();

      expect(scrollTo).toHaveBeenCalled();
      expect(resetTriggerScroll).toHaveBeenCalledTimes(1);
    });
  });
});
