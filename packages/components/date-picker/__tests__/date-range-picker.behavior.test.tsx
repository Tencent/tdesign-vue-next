import { mount, VueWrapper } from '@vue/test-utils';
import MockDate from 'mockdate';
import { describe, it, expect, vi } from 'vitest';
import dayjs from 'dayjs';
import DateRangePicker from '../DateRangePicker';
import FormItem from '../../form/form-item';

// const flush = async (wrapper: any) => {
//   await wrapper.vm.$nextTick();
//   await new Promise((resolve) => setTimeout(resolve, 0));
// };

describe('DateRangePicker behavior combos', () => {
  it('disallows clicking earlier cell after first pick', async () => {
    MockDate.set('2025-12-01');

    const wrapper: VueWrapper<any> = mount(
      {
        components: { DateRangePicker, FormItem },
        setup() {
          const onChange = vi.fn();
          return { onChange };
        },
        template: `
          <FormItem>
            <DateRangePicker
              :default-time="['00:00:00', '23:59:59']"
              format="YYYY-MM-DD HH:mm:ss"
              value-type="time-stamp"
              :popup-props="{ attach: 'body', visible: true }"
              @change="onChange"
            />
          </FormItem>
        `,
      },
      { attachTo: document.body },
    );

    const panel = await vi.waitFor(
      () => {
        const el = document.body.querySelector('.t-date-range-picker__panel') as HTMLElement;
        if (!el) throw new Error('panel not found');
        return el;
      },
      { timeout: 1000 },
    );

    if (!panel) throw new Error('panel not found');

    const getTables = () => Array.from(panel.querySelectorAll<HTMLElement>('.t-date-picker__table'));
    const getCells = (table: HTMLElement) => Array.from(table.querySelectorAll<HTMLElement>('td.t-date-picker__cell'));

    const isAdditional = (c: HTMLElement) => c.className.includes('--additional');
    const cellText = (c: HTMLElement) => c.textContent?.trim() ?? '';
    const findDayCell = (cells: HTMLElement[], day: string) =>
      cells.find((c) => cellText(c) === day && !isAdditional(c));
    const findDayCellOrThrow = (cells: HTMLElement[], day: string) => {
      const cell = findDayCell(cells, day);
      if (!cell) throw new Error(`cell ${day} not found`);
      return cell;
    };

    const tables = getTables();
    if (tables.length < 2) throw new Error(`expect 2 tables, got ${tables.length}`);
    const startCells = getCells(tables[0]);
    const endCells = getCells(tables[1]);

    const startDayCell = findDayCellOrThrow(startCells, '10');
    startDayCell.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await wrapper.vm.$nextTick();
    const beforeCalls = wrapper.vm.onChange?.mock?.calls?.length || 0;

    // 测试第一个面板：在选择了 10 号后，所有更早的可点击日期都不可被选择
    const earlierCells = startCells.filter((c) => {
      if (isAdditional(c)) return false;
      const n = Number(cellText(c));
      return Number.isFinite(n) && n < 10;
    });

    for (const cell of earlierCells) {
      cell.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      const currentCalls = wrapper.vm.onChange?.mock?.calls?.length || 0;
      expect(currentCalls).toBe(beforeCalls);
    }

    // 选择一个更晚的正常日期（例如 15 号）作为结束值，验证两个值正确且为格式化后的值
    const endDayCell = findDayCellOrThrow(endCells, '15');
    endDayCell.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    // 等待 Vue 更新完成
    await wrapper.vm.$nextTick();
    await vi.waitFor(
      () => {
        const callsLen = wrapper.vm.onChange?.mock?.calls?.length || 0;
        expect(callsLen).toBeGreaterThan(beforeCalls);
      },
      { timeout: 1000 },
    );

    const calls = wrapper.vm.onChange?.mock?.calls || [];
    const [rangeValue] = calls[calls.length - 1] || [];
    expect(Array.isArray(rangeValue)).toBe(true);
    expect(rangeValue.length).toBe(2);
    expect(dayjs(rangeValue[0]).format('YYYY-MM-DD HH:mm:ss')).toBe('2025-12-10 00:00:00');
    expect(dayjs(rangeValue[1]).format('YYYY-MM-DD HH:mm:ss')).toBe('2026-01-15 23:59:59');

    const inputs = wrapper.findAll('input');
    expect(inputs.length).toBeGreaterThanOrEqual(2);
    expect((inputs[0].element as HTMLInputElement).value).toBe('2025-12-10 00:00:00');
    expect((inputs[1].element as HTMLInputElement).value).toBe('2026-01-15 23:59:59');

    wrapper.unmount();
    MockDate.reset();
  });

  it('allows clicking earlier cell when cancelRangeSelectLimit=true', async () => {
    MockDate.set('2021-08-01');

    const wrapper: VueWrapper<any> = mount(
      {
        components: { DateRangePicker, FormItem },
        setup() {
          const onPick = vi.fn();
          const onChange = vi.fn();
          return { onPick, onChange };
        },
        template: `
          <FormItem label="label">
            <DateRangePicker
              :popup-props="{ attach: 'body', visible: true }"
              :cancel-range-select-limit="true"
              @pick="onPick"
              @change="onChange"
            />
          </FormItem>
        `,
      },
      { attachTo: document.body },
    );

    const panel = await vi.waitFor(
      () => {
        const el = document.body.querySelector('.t-date-range-picker__panel') as HTMLElement;
        if (!el) throw new Error('panel not found');
        return el;
      },
      { timeout: 1000 },
    );
    if (!panel) throw new Error('panel not found');

    const getTables = () => Array.from(panel.querySelectorAll<HTMLElement>('.t-date-picker__table'));
    const getCells = (table: HTMLElement) => Array.from(table.querySelectorAll<HTMLElement>('td.t-date-picker__cell'));

    const isAdditional = (c: HTMLElement) => c.className.includes('--additional');
    const cellText = (c: HTMLElement) => c.textContent?.trim() ?? '';
    const findDayCell = (cells: HTMLElement[], day: string) =>
      cells.find((c) => cellText(c) === day && !isAdditional(c));
    const findDayCellOrThrow = (cells: HTMLElement[], day: string) => {
      const cell = findDayCell(cells, day);
      if (!cell) throw new Error(`cell ${day} not found`);
      return cell;
    };

    const tables = getTables();
    if (tables.length < 2) throw new Error(`expect 2 tables, got ${tables.length}`);
    const startCells = getCells(tables[0]);

    const startCell = findDayCellOrThrow(startCells, '10');
    startCell.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await wrapper.vm.$nextTick();

    const beforePickCalls = wrapper.vm.onPick?.mock?.calls?.length || 0;

    const earlierCell = findDayCellOrThrow(startCells, '5');
    earlierCell.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    await vi.waitFor(
      () => {
        const afterPickCalls = wrapper.vm.onPick?.mock?.calls?.length || 0;
        expect(afterPickCalls).toBeGreaterThan(beforePickCalls);
      },
      { timeout: 1000 },
    );

    const pickCalls = wrapper.vm.onPick?.mock?.calls || [];
    const lastPickArgs = pickCalls[pickCalls.length - 1] || [];
    const pickedDate = lastPickArgs[0];
    expect(dayjs(pickedDate).format('YYYY-MM-DD')).toBe('2021-08-05');

    const changeCalls = wrapper.vm.onChange?.mock?.calls || [];
    expect(changeCalls.length).toBeGreaterThan(0);
    const [rangeValue] = changeCalls[changeCalls.length - 1] || [];
    expect(Array.isArray(rangeValue)).toBe(true);
    expect(rangeValue.length).toBe(2);
    expect(dayjs(rangeValue[0]).format('YYYY-MM-DD')).toBe('2021-08-05');
    expect(dayjs(rangeValue[1]).format('YYYY-MM-DD')).toBe('2021-08-10');

    const inputs = wrapper.findAll('input');
    expect(inputs.length).toBeGreaterThanOrEqual(2);
    expect((inputs[0].element as HTMLInputElement).value).toBe('2021-08-05');
    expect((inputs[1].element as HTMLInputElement).value).toBe('2021-08-10');

    wrapper.unmount();
    MockDate.reset();
  });
});
