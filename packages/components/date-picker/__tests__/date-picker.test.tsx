import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import MockDate from 'mockdate';
import DatePicker, { DateRangePicker, DatePickerPanel, DateRangePickerPanel } from '@tdesign/components/date-picker';
import dayjs from 'dayjs';

// 固定时间，当使用 new Date() 时，返回固定时间，防止“当前时间”的副作用影响，导致 snapshot 变更，mockdate 插件见 https://github.com/boblauer/MockDate
MockDate.set('2020-12-28');

// every component needs four parts: props/events/slots/functions.
describe('DatePicker', () => {
  // test props api
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <DatePicker></DatePicker>;
        },
      });
      expect(wrapper.exists()).toBe(true);
    });
  });

  it(':value', () => {
    const wrapper = mount({
      render() {
        return <DatePicker value={'1998-11-11'}></DatePicker>;
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it(':mode', () => {
    const wrapper = mount({
      render() {
        return <DatePicker mode={'year'}></DatePicker>;
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it(':range', () => {
    const wrapper = mount({
      render() {
        const testRange = [
          '2018-08', // new Date(2017, 7)
          '2028-04', // new Date(2027, 3)
        ];
        return <DateRangePicker value={testRange}></DateRangePicker>;
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("DatePicker: :defaultTime[string] & :valueType['time-stamp'] without enableTimePicker", async () => {
    // 测试 DatePicker 当 valueType 为 time-stamp 且提供 defaultTime 但不启用 enableTimePicker 时
    const defaultTime = '10:30:45';
    const onChange = vi.fn();
    const attachClass = 'date-picker-test-attach';

    const wrapper = mount({
      render() {
        return (
          <div class={attachClass}>
            <DatePicker
              defaultTime={defaultTime}
              format="YYYY-MM-DD"
              valueType={'time-stamp'}
              onChange={onChange}
              popupProps={{ attach: `.${attachClass}` }}
            />
          </div>
        );
      },
    });

    const trigger = wrapper.find('.t-input');
    await trigger.trigger('mousedown');
    await trigger.trigger('mouseup');
    await trigger.trigger('click');
    await nextTick();
    await new Promise((resolve) => setTimeout(resolve, 0));

    // 在局部容器中查找日期单元格
    const cells = Array.from(wrapper.element.querySelectorAll('td.t-date-picker__cell')) as HTMLElement[];
    const targetCell = cells.find((cell) => {
      return cell.textContent?.trim() === '15' && !cell.className.includes('--additional');
    });

    expect(targetCell).toBeTruthy();
    if (targetCell) {
      targetCell.click();
      await nextTick();
    }

    expect(onChange).toHaveBeenCalled();

    const value = onChange.mock.calls[0][0];
    const ctx = onChange.mock.calls[0][1];
    const expectedTimestamp = dayjs('2020-12-15 10:30:45').valueOf();

    expect(value).toBe(expectedTimestamp);
    expect(dayjs(ctx?.dayjsValue).format('YYYY-MM-DD HH:mm:ss')).toBe('2020-12-15 10:30:45');
  });

  it("DateRangePicker: :defaultTime[array] & :valueType['time-stamp'] without enableTimePicker", async () => {
    // 测试 DateRangePicker 当 valueType 为 time-stamp 且提供 defaultTime 但不启用 enableTimePicker 时
    const defaultTime = ['08:15:30', '18:45:20'];
    const onChange = vi.fn();
    const attachClass = 'date-range-picker-test-attach';

    const wrapper = mount({
      render() {
        return (
          <div class={attachClass}>
            <DateRangePicker
              defaultTime={defaultTime}
              format="YYYY-MM-DD"
              valueType={'time-stamp'}
              onChange={onChange}
              popupProps={{ attach: `.${attachClass}` }}
            />
          </div>
        );
      },
    });

    const trigger = wrapper.find('.t-input');
    await trigger.trigger('mousedown');
    await trigger.trigger('mouseup');
    await trigger.trigger('click');
    await nextTick();
    await new Promise((resolve) => setTimeout(resolve, 0));

    // 选择开始和结束日期
    const cells = Array.from(wrapper.element.querySelectorAll('td.t-date-picker__cell')) as HTMLElement[];
    const matchCell = (text: string) =>
      cells.find((cell) => cell.textContent?.trim() === text && !cell.className.includes('--additional'));
    const startCell = matchCell('10');
    const endCell = matchCell('20');

    expect(startCell).toBeTruthy();
    expect(endCell).toBeTruthy();
    if (startCell) {
      startCell.click();
      await nextTick();
    }
    if (endCell) {
      endCell.click();
      await nextTick();
    }

    expect(onChange).toHaveBeenCalled();
    const value = onChange.mock.calls[0][0] as number[];
    const ctx = onChange.mock.calls[0][1];
    const expectedRange = [dayjs('2020-12-10 08:15:30').valueOf(), dayjs('2020-12-20 18:45:20').valueOf()];

    expect(Array.isArray(value)).toBe(true);
    expect(value).toHaveLength(2);

    expect(value[0]).toBe(expectedRange[0]);
    expect(value[1]).toBe(expectedRange[1]);

    const dayjsValues = ctx?.dayjsValue;
    expect(Array.isArray(dayjsValues)).toBe(true);
    expect(dayjs(dayjsValues[0]).format('YYYY-MM-DD HH:mm:ss')).toBe('2020-12-10 08:15:30');
    expect(dayjs(dayjsValues[1]).format('YYYY-MM-DD HH:mm:ss')).toBe('2020-12-20 18:45:20');
  });

  it('DatePickerPanel: defaultTime applied to dayjsValue (no valueType)', async () => {
    // Panel 不支持 valueType，这里仅传入 defaultTime 并验证 dayjsValue 的精确时间
    const defaultTime = '12:34:56';
    const onChange = vi.fn();

    const wrapper = mount({
      render() {
        return <DatePickerPanel defaultTime={defaultTime} format="YYYY-MM-DD" onChange={onChange} />;
      },
    });

    // 查找非附加日期单元格(例如 '15')并点击
    const cells = wrapper.findAll('td.t-date-picker__cell');
    const targetCell = cells.find((c) => c.text() === '15' && !c.classes().some((cn) => cn.includes('--additional')));
    expect(targetCell).toBeTruthy();
    if (targetCell) await targetCell.trigger('click');

    expect(onChange).toHaveBeenCalled();
    const ctx = onChange.mock.calls[0][1];
    // 仅校验 dayjsValue 对应的精确时间
    // 验证 dayjsValue 包含正确的时间（不关心第一个参数类型）
    expect(dayjs(ctx?.dayjsValue).format('YYYY-MM-DD HH:mm:ss')).toBe('2020-12-15 12:34:56');
  });

  it('DateRangePickerPanel: defaultTime applied to dayjsValue array (no valueType)', async () => {
    // Panel 不支持 valueType，这里仅传入 defaultTime 并验证 dayjsValue 数组的精确时间
    const defaultTime = ['01:02:03', '04:05:06'];
    const onChange = vi.fn();

    const wrapper = mount({
      render() {
        return <DateRangePickerPanel defaultTime={defaultTime} format="YYYY-MM-DD" onChange={onChange} />;
      },
    });

    // 点击两个非附加日期单元格(例如 '10' 和 '20')以选择范围
    const cells = wrapper.findAll('td.t-date-picker__cell');
    const start = cells.find((c) => c.text() === '10' && !c.classes().some((cn) => cn.includes('--additional')));
    const end = cells.find((c) => c.text() === '20' && !c.classes().some((cn) => cn.includes('--additional')));
    expect(start).toBeTruthy();
    expect(end).toBeTruthy();
    if (start) await start.trigger('click');
    if (end) await end.trigger('click');

    expect(onChange).toHaveBeenCalled();
    const ctx = onChange.mock.calls[0][1];
    // 仅验证 dayjsValue 包含正确的时间
    const dayjsValues = ctx?.dayjsValue;
    expect(Array.isArray(dayjsValues)).toBe(true);
    expect(dayjs(dayjsValues[0]).format('YYYY-MM-DD HH:mm:ss')).toBe('2020-12-10 01:02:03');
    expect(dayjs(dayjsValues[1]).format('YYYY-MM-DD HH:mm:ss')).toBe('2020-12-20 04:05:06');
  });
});
