import { mount } from '@vue/test-utils';
import MockDate from 'mockdate';
import { describe, it, expect, vi } from 'vitest';
import DateRangePicker from '../DateRangePicker';
import FormItem from '../../form/form-item';

const flush = async (wrapper: any) => {
  await wrapper.vm.$nextTick();
  await new Promise((resolve) => setTimeout(resolve, 0));
};

describe('DateRangePicker behavior combos', () => {
  it('disallows clicking earlier cell after first pick', async () => {
    MockDate.set('2021-08-01');

    const wrapper = mount(
      {
        components: { DateRangePicker, FormItem },
        setup() {
          const onChange = vi.fn();
          return { onChange };
        },
        template: `
          <FormItem label="label">
            <DateRangePicker
              :default-time="['00:00:00','23:59:59']"
              :first-day-of-week="1"
              :popup-props="{ attach: 'body', visible: true }"
              @change="onChange"
            />
          </FormItem>
        `,
      },
      { attachTo: document.body },
    );

    await flush(wrapper);
    const trigger = wrapper.find('.t-range-input');
    await trigger.trigger('click');
    await flush(wrapper);

    const waitForPanel = async () => {
      for (let i = 0; i < 6; i += 1) {
        const found = document.body.querySelector('.t-date-range-picker__panel');
        if (found) return found as HTMLElement;
        await flush(wrapper);
      }
      return null;
    };

    const panel = await waitForPanel();
    if (!panel) throw new Error('panel not found');

    const getTables = () => Array.from(panel.querySelectorAll<HTMLElement>('.t-date-picker__table'));
    const getCells = (table: HTMLElement) => Array.from(table.querySelectorAll<HTMLElement>('td.t-date-picker__cell'));
    const findDayCell = (cells: HTMLElement[], day: string) =>
      cells.find(
        (c) =>
          c.textContent?.trim() === day && !Array.from(c.classList).some((cls: string) => cls.includes('--additional')),
      );

    const tables = getTables();
    const startCells = getCells(tables[0]);
    const startDayCell = findDayCell(startCells, '10');
    const earlierCell = findDayCell(startCells, '5');
    startDayCell?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flush(wrapper);
    const beforeCalls = (wrapper.vm as any).onChange?.mock?.calls?.length || 0;
    earlierCell?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flush(wrapper);
    const afterCalls = (wrapper.vm as any).onChange?.mock?.calls?.length || 0;
    expect(afterCalls).toBe(beforeCalls);

    wrapper.unmount();
    MockDate.reset();
  });

  it('allows clicking earlier cell when cancelRangeSelectLimit=true', async () => {
    MockDate.set('2021-08-01');

    const wrapper = mount(
      {
        components: { DateRangePicker, FormItem },
        setup() {
          const onPick = vi.fn();
          return { onPick };
        },
        template: `
          <FormItem label="label">
            <DateRangePicker
              :default-time="['00:00:00','23:59:59']"
              :first-day-of-week="1"
              :popup-props="{ attach: 'body', visible: true }"
              :cancel-range-select-limit="true"
              @pick="onPick"
            />
          </FormItem>
        `,
      },
      { attachTo: document.body },
    );

    await flush(wrapper);
    const trigger = wrapper.find('.t-range-input');
    await trigger.trigger('click');
    await flush(wrapper);

    const waitForPanel = async () => {
      for (let i = 0; i < 6; i += 1) {
        const found = document.body.querySelector('.t-date-range-picker__panel');
        if (found) return found as HTMLElement;
        await flush(wrapper);
      }
      return null;
    };
    const panel = await waitForPanel();
    if (!panel) throw new Error('panel not found');

    const getTables = () => Array.from(panel.querySelectorAll<HTMLElement>('.t-date-picker__table'));
    const getCells = (table: HTMLElement) => Array.from(table.querySelectorAll<HTMLElement>('td.t-date-picker__cell'));
    const findDayCell = (cells: HTMLElement[], day: string) =>
      cells.find(
        (c) =>
          c.textContent?.trim() === day && !Array.from(c.classList).some((cls: string) => cls.includes('--additional')),
      );

    const tables = getTables();
    const startCells = getCells(tables[0]);
    const startCell = findDayCell(startCells, '10');
    const earlierCell = findDayCell(startCells, '5');
    expect(startCell).toBeTruthy();
    expect(earlierCell).toBeTruthy();
    startCell?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flush(wrapper);

    const beforePickCalls = (wrapper.vm as any).onPick?.mock?.calls?.length || 0;
    earlierCell?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flush(wrapper);
    const afterPickCalls = (wrapper.vm as any).onPick?.mock?.calls?.length || 0;
    expect(afterPickCalls).toBeGreaterThan(beforePickCalls);

    wrapper.unmount();
    MockDate.reset();
  });
});
