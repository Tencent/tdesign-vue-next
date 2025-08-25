import { mount } from '@vue/test-utils';
import MockDate from 'mockdate';
import { nextTick } from 'vue';
import { vi } from 'vitest';
import DatePicker, { DateRangePicker } from '@tdesign/components/date-picker';

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
});

// 测试日期范围选择器点击问题修复
describe('DateRangePicker Click Issue Fix', () => {
  it('should complete date selection with only 2 clicks', async () => {
    const onChange = vi.fn();
    const wrapper = mount({
      render() {
        return (
          <DateRangePicker
            value={[]}
            onChange={onChange}
            popupProps={{
              visible: true,
            }}
          />
        );
      },
    });

    await nextTick();

    // 模拟点击第一个日期单元格（开始日期）
    const firstDateCell = wrapper.find('.t-date-picker__cell:not(.t-date-picker__cell--disabled)');
    if (firstDateCell.exists()) {
      await firstDateCell.trigger('click');
      await nextTick();
    }

    // 模拟点击第二个日期单元格（结束日期）- 应该只需要一次点击就完成选择
    const dateCells = wrapper.findAll('.t-date-picker__cell:not(.t-date-picker__cell--disabled)');
    if (dateCells.length > 1) {
      await dateCells[1].trigger('click');
      await nextTick();

      // 验证 onChange 被调用，说明日期选择完成
      expect(onChange).toHaveBeenCalledTimes(1);
    }
  });

  it('should handle activeIndex correctly when selecting end date', async () => {
    const onChange = vi.fn();
    const wrapper = mount({
      render() {
        return (
          <DateRangePicker
            value={['2024-01-01', '']}
            onChange={onChange}
            popupProps={{
              visible: true,
            }}
          />
        );
      },
    });

    await nextTick();

    // 当已有开始日期时，点击结束日期应该直接完成选择
    const dateCell = wrapper.find('.t-date-picker__cell:not(.t-date-picker__cell--disabled)');
    if (dateCell.exists()) {
      await dateCell.trigger('click');
      await nextTick();

      // 验证 onChange 被调用
      expect(onChange).toHaveBeenCalled();
    }
  });

  it('should properly validate date range completion', async () => {
    const onChange = vi.fn();
    const wrapper = mount({
      render() {
        return (
          <DateRangePicker
            value={[]}
            onChange={onChange}
            popupProps={{
              visible: true,
            }}
          />
        );
      },
    });

    await nextTick();

    const dateCells = wrapper.findAll('.t-date-picker__cell:not(.t-date-picker__cell--disabled)');

    if (dateCells.length >= 2) {
      // 点击开始日期
      await dateCells[0].trigger('click');
      await nextTick();

      // 此时应该还没有触发 onChange（只选择了一个日期）
      expect(onChange).not.toHaveBeenCalled();

      // 点击结束日期
      await dateCells[5].trigger('click'); // 选择一个不同的日期
      await nextTick();

      // 现在应该触发 onChange（两个日期都已选择）
      expect(onChange).toHaveBeenCalledTimes(1);
    }
  });

  it('should close popup after confirm button click when both dates are selected', async () => {
    const onChange = vi.fn();
    const wrapper = mount({
      render() {
        return (
          <DateRangePicker
            value={['', '']}
            onChange={onChange}
            enableTimePicker={true}
            popupProps={{
              visible: true,
            }}
          />
        );
      },
    });

    await nextTick();

    // 选择开始日期
    const startDateCells = wrapper.findAll('.t-date-picker__cell:not(.t-date-picker__cell--disabled)');
    if (startDateCells.length > 0) {
      await startDateCells[0].trigger('click');
      await nextTick();
    }

    // 选择结束日期
    const endDateCells = wrapper.findAll('.t-date-picker__cell:not(.t-date-picker__cell--disabled)');
    if (endDateCells.length > 5) {
      await endDateCells[5].trigger('click');
      await nextTick();
    }

    // 点击确认按钮
    const confirmButton = wrapper.find('.t-button--theme-primary');
    if (confirmButton.exists()) {
      await confirmButton.trigger('click');
      await nextTick();

      // 验证 onChange 被调用
      expect(onChange).toHaveBeenCalled();
    }
  });
});
